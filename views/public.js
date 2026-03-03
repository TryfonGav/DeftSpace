const XP_CSS = require('./xp-css');

module.exports = function getPublicSiteHTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>DeftSpace – My Personal Page</title>
<style>
${XP_CSS}

/* ─── PAGE LAYOUT ─── */
.desktop { min-height: calc(100vh - 30px); padding: 8px 8px 8px 80px; }
.desktop-icons {
  position: fixed; top: 8px; left: 6px;
  display: flex; flex-direction: column; gap: 4px; z-index: 50;
}
.main-layout { display: grid; grid-template-columns: 200px 1fr 200px; gap: 0; }

/* Explorer address row */
.xp-address-row { display: flex; align-items: center; gap: 5px; padding: 2px 6px; font-size:11px; background: linear-gradient(180deg,#f5f3ec 0%,#e8e4d8 100%); border-bottom: 1px solid #a8a090; }

/* Right detail col */
.right-col { background: #f0eee0; border-left: 1px solid #a8a090; padding-bottom: 10px; }
.right-section-title { background: linear-gradient(180deg,#2050b0 0%,#1030a0 100%); color:#fff; font-size:11px; font-weight:bold; padding:4px 8px; }
.right-body { padding: 6px 8px; font-size: 10px; color: #444; line-height: 1.85; }

/* Search */
.xp-search-row { display:flex; gap:4px; padding:5px 8px; background: linear-gradient(180deg,#f5f3ec 0%,#e8e4d8 100%); border-bottom:1px solid #d4d0c8; align-items:center; }
.xp-search-input { flex:1; }

/* Feed */
.feed-scroll { max-height: 68vh; overflow-y: auto; padding: 8px; background: #fff; }

/* Music list table */
.music-table { width:100%; border-collapse:collapse; font-size:11px; }
.music-table th { background: linear-gradient(180deg,#cadaf5 0%,#b4c8e8 100%); padding:4px 8px; text-align:left; font-weight:bold; border-bottom:1px solid #88a8d0; }
.music-table td { padding:4px 8px; border-bottom:1px solid #f0ece0; }
.music-table tr:hover td { background:#f0f5ff; }

/* Visitor counter */
.xp-counter {
  font-family: 'Courier New', monospace; font-size: 20px;
  color: #cc0000; background: #ece9d8;
  border: 2px inset #888; padding: 3px 8px;
  letter-spacing: 4px; text-align: center;
  display: block;
}

/* Profile card in detail pane */
.profile-card { text-align:center; padding:10px 6px; }
.profile-avatar { font-size:52px; display:block; margin-bottom:6px; }
.profile-name { font-size:13px; font-weight:bold; color:#00006f; }
.profile-mood { font-size:10px; color:#666; margin-top:3px; }
.online-dot { display:inline-block; width:8px; height:8px; background:#00bb44; border-radius:50%; border:1px solid #008830; animation: pulse 2s infinite; margin-right:3px; }
@keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.6;transform:scale(0.9)} }

/* ─── NOTIFICATION BELL ─── */
.notif-bell { position:relative; cursor:pointer; font-size:14px; user-select:none; }
.notif-badge {
  position:absolute; top:-6px; right:-8px;
  background:#cc0000; color:#fff; font-size:8px; font-weight:bold;
  min-width:14px; height:14px; line-height:14px;
  text-align:center; border-radius:7px; padding:0 3px;
  display:none; border:1px solid #900;
}
.notif-badge.visible { display:block; animation: badge-pop 0.3s ease; }
@keyframes badge-pop { 0%{transform:scale(0)} 50%{transform:scale(1.3)} 100%{transform:scale(1)} }

/* Notification panel */
.notif-panel {
  position:fixed; bottom:36px; right:6px;
  width:320px; max-height:400px;
  z-index:9999; display:none;
}
.notif-panel.visible { display:flex; flex-direction:column; }
.notif-panel-body {
  flex:1; overflow-y:auto; background:#fff;
  border:1px solid #a8a090; border-top:none;
  max-height:340px;
}
.notif-item {
  display:flex; gap:6px; padding:6px 8px;
  border-bottom:1px solid #f0ece0;
  font-size:11px; cursor:default;
  transition:background 0.1s;
}
.notif-item:hover { background:#f5f8ff; }
.notif-item.unread { background:#eef5ff; }
.notif-item-icon { font-size:16px; flex-shrink:0; }
.notif-item-content { flex:1; min-width:0; }
.notif-item-title { font-weight:bold; color:#00006f; }
.notif-item-msg { color:#555; margin-top:1px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.notif-item-time { font-size:9px; color:#999; margin-top:2px; }
.notif-empty { padding:20px; text-align:center; color:#999; font-size:11px; }
.notif-panel-footer {
  background:linear-gradient(180deg,#f5f3ec 0%,#e8e4d8 100%);
  border:1px solid #a8a090; border-top:1px solid #d4d0c8;
  padding:4px 8px; text-align:center;
  font-size:10px;
}

/* ─── MOBILE RESPONSIVE ─── */
@media (max-width: 768px) {
  /* Desktop icons → horizontal top bar */
  .desktop-icons {
    position: relative !important;
    top: 0; left: 0;
    flex-direction: row !important;
    gap: 2px;
    justify-content: center;
    padding: 6px 4px;
    background: rgba(0,0,0,0.15);
    border-radius: 4px;
    margin-bottom: 6px;
    flex-wrap: wrap;
  }
  .xp-desktop-icon { width: 54px; padding: 3px; }
  .xp-desktop-icon-img { font-size: 24px; }
  .xp-desktop-icon-label { font-size: 8px; }

  /* Desktop area — remove left padding */
  .desktop { padding: 6px !important; }

  /* Main window — remove Winamp margin */
  .xp-window { margin-right: 0 !important; }

  /* 3-col layout → single column */
  .main-layout {
    grid-template-columns: 1fr !important;
    gap: 0;
  }

  /* Hide task pane on mobile (use desktop icons instead) */
  .xp-taskpane { display: none; }

  /* Right detail column → full width at bottom */
  .right-col {
    border-left: none;
    border-top: 1px solid #a8a090;
  }

  /* Feed scroll — more height on mobile */
  .feed-scroll { max-height: none; overflow-y: visible; }

  /* Winamp → below desktop icons, full width */
  #winamp-float {
    position: relative !important;
    top: 0 !important; right: 0 !important;
    width: 100% !important;
    margin-bottom: 6px;
    display: none;
  }
  #winamp-float.mobile-visible { display: block; }

  /* Photo grid — 2 columns */
  .xp-photo-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 6px; }

  /* Hide menu bar items to save space */
  .xp-menubar { display: none; }

  /* Toolbar wraps */
  .xp-toolbar { flex-wrap: wrap; gap: 2px; padding: 2px 3px; }
  .xp-toolbar-btn { padding: 3px 6px; font-size: 10px; }
  .xp-toolbar-sep { display: none; }

  /* Titlebar text smaller */
  .xp-titlebar-text { font-size: 10px; }

  /* Post cards */
  .xp-post-header { flex-direction: column; align-items: flex-start; gap: 2px; }
  .xp-post-meta { margin-left: 0; }

  /* Taskbar */
  .xp-taskbar { height: 36px; }
  .xp-start-btn { font-size: 11px; padding: 2px 10px 2px 8px; }
  .xp-taskbar-apps { display: none; }
  .xp-systray { font-size: 9px; padding: 0 6px; }

  /* Balloon notifications */
  .xp-balloon { bottom: 44px; right: 6px; left: 6px; max-width: none; }

  /* Notification panel mobile */
  .notif-panel { left:6px; right:6px; width:auto; bottom:42px; }

  /* Lightbox */
  .xp-lightbox-body img { max-width: 95vw; max-height: 60vh; }

  /* Music table */
  .music-table { font-size: 10px; }
  .music-table th, .music-table td { padding: 3px 4px; }

  /* Address bar */
  .xp-address-row { font-size: 10px; }
  .xp-address-input { font-size: 10px; }
}

/* Small phones */
@media (max-width: 420px) {
  .xp-desktop-icon { width: 48px; }
  .xp-desktop-icon-img { font-size: 20px; }
  .xp-photo-grid { grid-template-columns: repeat(2, 1fr) !important; }
  .xp-toolbar-btn { font-size: 9px; padding: 2px 4px; }
  .profile-avatar { font-size: 36px; }
}
</style>

</head>
<body>

<!-- DESKTOP ICONS -->
<div class="desktop-icons">
  <div class="xp-desktop-icon" onclick="scrollToTab('blog')">
    <div class="xp-desktop-icon-img">📝</div>
    <div class="xp-desktop-icon-label">My Blog</div>
  </div>
  <div class="xp-desktop-icon" onclick="scrollToTab('photos')">
    <div class="xp-desktop-icon-img">🖼️</div>
    <div class="xp-desktop-icon-label">My Photos</div>
  </div>
  <div class="xp-desktop-icon" onclick="scrollToTab('music')">
    <div class="xp-desktop-icon-img">🎵</div>
    <div class="xp-desktop-icon-label">My Music</div>
  </div>
  <div class="xp-desktop-icon" onclick="location.href='/admin/login'">
    <div class="xp-desktop-icon-img">🔐</div>
    <div class="xp-desktop-icon-label">Admin</div>
  </div>
  <div class="xp-desktop-icon" onclick="togglePlayer()">
    <div class="xp-desktop-icon-img">🎧</div>
    <div class="xp-desktop-icon-label">Winamp</div>
  </div>
</div>

<!-- DESKTOP AREA -->
<div class="desktop">

  <!-- WINAMP (floating, top-right) -->
  <div id="winamp-float" style="position:fixed;top:8px;right:8px;z-index:60;width:218px;">
    <div class="wa-window">
      <div class="wa-titlebar">
        <div class="wa-title-text">WINAMP 2.91</div>
        <div class="wa-title-btns">
          <div class="wa-title-btn wa-title-btn-min" title="Minimize" onclick="togglePlayer()"></div>
          <div class="wa-title-btn wa-title-btn-close" title="Close" onclick="togglePlayer()"></div>
        </div>
      </div>
      <div class="wa-display">
        <div class="wa-eq-bar" id="wa-eq">
          ${Array.from({ length: 18 }, (_, i) => `<div class="wa-eq-col" id="eq${i}" style="height:${Math.floor(Math.random() * 12) + 2}px"></div>`).join('')}
        </div>
        <div class="wa-track-display" id="wa-title">NO TRACK LOADED</div>
        <div class="wa-time-display" id="wa-time">0:00</div>
        <div class="wa-sub-display">
          <span class="wa-bitrate" id="wa-bitrate">--- kbps</span>
          <span class="wa-khz">44 kHz  STEREO</span>
        </div>
        <div class="wa-seek-row">
          <span class="wa-seek-label">SEEK</span>
          <div class="wa-seek-bar" id="wa-seek" onclick="seekAudio(event)">
            <div class="wa-seek-fill" id="wa-seek-fill"></div>
            <div class="wa-seek-handle" id="wa-seek-handle"></div>
          </div>
          <span class="wa-seek-label">VOL</span>
          <div class="wa-vol-bar" onclick="setVol(event)">
            <div class="wa-vol-fill" id="wa-vol-fill"></div>
          </div>
        </div>
      </div>
      <div class="wa-controls">
        <button class="wa-btn" onclick="prevTrack()" title="Previous">|◀</button>
        <button class="wa-btn" onclick="audioRewind()" title="Rewind">◀◀</button>
        <button class="wa-btn" id="wa-play-btn" onclick="togglePlay()" title="Play/Pause">▶</button>
        <button class="wa-btn" onclick="audioFfwd()" title="Fast Forward">▶▶</button>
        <button class="wa-btn" onclick="stopAudio()" title="Stop">■</button>
        <button class="wa-btn" onclick="nextTrack()" title="Next">▶|</button>
      </div>
      <div class="wa-playlist" id="wa-playlist">
        <div style="padding:4px 6px;font-size:9px;color:#506028">Loading playlist...</div>
      </div>
      <div class="wa-reactions" id="wa-reactions" style="display:none">
        <span class="wa-react-label" id="wa-react-label">Track</span>
        <button class="wa-react-btn" id="wa-like-btn" onclick="reactTrack('like')">♥ <span id="wa-likes">0</span></button>
        <button class="wa-react-btn" id="wa-dislike-btn" onclick="reactTrack('dislike')">✕ <span id="wa-dislikes">0</span></button>
      </div>
    </div>
  </div>

  <!-- MAIN INTERNET EXPLORER WINDOW -->
  <div class="xp-window" style="margin-right:226px;min-height:calc(100vh - 48px);display:flex;flex-direction:column;">

    <!-- Titlebar -->
    <div class="xp-titlebar">
      <div class="xp-titlebar-left">
        <span class="xp-titlebar-icon">🌐</span>
        <span class="xp-titlebar-text">DeftSpace – My Personal Page - Windows Internet Explorer</span>
      </div>
      <div class="xp-titlebar-btns">
        <div class="xp-tbtn xp-tbtn-min">─</div>
        <div class="xp-tbtn xp-tbtn-max">□</div>
        <div class="xp-tbtn xp-tbtn-close">✕</div>
      </div>
    </div>

    <!-- Menu bar -->
    <div class="xp-menubar">
      <a class="xp-menu-item" href="#">File</a>
      <a class="xp-menu-item" href="#">Edit</a>
      <a class="xp-menu-item" href="#">View</a>
      <a class="xp-menu-item" href="#">Favorites</a>
      <a class="xp-menu-item" href="#">Tools</a>
      <a class="xp-menu-item" href="#">Help</a>
    </div>

    <!-- Toolbar -->
    <div class="xp-toolbar">
      <button class="xp-toolbar-btn" onclick="history.back()">◀ Back</button>
      <button class="xp-toolbar-btn" onclick="history.forward()">Forward ▶</button>
      <button class="xp-toolbar-btn" onclick="location.reload()">↻ Refresh</button>
      <button class="xp-toolbar-btn" onclick="location.href='/'">🏠 Home</button>
      <div class="xp-toolbar-sep"></div>
      <button class="xp-toolbar-btn" onclick="togglePlayer()">🎵 Winamp</button>
      <div class="xp-toolbar-sep"></div>
      <button class="xp-toolbar-btn" onclick="location.href='/admin/login'">🔐 Admin</button>
    </div>

    <!-- Address bar -->
    <div class="xp-address-row">
      <span style="font-weight:bold">Address</span>
      <input class="xp-address-input xp-input" style="flex:1;padding:1px 4px" value="http://deftspace.net/home" readonly>
      <button class="xp-go-btn">Go</button>
      <span>🔒</span>
    </div>

    <!-- 3-col layout -->
    <div class="main-layout" style="flex:1;">

      <!-- LEFT: Task Pane -->
      <div class="xp-taskpane" style="min-height:100%">
        <div class="xp-taskpane-section">
          <div class="xp-taskpane-header" onclick="toggleTaskPane(this)">
            <span>📁 My Pages</span><span id="tp1-arrow">▼</span>
          </div>
          <div class="xp-taskpane-body" id="tp1-body">
            <div class="xp-task-link" onclick="scrollToTab('blog')"><span class="xp-task-link-icon">📝</span>Blog Posts</div>
            <div class="xp-task-link" onclick="scrollToTab('photos')"><span class="xp-task-link-icon">🖼️</span>Photo Gallery</div>
            <div class="xp-task-link" onclick="scrollToTab('music')"><span class="xp-task-link-icon">🎵</span>Music</div>
          </div>
        </div>
        <div class="xp-taskpane-section">
          <div class="xp-taskpane-header" onclick="toggleTaskPane(this)">
            <span>🌐 Other Places</span><span>▼</span>
          </div>
          <div class="xp-taskpane-body">
            <div class="xp-task-link" onclick="location.href='/admin/login'"><span class="xp-task-link-icon">🔐</span>Admin Login</div>
          </div>
        </div>
        <div class="xp-taskpane-section">
          <div class="xp-taskpane-header" onclick="toggleTaskPane(this)">
            <span>ℹ️ Details</span><span>▼</span>
          </div>
          <div class="xp-taskpane-body">
            <div class="profile-card">
              <span class="profile-avatar">👤</span>
              <div class="profile-name">DeftSpace</div>
              <div class="profile-mood" id="profile-mood">Mood: chillin'</div>
              <div style="margin-top:5px;font-size:10px"><span class="online-dot"></span>Online Now</div>
            </div>
            <hr class="xp-hr">
            <div style="font-size:10px;padding:0 2px">
              <div class="xp-list-row" style="padding:2px 0;border:none">📝 <span style="flex:1">Posts:</span> <b id="stat-posts">—</b></div>
              <div class="xp-list-row" style="padding:2px 0;border:none">🖼️ <span style="flex:1">Photos:</span> <b id="stat-photos">—</b></div>
              <div class="xp-list-row" style="padding:2px 0;border:none">🎵 <span style="flex:1">Tracks:</span> <b id="stat-tracks">—</b></div>
            </div>
          </div>
        </div>
        <div class="xp-taskpane-section" style="margin-top:4px">
          <div class="xp-taskpane-header" onclick="toggleTaskPane(this)">
            <span>👥 Visitors</span><span>▼</span>
          </div>
          <div class="xp-taskpane-body">
            <span class="xp-counter" id="xp-counter">000000</span>
            <div style="font-size:9px;color:#555;text-align:center;margin-top:3px">visits since 2005</div>
          </div>
        </div>
      </div>

      <!-- CENTER: Tabs + Content -->
      <div style="display:flex;flex-direction:column;min-height:100%;">

        <!-- Tab strip -->
        <div class="xp-tab-strip" id="center-tabs">
          <div class="xp-tab active" onclick="showTab('blog',this)">📝 Blog</div>
          <div class="xp-tab" onclick="showTab('photos',this)">🖼️ Photos</div>
          <div class="xp-tab" onclick="showTab('music',this)">🎵 Music</div>
        </div>

        <!-- Search bar -->
        <div class="xp-search-row">
          <input class="xp-input xp-search-input" id="search-box" placeholder="🔍 Search posts and content..." oninput="doSearch()">
          <button class="xp-btn xp-btn-sm" onclick="doSearch()">Find</button>
          <button class="xp-btn xp-btn-sm" onclick="clearSearch()">✕</button>
        </div>

        <!-- BLOG -->
        <div class="tab-pane active" id="tab-blog">
          <div class="feed-scroll" id="posts-feed">
            <div class="loading-state">Loading posts…</div>
          </div>
        </div>

        <!-- PHOTOS -->
        <div class="tab-pane" id="tab-photos">
          <div style="padding:5px 8px;background:#f5f3ec;border-bottom:1px solid #d4d0c8;font-size:10px;color:#555;">
            <span id="photo-count">0</span> photo(s) — Click a photo to view full size
          </div>
          <div class="xp-photo-grid" id="photo-grid">
            <div class="loading-state" style="grid-column:1/-1">Loading photos…</div>
          </div>
        </div>

        <!-- MUSIC -->
        <div class="tab-pane" id="tab-music">
          <div style="padding:8px;background:#fff;">
            <div style="background:#cadaf5;border:1px solid #88a8d0;padding:6px 10px;font-size:11px;color:#00006f;margin-bottom:8px;display:flex;align-items:center;gap:8px;">
              <span style="font-size:18px">🎵</span>
              <span><strong>Music Library</strong> — Use the Winamp player (top right) to listen. Click ▶ Play to load a track.</span>
            </div>
            <div id="music-list"><div class="loading-state">Loading music…</div></div>
          </div>
        </div>
      </div>

      <!-- RIGHT: Details -->
      <div class="right-col">
        <div class="right-section-title">📋 Page Info</div>
        <div class="right-body" id="page-info">Loading…</div>
        <div class="right-section-title">🎵 Now Playing</div>
        <div class="right-body" id="now-playing">
          <div style="color:#aaa">Nothing playing yet.<br>Select a track to begin.</div>
        </div>
        <div class="right-section-title">📅 Latest Update</div>
        <div class="right-body" id="latest-update">Loading…</div>
        <div class="right-section-title">💬 About</div>
        <div class="right-body" style="color:#666">
          <div>Personal CMS &amp; portfolio hub.</div>
          <hr class="xp-hr">
          <div>Best viewed in Internet Explorer 6 at 1024×768</div>
          <hr class="xp-hr">
          <div style="color:#aaa">© DeftSpace 2005</div>
        </div>
      </div>

    </div><!-- /main-layout -->

    <!-- Status bar -->
    <div class="xp-statusbar">
      <div class="xp-statusbar-pane" id="status-left" style="flex:1">Done</div>
      <div class="xp-statusbar-pane" id="status-count">0 items</div>
      <div class="xp-statusbar-pane">🔒 Internet</div>
    </div>
  </div><!-- /xp-window -->

</div><!-- /desktop -->

<!-- TASKBAR -->
<div class="xp-taskbar">
  <button class="xp-start-btn" onclick="showBalloon('Start Menu','ti psaxneis edw prala?')">
    <span style="font-size:16px">⊞</span> start
  </button>
  <div class="xp-taskbar-sep"></div>
  <div class="xp-taskbar-apps">
    <div class="xp-taskbar-app active">🌐 DeftSpace – My Personal Page</div>
    <div class="xp-taskbar-app" id="taskbar-winamp" onclick="togglePlayer()">🎵 Winamp</div>
  </div>
  <div class="xp-systray">
    <span title="Notifications" class="notif-bell" id="notif-bell" onclick="toggleNotifPanel()">🔔<span class="notif-badge" id="notif-badge">0</span></span>
    <span title="Volume">🔊</span>
    <span title="Network">🌐</span>
    <span id="systray-clock">12:00 PM</span>
  </div>
</div>

<!-- NOTIFICATION PANEL -->
<div class="notif-panel" id="notif-panel">
  <div class="xp-titlebar">
    <div class="xp-titlebar-left">
      <span class="xp-titlebar-icon">🔔</span>
      <span class="xp-titlebar-text">Notifications</span>
    </div>
    <div class="xp-titlebar-btns">
      <div class="xp-tbtn xp-tbtn-close" onclick="toggleNotifPanel()">✕</div>
    </div>
  </div>
  <div class="notif-panel-body" id="notif-list">
    <div class="notif-empty">No notifications yet.</div>
  </div>
  <div class="notif-panel-footer">
    <button class="xp-btn xp-btn-sm" onclick="clearNotifications()">Clear All</button>
    <span id="notif-perm-status" style="margin-left:8px;color:#888"></span>
  </div>
</div>

<!-- LIGHTBOX -->
<div class="xp-lightbox" id="lightbox" onclick="if(event.target===this)closeLightbox()">
  <div class="xp-lightbox-frame">
    <div class="xp-titlebar">
      <div class="xp-titlebar-left">
        <span class="xp-titlebar-icon">🖼️</span>
        <span class="xp-titlebar-text">Windows Picture and Fax Viewer</span>
      </div>
      <div class="xp-titlebar-btns">
        <div class="xp-tbtn xp-tbtn-close" onclick="closeLightbox()">✕</div>
      </div>
    </div>
    <div class="xp-lightbox-body">
      <img id="lightbox-img" src="" alt="" style="max-width:78vw;max-height:65vh;display:block;">
    </div>
    <div class="xp-lightbox-caption" id="lightbox-caption"></div>
    <div class="xp-lightbox-footer">
      <button class="xp-btn xp-btn-sm" onclick="closeLightbox()">Close</button>
    </div>
  </div>
</div>

<!-- BALLOON -->
<div class="xp-balloon" id="balloon">
  <div class="xp-balloon-title">
    <span id="balloon-icon">ℹ️</span>
    <span id="balloon-title">DeftSpace</span>
    <span class="xp-balloon-close" onclick="closeBalloon()">✕</span>
  </div>
  <div id="balloon-msg"></div>
</div>

<audio id="audio-el"></audio>

<script>
// ═══════════════════════════════════════
//  STATE
// ═══════════════════════════════════════
let posts=[], images=[], tracks=[];
let currentIdx=-1, isPlaying=false;
const audio = document.getElementById('audio-el');
let eqTimer=null, balloonTimer=null;
let notifTimer=null, notifData=[], notifPanelOpen=false;

const rp = () => JSON.parse(localStorage.getItem('ds_rp')||'{}');
const ri = () => JSON.parse(localStorage.getItem('ds_ri')||'{}');
const rt = () => JSON.parse(localStorage.getItem('ds_rt')||'{}');
const svrp = v => localStorage.setItem('ds_rp', JSON.stringify(v));
const svri = v => localStorage.setItem('ds_ri', JSON.stringify(v));
const svrt = v => localStorage.setItem('ds_rt', JSON.stringify(v));

// ═══════════════════════════════════════
//  INIT
// ═══════════════════════════════════════
async function init() {
  tickClock();
  setInterval(tickClock, 1000);
  bumpCounter();
  await Promise.all([loadPosts(), loadImages(), loadTracks()]);
  refreshPageInfo();
  refreshLatestUpdate();
  initNotifications();
  setTimeout(() => showBalloon('👋 Welcome!', 'Thanks for visiting DeftSpace!'), 1800);
}

function tickClock() {
  const n=new Date(), h=n.getHours()%12||12, m=String(n.getMinutes()).padStart(2,'0');
  document.getElementById('systray-clock').textContent = h+':'+m+' '+(n.getHours()>=12?'PM':'AM');
}

async function bumpCounter() {
  try {
    let res;
    if (!sessionStorage.getItem('ds_visited')) {
      res = await fetch('/api/visitors/bump', { method: 'POST' });
      sessionStorage.setItem('ds_visited', 'true');
    } else {
      res = await fetch('/api/visitors/count');
    }
    const data = await res.json();
    document.getElementById('xp-counter').textContent = String(data.count).padStart(6,'0');
  } catch(e) {
    console.error('Visitor count error:', e);
  }
}

// ═══════════════════════════════════════
//  TABS
// ═══════════════════════════════════════
function showTab(name, el) {
  document.querySelectorAll('.tab-pane').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('#center-tabs .xp-tab').forEach(t=>t.classList.remove('active'));
  document.getElementById('tab-'+name).classList.add('active');
  if(el) el.classList.add('active');
  setStatus('Viewing: '+name);
}
function scrollToTab(name) {
  const tabs=document.getElementById('center-tabs');
  const t=[...tabs.querySelectorAll('.xp-tab')].find(x=>x.textContent.toLowerCase().includes(name==='blog'?'blog':name==='photos'?'photo':'music'));
  if(t) showTab(name,t);
  window.scrollTo({top:0,behavior:'smooth'});
}
function toggleTaskPane(header) {
  const body=header.nextElementSibling;
  const arrow=header.querySelector('span:last-child');
  const collapsed=body.style.display==='none';
  body.style.display=collapsed?'':'none';
  arrow.textContent=collapsed?'▼':'▶';
}

// ═══════════════════════════════════════
//  POSTS
// ═══════════════════════════════════════
async function loadPosts() {
  try {
    posts = await (await fetch('/api/posts')).json();
    renderPosts(posts);
    document.getElementById('stat-posts').textContent=posts.length;
    document.getElementById('status-count').textContent=posts.length+' items';
    if(posts[0]) document.getElementById('profile-mood').textContent='Mood: '+(posts[0].mood||'chillin\\'');
  } catch(e) {
    document.getElementById('posts-feed').innerHTML='<div class="empty-state">Could not load posts.</div>';
  }
}

function renderPosts(list) {
  const feed=document.getElementById('posts-feed');
  if(!list.length){feed.innerHTML='<div class="empty-state">No posts yet. Check back soon!</div>';return;}
  const reacted=rp();
  feed.innerHTML=list.map(p=>{
    const r=reacted[p._id];
    const date=new Date(p.createdAt).toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
    return \`<div class="xp-post" id="post-\${p._id}">
      <div class="xp-post-header">
        <span class="xp-post-title">📝 \${esc(p.title)}</span>
        <span class="xp-post-meta">\${date}</span>
      </div>
      <div class="xp-post-body">
        <div style="margin-bottom:8px"><span class="xp-mood-tag">😊 Mood: \${esc(p.mood||'chillin')}</span></div>
        <div>\${linkifyAndEsc(p.content).replace(/\\n/g,'<br>')}</div>
      </div>
      <div class="xp-post-footer">
        <span style="font-size:10px;color:#666;flex:1">Was this helpful?</span>
        <button class="xp-btn xp-btn-sm \${r==='like'?'xp-btn-default':''}" onclick="\${r==='like'?'unreactPost':'reactPost'}('\${p._id}','like')" \${r&&r!=='like'?'disabled':''}>
          👍 Yes&nbsp;(<span id="pl-\${p._id}">\${p.likes}</span>)
        </button>
        <button class="xp-btn xp-btn-sm \${r==='dislike'?'xp-btn-danger':''}" onclick="\${r==='dislike'?'unreactPost':'reactPost'}('\${p._id}','dislike')" \${r&&r!=='dislike'?'disabled':''}>
          👎 No&nbsp;(<span id="pd-\${p._id}">\${p.dislikes}</span>)
        </button>
      </div>
    </div>\`;
  }).join('');
}

async function reactPost(id, type) {
  const reacted=rp(); if(reacted[id]) return;
  const d=await (await fetch('/api/posts/'+id+'/'+type,{method:'POST'})).json();
  reacted[id]=type; svrp(reacted);
  posts=posts.map(p=>p._id===id?{...p,likes:d.likes,dislikes:d.dislikes}:p);
  renderPosts(posts);
  showBalloon('✔ Reaction saved','Thanks for your feedback!','ℹ️');
}

async function unreactPost(id, type) {
  const reacted=rp(); if(!reacted[id]) return;
  const d=await (await fetch('/api/posts/'+id+'/remove/'+type,{method:'POST'})).json();
  delete reacted[id]; svrp(reacted);
  posts=posts.map(p=>p._id===id?{...p,likes:d.likes,dislikes:d.dislikes}:p);
  renderPosts(posts);
  showBalloon('↩ Reaction removed','You can react again anytime!','ℹ️');
}

function doSearch() {
  const q=document.getElementById('search-box').value.trim().toLowerCase();
  renderPosts(q?posts.filter(p=>p.title.toLowerCase().includes(q)||p.content.toLowerCase().includes(q)):posts);
}
function clearSearch(){document.getElementById('search-box').value='';renderPosts(posts);}

// ═══════════════════════════════════════
//  IMAGES
// ═══════════════════════════════════════
async function loadImages() {
  try {
    images=await (await fetch('/api/images')).json();
    renderGallery();
    document.getElementById('stat-photos').textContent=images.length;
    document.getElementById('photo-count').textContent=images.length;
  } catch(e) {
    document.getElementById('photo-grid').innerHTML='<div class="empty-state" style="grid-column:1/-1">Could not load photos.</div>';
  }
}

function renderGallery() {
  const grid=document.getElementById('photo-grid');
  if(!images.length){grid.innerHTML='<div class="empty-state" style="grid-column:1/-1">No photos yet.</div>';return;}
  const reacted=ri();
  grid.innerHTML=images.map(img=>{
    const r=reacted[img._id];
    return \`<div class="xp-photo-item">
      <img src="\${img.path}" alt="\${esc(img.caption)}" loading="lazy" decoding="async" onclick="openLightbox('\${img.path}','\${esc(img.caption)}')" title="Click to enlarge">
      <div class="xp-photo-caption">\${esc(img.caption)||'(no caption)'}</div>
      <div class="xp-photo-reactions">
        <button class="xp-photo-react" onclick="\${r==='like'?'unreactImg':'reactImg'}('\${img._id}','like')" \${r&&r!=='like'?'disabled':''}
          style="\${r==='like'?'border-color:#316ac5;background:linear-gradient(180deg,#dce8ff 0%,#b8ccf8 100%)':''}">
          👍 <span id="il-\${img._id}">\${img.likes}</span>
        </button>
        <button class="xp-photo-react" onclick="\${r==='dislike'?'unreactImg':'reactImg'}('\${img._id}','dislike')" \${r&&r!=='dislike'?'disabled':''}
          style="\${r==='dislike'?'border-color:#b04040;background:linear-gradient(180deg,#ffe8e8 0%,#f0c0c0 100%)':''}">
          👎 <span id="id-\${img._id}">\${img.dislikes}</span>
        </button>
      </div>
    </div>\`;
  }).join('');
}

async function reactImg(id, type) {
  const reacted=ri(); if(reacted[id]) return;
  const d=await (await fetch('/api/images/'+id+'/'+type,{method:'POST'})).json();
  reacted[id]=type; svri(reacted);
  images=images.map(i=>i._id===id?{...i,likes:d.likes,dislikes:d.dislikes}:i);
  renderGallery();
  showBalloon('✔ Reaction saved','Thanks!','ℹ️');
}

async function unreactImg(id, type) {
  const reacted=ri(); if(!reacted[id]) return;
  const d=await (await fetch('/api/images/'+id+'/remove/'+type,{method:'POST'})).json();
  delete reacted[id]; svri(reacted);
  images=images.map(i=>i._id===id?{...i,likes:d.likes,dislikes:d.dislikes}:i);
  renderGallery();
  showBalloon('↩ Reaction removed','You can react again anytime!','ℹ️');
}

function openLightbox(src, cap) {
  document.getElementById('lightbox-img').src=src;
  document.getElementById('lightbox-caption').textContent=cap||'';
  document.getElementById('lightbox').classList.add('active');
}
function closeLightbox(){document.getElementById('lightbox').classList.remove('active');}

// ═══════════════════════════════════════
//  TRACKS
// ═══════════════════════════════════════
async function loadTracks() {
  try {
    tracks=await (await fetch('/api/tracks')).json();
    renderPlaylist(); renderMusicList();
    document.getElementById('stat-tracks').textContent=tracks.length;
    if(tracks.length) loadTrack(0,false);
  } catch(e) {
    document.getElementById('wa-playlist').innerHTML='<div style="padding:4px 6px;font-size:9px;color:#666">No tracks.</div>';
  }
}

function renderPlaylist() {
  const pl=document.getElementById('wa-playlist');
  if(!tracks.length){pl.innerHTML='<div style="padding:4px 6px;font-size:9px;color:#666">Empty playlist</div>';return;}
  pl.innerHTML=tracks.map((t,i)=>\`
    <div class="wa-pl-item \${i===currentIdx?'active':''}" id="wa-pl-\${i}" onclick="loadTrack(\${i},true)">
      <span class="wa-pl-num">\${String(i+1).padStart(2,'0')}</span>
      <span style="flex:1;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">\${esc(t.title)}</span>
      <span style="color:#304010;font-size:8px;\${i===currentIdx?'color:#90c030':''}">\${t.playCount||0}▶</span>
    </div>
  \`).join('');
}

function renderMusicList() {
  const el=document.getElementById('music-list');
  if(!tracks.length){el.innerHTML='<div class="empty-state">No tracks uploaded yet.</div>';return;}
  el.innerHTML=\`<table class="music-table">
    <tr><th>#</th><th>Title</th><th>Artist</th><th>Plays</th><th>Reactions</th><th></th></tr>
    \${tracks.map((t,i)=>\`<tr>
      <td style="color:#888">\${i+1}</td>
      <td><strong>\${esc(t.title)}</strong></td>
      <td style="color:#666">\${esc(t.artist||'Unknown')}</td>
      <td style="color:#316ac5;font-weight:bold">\${t.playCount||0}</td>
      <td><span style="color:#316ac5">♥\${t.likes}</span> <span style="color:#999">✕\${t.dislikes}</span></td>
      <td><button class="xp-btn xp-btn-sm" onclick="loadTrack(\${i},true)">▶ Play</button></td>
    </tr>\`).join('')}
  </table>\`;
}

function loadTrack(idx, autoplay) {
  if(idx<0||idx>=tracks.length) return;
  currentIdx=idx;
  const t=tracks[idx];
  audio.src=t.path;
  document.getElementById('wa-title').textContent=t.title.toUpperCase();
  document.getElementById('wa-time').textContent='0:00';
  document.getElementById('wa-seek-fill').style.width='0%';
  document.getElementById('wa-seek-handle').style.left='0%';
  document.getElementById('wa-bitrate').textContent='128 kbps';
  document.getElementById('wa-reactions').style.display='flex';
  document.getElementById('wa-react-label').textContent=t.title.substring(0,18)+(t.title.length>18?'…':'');
  document.getElementById('wa-likes').textContent=t.likes;
  document.getElementById('wa-dislikes').textContent=t.dislikes;
  const r=rt()[t._id];
  const lb=document.getElementById('wa-like-btn'), db=document.getElementById('wa-dislike-btn');
  lb.disabled=!!(r&&r!=='like'); db.disabled=!!(r&&r!=='dislike');
  lb.className='wa-react-btn'+(r==='like'?' liked':'');
  db.className='wa-react-btn'+(r==='dislike'?' disliked':'');
  lb.onclick=r==='like'?()=>unreactTrack('like'):()=>reactTrack('like');
  db.onclick=r==='dislike'?()=>unreactTrack('dislike'):()=>reactTrack('dislike');
  renderPlaylist();
  document.getElementById('now-playing').innerHTML=\`
    <div style="font-weight:bold;color:#00006f">\${esc(t.title)}</div>
    <div style="color:#666;font-size:10px">\${esc(t.artist||'Unknown Artist')}</div>
    <div style="margin-top:5px"><div class="xp-progress-bar"><div class="xp-progress-fill" id="np-prog" style="width:0%"></div></div></div>
    <div style="font-size:10px;color:#888;margin-top:3px">\${t.playCount||0} plays</div>
  \`;
  if(autoplay) {
    audio.play().then(()=>{isPlaying=true;document.getElementById('wa-play-btn').textContent='⏸';document.getElementById('wa-play-btn').classList.add('playing');startEQ();});
    fetch('/api/tracks/'+t._id+'/play',{method:'POST'}).catch(()=>{});
  }
}

function togglePlay() {
  if(!tracks.length) return;
  if(currentIdx===-1){loadTrack(0,true);return;}
  if(isPlaying){
    audio.pause();isPlaying=false;
    document.getElementById('wa-play-btn').textContent='▶';
    document.getElementById('wa-play-btn').classList.remove('playing');
    stopEQ();
  } else {
    audio.play().then(()=>{
      isPlaying=true;document.getElementById('wa-play-btn').textContent='⏸';document.getElementById('wa-play-btn').classList.add('playing');startEQ();
      fetch('/api/tracks/'+tracks[currentIdx]._id+'/play',{method:'POST'}).catch(()=>{});
    });
  }
}
function stopAudio(){audio.pause();audio.currentTime=0;isPlaying=false;document.getElementById('wa-play-btn').textContent='▶';document.getElementById('wa-play-btn').classList.remove('playing');document.getElementById('wa-time').textContent='0:00';document.getElementById('wa-seek-fill').style.width='0%';document.getElementById('wa-seek-handle').style.left='0%';stopEQ();}
function nextTrack(){if(tracks.length)loadTrack((currentIdx+1)%tracks.length,true);}
function prevTrack(){if(tracks.length)loadTrack((currentIdx-1+tracks.length)%tracks.length,true);}
function audioRewind(){audio.currentTime=Math.max(0,audio.currentTime-10);}
function audioFfwd(){audio.currentTime=Math.min(audio.duration||0,audio.currentTime+10);}
function seekAudio(e){if(!audio.duration)return;const r=document.getElementById('wa-seek').getBoundingClientRect();audio.currentTime=Math.max(0,Math.min(1,(e.clientX-r.left)/r.width))*audio.duration;}
function setVol(e){const r=e.currentTarget.getBoundingClientRect();const p=Math.max(0,Math.min(1,(e.clientX-r.left)/r.width));audio.volume=p;document.getElementById('wa-vol-fill').style.width=(p*100)+'%';}

audio.addEventListener('timeupdate',()=>{
  const t=fmt(audio.currentTime);
  document.getElementById('wa-time').textContent=t;
  if(audio.duration){
    const p=((audio.currentTime/audio.duration)*100).toFixed(1)+'%';
    document.getElementById('wa-seek-fill').style.width=p;
    document.getElementById('wa-seek-handle').style.left=p;
    const np=document.getElementById('np-prog');if(np)np.style.width=p;
  }
});
audio.addEventListener('ended',nextTrack);

function fmt(s){if(!s||isNaN(s))return'0:00';return Math.floor(s/60)+':'+String(Math.floor(s%60)).padStart(2,'0');}

function startEQ(){if(eqTimer)return;eqTimer=setInterval(()=>{for(let i=0;i<18;i++){const e=document.getElementById('eq'+i);if(e)e.style.height=(Math.random()*14+2)+'px';}},110);}
function stopEQ(){clearInterval(eqTimer);eqTimer=null;for(let i=0;i<18;i++){const e=document.getElementById('eq'+i);if(e)e.style.height='2px';}}

async function reactTrack(type) {
  if(currentIdx===-1)return;
  const t=tracks[currentIdx];const reacted=rt();if(reacted[t._id])return;
  const d=await(await fetch('/api/tracks/'+t._id+'/'+type,{method:'POST'})).json();
  document.getElementById('wa-likes').textContent=d.likes;
  document.getElementById('wa-dislikes').textContent=d.dislikes;
  reacted[t._id]=type;svrt(reacted);
  tracks=tracks.map(tr=>tr._id===t._id?{...tr,likes:d.likes,dislikes:d.dislikes}:tr);
  const lb=document.getElementById('wa-like-btn'), db=document.getElementById('wa-dislike-btn');
  lb.disabled=type!=='like'; db.disabled=type!=='dislike';
  lb.className='wa-react-btn'+(type==='like'?' liked':'');
  db.className='wa-react-btn'+(type==='dislike'?' disliked':'');
  lb.onclick=type==='like'?()=>unreactTrack('like'):()=>reactTrack('like');
  db.onclick=type==='dislike'?()=>unreactTrack('dislike'):()=>reactTrack('dislike');
  showBalloon('✔ Reaction saved',type==='like'?'Glad you liked it! ♥':'Thanks for the feedback!','ℹ️');
}

async function unreactTrack(type) {
  if(currentIdx===-1)return;
  const t=tracks[currentIdx];const reacted=rt();if(!reacted[t._id])return;
  const d=await(await fetch('/api/tracks/'+t._id+'/remove/'+type,{method:'POST'})).json();
  delete reacted[t._id];svrt(reacted);
  tracks=tracks.map(tr=>tr._id===t._id?{...tr,likes:d.likes,dislikes:d.dislikes}:tr);
  document.getElementById('wa-likes').textContent=d.likes;
  document.getElementById('wa-dislikes').textContent=d.dislikes;
  const lb=document.getElementById('wa-like-btn'), db=document.getElementById('wa-dislike-btn');
  lb.disabled=db.disabled=false;
  lb.className='wa-react-btn'; db.className='wa-react-btn';
  lb.onclick=()=>reactTrack('like'); db.onclick=()=>reactTrack('dislike');
  showBalloon('↩ Reaction removed','You can react again anytime!','ℹ️');
}

// ═══════════════════════════════════════
//  RIGHT PANEL INFO
// ═══════════════════════════════════════
function refreshPageInfo() {
  const totalLikes=[...posts,...images,...tracks].reduce((a,x)=>a+(x.likes||0),0);
  document.getElementById('page-info').innerHTML=\`
    <div class="xp-list-row" style="border:none;padding:2px 0">📝 <span style="flex:1">Posts</span><b>\${posts.length}</b></div>
    <div class="xp-list-row" style="border:none;padding:2px 0">🖼️ <span style="flex:1">Photos</span><b>\${images.length}</b></div>
    <div class="xp-list-row" style="border:none;padding:2px 0">🎵 <span style="flex:1">Tracks</span><b>\${tracks.length}</b></div>
    <hr class="xp-hr">
    <div class="xp-list-row" style="border:none;padding:2px 0">❤️ <span style="flex:1">Total Likes</span><b style="color:#316ac5">\${totalLikes}</b></div>
  \`;
}

function refreshLatestUpdate() {
  const items=[
    ...posts.slice(0,2).map(p=>({icon:'📝',text:p.title,date:p.createdAt})),
    ...tracks.slice(0,2).map(t=>({icon:'🎵',text:t.title,date:t.createdAt})),
    ...images.slice(0,2).map(i=>({icon:'🖼️',text:i.caption||'Photo',date:i.createdAt}))
  ].sort((a,b)=>new Date(b.date)-new Date(a.date)).slice(0,4);
  document.getElementById('latest-update').innerHTML=items.map(x=>\`
    <div style="display:flex;gap:4px;margin-bottom:4px">
      <span>\${x.icon}</span>
      <span>\${esc(x.text.substring(0,24))}\${x.text.length>24?'…':''}</span>
    </div>
  \`).join('')||'<div style="color:#aaa">No activity yet</div>';
}

// ═══════════════════════════════════════
//  BALLOON
// ═══════════════════════════════════════
function showBalloon(title, msg, icon='ℹ️') {
  document.getElementById('balloon-icon').textContent=icon;
  document.getElementById('balloon-title').textContent=title;
  document.getElementById('balloon-msg').textContent=msg;
  document.getElementById('balloon').classList.add('visible');
  clearTimeout(balloonTimer);
  balloonTimer=setTimeout(closeBalloon,3800);
}
function closeBalloon(){document.getElementById('balloon').classList.remove('visible');}
function setStatus(m){document.getElementById('status-left').textContent=m;}

// ═══════════════════════════════════════
//  PLAYER VISIBILITY
// ═══════════════════════════════════════
function togglePlayer(){
  const w=document.getElementById('winamp-float');
  const isMobile=window.innerWidth<=768;
  if(isMobile){
    w.classList.toggle('mobile-visible');
  } else {
    const hidden=w.style.display==='none';
    w.style.display=hidden?'':'none';
    const main=document.querySelector('.xp-window[style*="margin-right"]');
    if(main) main.style.marginRight=hidden?'226px':'8px';
  }
  const tb=document.getElementById('taskbar-winamp');
  if(tb) tb.classList.toggle('active');
}

// ═══════════════════════════════════════
//  UTIL
// ═══════════════════════════════════════
function esc(s){if(!s)return'';return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}

function linkifyAndEsc(s) {
  if (!s) return '';
  const parts = String(s).split(/(https?:\\/\\/[^\\s]+)/g);
  return parts.map((part, i) => {
    if (i % 2 === 1) {
      let url = part, trailing = '';
      const m = url.match(/([.,!?;:"']+)$/);
      if (m) { trailing = m[1]; url = url.slice(0, -trailing.length); }
      return '<a href="' + esc(url) + '" target="_blank" style="color:#0000ff;text-decoration:underline;">' + esc(url) + '</a>' + esc(trailing);
    }
    return esc(part);
  }).join('');
}

// ═══════════════════════════════════════
//  NOTIFICATIONS
// ═══════════════════════════════════════
function initNotifications() {
  updatePermStatus();
  // Register service worker and subscribe to push
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    navigator.serviceWorker.register('/sw.js').then(async reg => {
      console.log('SW registered');
      // Ask permission if not yet decided
      if (Notification.permission === 'default') {
        const perm = await Notification.requestPermission();
        updatePermStatus();
        if (perm !== 'granted') return;
      }
      if (Notification.permission === 'granted') {
        await subscribeToPush(reg);
      }
    }).catch(e => console.error('SW registration failed:', e));
  } else if ('Notification' in window && Notification.permission === 'default') {
    setTimeout(() => {
      Notification.requestPermission().then(updatePermStatus);
    }, 3000);
  }
  // Start polling for in-app notification panel
  pollNotifications();
  notifTimer = setInterval(pollNotifications, 30000);
}

async function subscribeToPush(reg) {
  try {
    const res = await fetch('/api/push/vapid-public-key');
    const { publicKey } = await res.json();
    if (!publicKey) return;
    const sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicKey)
    });
    await fetch('/api/push/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sub.toJSON())
    });
    console.log('Push subscription sent to server');
    updatePermStatus();
  } catch (e) {
    console.error('Push subscribe error:', e);
  }
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) outputArray[i] = rawData.charCodeAt(i);
  return outputArray;
}

function updatePermStatus() {
  const el = document.getElementById('notif-perm-status');
  if (!('Notification' in window)) {
    // Check if it's an iOS device
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    if (isIOS) {
      el.textContent = 'Add to Home Screen first';
      el.title = 'iOS requires you to Add to Home Screen to enable push notifications.';
    } else {
      el.textContent = 'Not supported';
    }
  } else if (Notification.permission === 'granted') {
    el.textContent = '\u2705 Push Active';
  } else if (Notification.permission === 'denied') {
    el.textContent = '\u274c Blocked';
  } else {
    el.textContent = 'Click \uD83D\uDD14 to enable';
  }
}

async function pollNotifications() {
  try {
    const res = await fetch('/api/notifications');
    const allNotifs = await res.json();
    
    // Find notifications created since our last check to show native popups/balloons
    let lastCheckStr = localStorage.getItem('ds_notif_last');
    // If first load, set last check to now so we don't spam 24h worth of old popups
    if (!lastCheckStr) { lastCheckStr = new Date().toISOString(); localStorage.setItem('ds_notif_last', lastCheckStr); }
    const lastCheck = new Date(lastCheckStr).getTime();
    const newNotifs = allNotifs.filter(n => new Date(n.createdAt).getTime() > lastCheck);
    
    if (newNotifs.length > 0) {
      localStorage.setItem('ds_notif_last', newNotifs[0].createdAt);
      
      const seenIds = JSON.parse(localStorage.getItem('ds_notif_seen') || '[]');
      let hasUnreadNew = false;
      
      newNotifs.forEach(n => {
        if (!seenIds.includes(n._id)) {
          hasUnreadNew = true;
          if ('Notification' in window && Notification.permission === 'granted') {
            try { new Notification(n.title, { body: n.message || '', icon: '\uD83D\uDD14', tag: n._id }); } catch(e) {}
          }
        }
      });
      
      if (hasUnreadNew) {
        const latest = newNotifs[0];
        showBalloon(latest.title, latest.message || 'Check it out!', '\uD83D\uDD14');
      }
    }
    
    // Sync local state completely with server so cleared notifications disappear
    notifData = allNotifs;
    
    updateNotifBadge();
    renderNotifPanel();
  } catch(e) {}
}

function updateNotifBadge(count) {
  const badge = document.getElementById('notif-badge');
  const seenIds = JSON.parse(localStorage.getItem('ds_notif_seen') || '[]');
  const total = notifData.filter(n => !seenIds.includes(n._id)).length;
  badge.textContent = total;
  badge.classList.toggle('visible', total > 0);
}

function renderNotifPanel() {
  const list = document.getElementById('notif-list');
  if (!notifData.length) {
    list.innerHTML = '<div class="notif-empty">No notifications yet.</div>';
    return;
  }
  const seenIds = JSON.parse(localStorage.getItem('ds_notif_seen') || '[]');
  const iconMap = {
    new_post: '\uD83D\uDCDD', updated_post: '\uD83D\uDCDD',
    new_image: '\uD83D\uDDBC\uFE0F', new_track: '\uD83C\uDFB5',
    updated_track: '\uD83C\uDFB5', custom: '\uD83D\uDCE3'
  };
  list.innerHTML = notifData.map(n => {
    const isUnread = !seenIds.includes(n._id);
    const icon = iconMap[n.type] || '\uD83D\uDD14';
    const ago = timeAgo(new Date(n.createdAt));
    return \`<div class="notif-item \${isUnread ? 'unread' : ''}">
      <span class="notif-item-icon">\${icon}</span>
      <div class="notif-item-content">
        <div class="notif-item-title">\${esc(n.title)}</div>
        <div class="notif-item-msg">\${esc(n.message)}</div>
        <div class="notif-item-time">\${ago}</div>
      </div>
    </div>\`;
  }).join('');
}

function toggleNotifPanel() {
  const panel = document.getElementById('notif-panel');
  notifPanelOpen = !notifPanelOpen;
  panel.classList.toggle('visible', notifPanelOpen);
  if (notifPanelOpen) {
    // Mark all as seen
    const seenIds = notifData.map(n => n._id);
    localStorage.setItem('ds_notif_seen', JSON.stringify(seenIds));
    updateNotifBadge(0);
    renderNotifPanel();
    // Request permission if not yet asked
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().then(updatePermStatus);
    }
  }
}

function clearNotifications() {
  notifData = [];
  localStorage.setItem('ds_notif_seen', '[]');
  updateNotifBadge(0);
  renderNotifPanel();
  toggleNotifPanel();
}

function timeAgo(date) {
  const s = Math.floor((Date.now() - date.getTime()) / 1000);
  if (s < 60) return 'just now';
  if (s < 3600) return Math.floor(s / 60) + 'm ago';
  if (s < 86400) return Math.floor(s / 3600) + 'h ago';
  return Math.floor(s / 86400) + 'd ago';
}

init();
</script>
</body>
</html>`;
};
