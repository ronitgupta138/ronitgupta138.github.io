/**
 * Ronit Gupta Portfolio - Core Interactive Engine
 * Zero dependencies, high-performance, accessible.
 */

// Mobile Navigation
function toggleNavMenu() {
  const nav = document.getElementById('nav-links');
  const btn = document.getElementById('nav-hamburger');
  if (nav && btn) {
    nav.classList.toggle('nav-open');
    btn.classList.toggle('open');
  }
}

function closeNavMenu() {
  const nav = document.getElementById('nav-links');
  const btn = document.getElementById('nav-hamburger');
  if (nav && btn) {
    nav.classList.remove('nav-open');
    btn.classList.remove('open');
  }
}

// 1-Click Copy Email & Toast Notification
function copyEmail() {
  const email = document.getElementById('email-address')?.textContent.trim() || 'ronitgupta138@gmail.com';
  copyTextToClipboard(email, 'Email copied: ' + email + ' ✓');
}

function copyTextToClipboard(text, successMsg) {
  const showToast = (msg) => {
    const toast = document.getElementById('toast');
    if (toast) {
      toast.textContent = msg || 'Copied to clipboard! ✓';
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2500);
    }
  };

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text)
      .then(() => showToast(successMsg))
      .catch(() => fallbackCopy(text, () => showToast(successMsg)));
  } else {
    fallbackCopy(text, () => showToast(successMsg));
  }
}

function fallbackCopy(text, cb) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.left = '-9999px';
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  try {
    document.execCommand('copy');
    if (cb) cb();
  } catch (err) {
    console.error('Fallback copy failed', err);
  }
  document.body.removeChild(ta);
}

// Interactive Terminal Simulator Engine
const COMMAND_RESPONSES = {
  whoami: `<span class="term-white">Ronit Gupta</span> — Systems &amp; Concurrency Software Engineer
<span class="term-dim">• Education:</span> CSBS @ Netaji Subhash Engineering College (Batch 2027, Kolkata)
<span class="term-dim">• Focus:</span> In-Memory Indexes (KD-Tree, HNSW), Concurrency (Java 21 Loom), Linux Kernel
<span class="term-green">✔ Status: Open for SDE-1 / Systems / Backend Engineering opportunities.</span>`,

  benchmarks: `🚀 <span class="term-cyan">VERIFIED IN-MEMORY HARDWARE BENCHMARKS</span>
<span class="term-dim">──────────────────────────────────────────────────────────────────────</span>
 <span class="term-green">• Bharat Spatial:</span>  38,400+ QPS  (2D KD-Tree across 650k Indian settlements)
 <span class="term-green">• Vectra Core:</span>     16,900+ QPS  (HNSW KNN vector search, 0.28ms latency)
 <span class="term-green">• Apex Matching:</span>   50,000+ Ops  (FIFO continuous double auction book)
 <span class="term-green">• Aero Memory:</span>     2.82x Ratio  (zRAM ZSTD stream in-memory compression)
<span class="term-dim">──────────────────────────────────────────────────────────────────────</span>
<span class="term-green">✔ All test runs backed by real multi-core executions in Java 21 &amp; C.</span>`,

  'aero-status': `⚡ <span class="term-cyan">AERO LINUX v1.4.0-SUPERNOVA STATUS</span>
<span class="term-dim">──────────────────────────────────────────────────────────────────────</span>
 • Idle Footprint:  312 MB RAM (Cold Boot on AMD Ryzen 5 5600H)
 • Native Suite:    49 Native GTK3 developer applications (Zero Electron)
 • Memory Engine:   Dynamic in-memory zRAM ZSTD (eliminates SSD swap wear)
 • Releases:        Live bootable ISO &amp; Debian .deb packages available
 • Web Portal:      <a href="https://ronitgupta138.github.io/aero-linux/" target="_blank" style="color:#00f2fe;">https://ronitgupta138.github.io/aero-linux/</a>
<span class="term-dim">──────────────────────────────────────────────────────────────────────</span>
<span class="term-green">✔ 130/130 unit tests passing in multi-distro container CI.</span>`,

  skills: `🛠️ <span class="term-cyan">TECHNICAL ARSENAL &amp; SYSTEMS STACK</span>
<span class="term-dim">──────────────────────────────────────────────────────────────────────</span>
 <span class="term-white">Systems:</span>      C, Linux Kernel, sysfs/procfs, ACPI, zRAM ZSTD, BBR TCP, GTK3
 <span class="term-white">Concurrency:</span>  Java 21 (Project Loom Virtual Threads), Spring Boot 3.3
 <span class="term-white">Languages:</span>    TypeScript, Python 3.11+, Java, C, Node.js, Bash
 <span class="term-white">Data Stores:</span>  HNSW Graphs, 2D KD-Tree, PostgreSQL 16, Redis 7, SQLite
 <span class="term-white">Tooling:</span>      Docker, Debian Packaging, GitHub Actions CI, Git/gh CLI
<span class="term-dim">──────────────────────────────────────────────────────────────────────</span>`,

  contact: `📬 <span class="term-cyan">CONNECT WITH RONIT GUPTA</span>
<span class="term-dim">──────────────────────────────────────────────────────────────────────</span>
 • Email:     <a href="mailto:ronitgupta138@gmail.com" style="color:#00f2fe;">ronitgupta138@gmail.com</a>
 • LinkedIn:  <a href="https://linkedin.com/in/ronitgupta138" target="_blank" style="color:#38bdf8;">linkedin.com/in/ronitgupta138</a>
 • GitHub:    <a href="https://github.com/ronitgupta138" target="_blank" style="color:#f8fafc;">github.com/ronitgupta138</a>
 • Location:  Kolkata, West Bengal, India 🇮🇳
<span class="term-dim">──────────────────────────────────────────────────────────────────────</span>`,

  help: `Available commands:
  <span class="term-cyan">whoami</span>        - Background, education &amp; engineering focus
  <span class="term-cyan">benchmarks</span>    - Real-world in-memory QPS &amp; latency metrics
  <span class="term-cyan">aero-status</span>   - Aero Linux developer OS specs &amp; release info
  <span class="term-cyan">skills</span>        - Technical competencies &amp; language stack
  <span class="term-cyan">contact</span>       - Direct email and professional profiles
  <span class="term-cyan">clear</span>         - Clear the terminal screen`
};

