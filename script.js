/**
 * Ronit Gupta Portfolio - Core Interactive Engine
 * Pure Vanilla JavaScript • Zero Dependencies • Accessible
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initTerminal();
  initKDTree();
  initOSSFilter();
  initSpotlight();
  initCmdPalette();
  initCopyActions();
});

// 1. Mobile Navigation
function initNavbar() {
  const hamburger = document.getElementById('hamburgerBtn');
  const navLinks = document.getElementById('navLinks');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Auto-close on click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}

// 2. Interactive Terminal Simulator
function initTerminal() {
  const form = document.getElementById('termForm');
  const input = document.getElementById('termInput');
  const history = document.getElementById('termHistory');
  const body = document.getElementById('termBody');
  const chips = document.querySelectorAll('.chip');
  if (!form || !input || !history) return;

  const COMMANDS = {
    whoami: `<span class="term-white">Ronit Gupta</span> — Systems &amp; Distributed Backend Software Engineer
<span class="term-dim">• Education:</span> CSBS @ Netaji Subhash Engineering College, Kolkata (Batch 2027)
<span class="term-dim">• Focus:</span> Concurrency (Java 21 Loom, Rust), In-Memory Indexes (HNSW, KD-Tree), Linux Internals
<span class="term-green">✔ Status: Actively open for SDE-1 / Systems / Backend Engineering roles.</span>`,

    benchmarks: `🚀 <span class="term-cyan">VERIFIED SYSTEMS BENCHMARKS</span>
<span class="term-dim">──────────────────────────────────────────────────────────────────</span>
<span class="term-green">• Bharat Spatial Engine:</span> 38,400+ QPS (2D KD-Tree across 650k Indian settlements)
<span class="term-green">• Vectra Core:</span>           16,900+ QPS (HNSW ANN vector retrieval, 0.28ms latency)
<span class="term-green">• Apex Matching Engine:</span>  50,000+ Ops (FIFO continuous double auction book)
<span class="term-green">• Aero Linux Memory:</span>     2.82x Ratio (zRAM ZSTD in-memory stream compression)
<span class="term-dim">──────────────────────────────────────────────────────────────────</span>
<span class="term-dim">All benchmarks reproducible from source in Java 21 Loom, Rust, and C.</span>`,

    oss: `🌐 <span class="term-cyan">UPSTREAM DISTRIBUTED SYSTEMS TRACK RECORD</span>
<span class="term-dim">──────────────────────────────────────────────────────────────────</span>
<span class="term-green">• redisson/redisson#7390 (MERGED):</span>  RBatch MapOptions variants across sync, reactive, RxJava
<span class="term-cyan">• redisson/redisson#7392:</span>          Distributed transaction replica sync verification (WAIT check)
<span class="term-cyan">• redisson/redisson#7393:</span>          Spring Boot auto-config for Sentinel/Cluster readMode
<span class="term-cyan">• redisson/redisson#7394:</span>          RReliableTopic renewal resiliency &amp; Lua numeric formatting
<span class="term-cyan">• redisson/redisson#7395:</span>          RTransaction.getMap &amp; getMapCache options overloads
<span class="term-cyan">• redisson/redisson#7396:</span>          Configurable topicName in RedissonSessionManager (Tomcat 7-11)
<span class="term-cyan">• redisson/redisson#7397:</span>          Extended AutoCloseable on RDestroyable (try-with-resources)
<span class="term-cyan">• redis/go-redis#4114:</span>             Bounded OpenTelemetry statement truncation (37/37 CI passed)
<span class="term-cyan">• redis/lettuce#3956:</span>              SharedLock exclusive spin pause backoff with Java 8/9+ parity
<span class="term-cyan">• valkey-io/valkey#4897:</span>           SENTINEL aclfile command validation in Valkey server
<span class="term-dim">──────────────────────────────────────────────────────────────────</span>`,

    flagships: `📦 <span class="term-cyan">FLAGSHIP SYSTEMS ARCHITECTURES</span>
<span class="term-dim">──────────────────────────────────────────────────────────────────</span>
<span class="term-white">• Aero Linux:</span>            Developer OS, sub-350MB idle RAM, 59 GTK3 apps, 133 tests
<span class="term-white">• agent-2pc:</span>             Two-Phase Commit (2PC) &amp; binary WAL engine in Rust (Crates.io)
<span class="term-white">• burnrate:</span>              Terminal HUD &amp; budget circuit breakers in Rust (Crates.io)
<span class="term-white">• Vectra Core:</span>           In-memory vector database with HNSW graph in Java 21 Loom
<span class="term-white">• Bharat Spatial:</span>        2D KD-Tree geospatial hierarchy across 650k census nodes
<span class="term-white">• FinFlow Core:</span>          Spring Boot 3.3.5 &amp; PostgreSQL 16 API [<a href="https://finflow-core.onrender.com" target="_blank" style="color:#10b981;">Live API ↗</a>]
<span class="term-white">• Dine Luxe:</span>             Next.js 15 &amp; Redis Mutex restaurant OS [<a href="https://frontend-ten-phi-hzgzlmvvm9.vercel.app" target="_blank" style="color:#10b981;">Live App ↗</a>]
<span class="term-dim">──────────────────────────────────────────────────────────────────</span>`,

    specs: `💻 <span class="term-cyan">WORKSTATION RIG SPECIFICATION</span>
<span class="term-dim">──────────────────────────────────────────────────────────────────</span>
• Host CPU:    AMD Ryzen 5 5600H (6 Cores / 12 Threads @ 4.2 GHz Boost)
• RAM / zRAM:  15.3 GB Physical DDR4 + 7.5 GB Dynamic In-Memory zRAM ZSTD
• OS / Kernel: Linux Mint / Aero Linux (Custom Kernel 7.0 / Wayland)
• Battery:     ACPI 80% charge threshold via TLP (zero SSD disk swap wear)
• Concurrency: Java 21 Project Loom (Virtual Threads), Rust tokio, Go
<span class="term-dim">──────────────────────────────────────────────────────────────────</span>`,

    contact: `📬 <span class="term-cyan">CONNECT DIRECTLY</span>
<span class="term-dim">──────────────────────────────────────────────────────────────────</span>
• Email:    <a href="mailto:ronitgupta138@gmail.com" style="color:#06b6d4;">ronitgupta138@gmail.com</a>
• LinkedIn: <a href="https://linkedin.com/in/ronitgupta138" target="_blank" style="color:#38bdf8;">linkedin.com/in/ronitgupta138</a>
• GitHub:   <a href="https://github.com/ronitgupta138" target="_blank" style="color:#f8fafc;">github.com/ronitgupta138</a>
• Location: Kolkata, West Bengal, India 🇮🇳
<span class="term-dim">──────────────────────────────────────────────────────────────────</span>`,

    help: `Available commands:
  <span class="term-cyan">whoami</span>        - Background, education, and career focus
  <span class="term-cyan">flagships</span>     - Flagship backend architectures and packages
  <span class="term-cyan">oss</span>           - Upstream open-source contributions &amp; PRs
  <span class="term-cyan">benchmarks</span>    - Real-world in-memory QPS &amp; latency metrics
  <span class="term-cyan">specs</span>         - Workstation hardware &amp; Linux configuration
  <span class="term-cyan">contact</span>       - Direct email and professional profiles
  <span class="term-cyan">clear</span>         - Clear the terminal screen`
  };

  COMMANDS.projects = COMMANDS.flagships;
  COMMANDS.architecture = COMMANDS.flagships;
  COMMANDS.ls = `<span class="term-cyan">flagships/</span>  <span class="term-cyan">oss/</span>  <span class="term-white">workstation.config.sys</span>  <span class="term-emerald">benchmarks.log</span>`;

  const historyStack = [];
  let historyIdx = -1;

  function executeCmd(cmdText) {
    cmdText = cmdText.trim();
    if (!cmdText) return;

    if (cmdText.toLowerCase() === 'clear') {
      history.innerHTML = '';
      input.value = '';
      return;
    }

    const output = COMMANDS[cmdText.toLowerCase()] || 
      `<span class="term-amber">command not found: ${escapeHtml(cmdText)}</span>. Type <span class="term-cyan">'help'</span> for available commands.`;

    const row = document.createElement('div');
    row.className = 'term-line';
    row.innerHTML = `<div><span class="term-prompt">ronit@workstation:~$</span> ${escapeHtml(cmdText)}</div><div>${output}</div>`;
    history.appendChild(row);

    historyStack.push(cmdText);
    historyIdx = historyStack.length;
    input.value = '';

    if (body) {
      body.scrollTop = body.scrollHeight;
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    executeCmd(input.value);
  });

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      if (cmd) executeCmd(cmd);
    });
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
      if (historyIdx > 0) {
        historyIdx--;
        input.value = historyStack[historyIdx] || '';
      }
      e.preventDefault();
    } else if (e.key === 'ArrowDown') {
      if (historyIdx < historyStack.length - 1) {
        historyIdx++;
        input.value = historyStack[historyIdx] || '';
      } else {
        historyIdx = historyStack.length;
        input.value = '';
      }
      e.preventDefault();
    }
  });

  const heroTermBtn = document.getElementById('heroTerminalBtn');
  if (heroTermBtn) {
    heroTermBtn.addEventListener('click', () => {
      document.getElementById('terminal')?.scrollIntoView({ behavior: 'smooth' });
      input.focus();
    });
  }
}

// 3. 2D KD-Tree Spatial Partitioning Simulator
function initKDTree() {
  const canvas = document.getElementById('kdtreeCanvas');
  const hubEl = document.getElementById('kdHub');
  const mddsEl = document.getElementById('kdMdds');
  const distEl = document.getElementById('kdDist');
  const prunedEl = document.getElementById('kdPruned');
  const reseedBtn = document.getElementById('reseedBtn');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  const SEED_NODES = [
    { name: "Kolkata (NSEC Hub)", mdds: "312011", x: 0.78, y: 0.52 },
    { name: "Howrah District", mdds: "312015", x: 0.75, y: 0.55 },
    { name: "Bengaluru Tech Corridor", mdds: "512001", x: 0.44, y: 0.80 },
    { name: "Hyderabad Cyberabad", mdds: "411002", x: 0.49, y: 0.67 },
    { name: "Mumbai Nariman Point", mdds: "421001", x: 0.22, y: 0.62 },
    { name: "Pune Hinjewadi", mdds: "421005", x: 0.26, y: 0.66 },
    { name: "Delhi Connaught Place", mdds: "110001", x: 0.42, y: 0.28 },
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
    { name: "Varanasi BHU Area", mdds: "221001", x: 0.57, y: 0.41 }
  ];

  let nodes = [...SEED_NODES];
  let kdTreeRoot = null;
  let cursor = null;

  function buildTree(points, depth = 0, bounds = { xMin: 0, xMax: 1, yMin: 0, yMax: 1 }) {
    if (points.length === 0) return null;
    const axis = depth % 2;
    points.sort((a, b) => (axis === 0 ? a.x - b.x : a.y - b.y));
    const mid = Math.floor(points.length / 2);
    const node = points[mid];

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
      left: buildTree(points.slice(0, mid), depth + 1, leftBounds),
      right: buildTree(points.slice(mid + 1), depth + 1, rightBounds)
    };
  }

  function findKNN(node, target, best = { node: null, distSq: Infinity, hops: 0, pruned: 0 }) {
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

    findKNN(first, target, best);

    if (axisDiff * axisDiff < best.distSq) {
      findKNN(second, target, best);
    } else {
      best.pruned++;
    }

    return best;
  }

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = 220 * dpr;
    ctx.resetTransform?.();
    ctx.scale(dpr, dpr);
    render();
  }

  window.addEventListener('resize', resize);

  function render() {
    const rect = canvas.getBoundingClientRect();
    const W = rect.width;
    const H = 220;
    ctx.clearRect(0, 0, W, H);

    // Subtle grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    for (let x = 0; x < W; x += 35) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let y = 0; y < H; y += 35) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }

    // Draw tree split planes
    function drawSplits(node) {
      if (!node) return;
      const b = node.bounds;
      const px = node.point.x * W;
      const py = node.point.y * H;

      ctx.lineWidth = 1;
      if (node.axis === 0) {
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.22)';
        ctx.beginPath();
        ctx.moveTo(px, b.yMin * H);
        ctx.lineTo(px, b.yMax * H);
        ctx.stroke();
      } else {
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.22)';
        ctx.beginPath();
        ctx.moveTo(b.xMin * W, py);
        ctx.lineTo(b.xMax * W, py);
        ctx.stroke();
      }
      drawSplits(node.left);
      drawSplits(node.right);
    }
    drawSplits(kdTreeRoot);

    // Draw settlement nodes
    nodes.forEach(p => {
      const px = p.x * W;
      const py = p.y * H;
      ctx.beginPath();
      ctx.arc(px, py, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#10b981';
      ctx.fill();
    });

    // Cursor nearest search
    if (cursor && kdTreeRoot) {
      const knn = findKNN(kdTreeRoot, cursor);
      const cx = cursor.x * W;
      const cy = cursor.y * H;

      if (knn.node) {
        const nx = knn.node.x * W;
        const ny = knn.node.y * H;
        const distPx = Math.sqrt((cx - nx) * (cx - nx) + (cy - ny) * (cy - ny));

        // Bounding circle
        ctx.beginPath();
        ctx.arc(cx, cy, distPx, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.25)';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Laser line
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(nx, ny);
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Highlight
        ctx.beginPath();
        ctx.arc(nx, ny, 5.5, 0, Math.PI * 2);
        ctx.fillStyle = '#f59e0b';
        ctx.fill();

        // HUD updates
        if (hubEl) hubEl.textContent = knn.node.name;
        if (mddsEl) mddsEl.textContent = knn.node.mdds;
        if (distEl) distEl.textContent = `${(Math.sqrt(knn.distSq) * 100).toFixed(1)} km`;
        if (prunedEl) prunedEl.textContent = `${knn.pruned} subtrees`;
      }

      // Crosshair
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(cx - 6, cy); ctx.lineTo(cx + 6, cy); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx, cy - 6); ctx.lineTo(cx, cy + 6); ctx.stroke();
    }
  }

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    cursor = { x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) };
    render();
  });

  canvas.addEventListener('mouseleave', () => {
    cursor = null;
    render();
  });

  // Dynamic point insertion on click
  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    const newNode = {
      name: `Custom Node #${nodes.length + 1}`,
      mdds: `99${Math.floor(1000 + Math.random() * 9000)}`,
      x: Math.max(0.05, Math.min(0.95, x)),
      y: Math.max(0.05, Math.min(0.95, y))
    };
    
    nodes.push(newNode);
    kdTreeRoot = buildTree([...nodes]);
    cursor = { x: newNode.x, y: newNode.y };
    render();
  });

  const resetBtn = document.getElementById('resetTreeBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      nodes = [...SEED_NODES];
      kdTreeRoot = buildTree([...nodes]);
      render();
    });
  }

  if (reseedBtn) {
    reseedBtn.addEventListener('click', () => {
      nodes = SEED_NODES.map(p => ({
        ...p,
        x: Math.max(0.08, Math.min(0.92, p.x + (Math.random() - 0.5) * 0.12)),
        y: Math.max(0.08, Math.min(0.92, p.y + (Math.random() - 0.5) * 0.12))
      }));
      kdTreeRoot = buildTree([...nodes]);
      render();
    });
  }

  kdTreeRoot = buildTree([...nodes]);
  resize();
}

// 4. Upstream OSS Filter Engine
function initOSSFilter() {
  const chips = document.querySelectorAll('.oss-filter-chip');
  const cards = document.querySelectorAll('.oss-showcase-card');
  if (!chips.length || !cards.length) return;

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const filter = chip.getAttribute('data-filter');
      cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.classList.remove('filtered-out');
        } else {
          card.classList.add('filtered-out');
        }
      });
    });
  });
}

// 4. Hardware-Accelerated Spotlight Cards
function initSpotlight() {
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

// 5. Command Palette (Cmd+K / Ctrl+K)
function initCmdPalette() {
  const backdrop = document.getElementById('cmdBackdrop');
  const trigger = document.getElementById('cmdBtn');
  const closeKbd = document.getElementById('cmdCloseKbd');
  const field = document.getElementById('cmdField');
  const list = document.getElementById('cmdList');
  if (!backdrop || !field || !list) return;

  const ACTIONS = [
    { label: "📦 Jump to Flagships", group: "Navigation", run: () => scrollTo('flagships') },
    { label: "🌐 View Upstream OSS", group: "Navigation", run: () => scrollTo('upstream') },
    { label: "⚡ Interactive Proofs", group: "Navigation", run: () => scrollTo('interactive') },
    { label: "💻 Workstation Specs", group: "Navigation", run: () => scrollTo('workstation') },
    { label: "💻 Launch Simulator", group: "Actions", run: () => { scrollTo('terminal'); document.getElementById('termInput')?.focus(); } },
    { label: "📋 Copy Email to Clipboard", group: "Actions", run: () => copyEmailToClipboard() },
    { label: "↗ Open GitHub Profile", group: "External", run: () => window.open('https://github.com/ronitgupta138', '_blank') },
    { label: "↗ Open LinkedIn Profile", group: "External", run: () => window.open('https://linkedin.com/in/ronitgupta138', '_blank') }
  ];

  let filtered = [...ACTIONS];
  let selected = 0;

  function renderRows() {
    list.innerHTML = '';
    let currentGroup = '';

    filtered.forEach((item, idx) => {
      if (item.group !== currentGroup) {
        currentGroup = item.group;
        const groupEl = document.createElement('div');
        groupEl.className = 'cmd-group';
        groupEl.textContent = currentGroup;
        list.appendChild(groupEl);
      }

      const row = document.createElement('div');
      row.className = `cmd-row ${idx === selected ? 'active' : ''}`;
      row.innerHTML = `<span class="cmd-row-title">${item.label}</span><kbd>↵</kbd>`;
      row.addEventListener('click', () => {
        closePalette();
        item.run();
      });
      row.addEventListener('mouseenter', () => {
        selected = idx;
        updateSelected();
      });
      list.appendChild(row);
    });
  }

  function updateSelected() {
    const rows = list.querySelectorAll('.cmd-row');
    rows.forEach((r, i) => r.classList.toggle('active', i === selected));
  }

  function openPalette() {
    backdrop.classList.add('open');
    field.value = '';
    filtered = [...ACTIONS];
    selected = 0;
    renderRows();
    field.focus();
  }

  function closePalette() {
    backdrop.classList.remove('open');
  }

  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  trigger?.addEventListener('click', openPalette);
  closeKbd?.addEventListener('click', closePalette);
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closePalette();
  });

  field.addEventListener('input', () => {
    const q = field.value.toLowerCase().trim();
    filtered = ACTIONS.filter(a => a.label.toLowerCase().includes(q) || a.group.toLowerCase().includes(q));
    selected = 0;
    renderRows();
  });

  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      backdrop.classList.contains('open') ? closePalette() : openPalette();
    } else if (e.key === 'Escape') {
      closePalette();
    } else if (backdrop.classList.contains('open')) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (selected < filtered.length - 1) {
          selected++;
          updateSelected();
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (selected > 0) {
          selected--;
          updateSelected();
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selected]) {
          closePalette();
          filtered[selected].run();
        }
      }
    }
  });
}

// 6. 1-Click Copy & Toast Notifications
function initCopyActions() {
  const heroCopy = document.getElementById('heroCopyEmailBtn');
  const footerCopy = document.getElementById('footerCopyEmail');

  heroCopy?.addEventListener('click', copyEmailToClipboard);
  footerCopy?.addEventListener('click', copyEmailToClipboard);
}

function copyEmailToClipboard() {
  const email = 'ronitgupta138@gmail.com';
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(email).then(() => showToast('Email copied: ' + email));
  } else {
    const ta = document.createElement('textarea');
    ta.value = email;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      showToast('Email copied: ' + email);
    } catch (err) {
      console.error(err);
    }
    document.body.removeChild(ta);
  }
}

function showToast(msg) {
  const toast = document.getElementById('toastBubble');
  const txt = document.getElementById('toastTxt');
  if (!toast || !txt) return;

  txt.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (m) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[m]));
}
