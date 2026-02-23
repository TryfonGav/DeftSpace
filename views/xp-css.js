module.exports = `
/* ── RESET ── */
*, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }

/* ── BLISS DESKTOP BACKGROUND ── */
body {
  background-color: #3a6ea5;
  background-image:
    radial-gradient(ellipse 120% 80% at 50% 100%, #4a9e3f 0%, #2e7d32 35%, transparent 70%),
    radial-gradient(ellipse 200% 60% at 50% 110%, #66bb6a 0%, transparent 50%),
    linear-gradient(180deg, #4fc3f7 0%, #81d4fa 18%, #b3e5fc 32%, #e1f5fe 42%, #fff9c4 48%, #ffffff 52%);
  font-family: Tahoma, Verdana, sans-serif;
  font-size: 11px;
  color: #000;
  min-height: 100vh;
}

/* ── SCROLLBAR ── */
::-webkit-scrollbar { width: 16px; height: 16px; }
::-webkit-scrollbar-track { background: #d4d0c8; border: 1px solid #b0aaa0; }
::-webkit-scrollbar-thumb { background: linear-gradient(to right, #e8e4dc, #c0bbb0, #d4d0c8); border: 1px solid #808080; }
::-webkit-scrollbar-button { background: #d4d0c8; border: 1px solid #808080; height: 16px; }

/* ── XP WINDOW ── */
.xp-window {
  background: #ece9d8;
  border: 2px solid;
  border-color: #ffffff #808080 #808080 #ffffff;
  border-radius: 6px 6px 0 0;
  box-shadow: 2px 2px 8px rgba(0,0,0,0.35), inset 1px 1px 0 rgba(255,255,255,0.9);
  overflow: hidden;
}

/* ── TITLEBAR ── */
.xp-titlebar {
  background: linear-gradient(180deg,
    #0a5fce 0%, #1470e0 5%, #1c7ef5 12%,
    #1270e8 45%, #0f6adf 55%,
    #0857cc 88%, #0050c8 93%, #003eb8 100%);
  padding: 4px 6px;
  display: flex; align-items: center; justify-content: space-between;
  height: 30px;
  border-radius: 5px 5px 0 0;
  position: relative;
  flex-shrink: 0;
}
.xp-titlebar::after {
  content:''; position:absolute; top:0; left:0; right:0; height:50%;
  background: linear-gradient(180deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.06) 100%);
  border-radius: 5px 5px 0 0; pointer-events: none;
}
.xp-titlebar-left { display:flex; align-items:center; gap:5px; flex:1; overflow:hidden; }
.xp-titlebar-icon { font-size:15px; flex-shrink:0; }
.xp-titlebar-text {
  font-size: 12px; font-weight: bold; color: #fff;
  text-shadow: 1px 1px 3px rgba(0,0,0,0.7);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  font-family: Tahoma, sans-serif; letter-spacing: 0.3px;
}
.xp-titlebar-btns { display:flex; gap:2px; flex-shrink:0; }
.xp-tbtn {
  width: 22px; height: 21px; border-radius: 3px;
  border: 1px solid rgba(0,0,0,0.5);
  font-size: 9px; font-weight: bold; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: filter 0.1s;
}
.xp-tbtn:active { filter: brightness(0.82); }
.xp-tbtn-min, .xp-tbtn-max {
  background: linear-gradient(180deg, #f0ece4 0%, #d8d4c8 50%, #c8c4b8 100%);
  color: #000;
}
.xp-tbtn-min:hover, .xp-tbtn-max:hover { background: linear-gradient(180deg, #dce8ff 0%, #b8ccf8 100%); }
.xp-tbtn-close {
  background: linear-gradient(180deg, #f06060 0%, #d83030 45%, #b82020 100%);
  color: #fff; font-size: 11px;
}
.xp-tbtn-close:hover { background: linear-gradient(180deg, #ff7070 0%, #ee3838 100%); }

/* ── MENU BAR ── */
.xp-menubar {
  background: linear-gradient(180deg, #f5f3ec 0%, #ece9d8 100%);
  border-bottom: 1px solid #a8a090;
  display: flex; align-items: center; padding: 0 2px; height: 22px;
}
.xp-menu-item {
  padding: 2px 8px; font-size: 11px; cursor: pointer;
  border-radius: 2px; color: #000; text-decoration: none;
  display: inline-block; height: 100%; line-height: 18px;
}
.xp-menu-item:hover { background: #316ac5; color: #fff; }

/* ── TOOLBAR ── */
.xp-toolbar {
  background: linear-gradient(180deg, #f0ece4 0%, #e0dcd0 100%);
  border-bottom: 1px solid #a8a090;
  padding: 3px 5px; display: flex; align-items: center; gap: 3px;
}
.xp-toolbar-btn {
  background: linear-gradient(180deg, #f5f3ec 0%, #dedad0 100%);
  border: 1px solid transparent; padding: 2px 10px;
  font-size: 11px; font-family: Tahoma, sans-serif; cursor: pointer;
  border-radius: 2px; display: flex; align-items: center; gap: 4px;
  transition: all 0.1s;
}
.xp-toolbar-btn:hover { border-color: #316ac5; background: linear-gradient(180deg, #dce8ff 0%, #c0d4f8 100%); }
.xp-toolbar-btn:active { background: linear-gradient(180deg, #b8ccf0 0%, #a0b8e0 100%); }
.xp-toolbar-sep { width: 1px; height: 20px; background: #a8a090; margin: 0 3px; }

/* ── ADDRESS BAR ── */
.xp-address-bar {
  background: linear-gradient(180deg, #f5f3ec 0%, #e8e4d8 100%);
  border-bottom: 1px solid #a8a090;
  padding: 2px 6px; display: flex; align-items: center; gap: 5px; font-size: 11px;
}
.xp-address-input {
  flex: 1; background: #fff; border: 1px solid #888;
  padding: 2px 5px; font-family: Tahoma,sans-serif; font-size: 11px;
  box-shadow: inset 1px 1px 2px rgba(0,0,0,0.1); outline: none;
}
.xp-address-input:focus { border-color: #316ac5; }
.xp-go-btn {
  background: linear-gradient(180deg, #f5f3ec 0%, #dedad0 100%);
  border: 1px solid #7b7978; padding: 2px 10px;
  font-size: 11px; font-family: Tahoma,sans-serif; cursor: pointer;
}
.xp-go-btn:hover { border-color:#316ac5; background: linear-gradient(180deg,#dce8ff 0%,#c0d4f8 100%); }

/* ── STATUS BAR ── */
.xp-statusbar {
  background: linear-gradient(180deg, #e8e4d8 0%, #d8d4c8 100%);
  border-top: 1px solid #a8a090;
  padding: 2px 6px; font-size: 10px; color: #444;
  display: flex; gap: 8px; align-items: center;
}
.xp-statusbar-pane {
  border: 1px solid; border-color: #888 #d4d0c8 #d4d0c8 #888;
  padding: 1px 6px; min-width: 60px;
}

/* ── BUTTON ── */
.xp-btn {
  background: linear-gradient(180deg, #f5f3ec 0%, #dedad0 60%, #c8c4b8 100%);
  border: 1px solid #7b7978; border-radius: 3px; padding: 4px 14px;
  font-size: 11px; font-family: Tahoma, sans-serif; cursor: pointer; color: #000;
  transition: all 0.1s; box-shadow: inset 0 1px 0 rgba(255,255,255,0.7);
  white-space: nowrap;
}
.xp-btn:hover { background: linear-gradient(180deg, #dce8ff 0%, #b8ccf8 60%, #a0b8e0 100%); border-color: #316ac5; }
.xp-btn:active { background: linear-gradient(180deg, #b0c4e8 0%, #9ab0d8 100%); box-shadow: inset 1px 1px 2px rgba(0,0,0,0.2); }
.xp-btn-default { border-color: #316ac5; background: linear-gradient(180deg, #dce8ff 0%, #b8ccf8 60%, #9ab0e0 100%); font-weight: bold; }
.xp-btn-danger { border-color: #b04040 !important; color: #700000 !important; }
.xp-btn-danger:hover { background: linear-gradient(180deg,#ffe8e8 0%,#f0c0c0 100%) !important; }
.xp-btn-sm { padding: 2px 8px; font-size: 10px; }

/* ── INPUT ── */
.xp-input {
  border: 1px solid #7b7978; padding: 3px 5px;
  font-family: Tahoma, sans-serif; font-size: 11px;
  background: #fff; width: 100%;
  box-shadow: inset 1px 1px 2px rgba(0,0,0,0.12); outline: none;
  border-radius: 0;
}
.xp-input:focus { border-color: #316ac5; box-shadow: inset 1px 1px 2px rgba(0,0,0,0.12), 0 0 0 1px rgba(49,106,197,0.3); }
.xp-textarea { resize: vertical; min-height: 80px; }

/* ── EXPLORER TASK PANE ── */
.xp-taskpane {
  background: linear-gradient(180deg, #cadaf5 0%, #b8ceee 100%);
  border-right: 1px solid #6888c0;
}
.xp-taskpane-section { margin-bottom: 2px; }
.xp-taskpane-header {
  background: linear-gradient(180deg, #2858b8 0%, #1848a8 100%);
  color: #fff; font-size: 11px; font-weight: bold;
  padding: 4px 8px; cursor: pointer;
  display: flex; justify-content: space-between; align-items: center;
  user-select: none;
}
.xp-taskpane-header:hover { background: linear-gradient(180deg, #3068c8 0%, #2058b8 100%); }
.xp-taskpane-body { background: rgba(255,255,255,0.45); padding: 5px 6px; }
.xp-task-link {
  display: flex; align-items: center; gap: 6px;
  padding: 3px 5px; color: #00006f; text-decoration: underline;
  font-size: 11px; cursor: pointer; border-radius: 2px; transition: background 0.1s;
}
.xp-task-link:hover { background: rgba(49,106,197,0.18); }
.xp-task-link-icon { font-size: 14px; }

/* ── GROUPBOX ── */
.xp-groupbox {
  border: 1px solid #a8a090; padding: 10px 8px 8px;
  margin-bottom: 10px; background: #fff; position: relative;
}
.xp-groupbox-title {
  position: absolute; top: -8px; left: 8px;
  background: #fff; padding: 0 4px;
  font-size: 11px; font-weight: bold; color: #000;
}

/* ── LIST ROW ── */
.xp-list-row {
  display: flex; align-items: center; padding: 3px 6px;
  border-bottom: 1px solid #f0ece0; gap: 8px; cursor: default;
  font-size: 11px;
}
.xp-list-row:hover { background: #dce8ff; }

/* ── PROGRESS BAR ── */
.xp-progress-bar {
  height: 14px; border: 1px solid #7b7978;
  background: #d4d0c8; overflow: hidden; border-radius: 1px;
}
.xp-progress-fill {
  height: 100%;
  background: repeating-linear-gradient(90deg, #316ac5 0px, #316ac5 9px, #5090e8 9px, #5090e8 11px);
  background-size: 22px 100%;
}
.xp-progress-fill.animated {
  animation: xp-progress-anim 1.2s linear infinite;
}
@keyframes xp-progress-anim { from{background-position:0 0} to{background-position:22px 0} }

/* ── TABS ── */
.xp-tab-strip {
  display: flex; background: #ece9d8;
  border-bottom: 2px solid #316ac5;
  padding: 4px 6px 0; gap: 2px;
}
.xp-tab {
  background: linear-gradient(180deg, #f5f3ec 0%, #dedad0 100%);
  border: 1px solid #a8a090; border-bottom: none;
  padding: 4px 14px; font-size: 11px; cursor: pointer;
  border-radius: 3px 3px 0 0; font-family: Tahoma, sans-serif;
  position: relative; bottom: -2px; transition: background 0.1s;
  user-select: none;
}
.xp-tab:hover { background: linear-gradient(180deg, #dce8ff 0%, #c0d4f8 100%); border-color: #316ac5; }
.xp-tab.active {
  background: #fff; border-color: #316ac5; border-bottom-color: #fff;
  bottom: -1px; font-weight: bold; z-index: 1;
}
.tab-pane { display: none; }
.tab-pane.active { display: block; }

/* ── MODAL ── */
.xp-modal-overlay {
  display: none; position: fixed; top:0;left:0;right:0;bottom:0;
  background: rgba(0,0,0,0.45); z-index:999;
  align-items: center; justify-content: center;
}
.xp-modal-overlay.active { display: flex; }
.xp-modal {
  background: #ece9d8; border: 2px solid;
  border-color: #ffffff #808080 #808080 #ffffff;
  border-radius: 6px 6px 0 0; overflow: hidden;
  width: 400px; max-width: 95vw;
  box-shadow: 4px 4px 16px rgba(0,0,0,0.45);
}
.xp-modal-body { padding: 14px; background: #fff; }
.xp-modal-footer {
  padding: 6px 10px; background: #ece9d8;
  border-top: 1px solid #a8a090; display: flex; gap: 6px; justify-content: flex-end;
}

/* ── TASKBAR ── */
.xp-taskbar {
  position: fixed; bottom:0;left:0;right:0; height: 30px;
  background: linear-gradient(180deg, #2464b0 0%, #1850a0 25%, #1446a0 70%, #1040a8 100%);
  border-top: 2px solid #4080d8; display: flex; align-items: center; z-index: 200;
  box-shadow: 0 -2px 6px rgba(0,0,0,0.35);
}
.xp-start-btn {
  background: linear-gradient(180deg, #6ab040 0%, #4a9020 30%, #3a7818 70%, #286010 100%);
  border: 1px solid; border-color: #90d060 #205010 #205010 #90d060;
  border-radius: 0 14px 14px 0; color: #fff; font-weight: bold; font-size: 13px;
  padding: 2px 16px 2px 10px; cursor: pointer; height: 26px; margin: 2px 4px 2px 2px;
  font-family: Tahoma, sans-serif; text-shadow: 1px 1px 2px rgba(0,0,0,0.45);
  display: flex; align-items: center; gap: 5px; transition: filter 0.1s;
}
.xp-start-btn:hover { filter: brightness(1.12); }
.xp-start-btn:active { filter: brightness(0.88); }
.xp-taskbar-sep { width:1px; height:22px; background: rgba(255,255,255,0.2); margin: 0 4px; }
.xp-taskbar-apps { display:flex; gap:2px; flex:1; padding:0 4px; overflow:hidden; }
.xp-taskbar-app {
  background: rgba(0,20,80,0.35);
  border: 1px solid; border-color: rgba(255,255,255,0.35) rgba(0,10,60,0.5) rgba(0,10,60,0.5) rgba(255,255,255,0.35);
  color: #fff; font-size: 11px; padding: 2px 10px; cursor: pointer;
  font-family: Tahoma, sans-serif; height: 22px;
  display: flex; align-items: center; gap: 4px;
  max-width: 160px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;
  transition: background 0.1s;
}
.xp-taskbar-app:hover { background: rgba(255,255,255,0.18); }
.xp-taskbar-app.active { background: rgba(0,10,50,0.55); border-color: rgba(0,10,60,0.5) rgba(255,255,255,0.35) rgba(255,255,255,0.35) rgba(0,10,60,0.5); }
.xp-systray {
  background: rgba(0,20,90,0.5); border: 1px solid rgba(255,255,255,0.15);
  height: 26px; margin: 2px 2px; padding: 0 8px;
  display: flex; align-items: center; gap: 6px; font-size: 10px; color: #fff;
}

/* ── DESKTOP ICON ── */
.xp-desktop-icon {
  display: inline-flex; flex-direction: column; align-items: center;
  gap: 3px; padding: 5px; cursor: pointer; border-radius: 3px;
  width: 68px; text-align: center; transition: background 0.1s;
}
.xp-desktop-icon:hover { background: rgba(49,106,197,0.35); }
.xp-desktop-icon:active { background: rgba(49,106,197,0.55); }
.xp-desktop-icon-img { font-size: 32px; }
.xp-desktop-icon-label {
  font-size: 10px; color: #fff;
  text-shadow: 1px 1px 3px rgba(0,0,0,0.9), -1px -1px 0 rgba(0,0,0,0.6);
  line-height: 1.3; word-break: break-word;
}

/* ── BALLOON NOTIFICATION ── */
.xp-balloon {
  position: fixed; bottom: 48px; right: 14px;
  background: #fffce0; border: 1px solid #c8a830;
  border-radius: 4px; padding: 8px 12px;
  font-size: 11px; max-width: 230px;
  box-shadow: 2px 2px 8px rgba(0,0,0,0.25); z-index: 300;
  display: none; animation: xp-balloon-in 0.25s ease;
}
.xp-balloon.visible { display: block; }
.xp-balloon-title { font-weight: bold; margin-bottom: 2px; display: flex; align-items: center; gap: 4px; }
.xp-balloon-close { margin-left:auto; cursor:pointer; color:#888; font-size:12px; }
.xp-balloon-close:hover { color:#000; }
.xp-balloon::after {
  content:''; position:absolute; bottom:-7px; right:18px;
  border: 7px solid transparent; border-top-color: #fffce0; border-bottom:none;
}
@keyframes xp-balloon-in { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }

/* ── MISC UTILITIES ── */
.form-row { margin-bottom: 8px; }
.form-row label { display:block; font-size:11px; font-weight:bold; margin-bottom:3px; color:#000; }
.xp-hr { border:none; border-top:1px solid #d4d0c8; margin:6px 0; }
.empty-state { padding:18px; text-align:center; color:#888; font-style:italic; font-size:11px; }
.loading-state { padding:18px; text-align:center; color:#316ac5; font-size:11px; }
.msg-box { padding:5px 8px; font-size:11px; border:1px solid; margin-bottom:8px; border-radius:1px; display:flex;align-items:center;gap:6px; }
.msg-ok  { background:#e8f8e8; border-color:#508050; color:#204020; }
.msg-err { background:#fce8e8; border-color:#b04040; color:#701818; }

/* ── PHOTO GRID ── */
.xp-photo-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(110px,1fr));
  gap: 8px; padding: 8px; background: #ece9d8;
}
.xp-photo-item {
  background: #fff; border: 1px solid #a8a090;
  padding: 4px 4px 8px;
  box-shadow: 2px 2px 5px rgba(0,0,0,0.18);
  cursor: pointer; transition: transform 0.12s, box-shadow 0.12s;
}
.xp-photo-item:hover { transform: scale(1.04); box-shadow: 3px 3px 9px rgba(0,0,0,0.28); border-color: #316ac5; }
.xp-photo-item img { width:100%; aspect-ratio:1; object-fit:cover; display:block; }
.xp-photo-caption { font-size:9px; color:#555; margin-top:4px; text-align:center; overflow:hidden; white-space:nowrap; text-overflow:ellipsis; }
.xp-photo-reactions { display:flex; gap:3px; margin-top:4px; }
.xp-photo-react {
  background: linear-gradient(180deg,#f5f3ec 0%,#dedad0 100%);
  border: 1px solid #7b7978; font-size:9px; padding:1px 5px;
  cursor:pointer; flex:1; text-align:center; border-radius:2px; transition:all 0.1s;
}
.xp-photo-react:hover { border-color:#316ac5; background:linear-gradient(180deg,#dce8ff 0%,#c0d4f8 100%); }
.xp-photo-react:disabled { opacity:0.6; cursor:default; }

/* ── BLOG POST CARD ── */
.xp-post {
  background: #fff; border: 1px solid #b0aaA0;
  margin-bottom: 10px; box-shadow: 1px 1px 4px rgba(0,0,0,0.1);
}
.xp-post-header {
  background: linear-gradient(180deg, #cadaf5 0%, #b4c8e8 100%);
  border-bottom: 1px solid #88a8d0; padding: 5px 10px;
  display: flex; justify-content: space-between; align-items: center;
}
.xp-post-title { font-size:13px; font-weight:bold; color:#00006f; }
.xp-post-meta { font-size:10px; color:#666; white-space:nowrap; margin-left:8px; }
.xp-post-body { padding: 10px 12px; font-size:11px; line-height:1.75; color:#111; }
.xp-post-footer {
  background: #f5f3ec; border-top:1px solid #d4d0c8;
  padding: 5px 10px; display:flex; align-items:center; gap:7px;
}
.xp-mood-tag {
  background: linear-gradient(180deg,#fffce0 0%,#f5f0b8 100%);
  border: 1px solid #c8a830; padding: 1px 7px; font-size:10px; color:#604010; border-radius:2px;
  display:inline-flex; align-items:center; gap:3px;
}

/* ── WINAMP ── */
.wa-window {
  background: #232323; border: 2px solid #606060;
  border-radius: 4px; box-shadow: 2px 2px 8px rgba(0,0,0,0.6);
  font-family: 'Courier New', monospace; overflow: hidden; user-select: none;
}
.wa-titlebar {
  background: linear-gradient(180deg, #555 0%, #2a2a2a 100%);
  padding: 3px 6px; display: flex; justify-content: space-between; align-items: center;
  border-bottom: 1px solid #606060;
}
.wa-title-text { font-size: 9px; color: #b0d060; letter-spacing: 1.5px; font-weight: bold; }
.wa-title-btns { display: flex; gap: 3px; }
.wa-title-btn { width: 10px; height: 10px; border-radius: 50%; border: 1px solid rgba(0,0,0,0.4); cursor: pointer; }
.wa-title-btn-close { background: #cc3333; }
.wa-title-btn-min { background: #ccaa00; }
.wa-display { background: #000; padding: 6px 8px; border-bottom: 1px solid #333; }
.wa-eq-bar { display:flex; gap:2px; height:16px; align-items:flex-end; margin-bottom:5px; }
.wa-eq-col { width:4px; background:linear-gradient(to top,#90a840,#b8d060,#d8f080); transition:height 0.1s; min-height:2px; border-radius:1px 1px 0 0; }
.wa-track-display { color:#b0d060; font-size:10px; letter-spacing:1px; overflow:hidden; white-space:nowrap; text-overflow:ellipsis; margin-bottom:3px; }
.wa-time-display { color:#b0d060; font-size:20px; letter-spacing:5px; }
.wa-sub-display { display:flex; justify-content:space-between; margin-top:2px; }
.wa-bitrate,.wa-khz { font-size:9px; color:#506028; letter-spacing:1px; }
.wa-seek-row { display:flex; align-items:center; gap:4px; margin-top:5px; }
.wa-seek-label { font-size:8px; color:#506028; width:22px; }
.wa-seek-bar { flex:1; height:8px; background:#0f2200; border:1px solid #2a4410; cursor:pointer; position:relative; border-radius:1px; }
.wa-seek-fill { height:100%; background:linear-gradient(to right,#507020,#b0d060); width:0%; border-radius:1px; }
.wa-seek-handle { position:absolute; top:50%; transform:translateY(-50%); width:5px; height:12px; background:linear-gradient(180deg,#d8f080 0%,#a8c040 100%); border:1px solid #608020; left:0%; margin-left:-2px; pointer-events:none; border-radius:1px; }
.wa-vol-bar { width:52px; height:8px; background:#001400; border:1px solid #1a3810; cursor:pointer; position:relative; border-radius:1px; }
.wa-vol-fill { height:100%; background:linear-gradient(to right,#405018,#b0d060); width:80%; }
.wa-controls { background:#2a2a2a; padding:4px 5px; display:flex; gap:3px; align-items:center; justify-content:center; border-bottom:1px solid #333; }
.wa-btn { background:linear-gradient(180deg,#5a5a5a 0%,#363636 100%); border:1px solid; border-color:#707070 #282828 #282828 #707070; color:#c8c8c8; padding:2px 5px; font-size:9px; cursor:pointer; font-family:Tahoma,sans-serif; font-weight:bold; min-width:25px; text-align:center; transition:all 0.1s; border-radius:1px; }
.wa-btn:hover { background:linear-gradient(180deg,#6a6a6a 0%,#464646 100%); color:#fff; }
.wa-btn:active { background:#2a2a2a; border-color:#282828 #707070 #707070 #282828; }
.wa-btn.playing { color:#b0d060; }
.wa-playlist { background:#000; max-height:108px; overflow-y:auto; border-bottom:1px solid #333; }
.wa-pl-item { padding:2px 6px; font-size:9px; font-family:Tahoma,sans-serif; color:#5a7030; cursor:pointer; display:flex; justify-content:space-between; transition:background 0.1s; border-bottom:1px solid #0c0c0c; }
.wa-pl-item:hover { background:#0c1c00; color:#b0d060; }
.wa-pl-item.active { background:#102800; color:#d0f060; }
.wa-pl-num { color:#304010; width:18px; text-align:right; flex-shrink:0; margin-right:5px; }
.wa-reactions { background:#1c1c1c; padding:4px 6px; display:flex; gap:5px; align-items:center; }
.wa-react-label { color:#404040; font-size:9px; flex:1; overflow:hidden; white-space:nowrap; text-overflow:ellipsis; }
.wa-react-btn { background:#282828; border:1px solid #444; color:#808080; padding:2px 8px; font-size:10px; cursor:pointer; font-family:Tahoma,sans-serif; transition:all 0.1s; }
.wa-react-btn:hover { border-color:#b0d060; color:#b0d060; }
.wa-react-btn.liked { border-color:#b0d060; color:#b0d060; background:#0f2200; }
.wa-react-btn.disliked { border-color:#cc4444; color:#cc4444; background:#200000; }
.wa-react-btn:disabled { opacity:0.5; cursor:default; }

/* ── LIGHTBOX ── */
.xp-lightbox { display:none; position:fixed; top:0;left:0;right:0;bottom:0; background:rgba(0,0,0,0.6); z-index:999; align-items:center; justify-content:center; flex-direction:column; }
.xp-lightbox.active { display:flex; }
.xp-lightbox-frame { background:#ece9d8; border:2px solid; border-color:#fff #808080 #808080 #fff; border-radius:6px 6px 0 0; overflow:hidden; max-width:90vw; box-shadow:4px 4px 20px rgba(0,0,0,0.5); }
.xp-lightbox-body { padding:8px; background:#fff; }
.xp-lightbox-body img { max-width:80vw; max-height:70vh; display:block; }
.xp-lightbox-caption { padding:4px 8px; font-size:11px; background:#ece9d8; border-top:1px solid #a8a090; }
.xp-lightbox-footer { background:#ece9d8; border-top:1px solid #a8a090; padding:4px 8px; display:flex; justify-content:flex-end; gap:4px; }
`;
