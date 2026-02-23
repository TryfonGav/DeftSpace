const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const User = require('../models/User');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many login attempts. Please try again in 15 minutes.',
  standardHeaders: true,
  legacyHeaders: false
});

router.get('/login', (req, res) => {
  if (req.session.userId) return res.redirect('/admin/dashboard');
  res.send(getLoginPage(req.query.error));
});

router.post('/login', loginLimiter, async (req, res) => {
  try {
    const { username, password } = req.body;
    if (typeof username !== 'string' || typeof password !== 'string') {
      return res.redirect('/admin/login?error=1');
    }
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.redirect('/admin/login?error=1');
    }
    req.session.userId = user._id;
    req.session.username = user.username;
    res.redirect('/admin/dashboard');
  } catch (err) {
    res.redirect('/admin/login?error=1');
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/'));
});

function getLoginPage(error) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>DeftSpace Admin Login</title>
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body {
    background-color: #3a6ea5;
    background-image:
      radial-gradient(ellipse 120% 80% at 50% 100%, #4a9e3f 0%, #2e7d32 35%, transparent 70%),
      linear-gradient(180deg, #4fc3f7 0%, #81d4fa 18%, #b3e5fc 32%, #e1f5fe 42%, #ffffff 52%);
    font-family: Tahoma, Verdana, sans-serif;
    font-size: 11px;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .login-window {
    background: #ece9d8;
    border: 1px solid #0055e5;
    border-radius: 6px 6px 0 0;
    box-shadow: 3px 3px 12px rgba(0,0,0,0.4);
    overflow: hidden;
    width: 340px;
  }
  .titlebar {
    background: linear-gradient(180deg, #0a5fce 0%, #1470e0 8%, #1c7ef5 15%, #0f6adf 50%, #0857cc 85%, #0050c8 92%, #003eb8 100%);
    padding: 4px 6px;
    display: flex; align-items: center; justify-content: space-between;
    height: 28px;
    border-radius: 5px 5px 0 0;
    position: relative;
  }
  .titlebar::after {
    content:''; position:absolute; top:0; left:0; right:0; height:50%;
    background: linear-gradient(180deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.05) 100%);
    border-radius: 5px 5px 0 0; pointer-events: none;
  }
  .titlebar-left { display:flex; align-items:center; gap:5px; }
  .titlebar-text { font-size:12px; font-weight:bold; color:#fff; text-shadow:1px 1px 2px rgba(0,0,0,0.6); }
  .titlebar-btns { display:flex; gap:2px; }
  .tbtn {
    width:21px; height:21px; border-radius:3px; border:1px solid rgba(0,0,0,0.4);
    font-size:10px; font-weight:bold; cursor:pointer; display:flex; align-items:center; justify-content:center;
  }
  .tbtn-close { background:linear-gradient(180deg,#e85050 0%,#c83030 50%,#b02020 100%); color:#fff; font-size:11px; }
  .body { padding: 20px; }
  .welcome-banner {
    background: linear-gradient(180deg, #cadaf5 0%, #b8cce8 100%);
    border: 1px solid #90aad0;
    padding: 8px 10px;
    margin-bottom: 14px;
    display: flex; align-items: center; gap: 8px;
  }
  .welcome-icon { font-size: 28px; }
  .welcome-text { font-size: 11px; color: #00006f; }
  .welcome-text strong { display: block; font-size: 13px; }
  .error-box {
    background: #fce8e8; border: 1px solid #c04040; color: #801818;
    padding: 5px 8px; font-size: 11px; margin-bottom: 10px;
    display: flex; align-items: center; gap: 6px;
  }
  .form-group { margin-bottom: 10px; }
  .form-group label { display:block; font-weight:bold; margin-bottom:3px; font-size:11px; }
  .form-group input {
    width:100%; border:1px solid #888; padding:4px 6px;
    font-family:Tahoma,sans-serif; font-size:11px; background:#fff;
    box-shadow: inset 1px 1px 2px rgba(0,0,0,0.15); outline:none;
  }
  .form-group input:focus { border-color: #316ac5; }
  .btn-row { display:flex; justify-content:flex-end; gap:6px; margin-top:14px; }
  .xp-btn {
    background: linear-gradient(180deg, #f5f3ec 0%, #dedad0 60%, #c8c4b8 100%);
    border: 1px solid #7b7978; border-radius:3px; padding:5px 18px;
    font-size:11px; font-family:Tahoma,sans-serif; cursor:pointer; color:#000;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.7);
    transition: all 0.1s;
  }
  .xp-btn:hover { background:linear-gradient(180deg,#dce8ff 0%,#b8ccf8 60%,#a0b8e0 100%); border-color:#316ac5; }
  .xp-btn-default { border-color:#316ac5; background:linear-gradient(180deg,#dce8ff 0%,#b8ccf8 60%,#9ab0e0 100%); font-weight:bold; }
  .footer-bar {
    background: linear-gradient(180deg, #e8e4d8 0%, #d8d4c8 100%);
    border-top: 1px solid #a8a090;
    padding: 4px 10px;
    display: flex; justify-content: space-between; align-items: center;
    font-size: 10px; color: #666;
  }
  .footer-bar a { color: #00006f; }
</style>
</head>
<body>
<div class="login-window">
  <div class="titlebar">
    <div class="titlebar-left">
      <span style="font-size:15px">🔐</span>
      <span class="titlebar-text">DeftSpace — Admin Login</span>
    </div>
    <div class="titlebar-btns">
      <div class="tbtn tbtn-close">✕</div>
    </div>
  </div>
  <div class="body">
    <div class="welcome-banner">
      <div class="welcome-icon">💻</div>
      <div class="welcome-text">
        <strong>Administrator Login</strong>
        Enter your credentials to access the DeftSpace admin panel.
      </div>
    </div>
    ${error ? '<div class="error-box">⚠️ The username or password is incorrect. Please try again.</div>' : ''}
    <form method="POST" action="/admin/login">
      <div class="form-group">
        <label for="username">User name:</label>
        <input type="text" id="username" name="username" autocomplete="username" required>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" autocomplete="current-password" required>
      </div>
      <div class="btn-row">
        <button type="submit" class="xp-btn xp-btn-default">Log On</button>
        <button type="button" class="xp-btn" onclick="window.location='/'">Cancel</button>
      </div>
    </form>
  </div>
  <div class="footer-bar">
    <span><a href="/">← Back to DeftSpace</a></span>
    <span>🔒 Secure Login</span>
  </div>
</div>
</body>
</html>`;
}

module.exports = router;
