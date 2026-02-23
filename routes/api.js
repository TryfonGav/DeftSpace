const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const webpush = require('web-push');
const Post = require('../models/Post');
const Image = require('../models/Image');
const Track = require('../models/Track');
const Notification = require('../models/Notification');
const PushSubscription = require('../models/PushSubscription');
const { requireAuth } = require('../middleware/auth');
const { uploadImage, uploadAudio, cloudinary } = require('../middleware/upload');

// Configure Web Push
if (process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY) {
  webpush.setVapidDetails(
    process.env.VAPID_EMAIL || 'mailto:admin@deftspace.net',
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
  );
}

// Helper: send push to all subscribers
async function sendPushToAll(payload) {
  try {
    const subs = await PushSubscription.find();
    const results = await Promise.allSettled(
      subs.map(sub =>
        webpush.sendNotification(
          { endpoint: sub.endpoint, keys: { p256dh: sub.keys.p256dh, auth: sub.keys.auth } },
          JSON.stringify(payload)
        ).catch(async err => {
          // Remove expired/invalid subscriptions
          if (err.statusCode === 404 || err.statusCode === 410) {
            await PushSubscription.deleteOne({ endpoint: sub.endpoint });
          }
        })
      )
    );
    return results;
  } catch (e) {
    console.error('Push broadcast error:', e.message);
  }
}

const reactionLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  message: { error: 'Too many reactions. Please slow down.' },
  standardHeaders: true,
  legacyHeaders: false
});

// ===================== POSTS =====================

