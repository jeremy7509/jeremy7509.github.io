const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DEFAULT_PASSWORD = process.argv[2] || 'Jeremy43209';
const SRC_DIR = path.join(__dirname, 'case-studies-src');
const DIST_DIR = __dirname;

const CASE_STUDIES = [
  {
    file: 'ai-workflows.html',
    badge: '01 · AI UXR',
    shortTitle: 'Scaling UX Research Rigor & Speed with AI Workflows',
    summary: 'Autonomous discovery agents, production survey-log joins, and 25 shared rules across 90 teams.'
  },
  {
    file: 'cross-os-rcs.html',
    badge: '02 · RCS 1B+',
    shortTitle: 'Cross-OS Messaging Friction & Scaling RCS',
    summary: '25+ studies across 13 methods driving 1B+ Android RCS users and contributing to iOS 18 interoperability.'
  },
  {
    file: 'benchmarking-premiumness.html',
    badge: '03 · Benchmarks',
    shortTitle: 'Annual Benchmarking & Premiumness Driver Modeling',
    summary: 'Multi-wave driver modeling (2023–2026) isolating what makes an app feel "premium" vs. "works fine."'
  },
  {
    file: 'admob.html',
    badge: '04 · Monetization UX',
    shortTitle: 'Rebuilding Google AdMob for App Businesses',
    summary: '1,267-publisher panel, 24 studies, mediation mental models, and the Google I/O 2017 platform overhaul.'
  }
];

function encryptPayload(plaintext, password) {
  const salt = crypto.randomBytes(16);
  const iv = crypto.randomBytes(12);
  const key = crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha256');
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();

  // WebCrypto format: salt(16) + iv(12) + encrypted + tag(16)
  const combined = Buffer.concat([salt, iv, encrypted, tag]);
  return combined.toString('base64');
}