let cmdHistory = [];
let historyIndex = -1;

function runCommand(cmd) {
  cmd = cmd.trim().toLowerCase();
  const termBody = document.getElementById('term-body');
  const historyDiv = document.getElementById('term-history');
  const inputEl = document.getElementById('term-input');

  if (inputEl) inputEl.value = '';

  if (cmd === 'clear') {
    if (historyDiv) historyDiv.innerHTML = '';
    return;
  }

  let outputHtml = '';
  if (COMMAND_RESPONSES[cmd]) {
    outputHtml = COMMAND_RESPONSES[cmd];
  } else if (cmd === '') {
    return;
  } else {
    outputHtml = `<span class="term-amber">command not found: ${escapeHtml(cmd)}</span>. Type <span class="term-cyan">'help'</span> for available commands.`;
  }

  const newEntry = document.createElement('div');
  newEntry.style.marginBottom = '12px';
  newEntry.innerHTML = `<div><span class="term-prompt">ronit@workstation:~$</span> ${escapeHtml(cmd)}</div><div>${outputHtml}</div>`;
  
  if (historyDiv) {
    historyDiv.appendChild(newEntry);
  }

  cmdHistory.push(cmd);
  historyIndex = cmdHistory.length;

  if (termBody) {
    termBody.scrollTop = termBody.scrollHeight;
  }
}

function handleTermSubmit(e) {
  e.preventDefault();
  const inputEl = document.getElementById('term-input');
  if (inputEl) {
    const val = inputEl.value.trim();
    if (val) {
      runCommand(val);
    }
  }
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, function(m) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[m];
  });
}

// Keyboard arrow history support
document.addEventListener('DOMContentLoaded', () => {
  const inputEl = document.getElementById('term-input');
  if (inputEl) {
    inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp') {
        if (historyIndex > 0) {
          historyIndex--;
          inputEl.value = cmdHistory[historyIndex] || '';
        }
        e.preventDefault();
      } else if (e.key === 'ArrowDown') {
        if (historyIndex < cmdHistory.length - 1) {
          historyIndex++;
          inputEl.value = cmdHistory[historyIndex] || '';
        } else {
          historyIndex = cmdHistory.length;
          inputEl.value = '';
        }
        e.preventDefault();
      }
    });
  }

  // Active navigation link scroll tracking
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });

  // Initialize interactive engines
  initParticleCanvas();
  initSpotlightLighting();
  initKDTreePlayground();
  initCommandPalette();
  initSiliconDieVisualizer();
  initOrderBookSimulator();
});

// Lightweight Interactive Particle Canvas Engine
function initParticleCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  let mouse = { x: -9999, y: -9999, radius: 130 };
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  window.addEventListener('mouseleave', () => {
    mouse.x = -9999;
    mouse.y = -9999;
  });

  const particleCount = Math.min(Math.floor((width * height) / 22000), 55);
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 1.5 + 0.8
    });
  }

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);

  let isRunning = true;
  document.addEventListener('visibilitychange', () => {
    isRunning = !document.hidden;
    if (isRunning) requestAnimationFrame(render);
  });

  function render() {
    if (!isRunning) return;
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      else if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      else if (p.y > height) p.y = 0;

      const dxm = p.x - mouse.x;
      const dym = p.y - mouse.y;
      const distM = Math.sqrt(dxm * dxm + dym * dym);
      if (distM < mouse.radius) {
        const force = (1 - distM / mouse.radius) * 1.2;
        p.x += (dxm / distM) * force;
        p.y += (dym / distM) * force;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 242, 254, 0.4)';
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(0, 242, 254, ${(1 - dist / 110) * 0.12})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

// ─────────────────────────────────────────────────────────────
// Radial Spotlight Sheen Lighting Engine (Linear / Stripe Sheen)
// ─────────────────────────────────────────────────────────────
function initSpotlightLighting() {
  const cards = document.querySelectorAll('.spotlight-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--mouse-x', `-999px`);
      card.style.setProperty('--mouse-y', `-999px`);
    });
  });
}