router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/posts', requireAuth, async (req, res) => {
  try {
    const { title, content, mood } = req.body;
    if (!title || !content || title.length > 200 || content.length > 10000) {
      return res.status(400).json({ error: 'Invalid input: title max 200 chars, content max 10000 chars' });
    }
    const post = await Post.create({ title: title.slice(0, 200), content: content.slice(0, 10000), mood: (mood || '').slice(0, 50) });
    await Notification.create({ type: 'new_post', title: '📝 New Blog Post', message: post.title });
    sendPushToAll({ title: '📝 New Blog Post', body: post.title, url: '/' });
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/posts/:id', requireAuth, async (req, res) => {
  try {
    const { title, content, mood } = req.body;
    const post = await Post.findByIdAndUpdate(req.params.id, {
      title: (title || '').slice(0, 200),
      content: (content || '').slice(0, 10000),
      mood: (mood || '').slice(0, 50),
      updatedAt: Date.now()
    }, { new: true });
    await Notification.create({ type: 'updated_post', title: '📝 Post Updated', message: post.title });
    sendPushToAll({ title: '📝 Post Updated', body: post.title, url: '/' });
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/posts/:id', requireAuth, async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/posts/:id/like', reactionLimiter, async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, { $inc: { likes: 1 } }, { new: true });
    res.json({ likes: post.likes, dislikes: post.dislikes });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/posts/:id/dislike', reactionLimiter, async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, { $inc: { dislikes: 1 } }, { new: true });
    res.json({ likes: post.likes, dislikes: post.dislikes });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/posts/:id/remove/:type', reactionLimiter, async (req, res) => {
  try {
    const type = req.params.type;
    if (!['like', 'dislike'].includes(type)) return res.status(400).json({ error: 'Invalid type' });
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Not found' });
    post[type + 's'] = Math.max(0, post[type + 's'] - 1);
    await post.save();
    res.json({ likes: post.likes, dislikes: post.dislikes });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ===================== IMAGES =====================

router.get('/images', async (req, res) => {
  try {
    const images = await Image.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/images', requireAuth, uploadImage.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const image = await Image.create({
      filename: req.file.originalname || req.file.filename,
      path: req.file.path,
      cloudinaryId: req.file.filename,
      caption: req.body.caption || ''
    });
    await Notification.create({ type: 'new_image', title: '🖼️ New Photo', message: image.caption || 'A new photo was added!' });
    sendPushToAll({ title: '🖼️ New Photo', body: image.caption || 'A new photo was added!', url: '/' });
    res.json(image);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/images/:id', requireAuth, async (req, res) => {
  try {
    const image = await Image.findByIdAndUpdate(req.params.id, { caption: req.body.caption }, { new: true });
    res.json(image);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/images/:id', requireAuth, async (req, res) => {
  try {
    const image = await Image.findByIdAndDelete(req.params.id);
    if (image && image.cloudinaryId) {
      await cloudinary.uploader.destroy(image.cloudinaryId).catch(() => { });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/images/:id/like', reactionLimiter, async (req, res) => {
  try {
    const image = await Image.findByIdAndUpdate(req.params.id, { $inc: { likes: 1 } }, { new: true });
    res.json({ likes: image.likes, dislikes: image.dislikes });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/images/:id/dislike', reactionLimiter, async (req, res) => {
  try {
    const image = await Image.findByIdAndUpdate(req.params.id, { $inc: { dislikes: 1 } }, { new: true });
    res.json({ likes: image.likes, dislikes: image.dislikes });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/images/:id/remove/:type', reactionLimiter, async (req, res) => {
  try {
    const type = req.params.type;
    if (!['like', 'dislike'].includes(type)) return res.status(400).json({ error: 'Invalid type' });
    const image = await Image.findById(req.params.id);
    if (!image) return res.status(404).json({ error: 'Not found' });
    image[type + 's'] = Math.max(0, image[type + 's'] - 1);
    await image.save();
    res.json({ likes: image.likes, dislikes: image.dislikes });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ===================== TRACKS =====================

router.get('/tracks', async (req, res) => {
  try {
    const tracks = await Track.find().sort({ createdAt: -1 });
    res.json(tracks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/tracks', requireAuth, uploadAudio.single('audio'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const track = await Track.create({
      filename: req.file.originalname || req.file.filename,
      path: req.file.path,
      cloudinaryId: req.file.filename,
      title: req.body.title || req.file.originalname,
      artist: req.body.artist || 'DeftSpace Artist'
    });
    await Notification.create({ type: 'new_track', title: '🎵 New Track', message: track.title });
    sendPushToAll({ title: '🎵 New Track', body: track.title, url: '/' });
    res.json(track);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/tracks/:id', requireAuth, async (req, res) => {
  try {
    const track = await Track.findByIdAndUpdate(req.params.id, { title: req.body.title, artist: req.body.artist }, { new: true });
    await Notification.create({ type: 'updated_track', title: '🎵 Track Updated', message: track.title });
    sendPushToAll({ title: '🎵 Track Updated', body: track.title, url: '/' });
    res.json(track);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/tracks/:id', requireAuth, async (req, res) => {
  try {
    const track = await Track.findByIdAndDelete(req.params.id);
    if (track && track.cloudinaryId) {
      await cloudinary.uploader.destroy(track.cloudinaryId, { resource_type: 'video' }).catch(() => { });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/tracks/:id/play', async (req, res) => {
  try {
    const track = await Track.findByIdAndUpdate(req.params.id, { $inc: { playCount: 1 } }, { new: true });
    res.json({ playCount: track.playCount });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/tracks/:id/like', reactionLimiter, async (req, res) => {
  try {
    const track = await Track.findByIdAndUpdate(req.params.id, { $inc: { likes: 1 } }, { new: true });
    res.json({ likes: track.likes, dislikes: track.dislikes });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/tracks/:id/dislike', reactionLimiter, async (req, res) => {
  try {
    const track = await Track.findByIdAndUpdate(req.params.id, { $inc: { dislikes: 1 } }, { new: true });
    res.json({ likes: track.likes, dislikes: track.dislikes });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/tracks/:id/remove/:type', reactionLimiter, async (req, res) => {
  try {
    const type = req.params.type;
    if (!['like', 'dislike'].includes(type)) return res.status(400).json({ error: 'Invalid type' });
    const track = await Track.findById(req.params.id);
    if (!track) return res.status(404).json({ error: 'Not found' });
    track[type + 's'] = Math.max(0, track[type + 's'] - 1);
    await track.save();
    res.json({ likes: track.likes, dislikes: track.dislikes });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ===================== NOTIFICATIONS =====================

router.get('/notifications', async (req, res) => {
  try {
    const since = req.query.since ? new Date(req.query.since) : new Date(Date.now() - 86400000);
    const notifications = await Notification.find({ createdAt: { $gt: since } }).sort({ createdAt: -1 }).limit(50);
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/notifications/custom', requireAuth, async (req, res) => {
  try {
    const { title, message } = req.body;
    if (!title || title.length > 200) {
      return res.status(400).json({ error: 'Title is required (max 200 chars)' });
    }
    const notification = await Notification.create({
      type: 'custom',
      title: title.slice(0, 200),
      message: (message || '').slice(0, 500)
    });
    sendPushToAll({ title: notification.title, body: notification.message, url: '/' });
    res.json(notification);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ===================== PUSH SUBSCRIPTION =====================

router.get('/push/vapid-public-key', (req, res) => {
  res.json({ publicKey: process.env.VAPID_PUBLIC_KEY || '' });
});

router.post('/push/subscribe', async (req, res) => {
  try {
    const { endpoint, keys } = req.body;
    if (!endpoint || !keys || !keys.p256dh || !keys.auth) {
      return res.status(400).json({ error: 'Invalid push subscription' });
    }
    await PushSubscription.findOneAndUpdate(
      { endpoint },
      { endpoint, keys: { p256dh: keys.p256dh, auth: keys.auth } },
      { upsert: true, new: true }
    );
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/push/unsubscribe', async (req, res) => {
  try {
    await PushSubscription.deleteOne({ endpoint: req.body.endpoint });
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/push/count', requireAuth, async (req, res) => {
  try {
    const count = await PushSubscription.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