function buildLockScreenHtml(study, encryptedBase64, originalMeta) {
  const pageTitle = originalMeta.title || `${study.shortTitle} | Jeremy Mendel, Ph.D.`;
  const pageDesc = originalMeta.desc || study.summary;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="dark">
  <meta name="description" content="Protected Case Study: ${pageDesc}">
  <title>🔒 ${pageTitle}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Newsreader:ital,opsz,wght@0,6..72,500;0,6..72,600;1,6..72,400&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    :root {
      color-scheme: dark;
      --bg-canvas: #0b0f17;
      --bg-surface: #131b2b;
      --bg-elevated: #1e293b;
      --text-primary: #f8fafc;
      --text-secondary: #cbd5e1;
      --text-muted: #94a3b8;
      --accent-amber: #f59e0b;
      --accent-amber-bright: #fbbf24;
      --accent-amber-soft: rgba(245, 158, 11, 0.12);
      --accent-amber-border: rgba(245, 158, 11, 0.32);
      --accent-teal: #2dd4bf;
      --border-subtle: rgba(148, 163, 184, 0.16);
      --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      --font-serif: 'Newsreader', Georgia, serif;
      --font-mono: 'JetBrains Mono', ui-monospace, monospace;
      --radius-sm: 0.5rem;
      --radius-md: 0.875rem;
      --radius-lg: 1.25rem;
      --container-max: 74rem;
    }

    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background-color: var(--bg-canvas);
      color: var(--text-primary);
      font-family: var(--font-sans);
      line-height: 1.6;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      position: relative;
      overflow-x: hidden;
    }

    .ambient-glow {
      position: fixed;
      top: -18rem;
      left: 50%;
      transform: translateX(-50%);
      width: 68rem;
      height: 38rem;
      background: radial-gradient(ellipse at center, rgba(245, 158, 11, 0.12) 0%, rgba(45, 212, 191, 0.08) 45%, transparent 75%);
      pointer-events: none;
      z-index: -1;
      filter: blur(52px);
    }

    .container {
      width: min(100% - 2.5rem, var(--container-max));
      margin-inline: auto;
    }

    /* Site Header */
    .site-header {
      position: sticky;
      top: 0;
      z-index: 50;
      backdrop-filter: blur(14px);
      background-color: rgba(11, 15, 23, 0.85);
      border-bottom: 1px solid var(--border-subtle);
    }

    .header-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 4.25rem;
      gap: 1rem;
    }

    .brand-logo {
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
      font-weight: 600;
      font-size: 1rem;
      color: var(--text-primary);
      text-decoration: none;
    }

    .brand-mark {
      width: 0.65rem;
      height: 0.65rem;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--accent-amber), var(--accent-teal));
    }

    .brand-role {
      font-family: var(--font-mono);
      font-size: 0.8rem;
      font-weight: 400;
      color: var(--text-muted);
    }

    .back-link {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--text-secondary);
      text-decoration: none;
      padding: 0.45rem 0.85rem;
      border-radius: var(--radius-sm);
      border: 1px solid var(--border-subtle);
      transition: all 180ms ease;
    }

    .back-link:hover {
      color: var(--text-primary);
      border-color: var(--accent-amber-border);
      background: rgba(255, 255, 255, 0.04);
    }

    /* Lock Screen Layout */
    .lock-main {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: clamp(2rem, 5vw, 4.5rem) 1.25rem;
    }

    .lock-card {
      width: min(100%, 30rem);
      background-color: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      padding: clamp(1.75rem, 4vw, 2.5rem);
      box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.65);
      position: relative;
    }

    .lock-icon-wrap {
      width: 3.25rem;
      height: 3.25rem;
      border-radius: 50%;
      background: var(--accent-amber-soft);
      border: 1px solid var(--accent-amber-border);
      color: var(--accent-amber-bright);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1.25rem;
    }

    .lock-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--accent-amber-bright);
      background: var(--accent-amber-soft);
      border: 1px solid var(--accent-amber-border);
      padding: 0.25rem 0.65rem;
      border-radius: 9999px;
      margin-bottom: 0.85rem;
    }

    .lock-title {
      font-size: clamp(1.35rem, 2.5vw, 1.65rem);
      font-weight: 700;
      line-height: 1.25;
      letter-spacing: -0.015em;
      color: var(--text-primary);
      margin-bottom: 0.65rem;
    }

    .lock-lead {
      font-size: 0.9rem;
      color: var(--text-secondary);
      line-height: 1.5;
      margin-bottom: 1.75rem;
    }

    .auth-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .input-group {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
    }

    .input-label {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--text-muted);
    }

    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }

    .passcode-input {
      width: 100%;
      padding: 0.75rem 3rem 0.75rem 1rem;
      background: var(--bg-canvas);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      color: var(--text-primary);
      font-family: var(--font-sans);
      font-size: 1rem; /* >=16px prevents iOS zoom */
      transition: border-color 160ms ease, box-shadow 160ms ease;
    }

    .passcode-input:focus {
      outline: none;
      border-color: var(--accent-amber);
      box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.2);
    }

    .toggle-pwd-btn {
      position: absolute;
      right: 0.65rem;
      background: none;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      padding: 0.35rem;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      transition: color 150ms ease;
    }

    .toggle-pwd-btn:hover {
      color: var(--text-primary);
    }

    .remember-row {
      display: flex;
      align-items: center;
      gap: 0.55rem;
      font-size: 0.825rem;
      color: var(--text-secondary);
      cursor: pointer;
      user-select: none;
    }

    .remember-row input[type="checkbox"] {
      width: 1rem;
      height: 1rem;
      accent-color: var(--accent-amber);
      cursor: pointer;
    }

    .btn-unlock {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      min-height: 2.85rem;
      padding: 0.65rem 1.4rem;
      background: linear-gradient(135deg, #fbbf24, #f59e0b);
      color: #0b0f17;
      font-size: 0.95rem;
      font-weight: 600;
      border: none;
      border-radius: var(--radius-sm);
      cursor: pointer;
      box-shadow: 0 4px 18px -3px rgba(245, 158, 11, 0.4);
      transition: transform 160ms ease, box-shadow 160ms ease, opacity 160ms ease;
    }

    .btn-unlock:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 6px 22px -3px rgba(245, 158, 11, 0.55);
    }

    .btn-unlock:disabled {
      opacity: 0.65;
      cursor: not-allowed;
    }

    .auth-error {
      font-size: 0.825rem;
      color: #f87171;
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.25);
      border-radius: var(--radius-sm);
      padding: 0.55rem 0.85rem;
      display: none;
    }

    .auth-error.visible {
      display: block;
    }

    .auth-status {
      font-size: 0.825rem;
      color: var(--accent-teal);
      background: rgba(45, 212, 191, 0.1);
      border: 1px solid rgba(45, 212, 191, 0.25);
      border-radius: var(--radius-sm);
      padding: 0.55rem 0.85rem;
      display: none;
      align-items: center;
      gap: 0.45rem;
    }

    .auth-status.visible {
      display: flex;
    }

    .card-footer {
      margin-top: 1.5rem;
      padding-top: 1.25rem;
      border-top: 1px solid var(--border-subtle);
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      gap: 0.75rem;
      font-size: 0.785rem;
      color: var(--text-muted);
    }

    .card-footer a {
      color: var(--text-secondary);
      text-decoration: none;
      transition: color 150ms ease;
    }

    .card-footer a:hover {
      color: var(--accent-amber);
    }

    /* Site Footer */
    .site-footer {
      border-top: 1px solid var(--border-subtle);
      padding-block: 1.75rem;
      font-size: 0.85rem;
      color: var(--text-muted);
    }

    .footer-inner {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
    }

    .footer-links {
      display: flex;
      gap: 1.5rem;
      list-style: none;
    }

    .footer-links a {
      color: var(--text-secondary);
      text-decoration: none;
    }

    .footer-links a:hover {
      color: var(--accent-amber);
    }
  </style>
