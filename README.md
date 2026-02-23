# 🌐 DeftSpace

A personal CMS and portfolio hub with a heavy Y2K / MySpace 2005 aesthetic.
https://deftspace.onrender.com/
## ✦ Features

- **Blog Posts** — Write text entries with mood tags
- **Photo Gallery** — Upload & display images with lightbox
- **Music Player** — Winamp-style persistent audio player with playlist
- **Like / Dislike** — Public visitors can react to all content without logging in
- **Admin Dashboard** — Secure admin panel to create, edit, and delete all content
- **Y2K Aesthetic** — Full MySpace-era styling with neon glows, Comic Sans, marquees, and tiled backgrounds

## ✦ Tech Stack

- **Backend:** Node.js + Express.js
- **Database:** MongoDB + Mongoose
- **Auth:** Session-based (express-session + connect-mongo)
- **Uploads:** Multer (local filesystem)
- **Frontend:** Vanilla HTML/CSS/JS

## ✦ Project Structure

\`\`\`
deftspace/
├── server.js                # Main Express server + HTML templates
├── package.json
├── .env.example             # Rename to .env and configure
├── models/
│   ├── User.js              # Admin user (bcrypt hashed password)
│   ├── Post.js              # Blog post (title, content, mood, likes, dislikes)
│   ├── Image.js             # Photo (path, caption, likes, dislikes)
│   └── Track.js             # Audio track (path, title, artist, likes, dislikes, playCount)
├── routes/
│   ├── auth.js              # Login / logout routes
│   └── api.js               # REST API for posts, images, tracks + reactions
├── middleware/
│   ├── auth.js              # requireAuth middleware
│   └── upload.js            # Multer config (images + audio)
└── public/
    └── uploads/
        ├── images/          # Uploaded images
        └── audio/           # Uploaded audio files
\`\`\`

## ✦ Setup

### 1. Prerequisites
- Node.js 18+
- MongoDB running locally (or provide a MongoDB Atlas URI)

### 2. Install dependencies
\`\`\`bash
cd deftspace
npm install
\`\`\`

### 3. Configure environment
\`\`\`bash
cp .env.example .env
\`\`\`

Edit `.env`:
\`\`\`
PORT=3000
MONGODB_URI=mongodb://localhost:27017/deftspace
SESSION_SECRET=your_super_secret_key_here
ADMIN_USERNAME=admin
ADMIN_PASSWORD=yourpassword
\`\`\`

### 4. Start the server
\`\`\`bash
npm start
# or for development with auto-reload:
npm run dev
\`\`\`

### 5. Open in browser
- **Public Site:** http://localhost:3000
- **Admin Login:** http://localhost:3000/admin/login
- **Admin Dashboard:** http://localhost:3000/admin/dashboard

## ✦ Default Admin Credentials
On first run, an admin user is automatically seeded from your `.env` values:
- Username: `admin` (or whatever you set)
- Password: `deftspace2025` (or whatever you set)

**Change these in `.env` before deploying!**

## ✦ API Endpoints

### Posts
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/posts` | No | Get all posts |
| POST | `/api/posts` | Yes | Create post |
| PUT | `/api/posts/:id` | Yes | Update post |
| DELETE | `/api/posts/:id` | Yes | Delete post |
| POST | `/api/posts/:id/like` | No | Like a post |
| POST | `/api/posts/:id/dislike` | No | Dislike a post |

### Images
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/images` | No | Get all images |
| POST | `/api/images` | Yes | Upload image (multipart) |
| PUT | `/api/images/:id` | Yes | Update caption |
| DELETE | `/api/images/:id` | Yes | Delete image |
| POST | `/api/images/:id/like` | No | Like an image |
| POST | `/api/images/:id/dislike` | No | Dislike an image |

### Tracks
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/tracks` | No | Get all tracks |
| POST | `/api/tracks` | Yes | Upload audio (multipart) |
| PUT | `/api/tracks/:id` | Yes | Update title/artist |
| DELETE | `/api/tracks/:id` | Yes | Delete track |
| POST | `/api/tracks/:id/play` | No | Increment play count |
| POST | `/api/tracks/:id/like` | No | Like a track |
| POST | `/api/tracks/:id/dislike` | No | Dislike a track |

## ✦ Notes

- Uploaded files are stored in `public/uploads/` and served statically
- Reactions (likes/dislikes) are stored in browser localStorage to prevent duplicate voting per device
- The Winamp-style music player persists in the left sidebar across the page
- File size limits: Images 10MB, Audio 50MB
- Audio formats supported: MP3, WAV, OGG, M4A
- Image formats supported: JPEG, PNG, GIF, WebP
