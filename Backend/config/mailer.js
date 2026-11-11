const nodemailer = require('nodemailer');

// Single shared transporter, built from env vars.
// Works out of the box with Gmail (use a Google "App Password", not your normal password)
// or any SMTP provider if EMAIL_HOST/EMAIL_PORT are set instead of EMAIL_SERVICE.
let transporter = null;

const getTransporter = () => {
  if (transporter) return transporter;

  const { EMAIL_SERVICE, EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS } = process.env;

  if (!EMAIL_USER || !EMAIL_PASS) {
    console.warn('[mailer] EMAIL_USER / EMAIL_PASS not set — outgoing email is disabled.');
    return null;
  }

  transporter = EMAIL_HOST
    ? nodemailer.createTransport({
        host: EMAIL_HOST,
        port: Number(EMAIL_PORT) || 587,
        secure: Number(EMAIL_PORT) === 465,
        auth: { user: EMAIL_USER, pass: EMAIL_PASS }
      })
    : nodemailer.createTransport({
        service: EMAIL_SERVICE || 'gmail',
        auth: { user: EMAIL_USER, pass: EMAIL_PASS }
      });

  return transporter;
};

/**
 * Send an email directly to a recipient (used by the admin "Reply" flow).
 * @param {Object} opts
 * @param {string} opts.to - recipient email
 * @param {string} opts.subject
 * @param {string} opts.text - plain text body
 * @param {string} [opts.html] - optional html body
 * @param {string} [opts.replyTo] - reply-to address (defaults to EMAIL_USER)
 * @param {string} [opts.fromName] - display name for the "From" header
 */
const sendMail = async ({ to, subject, text, html, replyTo, fromName }) => {
  const t = getTransporter();
  if (!t) {
    throw new Error('Email is not configured on the server (missing EMAIL_USER/EMAIL_PASS).');
  }

  const fromDisplayName = fromName || process.env.EMAIL_FROM_NAME || 'Hadeed Ul Hassan';

  const info = await t.sendMail({
    from: `"${fromDisplayName}" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    html: html || `<p>${String(text).replace(/\n/g, '<br/>')}</p>`,
    replyTo: replyTo || process.env.EMAIL_USER
  });

  return info;
};

module.exports = { sendMail, getTransporter };