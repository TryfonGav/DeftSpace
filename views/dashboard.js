const XP_CSS = require('./xp-css');

module.exports = function getDashboardHTML(username) {
  const safeUser = String(username || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>DeftSpace Admin Dashboard</title>
<style>
${XP_CSS}
body { background: #3a6ea5; }
.shell { max-width: 980px; margin: 8px auto; padding-bottom: 40px; }
.stat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-bottom: 12px; }
.stat-card {
  background: linear-gradient(180deg, #cadaf5 0%, #b4c8e8 100%);
  border: 1px solid #88a8d0; padding: 10px;
  text-align: center; box-shadow: 1px 1px 3px rgba(0,0,0,0.1);
}
.stat-num { font-size: 28px; font-weight: bold; color: #00006f; font-family: Tahoma, sans-serif; }
.stat-lbl { font-size: 10px; color: #555; margin-top: 2px; text-transform: uppercase; letter-spacing: 1px; }
.admin-item {
  display:flex; align-items:flex-start; gap:8px;
  padding:5px 8px; border-bottom:1px solid #f0ece0; transition:background 0.06s;
}
.admin-item:hover { background: #f5f8ff; }
.admin-item-info { flex:1; min-width:0; }
.admin-item-title { font-size:11px; font-weight:bold; }
.admin-item-meta { font-size:10px; color:#777; margin-top:1px; }
.admin-item-actions { display:flex; gap:4px; flex-shrink:0; align-items:center; }
.admin-photo-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(128px,1fr)); gap:8px; padding:4px 0; }
.admin-photo-card { background:#fff; border:1px solid #a8a090; padding:4px 4px 6px; box-shadow:1px 1px 3px rgba(0,0,0,0.12); }
.admin-photo-card img { width:100%; aspect-ratio:1; object-fit:cover; display:block; margin-bottom:4px; }
.admin-photo-meta { font-size:9px; color:#666; margin-bottom:4px; overflow:hidden; white-space:nowrap; text-overflow:ellipsis; }
.admin-photo-actions { display:flex; gap:3px; }
@keyframes stripe-scroll { from{background-position:0 0} to{background-position:22px 0} }
.xp-progress-fill.running { animation: stripe-scroll 1.1s linear infinite; }
.two-col { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
.full-col { display:grid; grid-template-columns:1fr; }
</style>
</head>
<body>
<div class="shell">
<div class="xp-window" style="display:flex;flex-direction:column;min-height:calc(100vh - 50px)">

  <!-- Titlebar -->
  <div class="xp-titlebar">
    <div class="xp-titlebar-left">
      <span class="xp-titlebar-icon">⚙️</span>
      <span class="xp-titlebar-text">DeftSpace Admin Dashboard — ${safeUser} — Windows XP</span>
    </div>
    <div class="xp-titlebar-btns">
      <div class="xp-tbtn xp-tbtn-min">─</div>
      <div class="xp-tbtn xp-tbtn-max">□</div>
      <div class="xp-tbtn xp-tbtn-close" title="Logout" onclick="if(confirm('Log out?'))document.getElementById('lf').submit()">✕</div>
    </div>
  </div>

  <!-- Menu bar -->
  <div class="xp-menubar">
    <a class="xp-menu-item" href="/" target="_blank">🌐 View Site</a>
    <a class="xp-menu-item" href="#" onclick="document.getElementById('lf').submit()">🚪 Logout</a>
  </div>

  <!-- Toolbar -->
  <div class="xp-toolbar">
    <button class="xp-toolbar-btn" onclick="showTab('overview',this)">📊 Overview</button>
    <button class="xp-toolbar-btn" onclick="showTab('posts',this)">📝 Posts</button>
    <button class="xp-toolbar-btn" onclick="showTab('images',this)">🖼️ Images</button>
    <button class="xp-toolbar-btn" onclick="showTab('music',this)">🎵 Music</button>
    <button class="xp-toolbar-btn" onclick="showTab('notifs',this)">🔔 Notifications</button>
    <div class="xp-toolbar-sep"></div>
    <a class="xp-toolbar-btn" href="/" target="_blank" style="text-decoration:none">🌐 View Live Site</a>
  </div>

  <!-- Tab strip -->
  <div class="xp-tab-strip" id="admin-tabs">
    <div class="xp-tab active" onclick="showTab('overview',this)">📊 Overview</div>
    <div class="xp-tab" onclick="showTab('posts',this)">📝 Posts</div>
    <div class="xp-tab" onclick="showTab('images',this)">🖼️ Images</div>
    <div class="xp-tab" onclick="showTab('music',this)">🎵 Music</div>
    <div class="xp-tab" onclick="showTab('notifs',this)">🔔 Notifications</div>
  </div>

  <!-- OVERVIEW -->
  <div class="tab-pane active" id="tab-overview" style="padding:12px;background:#fff;flex:1">
    <div class="stat-grid">
      <div class="stat-card"><div class="stat-num" id="ov-p">—</div><div class="stat-lbl">Posts</div></div>
      <div class="stat-card"><div class="stat-num" id="ov-i">—</div><div class="stat-lbl">Images</div></div>
      <div class="stat-card"><div class="stat-num" id="ov-t">—</div><div class="stat-lbl">Tracks</div></div>
      <div class="stat-card"><div class="stat-num" id="ov-l">—</div><div class="stat-lbl">Total Likes</div></div>
    </div>
    <div class="two-col">
      <div class="xp-groupbox" style="max-height:250px;overflow-y:auto"><span class="xp-groupbox-title">Recent Posts</span><div id="ov-posts" style="padding-top:5px"></div></div>
      <div class="xp-groupbox" style="max-height:250px;overflow-y:auto"><span class="xp-groupbox-title">Top Tracks by Plays</span><div id="ov-tracks" style="padding-top:5px"></div></div>
    </div>
    <div class="xp-groupbox"><span class="xp-groupbox-title">Most Liked Content</span>
      <div id="ov-top-liked" style="padding-top:5px;display:grid;grid-template-columns:repeat(3,1fr);gap:6px"></div>
    </div>
  </div>

  <!-- POSTS -->
  <div class="tab-pane" id="tab-posts" style="padding:10px;background:#fff;flex:1">
    <div class="two-col">
      <div>
        <div class="xp-groupbox"><span class="xp-groupbox-title">New Blog Post</span>
          <div id="post-msg"></div>
          <div class="form-row"><label>Title</label><input class="xp-input" id="p-title" placeholder="Post title…"></div>
          <div class="form-row"><label>Mood</label><input class="xp-input" id="p-mood" value="chillin" placeholder="e.g. happy, bored, hyped…"></div>
          <div class="form-row"><label>Content</label><textarea class="xp-input xp-textarea" id="p-content" style="min-height:100px" placeholder="Write your post…"></textarea></div>
          <button class="xp-btn xp-btn-default" onclick="createPost()">📝 Publish Post</button>
        </div>
      </div>
      <div>
        <div class="xp-groupbox" style="max-height:440px;overflow-y:auto"><span class="xp-groupbox-title">All Posts (<span id="p-count">0</span>)</span>
          <div id="posts-list" style="padding-top:5px"></div>
        </div>
      </div>
    </div>
  </div>

  <!-- IMAGES -->
  <div class="tab-pane" id="tab-images" style="padding:10px;background:#fff;flex:1">
    <div class="xp-groupbox"><span class="xp-groupbox-title">Upload New Image</span>
      <div id="img-msg"></div>
      <div style="display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap">
        <div class="form-row" style="flex:1;min-width:160px;margin:0"><label>Image File</label><input class="xp-input" type="file" id="i-file" accept="image/*"></div>
        <div class="form-row" style="flex:1;min-width:160px;margin:0"><label>Caption</label><input class="xp-input" id="i-caption" placeholder="Optional caption…"></div>
        <button class="xp-btn xp-btn-default" onclick="uploadImg()">Upload 🖼️</button>
      </div>
    </div>
    <div class="xp-groupbox"><span class="xp-groupbox-title">All Images (<span id="i-count">0</span>)</span>
      <div class="admin-photo-grid" id="images-list"></div>
    </div>
  </div>

  <!-- MUSIC -->
  <div class="tab-pane" id="tab-music" style="padding:10px;background:#fff;flex:1">
    <div class="xp-groupbox"><span class="xp-groupbox-title">Upload New Track</span>
      <div id="track-msg"></div>
      <div style="display:grid;grid-template-columns:2fr 1fr 1fr auto;gap:8px;align-items:flex-end">
        <div class="form-row" style="margin:0"><label>Audio File (MP3/WAV/OGG/M4A)</label><input class="xp-input" type="file" id="t-file" accept="audio/*"></div>
        <div class="form-row" style="margin:0"><label>Title</label><input class="xp-input" id="t-title" placeholder="Track title…"></div>
        <div class="form-row" style="margin:0"><label>Artist</label><input class="xp-input" id="t-artist" placeholder="Artist name…"></div>
        <button class="xp-btn xp-btn-default" onclick="uploadTrack()">Upload 🎵</button>
      </div>
      <div id="t-progress" style="display:none;margin-top:8px">
        <div style="font-size:11px;margin-bottom:3px;color:#444">Uploading audio file, please wait…</div>
        <div class="xp-progress-bar"><div class="xp-progress-fill running" style="width:100%"></div></div>
      </div>
    </div>
    <div class="xp-groupbox"><span class="xp-groupbox-title">All Tracks (<span id="t-count">0</span>)</span>
      <div id="tracks-list"></div>
    </div>
  </div>

  <!-- NOTIFICATIONS -->
  <div class="tab-pane" id="tab-notifs" style="padding:10px;background:#fff;flex:1">
    <div class="two-col">
      <div>
        <div class="xp-groupbox"><span class="xp-groupbox-title">📣 Send Custom Notification</span>
          <div id="notif-msg"></div>
          <div class="form-row"><label>Title</label><input class="xp-input" id="n-title" placeholder="Notification title…" maxlength="200"></div>
          <div class="form-row"><label>Message</label><textarea class="xp-input xp-textarea" id="n-message" style="min-height:80px" placeholder="Notification message (optional)…" maxlength="500"></textarea></div>
          <button class="xp-btn xp-btn-default" onclick="sendCustomNotif()">🔔 Send Notification</button>
        </div>
      </div>
      <div>
        <div class="xp-groupbox" style="max-height:440px;overflow-y:auto;position:relative;">
          <span class="xp-groupbox-title">Recent Notifications (<span id="n-count">0</span>)</span>
          <button class="xp-btn" style="position:absolute;top:5px;right:10px;padding:2px 8px" onclick="clearAllNotifs()">Clear All</button>
          <div id="notifs-list" style="padding-top:24px"></div>
        </div>
      </div>
    </div>
  </div>

  <!-- Status bar -->
  <div class="xp-statusbar">
    <div class="xp-statusbar-pane" id="admin-status" style="flex:1">Ready</div>
    <div class="xp-statusbar-pane">👤 ${safeUser}</div>
    <div class="xp-statusbar-pane">⚙️ Admin Mode</div>
  </div>
</div>
</div>

<!-- EDIT MODALS -->
<div class="xp-modal-overlay" id="modal-post">
  <div class="xp-modal">
    <div class="xp-titlebar"><div class="xp-titlebar-left"><span class="xp-titlebar-icon">📝</span><span class="xp-titlebar-text">Edit Post</span></div><div class="xp-titlebar-btns"><div class="xp-tbtn xp-tbtn-close" onclick="closeModal('modal-post')">✕</div></div></div>
    <div class="xp-modal-body">
      <input type="hidden" id="ep-id">
      <div class="form-row"><label>Title</label><input class="xp-input" id="ep-title"></div>
      <div class="form-row"><label>Mood</label><input class="xp-input" id="ep-mood"></div>
      <div class="form-row"><label>Content</label><textarea class="xp-input xp-textarea" id="ep-content" style="min-height:120px"></textarea></div>
    </div>
    <div class="xp-modal-footer">
      <button class="xp-btn xp-btn-default" onclick="savePost()">Save Changes</button>
      <button class="xp-btn" onclick="closeModal('modal-post')">Cancel</button>
    </div>
  </div>
</div>

<div class="xp-modal-overlay" id="modal-track">
  <div class="xp-modal">
    <div class="xp-titlebar"><div class="xp-titlebar-left"><span class="xp-titlebar-icon">🎵</span><span class="xp-titlebar-text">Edit Track</span></div><div class="xp-titlebar-btns"><div class="xp-tbtn xp-tbtn-close" onclick="closeModal('modal-track')">✕</div></div></div>
    <div class="xp-modal-body">
      <input type="hidden" id="et-id">
      <div class="form-row"><label>Title</label><input class="xp-input" id="et-title"></div>
      <div class="form-row"><label>Artist</label><input class="xp-input" id="et-artist"></div>
    </div>
    <div class="xp-modal-footer">
      <button class="xp-btn xp-btn-default" onclick="saveTrack()">Save Changes</button>
      <button class="xp-btn" onclick="closeModal('modal-track')">Cancel</button>
    </div>
  </div>
</div>

<div class="xp-modal-overlay" id="modal-img">
  <div class="xp-modal">
    <div class="xp-titlebar"><div class="xp-titlebar-left"><span class="xp-titlebar-icon">🖼️</span><span class="xp-titlebar-text">Edit Image Caption</span></div><div class="xp-titlebar-btns"><div class="xp-tbtn xp-tbtn-close" onclick="closeModal('modal-img')">✕</div></div></div>
    <div class="xp-modal-body">
      <input type="hidden" id="ei-id">
      <div class="form-row"><label>Caption</label><input class="xp-input" id="ei-caption"></div>
    </div>
    <div class="xp-modal-footer">
      <button class="xp-btn xp-btn-default" onclick="saveImg()">Save Changes</button>
      <button class="xp-btn" onclick="closeModal('modal-img')">Cancel</button>
    </div>
  </div>
</div>

<form id="lf" method="POST" action="/admin/logout" style="display:none"></form>

<script>
let allPosts=[], allImages=[], allTracks=[];

async function init() {
  await Promise.all([loadPosts(),loadImages(),loadTracks(),loadNotifs()]);
  renderOverview();
}

// ── TABS ──
function showTab(name, el) {
  document.querySelectorAll('[id^="tab-"]').forEach(t=>t.classList.remove('active'));
  document.getElementById('tab-'+name).classList.add('active');
  document.querySelectorAll('#admin-tabs .xp-tab').forEach(t=>t.classList.remove('active'));
  if(el&&el.classList.contains('xp-tab')) el.classList.add('active');
  setStatus('Viewing: '+name);
}
function closeModal(id){document.getElementById(id).classList.remove('active');}
function esc(s){if(!s)return'';return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function setStatus(m){document.getElementById('admin-status').textContent=m;}
function showMsg(id,msg,type){
  const el=document.getElementById(id);
  el.innerHTML='<div class="msg-box '+(type==='ok'?'msg-ok':'msg-err')+'">'+(type==='ok'?'✔':'⚠')+' '+msg+'</div>';
  setTimeout(()=>el.innerHTML='',4500);
}

// ── OVERVIEW ──
function renderOverview() {
  document.getElementById('ov-p').textContent=allPosts.length;
  document.getElementById('ov-i').textContent=allImages.length;
  document.getElementById('ov-t').textContent=allTracks.length;
  const totalLikes=[...allPosts,...allImages,...allTracks].reduce((a,x)=>a+(x.likes||0),0);
  document.getElementById('ov-l').textContent=totalLikes;
  document.getElementById('ov-posts').innerHTML=allPosts.slice(0,6).map(p=>\`
    <div class="xp-list-row"><span>📝</span><span style="flex:1">\${esc(p.title)}</span><span style="font-size:10px;color:#888">♥\${p.likes}</span></div>
  \`).join('')||'<div class="empty-state">No posts yet</div>';
  document.getElementById('ov-tracks').innerHTML=[...allTracks].sort((a,b)=>b.playCount-a.playCount).slice(0,6).map(t=>\`
    <div class="xp-list-row"><span>🎵</span><span style="flex:1">\${esc(t.title)}</span><span style="font-size:10px;color:#316ac5">\${t.playCount||0}▶</span></div>
  \`).join('')||'<div class="empty-state">No tracks yet</div>';
  const allContent=[...allPosts.map(p=>({...p,type:'📝'})),...allImages.map(i=>({...i,type:'🖼️'})),...allTracks.map(t=>({...t,type:'🎵'}))];
  const topLiked=allContent.sort((a,b)=>b.likes-a.likes).slice(0,3);
  document.getElementById('ov-top-liked').innerHTML=topLiked.map(x=>\`
    <div class="xp-groupbox" style="margin:0"><span class="xp-groupbox-title">\${x.type} Top</span>
      <div style="padding-top:5px;font-size:11px;font-weight:bold">\${esc((x.title||x.caption||'Item').substring(0,22))}</div>
      <div style="font-size:10px;color:#888;margin-top:2px">♥ \${x.likes} likes</div>
    </div>
  \`).join('')||'<div class="empty-state" style="grid-column:1/-1">No content yet</div>';
}

// ── POSTS ──
async function loadPosts() {
  allPosts=await(await fetch('/api/posts')).json();
  document.getElementById('p-count').textContent=allPosts.length;
  document.getElementById('posts-list').innerHTML=allPosts.length
    ?allPosts.map(p=>\`<div class="admin-item">
      <div class="admin-item-info">
        <div class="admin-item-title">\${esc(p.title)}</div>
        <div class="admin-item-meta">\${new Date(p.createdAt).toLocaleDateString()} · Mood: \${esc(p.mood||'—')} · ♥\${p.likes} ✕\${p.dislikes}</div>
      </div>
      <div class="admin-item-actions">
        <button class="xp-btn xp-btn-sm" onclick="openEditPost('\${p._id}')">Edit</button>
        <button class="xp-btn xp-btn-sm xp-btn-danger" onclick="delPost('\${p._id}')">Delete</button>
      </div>
    </div>\`).join('')
    :'<div class="empty-state">No posts yet</div>';
}
async function createPost() {
  const title=document.getElementById('p-title').value.trim();
  const content=document.getElementById('p-content').value.trim();
  const mood=document.getElementById('p-mood').value.trim();
  if(!title||!content){showMsg('post-msg','Title and content are required.','err');return;}
  const res=await fetch('/api/posts',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({title,content,mood})});
  if(res.ok){showMsg('post-msg','Post published!','ok');document.getElementById('p-title').value='';document.getElementById('p-content').value='';document.getElementById('p-mood').value='chillin';await loadPosts();renderOverview();}
  else{const e=await res.json();showMsg('post-msg',e.error,'err');}
}
function openEditPost(id){
  const p=allPosts.find(x=>x._id===id);if(!p)return;
  document.getElementById('ep-id').value=p._id;
  document.getElementById('ep-title').value=p.title;
  document.getElementById('ep-mood').value=p.mood||'';
  document.getElementById('ep-content').value=p.content;
  document.getElementById('modal-post').classList.add('active');
}
async function savePost(){
  const id=document.getElementById('ep-id').value;
  await fetch('/api/posts/'+id,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({title:document.getElementById('ep-title').value,mood:document.getElementById('ep-mood').value,content:document.getElementById('ep-content').value})});
  closeModal('modal-post');await loadPosts();renderOverview();
}
async function delPost(id){
  if(!confirm('Delete this post permanently?'))return;
  await fetch('/api/posts/'+id,{method:'DELETE'});
  await loadPosts();renderOverview();
}

// ── IMAGES ──
async function loadImages(){
  allImages=await(await fetch('/api/images')).json();
  document.getElementById('i-count').textContent=allImages.length;
  document.getElementById('images-list').innerHTML=allImages.length
    ?allImages.map(img=>\`<div class="admin-photo-card">
      <img src="\${img.path}" alt="\${esc(img.caption)}">
      <div class="admin-photo-meta">\${esc(img.caption)||'(no caption)'}</div>
      <div style="font-size:9px;color:#888;margin-bottom:4px">♥\${img.likes} ✕\${img.dislikes}</div>
      <div class="admin-photo-actions">
        <button class="xp-btn xp-btn-sm" onclick="openEditImg('\${img._id}')">Edit</button>
        <button class="xp-btn xp-btn-sm xp-btn-danger" onclick="delImg('\${img._id}')">Del</button>
      </div>
    </div>\`).join('')
    :'<div class="empty-state" style="grid-column:1/-1">No images yet</div>';
}
async function uploadImg(){
  const file=document.getElementById('i-file').files[0];
  const caption=document.getElementById('i-caption').value;
  if(!file){showMsg('img-msg','Please select an image file.','err');return;}
  setStatus('Uploading image…');
  const fd=new FormData();fd.append('image',file);fd.append('caption',caption);
  const res=await fetch('/api/images',{method:'POST',body:fd});
  setStatus('Ready');
  if(res.ok){showMsg('img-msg','Image uploaded!','ok');document.getElementById('i-file').value='';document.getElementById('i-caption').value='';await loadImages();renderOverview();}
  else{const e=await res.json();showMsg('img-msg',e.error,'err');}
}
function openEditImg(id){
  const img=allImages.find(x=>x._id===id);if(!img)return;
  document.getElementById('ei-id').value=img._id;
  document.getElementById('ei-caption').value=img.caption||'';
  document.getElementById('modal-img').classList.add('active');
}
async function saveImg(){
  await fetch('/api/images/'+document.getElementById('ei-id').value,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({caption:document.getElementById('ei-caption').value})});
  closeModal('modal-img');await loadImages();
}
async function delImg(id){
  if(!confirm('Delete this image permanently?'))return;
  await fetch('/api/images/'+id,{method:'DELETE'});
  await loadImages();renderOverview();
}

// ── TRACKS ──
async function loadTracks(){
  allTracks=await(await fetch('/api/tracks')).json();
  document.getElementById('t-count').textContent=allTracks.length;
  document.getElementById('tracks-list').innerHTML=allTracks.length
    ?'<table style="width:100%;border-collapse:collapse;font-size:11px">'
      +'<tr style="background:linear-gradient(180deg,#cadaf5 0%,#b4c8e8 100%);font-weight:bold"><td style="padding:4px 8px">#</td><td>Title</td><td>Artist</td><td>Plays</td><td>Reactions</td><td>Actions</td></tr>'
      +allTracks.map((t,i)=>\`<tr class="xp-list-row">
        <td style="padding:3px 8px;color:#888">\${i+1}</td>
        <td><strong>\${esc(t.title)}</strong></td>
        <td style="color:#666">\${esc(t.artist||'—')}</td>
        <td style="color:#316ac5;font-weight:bold">\${t.playCount||0}</td>
        <td><span style="color:#316ac5">♥\${t.likes}</span> <span style="color:#aaa">✕\${t.dislikes}</span></td>
        <td style="white-space:nowrap">
          <button class="xp-btn xp-btn-sm" onclick="openEditTrack('\${t._id}')">Edit</button>
          <button class="xp-btn xp-btn-sm xp-btn-danger" onclick="delTrack('\${t._id}')">Delete</button>
        </td>
      </tr>\`).join('')+'</table>'
    :'<div class="empty-state">No tracks yet</div>';
}
async function uploadTrack(){
  const file=document.getElementById('t-file').files[0];
  const title=document.getElementById('t-title').value.trim()||(file&&file.name)||'';
  const artist=document.getElementById('t-artist').value.trim();
  if(!file){showMsg('track-msg','Please select an audio file.','err');return;}
  document.getElementById('t-progress').style.display='block';
  setStatus('Uploading track…');
  const fd=new FormData();fd.append('audio',file);fd.append('title',title);fd.append('artist',artist);
  const res=await fetch('/api/tracks',{method:'POST',body:fd});
  document.getElementById('t-progress').style.display='none';
  setStatus('Ready');
  if(res.ok){showMsg('track-msg','Track uploaded!','ok');document.getElementById('t-file').value='';document.getElementById('t-title').value='';document.getElementById('t-artist').value='';await loadTracks();renderOverview();}
  else{const e=await res.json();showMsg('track-msg',e.error,'err');}
}
function openEditTrack(id){
  const t=allTracks.find(x=>x._id===id);if(!t)return;
  document.getElementById('et-id').value=t._id;
  document.getElementById('et-title').value=t.title;
  document.getElementById('et-artist').value=t.artist||'';
  document.getElementById('modal-track').classList.add('active');
}
async function saveTrack(){
  await fetch('/api/tracks/'+document.getElementById('et-id').value,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({title:document.getElementById('et-title').value,artist:document.getElementById('et-artist').value})});
  closeModal('modal-track');await loadTracks();renderOverview();
}
async function delTrack(id){
  if(!confirm('Delete this track permanently?'))return;
  await fetch('/api/tracks/'+id,{method:'DELETE'});
  await loadTracks();renderOverview();
}

// ── NOTIFICATIONS ──
async function loadNotifs(){
  try {
    const notifs=await(await fetch('/api/notifications?since='+new Date(Date.now()-7*86400000).toISOString())).json();
    document.getElementById('n-count').textContent=notifs.length;
    document.getElementById('notifs-list').innerHTML=notifs.length
      ?notifs.map(n=>{
        const iconMap={new_post:'📝',updated_post:'📝',new_image:'🖼️',new_track:'🎵',updated_track:'🎵',custom:'📣'};
        const icon=iconMap[n.type]||'🔔';
        const date=new Date(n.createdAt).toLocaleString();
        return \`<div class="admin-item">
          <div style="font-size:18px">\${icon}</div>
          <div class="admin-item-info">
            <div class="admin-item-title">\${esc(n.title)}</div>
            <div class="admin-item-meta">\${esc(n.message||'')} · \${date} · \${n.type}</div>
          </div>
        </div>\`;
      }).join('')
      :'<div class="empty-state">No notifications in the last 7 days</div>';
  } catch(e) {
    document.getElementById('notifs-list').innerHTML='<div class="empty-state">Could not load notifications</div>';
  }
}
async function sendCustomNotif(){
  const title=document.getElementById('n-title').value.trim();
  const message=document.getElementById('n-message').value.trim();
  if(!title){showMsg('notif-msg','Title is required.','err');return;}
  const res=await fetch('/api/notifications/custom',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({title,message})});
  if(res.ok){showMsg('notif-msg','Notification sent! 🔔','ok');document.getElementById('n-title').value='';document.getElementById('n-message').value='';await loadNotifs();}
  else{const e=await res.json();showMsg('notif-msg',e.error,'err');}
}
async function clearAllNotifs(){
  if(!confirm('Are you sure you want to clear all notifications from the database?')) return;
  const res=await fetch('/api/notifications',{method:'DELETE'});
  if(res.ok) await loadNotifs();
  else alert('Failed to clear notifications');
}

init();

// ── SERVICE WORKER + PUSH ──
if ('serviceWorker' in navigator && 'PushManager' in window) {
  navigator.serviceWorker.register('/sw.js').then(async reg => {
    if (Notification.permission === 'default') {
      await Notification.requestPermission();
    }
    if (Notification.permission === 'granted') {
      try {
        const { publicKey } = await (await fetch('/api/push/vapid-public-key')).json();
        if (!publicKey) return;
        const padding = '='.repeat((4 - publicKey.length % 4) % 4);
        const b64 = (publicKey + padding).replace(/-/g, '+').replace(/_/g, '/');
        const raw = atob(b64);
        const arr = new Uint8Array(raw.length);
        for (let i = 0; i < raw.length; i++) arr[i] = raw.charCodeAt(i);
        const sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: arr });
        await fetch('/api/push/subscribe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(sub.toJSON()) });
      } catch(e) {}
    }
  }).catch(() => {});
}
</script>
</body>
</html>`;
};