// ─────────────────────────────────────────────────────────────
// Raycast / Spotlight Command Palette Controller (Cmd+K / Ctrl+K)
// ─────────────────────────────────────────────────────────────
const CMD_ITEMS = [
  { id: 'jump-systems', title: 'Flagship Systems Architecture', desc: 'Aero Linux, Vectra Core, Bharat Spatial, Apex', icon: '⚡', group: 'Navigation', badge: 'Jump', action: () => scrollToSection('systems') },
  { id: 'jump-kdtree', title: 'KD-Tree Spatial Simulator', desc: 'Live in-browser coordinate search playground', icon: '🗺️', group: 'Navigation', badge: 'Jump', action: () => scrollToSection('kdtree-canvas') },
  { id: 'jump-orderbook', title: 'Apex L2 Order Book Engine', desc: 'Live continuous double auction depth ladder simulator', icon: '📈', group: 'Navigation', badge: 'Jump', action: () => scrollToSection('ob-spread-info') },
  { id: 'jump-terminal', title: 'Interactive Systems Terminal', desc: 'Live terminal REPL simulator', icon: '⌨️', group: 'Navigation', badge: 'Jump', action: () => scrollToSection('terminal') },
  { id: 'jump-arsenal', title: 'Technical Arsenal & Stack', desc: 'C, Java 21 Loom, Spring Boot, Linux internals', icon: '🛠️', group: 'Navigation', badge: 'Jump', action: () => scrollToSection('arsenal') },
  { id: 'jump-about', title: 'Workstation & Philosophy', desc: 'AMD Ryzen 5600H, Aero Linux specs', icon: '💻', group: 'Navigation', badge: 'Jump', action: () => scrollToSection('about') },
  { id: 'jump-contact', title: 'Contact & Connect', desc: 'Email, LinkedIn, GitHub profiles', icon: '📬', group: 'Navigation', badge: 'Jump', action: () => scrollToSection('contact') },

  { id: 'act-email', title: 'Copy Email Address', desc: 'ronitgupta138@gmail.com', icon: '📋', group: 'Actions', badge: 'Action', action: () => copyEmail() },
  { id: 'act-benchmarks', title: 'Run Hardware Benchmarks', desc: 'Execute in terminal simulator', icon: '🚀', group: 'Actions', badge: 'Terminal', action: () => { scrollToSection('terminal'); runCommand('benchmarks'); } },
  { id: 'act-aero-status', title: 'Inspect Aero Linux Status', desc: 'View 49 GTK3 apps & zRAM telemetry', icon: '🐧', group: 'Actions', badge: 'Terminal', action: () => { scrollToSection('terminal'); runCommand('aero-status'); } },
  { id: 'act-whoami', title: 'Run Whoami', desc: 'Print background and engineering focus', icon: '👤', group: 'Actions', badge: 'Terminal', action: () => { scrollToSection('terminal'); runCommand('whoami'); } },
  { id: 'act-portal', title: 'Visit Aero Linux Live Portal', desc: 'https://ronitgupta138.github.io/aero-linux/', icon: '🌐', group: 'External', badge: 'Portal', action: () => window.open('https://ronitgupta138.github.io/aero-linux/', '_blank') },
  { id: 'act-github', title: 'Open GitHub Profile', desc: 'github.com/ronitgupta138', icon: '🐙', group: 'External', badge: 'GitHub', action: () => window.open('https://github.com/ronitgupta138', '_blank') },
  { id: 'act-linkedin', title: 'Open LinkedIn Profile', desc: 'linkedin.com/in/ronitgupta138', icon: '💼', group: 'External', badge: 'LinkedIn', action: () => window.open('https://linkedin.com/in/ronitgupta138', '_blank') }
];

let activeCmdIndex = 0;
let filteredCmdItems = [...CMD_ITEMS];

function openCmdPalette() {
  const modal = document.getElementById('cmd-backdrop');
  const input = document.getElementById('cmd-input');
  if (modal) {
    modal.classList.add('open');
    if (input) {
      input.value = '';
      input.focus();
    }
    filteredCmdItems = [...CMD_ITEMS];
    activeCmdIndex = 0;
    renderCmdList();
  }
}

