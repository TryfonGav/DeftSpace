require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const helmet = require('helmet');
const path = require('path');

if (!process.env.SESSION_SECRET) {
  console.error('FATAL: SESSION_SECRET environment variable is required');
  process.exit(1);
}

const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');
const { requireAuth } = require('./middleware/auth');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 3000;
app.set('trust proxy', 1);

app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  }
}));

app.use('/admin', authRoutes);
app.use('/api', apiRoutes);

app.get('/admin/dashboard', requireAuth, (req, res) => {
  const html = require('./views/dashboard')(req.session.username);
  res.send(html);
});

app.get('/', (req, res) => {
  const html = require('./views/public')();
  res.send(html);
});

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/deftspace')
  .then(async () => {
    console.log('✅ MongoDB connected');
    const adminUser = await User.findOne({ username: process.env.ADMIN_USERNAME || 'admin' });
    if (!adminUser) {
      const admin = new User({
        username: process.env.ADMIN_USERNAME || 'admin',
        password: process.env.ADMIN_PASSWORD || 'deftspace2025'
      });
      await admin.save();
      console.log(`✅ Admin user created: ${admin.username}`);
    } else if (process.env.ADMIN_PASSWORD) {
      adminUser.password = process.env.ADMIN_PASSWORD;
      await adminUser.save();
      console.log('✅ Admin password synced from environment');
    }
    app.listen(PORT, () => console.log(`🚀 DeftSpace running at http://localhost:${PORT}`));
  })
  .catch(err => { console.error('MongoDB connection error:', err); process.exit(1); });
