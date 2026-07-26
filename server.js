const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { nanoid } = require('nanoid');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_PATH = path.join(__dirname, 'data', 'db.json');
const IMAGES_DIR = path.join(__dirname, 'public', 'images');

app.use(express.json({ limit: '2mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// ---------- storage helpers ----------
function readDB() {
  if (!fs.existsSync(DB_PATH)) {
    return { config: null, content: { letters: [], memories: [], reasons: [], bucket: [], dates: [], replies: [] } };
  }
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
}
function writeDB(db) {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
}
function tokenFor(password) {
  return crypto.createHash('sha256').update(password + '::our-love-app-salt').digest('hex');
}

// ---------- auth middleware ----------
function requireAuth(req, res, next) {
  const db = readDB();
  if (!db.config) return res.status(401).json({ error: 'not_configured' });
  const token = req.headers['x-auth-token'];
  if (token && token === tokenFor(db.config.password)) return next();
  return res.status(401).json({ error: 'unauthorized' });
}

// ---------- status / setup / login ----------
app.get('/api/status', (req, res) => {
  const db = readDB();
  if (!db.config) return res.json({ configured: false });
  res.json({ configured: true, hisName: db.config.hisName, herName: db.config.herName });
});

app.post('/api/setup', (req, res) => {
  const db = readDB();
  if (db.config) return res.status(400).json({ error: 'already_configured' });
  const { hisName, herName, anniversary, password } = req.body;
  if (!hisName || !herName || !password) return res.status(400).json({ error: 'missing_fields' });
  db.config = { hisName, herName, anniversary: anniversary || null, password };
  writeDB(db);
  res.json({ ok: true, token: tokenFor(password), hisName, herName });
});

app.post('/api/login', (req, res) => {
  const db = readDB();
  if (!db.config) return res.status(400).json({ error: 'not_configured' });
  const { password } = req.body;
  if (password === db.config.password) {
    return res.json({ ok: true, token: tokenFor(password), hisName: db.config.hisName, herName: db.config.herName, anniversary: db.config.anniversary });
  }
  res.status(401).json({ ok: false });
});

// ---------- content ----------
app.get('/api/content', requireAuth, (req, res) => {
  const db = readDB();
  res.json(db.content);
});

app.post('/api/content', requireAuth, (req, res) => {
  const db = readDB();
  db.content = req.body;
  writeDB(db);
  res.json({ ok: true });
});

// ---------- letter replies (two-way) ----------
app.post('/api/reply', requireAuth, (req, res) => {
  const db = readDB();
  const { letterId, text, author } = req.body;
  if (!letterId || !text) return res.status(400).json({ error: 'missing_fields' });
  db.content.replies = db.content.replies || [];
  db.content.replies.push({ id: nanoid(8), letterId, text, author: author || 'her', createdAt: new Date().toISOString() });
  writeDB(db);
  res.json({ ok: true });
});

// ---------- photo upload ----------
if (!fs.existsSync(IMAGES_DIR)) fs.mkdirSync(IMAGES_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, IMAGES_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || '.jpg';
    cb(null, nanoid(10) + ext);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (/^image\//.test(file.mimetype)) cb(null, true);
    else cb(new Error('only_images_allowed'));
  }
});

app.post('/api/upload', requireAuth, upload.single('photo'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'no_file' });
  res.json({ url: '/images/' + req.file.filename });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('');
  console.log('  Our love app is running.');
  console.log('  On this computer:  http://localhost:' + PORT);
  console.log('  On your phone (same wifi): check the README for your computer\'s IP address');
  console.log('');
});