function closeCmdPalette() {
  const modal = document.getElementById('cmd-backdrop');
  if (modal) modal.classList.remove('open');
}

function handleCmdBackdropClick(e) {
  if (e.target.id === 'cmd-backdrop') {
    closeCmdPalette();
  }
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

function filterCmdList() {
  const input = document.getElementById('cmd-input');
  const q = (input?.value || '').trim().toLowerCase();
  if (!q) {
    filteredCmdItems = [...CMD_ITEMS];
  } else {
    filteredCmdItems = CMD_ITEMS.filter(it => 
      it.title.toLowerCase().includes(q) || 
      it.desc.toLowerCase().includes(q) || 
      it.group.toLowerCase().includes(q)
    );
  }
  activeCmdIndex = 0;
  renderCmdList();
}

function renderCmdList() {
  const listEl = document.getElementById('cmd-list');
  if (!listEl) return;

  if (filteredCmdItems.length === 0) {
    listEl.innerHTML = `<div style="padding: 24px; text-align: center; color: var(--text-dim); font-size: 0.85rem;">No matching commands found.</div>`;
    return;
  }

  let html = '';
  let currentGroup = '';

  filteredCmdItems.forEach((item, idx) => {
    if (item.group !== currentGroup) {
      currentGroup = item.group;
      html += `<div class="cmd-group-title">${escapeHtml(currentGroup)}</div>`;
    }
    const isActive = idx === activeCmdIndex ? 'active' : '';
    html += `
      <div class="cmd-item ${isActive}" onclick="executeCmdItem(${idx})" onmouseenter="setActiveCmdIndex(${idx})">
        <div class="cmd-item-left">
          <span class="cmd-item-icon">${item.icon}</span>
          <div>
            <span class="cmd-item-title">${escapeHtml(item.title)}</span>
            <span class="cmd-item-desc">${escapeHtml(item.desc)}</span>
          </div>
        </div>
        <span class="cmd-item-badge">${escapeHtml(item.badge)}</span>
      </div>
    `;
  });

  listEl.innerHTML = html;
}

function setActiveCmdIndex(idx) {
  activeCmdIndex = idx;
  const items = document.querySelectorAll('.cmd-item');
  items.forEach((el, i) => {
    el.classList.toggle('active', i === idx);
  });
}

function executeCmdItem(idx) {
  const item = filteredCmdItems[idx];
  if (item && item.action) {
    closeCmdPalette();
    item.action();
  }
}

function initCommandPalette() {
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      const modal = document.getElementById('cmd-backdrop');
      if (modal?.classList.contains('open')) {
        closeCmdPalette();
      } else {
        openCmdPalette();
      }
    } else if (e.key === 'Escape') {
      closeCmdPalette();
    } else if (document.getElementById('cmd-backdrop')?.classList.contains('open')) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (activeCmdIndex < filteredCmdItems.length - 1) {
          setActiveCmdIndex(activeCmdIndex + 1);
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (activeCmdIndex > 0) {
          setActiveCmdIndex(activeCmdIndex - 1);
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        executeCmdItem(activeCmdIndex);
      }
    }
  });
}

// ─────────────────────────────────────────────────────────────
// ⚡ 2D KD-Tree Spatial Engine Live Playground (Bharat Spatial)
// ─────────────────────────────────────────────────────────────
let kdTree = null;
let kdTreePoints = [];

