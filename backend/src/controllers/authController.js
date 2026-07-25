const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

function signToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
}

// Generates username suggestions like "yamen", "yamen1", "yamen_gym" when taken
function generateUsernameSuggestions(baseUsername) {
  const suggestions = [];
  const checkStmt = db.prepare('SELECT 1 FROM users WHERE username = ?');

  const candidates = [
    `${baseUsername}${Math.floor(Math.random() * 900 + 100)}`,
    `${baseUsername}_gym`,
    `${baseUsername}.fit`,
    `${baseUsername}${new Date().getFullYear()}`,
  ];

  for (const candidate of candidates) {
    if (!checkStmt.get(candidate)) suggestions.push(candidate);
    if (suggestions.length >= 3) break;
  }

  return suggestions;
}

function signup(req, res) {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({ error: 'Email, username, and password are all required.' });
  }

  const existingEmail = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
  if (existingEmail) {
    // Per spec: tell them the email is used, and let them switch to login instead
    return res.status(409).json({
      field: 'email',
      error: 'That email is already registered.',
      suggestion: 'switch_to_login',
    });
  }

  const existingUsername = db.prepare('SELECT id FROM users WHERE username = ?').get(username);
  if (existingUsername) {
    return res.status(409).json({
      field: 'username',
      error: 'That username is already taken.',
      suggestions: generateUsernameSuggestions(username),
    });
  }

  const passwordHash = bcrypt.hashSync(password, 10);

  const result = db
    .prepare('INSERT INTO users (email, username, password_hash) VALUES (?, ?, ?)')
    .run(email, username, passwordHash);

  const token = signToken(result.lastInsertRowid);

  return res.status(201).json({
    token,
    user: { id: result.lastInsertRowid, email, username },
  });
}

function login(req, res) {
  // "identifier" can be either username or email, per spec (same input field)
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res.status(400).json({ error: 'Please enter your username/email and password.' });
  }

  const user = db
    .prepare('SELECT * FROM users WHERE username = ? OR email = ?')
    .get(identifier, identifier);

  // Deliberately vague per spec: never reveal whether it was the identifier or password that was wrong
  const genericError = { error: "Those details don't match an account. Please check and try again." };

  if (!user) {
    return res.status(401).json(genericError);
  }

  const passwordMatches = bcrypt.compareSync(password, user.password_hash);
  if (!passwordMatches) {
    return res.status(401).json(genericError);
  }

  const token = signToken(user.id);

  return res.json({
    token,
    user: { id: user.id, email: user.email, username: user.username },
  });
}

function me(req, res) {
  const user = db
    .prepare('SELECT id, email, username, weight_current, weight_goal FROM users WHERE id = ?')
    .get(req.userId);

  if (!user) return res.status(404).json({ error: 'User not found.' });
  return res.json({ user });
}

module.exports = { signup, login, me };