</head>
<body>
  <div class="ambient-glow" aria-hidden="true"></div>

  <header class="site-header">
    <div class="container header-inner">
      <a href="index.html" class="brand-logo" aria-label="Jeremy Mendel, Ph.D. Home">
        <span class="brand-mark" aria-hidden="true"></span>
        <span>Jeremy Mendel, Ph.D. <span class="brand-role">/ UX Research Leader</span></span>
      </a>
      <a href="index.html#featured-work" class="back-link">
        <span aria-hidden="true">&larr;</span> All Work
      </a>
    </div>
  </header>

  <main class="lock-main">
    <div class="lock-card">
      <div class="lock-icon-wrap" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
      </div>

      <div class="lock-badge">
        <span>${study.badge} &middot; Protected Study</span>
      </div>

      <h1 class="lock-title">${study.shortTitle}</h1>
      <p class="lock-lead">This editorial case study contains Google Messages research methodologies, competitive driver modeling, and product artifacts. Please enter the passcode to decrypt and read the full case study.</p>

      <div id="auth-status" class="auth-status" role="status" aria-live="polite">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" class="spin"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle><path d="M12 2a10 10 0 0 1 10 10"></path></svg>
        <span>Saved session detected &mdash; unlocking case study...</span>
      </div>

      <form id="auth-form" class="auth-form" novalidate>
        <div class="input-group">
          <label for="passcode-input" class="input-label">Case Study Passcode</label>
          <div class="input-wrapper">
            <input type="password" id="passcode-input" class="passcode-input" placeholder="Enter passcode" required autofocus autocomplete="current-password">
            <button type="button" id="toggle-pwd-btn" class="toggle-pwd-btn" aria-label="Show passcode">
              <svg id="eye-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            </button>
          </div>
        </div>

        <label class="remember-row">
          <input type="checkbox" id="remember-box" checked>
          <span>Keep all case studies unlocked for this browsing session</span>
        </label>

        <div id="auth-error" class="auth-error" role="alert" aria-live="polite"></div>

        <button type="submit" id="unlock-btn" class="btn-unlock">
          <span>Unlock Case Study</span>
          <svg aria-hidden="true" viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 10h10m-4-4l4 4-4 4"/></svg>
        </button>
      </form>

      <div class="card-footer">
        <a href="index.html#featured-work">&larr; Return to Portfolio</a>
        <a href="mailto:Jeremy.Mendel@gmail.com?subject=Case%20Study%20Passcode%20Request">Request Passcode Access</a>
      </div>
    </div>
  </main>

  <footer class="site-footer">
    <div class="container footer-inner">
      <p>&copy; 2026 Jeremy Mendel, Ph.D. &middot; Greater Seattle Area.</p>
      <ul class="footer-links">
        <li><a href="index.html">Home</a></li>
        <li><a href="mailto:Jeremy.Mendel@gmail.com">Jeremy.Mendel@gmail.com</a></li>
        <li><a href="https://www.linkedin.com/in/jeremymendel/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
      </ul>
    </div>
  </footer>

  <script id="encrypted-payload" type="application/json">
    ${JSON.stringify({ payload: encryptedBase64 })}
  </script>

  <script>
    (function () {
      const STORAGE_KEY = 'uxr_portfolio_passcode';
      const form = document.getElementById('auth-form');
      const input = document.getElementById('passcode-input');
      const unlockBtn = document.getElementById('unlock-btn');
      const errorEl = document.getElementById('auth-error');
      const statusEl = document.getElementById('auth-status');
      const togglePwdBtn = document.getElementById('toggle-pwd-btn');
      const rememberBox = document.getElementById('remember-box');

      togglePwdBtn.addEventListener('click', () => {
        const isPassword = input.type === 'password';
        input.type = isPassword ? 'text' : 'password';
        togglePwdBtn.setAttribute('aria-label', isPassword ? 'Hide passcode' : 'Show passcode');
        togglePwdBtn.style.color = isPassword ? 'var(--accent-amber)' : 'var(--text-muted)';
      });

      async function decryptData(base64Payload, password) {
        const raw = Uint8Array.from(atob(base64Payload), c => c.charCodeAt(0));
        const salt = raw.subarray(0, 16);
        const iv = raw.subarray(16, 28);
        const ciphertextAndTag = raw.subarray(28);

        const enc = new TextEncoder();
        const keyMaterial = await window.crypto.subtle.importKey(
          'raw',
          enc.encode(password),
          { name: 'PBKDF2' },
          false,
          ['deriveKey']
        );

        const key = await window.crypto.subtle.deriveKey(
          {
            name: 'PBKDF2',
            salt: salt,
            iterations: 100000,
            hash: 'SHA-256'
          },
          keyMaterial,
          { name: 'AES-GCM', length: 256 },
          false,
          ['decrypt']
        );

        const decrypted = await window.crypto.subtle.decrypt(
          { name: 'AES-GCM', iv: iv },
          key,
          ciphertextAndTag
        );

        return new TextDecoder().decode(decrypted);
      }

      async function attemptUnlock(password, isAuto = false) {
        errorEl.classList.remove('visible');
        errorEl.textContent = '';

        if (!password) {
          errorEl.textContent = 'Please enter a passcode.';
          errorEl.classList.add('visible');
          return;
        }

        if (isAuto) {
          statusEl.classList.add('visible');
          form.style.opacity = '0.5';
          form.style.pointerEvents = 'none';
        } else {
          unlockBtn.disabled = true;
          unlockBtn.textContent = 'Verifying passcode...';
        }

        try {
          const payloadEl = document.getElementById('encrypted-payload');
          const { payload } = JSON.parse(payloadEl.textContent);
          const decryptedHtml = await decryptData(payload, password);

          if (rememberBox && rememberBox.checked) {
            try {
              sessionStorage.setItem(STORAGE_KEY, password);
            } catch {}
          }

          // Replace entire document with decrypted HTML
          document.open();
          document.write(decryptedHtml);
          document.close();

          // Ensure palettes and other scripts are initialized if not auto-executed
          setTimeout(() => {
            if (!document.getElementById('palette-dock')) {
              const palScript = document.createElement('script');
              palScript.src = 'palettes.js?v=20261109h';
              palScript.defer = true;
              document.body.appendChild(palScript);
            }
          }, 80);

        } catch (err) {
          if (isAuto) {
            statusEl.classList.remove('visible');
            form.style.opacity = '1';
            form.style.pointerEvents = 'auto';
            try { sessionStorage.removeItem(STORAGE_KEY); } catch {}
          } else {
            unlockBtn.disabled = false;
            unlockBtn.innerHTML = '<span>Unlock Case Study</span><svg aria-hidden="true" viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 10h10m-4-4l4 4-4 4"/></svg>';
            errorEl.textContent = 'Incorrect passcode. Please check and try again.';
            errorEl.classList.add('visible');
            input.focus();
            input.select();
          }
        }
      }

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        attemptUnlock(input.value.trim(), false);
      });

      // Auto-unlock if session password exists
      try {
        const saved = sessionStorage.getItem(STORAGE_KEY);
        if (saved) {
          input.value = saved;
          attemptUnlock(saved, true);
        }
      } catch {}
    })();
  </script>