const SEED_SETTLEMENTS = [
  { name: "Kolkata (NSEC Hub)", mdds: "312011", x: 0.78, y: 0.52 },
  { name: "Howrah District", mdds: "312015", x: 0.75, y: 0.55 },
  { name: "Bengaluru Tech Corridor", mdds: "512001", x: 0.44, y: 0.80 },
  { name: "Hyderabad Cyberabad", mdds: "411002", x: 0.49, y: 0.67 },
  { name: "Mumbai Nariman Point", mdds: "421001", x: 0.22, y: 0.62 },
  { name: "Pune Hinjewadi", mdds: "421005", x: 0.26, y: 0.66 },
  { name: "Delhi Connaught Hub", mdds: "110001", x: 0.42, y: 0.28 },
  { name: "Noida Sector 62", mdds: "110045", x: 0.45, y: 0.30 },
  { name: "Gurugram Cyber City", mdds: "110080", x: 0.40, y: 0.31 },
  { name: "Chennai Tidel Park", mdds: "600001", x: 0.55, y: 0.84 },
  { name: "Ahmedabad GIFT City", mdds: "380001", x: 0.21, y: 0.46 },
  { name: "Jaipur Malviya Nagar", mdds: "302001", x: 0.32, y: 0.35 },
  { name: "Chandigarh IT Park", mdds: "160001", x: 0.38, y: 0.20 },
  { name: "Kochi Infopark", mdds: "682001", x: 0.42, y: 0.90 },
  { name: "Bhubaneswar Infocity", mdds: "751001", x: 0.68, y: 0.58 },
  { name: "Indore Crystal IT", mdds: "452001", x: 0.35, y: 0.50 },
  { name: "Lucknow Gomti Nagar", mdds: "226001", x: 0.52, y: 0.36 },
  { name: "Patna Patliputra", mdds: "800001", x: 0.64, y: 0.42 },
  { name: "Visakhapatnam Cyber Valley", mdds: "530001", x: 0.61, y: 0.71 },
  { name: "Coimbatore TIDEL", mdds: "641001", x: 0.43, y: 0.86 },
  { name: "Guwahati Tech Park", mdds: "781001", x: 0.88, y: 0.38 },
  { name: "Surat Diamond Bourse", mdds: "395001", x: 0.22, y: 0.53 },
  { name: "Nagpur MIHAN", mdds: "440001", x: 0.47, y: 0.55 },
  { name: "Bhopal MP Nagar", mdds: "462001", x: 0.39, y: 0.49 },
  { name: "Thiruvananthapuram Technopark", mdds: "695001", x: 0.43, y: 0.95 },
  { name: "Mysuru Hebbal", mdds: "570001", x: 0.41, y: 0.82 },
  { name: "Dehradun IT Park", mdds: "248001", x: 0.45, y: 0.23 },
  { name: "Ranchi Kanke", mdds: "834001", x: 0.63, y: 0.49 },
  { name: "Raipur Naya Raipur", mdds: "492001", x: 0.54, y: 0.57 },
  { name: "Varanasi BHU Area", mdds: "221001", x: 0.57, y: 0.41 },
  { name: "Amritsar GT Road", mdds: "143001", x: 0.33, y: 0.19 },
  { name: "Shimla Mall", mdds: "171001", x: 0.41, y: 0.17 }
];

function buildKDTreeRecursive(points, depth = 0, bounds = { xMin: 0, xMax: 1, yMin: 0, yMax: 1 }) {
  if (points.length === 0) return null;
  const axis = depth % 2; // 0 = X, 1 = Y
  points.sort((a, b) => (axis === 0 ? a.x - b.x : a.y - b.y));
  const median = Math.floor(points.length / 2);
  const node = points[median];

  const leftBounds = { ...bounds };
  const rightBounds = { ...bounds };
  if (axis === 0) {
    leftBounds.xMax = node.x;
    rightBounds.xMin = node.x;
  } else {
    leftBounds.yMax = node.y;
    rightBounds.yMin = node.y;
  }

  return {
    point: node,
    axis,
    bounds,
    left: buildKDTreeRecursive(points.slice(0, median), depth + 1, leftBounds),
    right: buildKDTreeRecursive(points.slice(median + 1), depth + 1, rightBounds)
  };
}

function findNearestNeighbor(node, target, best = { node: null, distSq: Infinity, hops: 0, pruned: 0 }) {
  if (!node) return best;
  best.hops++;

  const dx = target.x - node.point.x;
  const dy = target.y - node.point.y;
  const distSq = dx * dx + dy * dy;

  if (distSq < best.distSq) {
    best.distSq = distSq;
    best.node = node.point;
  }

  const axisDiff = node.axis === 0 ? target.x - node.point.x : target.y - node.point.y;
  const first = axisDiff < 0 ? node.left : node.right;
  const second = axisDiff < 0 ? node.right : node.left;

  findNearestNeighbor(first, target, best);

  if (axisDiff * axisDiff < best.distSq) {
    findNearestNeighbor(second, target, best);
  } else {
    best.pruned++;
  }

  return best;
}

let kdtreeCanvas = null;
let kdtreeCtx = null;
let kdtreeCursor = null;

function initKDTreePlayground() {
  kdtreeCanvas = document.getElementById('kdtree-canvas');
  if (!kdtreeCanvas) return;
  kdtreeCtx = kdtreeCanvas.getContext('2d');

  kdTreePoints = [...SEED_SETTLEMENTS];
  kdTree = buildKDTreeRecursive([...kdTreePoints]);

  function resizeCanvas() {
    const rect = kdtreeCanvas.getBoundingClientRect();
    kdtreeCanvas.width = rect.width;
    kdtreeCanvas.height = 340;
    renderKDTreeCanvas();
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  kdtreeCanvas.addEventListener('mousemove', (e) => {
    const rect = kdtreeCanvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    kdtreeCursor = { x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) };
    renderKDTreeCanvas();
  });

  kdtreeCanvas.addEventListener('mouseleave', () => {
    kdtreeCursor = null;
    renderKDTreeCanvas();
  });
}

function reseedKDTree() {
  kdTreePoints = SEED_SETTLEMENTS.map(p => ({
    ...p,
    x: Math.max(0.08, Math.min(0.92, p.x + (Math.random() - 0.5) * 0.12)),
    y: Math.max(0.08, Math.min(0.92, p.y + (Math.random() - 0.5) * 0.12))
  }));
  kdTree = buildKDTreeRecursive([...kdTreePoints]);
  renderKDTreeCanvas();
}

