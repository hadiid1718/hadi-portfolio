const { GoogleGenerativeAI } = require('@google/generative-ai');
const Work = require('../model/Work');
const Service = require('../model/Service');
const Course = require('../model/Course');
const { buildStaticKnowledgeText, profile } = require('../knowledge/portfolioData');

let genAI = null;
const getClient = () => {
  if (genAI) return genAI;
  if (!process.env.GEMINI_API_KEY) return null;
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  return genAI;
};

// Pulls the current, live content out of MongoDB so the bot always matches
// what's actually published on the site (not just the static CV facts).
const buildLiveKnowledgeText = async () => {
  const [works, services, courses] = await Promise.all([
    Work.find().sort({ order: 1, createdAt: -1 }).limit(30),
    Service.find().sort({ order: 1 }).limit(20),
    Course.find().sort({ createdAt: -1 }).limit(20)
  ]);

  const worksText = works.length
    ? works
        .map(
          (w) =>
            `- ${w.title} [${w.category}, ${w.status}]: ${w.description} Technologies: ${(w.technologies || []).join(', ')}.${
              w.hosted === 'Yes' && w.hostedUrl ? ` Live at ${w.hostedUrl}.` : ''
            }`
        )
        .join('\n')
    : 'No project entries published yet.';

  const servicesText = services.length
    ? services
        .map(
          (s) =>
            `- ${s.title}: ${s.description} Features: ${(s.features || []).join(', ')}. Technologies: ${(s.technologies || []).join(', ')}.`
        )
        .join('\n')
    : 'No services published yet.';

  const coursesText = courses.length
    ? courses.map((c) => `- ${c.title} [${c.level}, ${c.category}]: ${c.description}`).join('\n')
    : 'No courses published yet.';

  return `
CURRENT PROJECTS / WORK (from the live site)
${worksText}

CURRENT SERVICES (from the live site)
${servicesText}

CURRENT COURSES (from the live site)
${coursesText}
`.trim();
};

const SYSTEM_INSTRUCTIONS = `You are the portfolio assistant embedded on ${profile.name}'s personal portfolio website.
Your job is to answer visitor questions about ${profile.name} — his background, skills, experience, projects, services, education, and how to get in touch — using ONLY the knowledge provided to you below.

Rules:
- Be friendly, concise, and helpful. Answer in a few short sentences or a tight bullet list; don't ramble.
- Speak about Hadeed in the third person (e.g. "Hadeed built..."), unless the visitor asks you to role-play as him.
- If asked something not covered by the knowledge below (e.g. personal opinions, unrelated topics, or facts you don't have), say you don't have that information and suggest they use the Contact page to ask Hadeed directly.
- Never invent projects, numbers, dates, or skills that aren't in the knowledge base.
- If someone wants to get in touch or hire Hadeed, point them to the Contact page (/#/contact).
- Keep responses plain text (no markdown headers), chat-widget friendly.`;

exports.chat = async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ message: 'A message is required' });
    }

    const client = getClient();
    if (!client) {
      return res.status(503).json({
        message: 'The chatbot is not configured yet. Set GEMINI_API_KEY on the server to enable it.'
      });
    }

    const [staticKnowledge, liveKnowledge] = [buildStaticKnowledgeText(), await buildLiveKnowledgeText()];
    const systemInstruction = `${SYSTEM_INSTRUCTIONS}\n\nKNOWLEDGE BASE:\n${staticKnowledge}\n\n${liveKnowledge}`;

    // Normalize any prior turns the frontend sent up into Gemini's chat history format.
    const normalizedHistory = Array.isArray(history)
      ? history
          .filter((h) => h && h.text && (h.role === 'user' || h.role === 'bot'))
          .slice(-12)
          .map((h) => ({
            role: h.role === 'user' ? 'user' : 'model',
            parts: [{ text: h.text }]
          }))
      : [];

    // Google rotates Gemini model IDs frequently. Try the configured model first,
    // then fall back through a short list of known-good stable IDs so a single
    // deprecated/unavailable model name doesn't take the whole chatbot down.
    const candidateModels = [
      process.env.GEMINI_MODEL,
      'gemini-2.5-flash',
      'gemini-2.0-flash',
      'gemini-2.5-flash-lite'
    ].filter(Boolean);

    let reply = null;
    let lastError = null;

    for (const modelName of candidateModels) {
      try {
        const model = client.getGenerativeModel({ model: modelName, systemInstruction });
        const chatSession = model.startChat({ history: normalizedHistory });
        const result = await chatSession.sendMessage(message);
        reply = result.response.text();
        break; // success
      } catch (modelError) {
        lastError = modelError;
        console.warn(`[chatbot] Model "${modelName}" failed: ${modelError.message}`);
      }
    }

    if (reply === null) {
      throw lastError || new Error('All configured Gemini models failed.');
    }

    res.status(200).json({ reply });
  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({
      message: `The chatbot ran into an error: ${error.message || 'unknown error'}`,
      error: error.message
    });
  }
};