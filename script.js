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

  'pr-list': `🌐 <span class="term-cyan">UPSTREAM OPEN SOURCE CONTRIBUTIONS (MERGED)</span>
<span class="term-dim">──────────────────────────────────────────────────────────────────────</span>
 <span class="term-green">[MERGED]</span> linuxmint/cinnamon#14021  - Compositor modal grab leak on destroy
 <span class="term-green">[MERGED]</span> juju/juju#23485           - Canonical Juju K8s dockerconfigjson tags
 <span class="term-cyan">[ACTIVE]</span> honojs/hono#5458          - TrieRouter wildcard edge-case routing
 <span class="term-green">[MERGED]</span> linuxmint/mintstick#156   - Async ISO verification &amp; mirror update
 <span class="term-green">[MERGED]</span> linuxmint/xed#760         - Explicit Gtk/Gdk/GtkSource typelib pinning
 <span class="term-green">[MERGED]</span> linuxmint/hypnotix#434    - Atomic channel logo download pipeline
 <span class="term-green">[MERGED]</span> shadcn-ui/ui#12120        - TooltipTrigger disabled prop forwarding
 <span class="term-green">[MERGED]</span> lucide-icons/lucide#4957  - Exported icon metadata across Svelte
<span class="term-dim">──────────────────────────────────────────────────────────────────────</span>`,

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
  <span class="term-cyan">pr-list</span>       - Upstream open-source pull requests ledger
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
});