function renderKDTreeCanvas() {
  if (!kdtreeCanvas || !kdtreeCtx) return;
  const ctx = kdtreeCtx;
  const W = kdtreeCanvas.width;
  const H = kdtreeCanvas.height;

  ctx.clearRect(0, 0, W, H);

  // Grid lines
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
  ctx.lineWidth = 1;
  const gridSize = 40;
  for (let x = 0; x < W; x += gridSize) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }
  for (let y = 0; y < H; y += gridSize) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }

  // Draw recursive partition split planes
  function drawSplits(node) {
    if (!node) return;
    const b = node.bounds;
    const px = node.point.x * W;
    const py = node.point.y * H;

    ctx.lineWidth = 1;
    if (node.axis === 0) {
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.24)';
      ctx.beginPath();
      ctx.moveTo(px, b.yMin * H);
      ctx.lineTo(px, b.yMax * H);
      ctx.stroke();
    } else {
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.24)';
      ctx.beginPath();
      ctx.moveTo(b.xMin * W, py);
      ctx.lineTo(b.xMax * W, py);
      ctx.stroke();
    }

    drawSplits(node.left);
    drawSplits(node.right);
  }

  drawSplits(kdTree);

  // Draw settlement nodes
  kdTreePoints.forEach(p => {
    const px = p.x * W;
    const py = p.y * H;
    ctx.beginPath();
    ctx.arc(px, py, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = '#10b981';
    ctx.fill();
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.35)';
    ctx.lineWidth = 3;
    ctx.stroke();
  });

  // Nearest Neighbor Query if cursor is present
  if (kdtreeCursor && kdTree) {
    const t0 = performance.now();
    const result = findNearestNeighbor(kdTree, kdtreeCursor);
    const t1 = performance.now();
    const latencyMs = (t1 - t0).toFixed(3);

    const cx = kdtreeCursor.x * W;
    const cy = kdtreeCursor.y * H;

    if (result.node) {
      const nx = result.node.x * W;
      const ny = result.node.y * H;
      const distPx = Math.sqrt((cx - nx) * (cx - nx) + (cy - ny) * (cy - ny));

      // Bounding search radius circle
      ctx.beginPath();
      ctx.arc(cx, cy, distPx, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.25)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Laser line to nearest node
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(nx, ny);
      ctx.strokeStyle = '#00f2fe';
      ctx.lineWidth = 1.8;
      ctx.stroke();

      // Nearest node glowing highlight
      ctx.beginPath();
      ctx.arc(nx, ny, 7, 0, Math.PI * 2);
      ctx.fillStyle = '#f59e0b';
      ctx.fill();
      ctx.shadowColor = '#f59e0b';
      ctx.shadowBlur = 12;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Update HUD
      const nameEl = document.getElementById('hud-name');
      const mddsEl = document.getElementById('hud-mdds');
      const distEl = document.getElementById('hud-dist');
      const prunedEl = document.getElementById('hud-pruned');
      const latencyEl = document.getElementById('hud-latency');

      if (nameEl) nameEl.textContent = result.node.name;
      if (mddsEl) mddsEl.textContent = result.node.mdds;
      if (distEl) distEl.textContent = `${(Math.sqrt(result.distSq) * 100).toFixed(1)} units`;
      if (prunedEl) prunedEl.textContent = `${result.pruned} branches (hops: ${result.hops})`;
      if (latencyEl) latencyEl.textContent = `${latencyMs} ms`;
    }

    // Cursor crosshair
    ctx.strokeStyle = '#00f2fe';
    ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(cx - 8, cy); ctx.lineTo(cx + 8, cy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx, cy - 8); ctx.lineTo(cx + 8, cy); ctx.stroke();
    ctx.beginPath(); ctx.arc(cx, cy, 3, 0, Math.PI * 2); ctx.stroke();
  }
}

// ─────────────────────────────────────────────────────────────
// ⚡ Silicon Hardware Die Visualizer Engine (AMD Zen 3 Core Die)
// ─────────────────────────────────────────────────────────────
let siliconCanvas = null;
let siliconCtx = null;
let siliconMouse = { x: -9999, y: -9999, activeCore: -1 };
let siliconPackets = [];

