/* ---------- shared helpers used on every page ---------- */

function getToken(){ return localStorage.getItem('love_token'); }
function getNames(){ return { hisName: localStorage.getItem('love_his') || 'Me', herName: localStorage.getItem('love_her') || 'Love', anniversary: localStorage.getItem('love_anniversary') || '' }; }
function setSession(token, hisName, herName, anniversary){
  localStorage.setItem('love_token', token);
  localStorage.setItem('love_his', hisName);
  localStorage.setItem('love_her', herName);
  if(anniversary) localStorage.setItem('love_anniversary', anniversary);
}
function clearSession(){ localStorage.removeItem('love_token'); }

async function api(path, opts = {}){
  const headers = Object.assign({ 'Content-Type': 'application/json' }, opts.headers || {});
  const token = getToken();
  if(token) headers['x-auth-token'] = token;
  const res = await fetch(path, Object.assign({}, opts, { headers }));
  if(res.status === 401){
    clearSession();
    window.location.href = '/lock.html';
    throw new Error('unauthorized');
  }
  return res;
}

function requireAuthOrRedirect(){
  if(!getToken()){
    window.location.href = '/lock.html';
    return false;
  }
  return true;
}

function uid(){ return Math.random().toString(36).slice(2,10); }
function todayStr(){ return new Date().toISOString().slice(0,10); }
function fmtDate(d){
  if(!d) return '';
  const dt = new Date(d + 'T00:00:00');
  return dt.toLocaleDateString(undefined, {month:'short', day:'numeric', year:'numeric'});
}
function fmtDateTime(iso){
  const dt = new Date(iso);
  return dt.toLocaleDateString(undefined, {month:'short', day:'numeric'}) + ' at ' + dt.toLocaleTimeString(undefined,{hour:'numeric',minute:'2-digit'});
}
function escapeHtml(s){
  const d = document.createElement('div');
  d.textContent = s || '';
  return d.innerHTML;
}

/* ---------- ambient falling petals ---------- */
function initHeartsBg(){
  const wrap = document.getElementById('heartsBg');
  if(!wrap) return;
  wrap.innerHTML = '';
  for(let i=0;i<14;i++){
    const p = document.createElement('div');
    p.className = 'floaty-heart';
    const size = 7 + Math.random()*9;
    p.style.width = size + 'px';
    p.style.height = (size*1.25) + 'px';
    p.style.left = Math.random()*100 + '%';
    p.style.animationDuration = (11 + Math.random()*11) + 's';
    p.style.animationDelay = (Math.random()*11) + 's';
    p.style.opacity = 0.15 + Math.random()*0.18;
    wrap.appendChild(p);
  }
}

/* ---------- confetti heart burst on an action ---------- */
function burstHearts(x, y, count){
  count = count || 10;
  for(let i=0;i<count;i++){
    const el = document.createElement('div');
    el.className = 'burst-heart';
    el.textContent = Math.random() > 0.5 ? '\u2665' : '\u2661';
    el.style.left = (x + (Math.random()*60-30)) + 'px';
    el.style.top = y + 'px';
    el.style.color = Math.random() > 0.5 ? 'var(--rose)' : 'var(--gold)';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1200);
  }
}

/* ---------- top bar + nav, shared markup injected per page ---------- */
const NAV_ITEMS = [
  { key: 'home', label: 'Home', href: '/index.html' },
  { key: 'letters', label: 'Letters', href: '/letters.html' },
  { key: 'memories', label: 'Memories', href: '/memories.html' },
  { key: 'reasons', label: 'Reasons', href: '/reasons.html' },
  { key: 'countdown', label: 'Countdown', href: '/countdown.html' },
  { key: 'bucket', label: 'Bucket List', href: '/bucket.html' },
];

function renderChrome(activeKey){
  const names = getNames();
  document.getElementById('heartsBg') || (() => {
    const bg = document.createElement('div');
    bg.id = 'heartsBg';
    document.body.prepend(bg);
  })();
  initHeartsBg();

  const top = document.getElementById('topbar');
  if(top){
    top.innerHTML =
      '<div class="title">For ' + escapeHtml(names.herName) + '</div>' +
      '<div class="icons">' +
        '<button class="icon-btn" id="editToggle" title="Edit mode">&#9998;</button>' +
        '<button class="icon-btn" id="lockBtn" title="Lock">&#128274;</button>' +
      '</div>';
    document.getElementById('lockBtn').onclick = () => { clearSession(); window.location.href = '/lock.html'; };
    document.getElementById('editToggle').onclick = () => {
      window.editMode = !window.editMode;
      document.getElementById('editToggle').classList.toggle('active', window.editMode);
      document.querySelectorAll('.editOnly').forEach(el => el.classList.toggle('hidden', !window.editMode));
    };
  }

  const nav = document.getElementById('nav');
  if(nav){
    nav.innerHTML = NAV_ITEMS.map(item =>
      '<a class="navpill' + (item.key === activeKey ? ' active' : '') + '" href="' + item.href + '" style="position:relative;">' + item.label +
      (item.key === 'letters' ? '<span class="reply-dot hidden" id="letterReplyDot"></span>' : '') +
      '</a>'
    ).join('');
  }
  checkUnreadReplies();
}

function getSeenReplyIds(){
  try{ return JSON.parse(localStorage.getItem('love_seen_replies') || '[]'); }catch(e){ return []; }
}
function markRepliesSeen(ids){
  const seen = new Set(getSeenReplyIds());
  ids.forEach(id => seen.add(id));
  localStorage.setItem('love_seen_replies', JSON.stringify([...seen]));
}
async function checkUnreadReplies(){
  const dot = document.getElementById('letterReplyDot');
  if(!dot) return;
  try{
    const res = await api('/api/content');
    const content = await res.json();
    const replies = (content.replies || []).filter(r => r.author === 'her');
    const seen = new Set(getSeenReplyIds());
    const unread = replies.filter(r => !seen.has(r.id));
    dot.classList.toggle('hidden', unread.length === 0);
  }catch(e){}
}

window.editMode = false;