</body>
</html>`;
}

function run() {
  if (!fs.existsSync(SRC_DIR)) {
    console.error('Source directory not found:', SRC_DIR);
    process.exit(1);
  }

  console.log(`Encrypting 4 case studies with AES-256-GCM...`);

  CASE_STUDIES.forEach((study) => {
    const srcPath = path.join(SRC_DIR, study.file);
    const destPath = path.join(DIST_DIR, study.file);

    if (!fs.existsSync(srcPath)) {
      console.warn(`Skipping missing source file: ${srcPath}`);
      return;
    }

    const plaintext = fs.readFileSync(srcPath, 'utf8');

    const titleMatch = plaintext.match(/<title>([^<]+)<\/title>/i);
    const descMatch = plaintext.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);

    const originalMeta = {
      title: titleMatch ? titleMatch[1].trim() : study.shortTitle,
      desc: descMatch ? descMatch[1].trim() : study.summary
    };

    const encryptedBase64 = encryptPayload(plaintext, DEFAULT_PASSWORD);
    const lockScreenHtml = buildLockScreenHtml(study, encryptedBase64, originalMeta);

    fs.writeFileSync(destPath, lockScreenHtml, 'utf8');
    console.log(` Encrypted: ${study.file} (Original: ${(plaintext.length / 1024).toFixed(1)} KB -> Lockfile: ${(lockScreenHtml.length / 1024).toFixed(1)} KB)`);
  });

  console.log('All 4 case studies successfully encrypted.');
}

run();