function initSiliconDieVisualizer() {
  siliconCanvas = document.getElementById('silicon-canvas');
  if (!siliconCanvas) return;
  siliconCtx = siliconCanvas.getContext('2d');

  function resize() {
    const rect = siliconCanvas.getBoundingClientRect();
    siliconCanvas.width = rect.width;
    siliconCanvas.height = 250;
  }
  window.addEventListener('resize', resize);
  resize();

  // Create initial packet streams
  for (let i = 0; i < 20; i++) {
    siliconPackets.push({
      progress: Math.random(),
      speed: 0.006 + Math.random() * 0.008,
      lane: Math.floor(Math.random() * 6),
      color: Math.random() > 0.4 ? '#00f2fe' : '#38bdf8'
    });
  }

  siliconCanvas.addEventListener('mousemove', (e) => {
    const rect = siliconCanvas.getBoundingClientRect();
    siliconMouse.x = e.clientX - rect.left;
    siliconMouse.y = e.clientY - rect.top;
  });

  siliconCanvas.addEventListener('mouseleave', () => {
    siliconMouse.x = -9999;
    siliconMouse.y = -9999;
    siliconMouse.activeCore = -1;
  });

  function renderDie() {
    if (!siliconCanvas || !siliconCtx) return;
    const ctx = siliconCtx;
    const W = siliconCanvas.width;
    const H = siliconCanvas.height;

    ctx.clearRect(0, 0, W, H);

    // Silicon Substrate outline
    const margin = 14;
    const dieW = W - margin * 2;
    const dieH = H - margin * 2;

    ctx.fillStyle = '#05070c';
    ctx.fillRect(margin, margin, dieW, dieH);
    ctx.strokeStyle = 'rgba(0, 242, 254, 0.22)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(margin, margin, dieW, dieH);

    // Central L3 Cache Bus
    const l3H = 34;
    const l3Y = margin + (dieH - l3H) / 2;
    ctx.fillStyle = 'rgba(16, 185, 129, 0.08)';
    ctx.fillRect(margin + 10, l3Y, dieW - 20, l3H);
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.35)';
    ctx.strokeRect(margin + 10, l3Y, dieW - 20, l3H);

    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillStyle = '#34d399';
    ctx.textAlign = 'center';
    ctx.fillText('32MB UNIFIED L3 CACHE • HIGH-BANDWIDTH FABRIC', margin + dieW / 2, l3Y + 21);

    // Cores layout: 3 cores top row, 3 cores bottom row (6 Cores Zen 3)
    const coreRows = 2;
    const coreCols = 3;
    const coreGap = 12;
    const coreW = (dieW - 20 - (coreCols - 1) * coreGap) / coreCols;
    const coreH = (dieH - l3H - 36) / 2;

    siliconMouse.activeCore = -1;

    for (let r = 0; r < coreRows; r++) {
      for (let c = 0; c < coreCols; c++) {
        const coreIdx = r * coreCols + c;
        const cx = margin + 10 + c * (coreW + coreGap);
        const cy = r === 0 ? margin + 8 : l3Y + l3H + 10;

        // Check hover
        const isHovered = siliconMouse.x >= cx && siliconMouse.x <= cx + coreW &&
                          siliconMouse.y >= cy && siliconMouse.y <= cy + coreH;

        if (isHovered) {
          siliconMouse.activeCore = coreIdx;
        }

        // Draw Core background
        ctx.fillStyle = isHovered ? 'rgba(0, 242, 254, 0.16)' : 'rgba(13, 16, 26, 0.7)';
        ctx.fillRect(cx, cy, coreW, coreH);
        ctx.strokeStyle = isHovered ? '#00f2fe' : 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = isHovered ? 1.5 : 1;
        ctx.strokeRect(cx, cy, coreW, coreH);

        // Core label & virtual thread lanes
        ctx.fillStyle = isHovered ? '#00f2fe' : '#e2e8f0';
        ctx.textAlign = 'left';
        ctx.fillText(`CORE ${coreIdx} (T${coreIdx * 2}, T${coreIdx * 2 + 1})`, cx + 8, cy + 18);

        // Micro pipeline lanes inside core
        const laneY = cy + 28;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.beginPath();
        ctx.moveTo(cx + 8, laneY);
        ctx.lineTo(cx + coreW - 8, laneY);
        ctx.moveTo(cx + 8, laneY + 14);
        ctx.lineTo(cx + coreW - 8, laneY + 14);
        ctx.stroke();

        ctx.fillStyle = '#64748b';
        ctx.font = '8px "JetBrains Mono", monospace';
        ctx.fillText('L2 CACHE (512KB)', cx + 8, cy + coreH - 8);
      }
    }

    // Packet Streams (Fabric traffic)
    siliconPackets.forEach(pkt => {
      pkt.progress += pkt.speed * (siliconMouse.activeCore !== -1 ? 1.8 : 1);
      if (pkt.progress > 1) {
        pkt.progress = 0;
        pkt.lane = Math.floor(Math.random() * 6);
      }

      const laneCol = pkt.lane % 3;
      const isTop = pkt.lane < 3;
      const xStart = margin + 10 + laneCol * (coreW + coreGap) + coreW / 2;
      const yStart = isTop ? margin + coreH + 8 : l3Y + l3H + 10;
      const yEnd = isTop ? l3Y : l3Y + l3H;
      const curY = isTop ? yStart + (yEnd - yStart) * pkt.progress : yStart - (yStart - yEnd) * pkt.progress;

      ctx.beginPath();
      ctx.arc(xStart, curY, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = pkt.color;
      ctx.shadowColor = pkt.color;
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    requestAnimationFrame(renderDie);
  }

  requestAnimationFrame(renderDie);
}

// ─────────────────────────────────────────────────────────────
// ⚡ Level 2 (L2) Continuous Double Auction Simulator (Apex Engine)
// ─────────────────────────────────────────────────────────────
const OB_STATE = {
  asks: [
    { price: 100.45, size: 840 },
    { price: 100.40, size: 620 },
    { price: 100.35, size: 450 },
    { price: 100.30, size: 310 },
    { price: 100.25, size: 180 }
  ],
  bids: [
    { price: 100.20, size: 220 },
    { price: 100.15, size: 380 },
    { price: 100.10, size: 510 },
    { price: 100.05, size: 730 },
    { price: 100.00, size: 950 }
  ],
  totalMatches: 0
};

function initOrderBookSimulator() {
  renderOrderBook();
}

function renderOrderBook() {
  const asksEl = document.getElementById('ob-asks');
  const bidsEl = document.getElementById('ob-bids');
  if (!asksEl || !bidsEl) return;

  const maxSize = Math.max(
    ...OB_STATE.asks.map(a => a.size),
    ...OB_STATE.bids.map(b => b.size)
  ) || 1000;

  let asksHtml = '';
  OB_STATE.asks.forEach(a => {
    const widthPct = Math.min(100, Math.round((a.size / maxSize) * 100));
    asksHtml += `
      <div class="ob-row">
        <span style="color:#ef4444; font-weight:700;">$${a.price.toFixed(2)}</span>
        <span style="color:#f8fafc;">${a.size}</span>
        <span style="color:#94a3b8; font-size:0.7rem;">${widthPct}%</span>
        <div class="ob-bar-bg ob-bar-ask" style="width: ${widthPct}%;"></div>
      </div>
    `;
  });
  asksEl.innerHTML = asksHtml;

  let bidsHtml = '';
  OB_STATE.bids.forEach(b => {
    const widthPct = Math.min(100, Math.round((b.size / maxSize) * 100));
    bidsHtml += `
      <div class="ob-row">
        <span style="color:#10b981; font-weight:700;">$${b.price.toFixed(2)}</span>
        <span style="color:#f8fafc;">${b.size}</span>
        <span style="color:#94a3b8; font-size:0.7rem;">${widthPct}%</span>
        <div class="ob-bar-bg ob-bar-bid" style="width: ${widthPct}%;"></div>
      </div>
    `;
  });
  bidsEl.innerHTML = bidsHtml;

  const bestAsk = OB_STATE.asks[OB_STATE.asks.length - 1]?.price || 100.25;
  const bestBid = OB_STATE.bids[0]?.price || 100.20;
  const spread = (bestAsk - bestBid).toFixed(2);
  const mid = ((bestAsk + bestBid) / 2).toFixed(3);
  const spreadEl = document.getElementById('ob-spread-info');
  if (spreadEl) {
    spreadEl.innerHTML = `SPREAD: $${spread} • MID: $${mid} • 50,000+ OPS/SEC FIFO MATCHING`;
  }
}

function injectOrder(side) {
  const t0 = performance.now();
  let fillPrice = 100.25;
  let fillQty = Math.floor(Math.random() * 60) + 40;

  if (side === 'BUY') {
    const bestAsk = OB_STATE.asks[OB_STATE.asks.length - 1];
    if (bestAsk) {
      fillPrice = bestAsk.price;
      bestAsk.size = Math.max(20, bestAsk.size - fillQty);
    }
  } else {
    const bestBid = OB_STATE.bids[0];
    if (bestBid) {
      fillPrice = bestBid.price;
      bestBid.size = Math.max(20, bestBid.size - fillQty);
    }
  }

  const t1 = performance.now();
  const latency = (t1 - t0).toFixed(3);

  OB_STATE.totalMatches++;
  const matchCountEl = document.getElementById('ob-match-count');
  if (matchCountEl) matchCountEl.textContent = `${OB_STATE.totalMatches} Matches`;

  const feedList = document.getElementById('ob-feed-list');
  if (feedList) {
    const row = document.createElement('div');
    row.className = 'ob-trade-row';
    const sideColor = side === 'BUY' ? '#10b981' : '#ef4444';
    row.innerHTML = `
      <span style="color:${sideColor}; font-weight:700;">${side}</span>
      <span style="color:#f8fafc;">${fillQty} @ $${fillPrice.toFixed(2)}</span>
      <span style="color:#64748b; font-size:0.72rem;">${latency}ms • FIFO</span>
    `;
    feedList.insertBefore(row, feedList.firstChild);
    if (feedList.children.length > 8) {
      feedList.removeChild(feedList.lastChild);
    }
  }

  renderOrderBook();
}
