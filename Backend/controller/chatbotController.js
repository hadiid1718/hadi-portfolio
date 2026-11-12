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
    Work.find().sort({ order: 1, createdAt: -1 }).limit(30).lean(),
    Service.find().sort({ order: 1, createdAt: -1 }).limit(20).lean(),
    Course.find().sort({ createdAt: -1 }).limit(20).lean()
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

const normalizeHistory = (history, currentMessage) => {
  if (!Array.isArray(history)) return [];

  // Do not send previous assistant answers back to the model. They may have
  // been generated before an admin changed the portfolio and would reintroduce
  // stale content even though the live knowledge query is current.
  const userMessages = history
    .filter((h) => h && h.role === 'user' && typeof h.text === 'string' && h.text.trim())
    .map((h) => ({
      text: h.text.trim()
    }))
    .slice(-12);

  // sendMessage sends the current message separately, so do not include it twice.
  const currentText = currentMessage.trim();
  const previousMessages = userMessages.filter(({ text }) => text !== currentText);

  // Gemini history requires alternating roles. User-only context is merged
  // into one turn and followed by a neutral model turn, while the current
  // question is sent separately. The neutral turn avoids replaying stale data.
  return previousMessages.length
    ? [
        { role: 'user', parts: [{ text: previousMessages.map(({ text }) => text).join('\n') }] },
        { role: 'model', parts: [{ text: 'I will answer using the current portfolio knowledge.' }] }
      ]
    : [];
};

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
    const systemInstruction = `${SYSTEM_INSTRUCTIONS}

Source-of-truth rules:
- The CURRENT PROJECTS / WORK, CURRENT SERVICES, and CURRENT COURSES sections are authoritative.
- They are loaded from the database for every request and represent the currently published portfolio.
- Never use a project, service, or course from memory, previous chat turns, or any other source.
- If an item is absent from a current section, treat it as removed and say the information is not currently published.

KNOWLEDGE BASE:
${staticKnowledge}

${liveKnowledge}`;

    const normalizedHistory = normalizeHistory(history, message);

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