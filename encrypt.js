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
    summary: 'Autonomous discovery agents, production survey-log joins, and 25 shared rules across dozens of teams.'
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
    summary: '1,200+ publisher panel, 24 studies, mediation mental models, and the Google I/O 2017 platform overhaul.'
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
  <meta name="robots" content="noindex, nofollow">
  <meta name="description" content="Protected Case Study: ${pageDesc}">
  <title>🔒 ${pageTitle}</title>
  <link rel="icon" type="image/svg+xml" href="favicon.svg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    :root {
      color-scheme: dark;
      --bg-canvas: #0b0f17;
      --bg-surface: #111827;
      --bg-elevated: #182234;
      --text-primary: #f1f5f9;
      --text-secondary: #cbd5e1;
      --text-muted: #94a3b8;
      --accent-amber: #38bdf8;
      --accent-amber-bright: #7dd3fc;
      --accent-teal: #34d399;
      --border-subtle: #1e293b;
      --border-strong: #334155;
      --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      --font-serif: 'Newsreader', Georgia, serif;
      --radius-sm: 0.375rem;
      --radius-md: 0.625rem;
      --container-max: 70rem;
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
      min-height: 100dvh;
      display: flex;
      flex-direction: column;
      overflow-x: clip;
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
      background-color: var(--bg-canvas);
      border-bottom: 1px solid var(--border-subtle);
    }

    .header-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 4rem;
      gap: 1rem;
    }

    .brand-logo {
      font-weight: 600;
      font-size: 0.975rem;
      letter-spacing: -0.01em;
      color: var(--text-primary);
      text-decoration: none;
    }

    .brand-logo:hover {
      color: var(--accent-amber-bright);
    }

    .back-link {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--text-secondary);
      text-decoration: none;
      min-height: 2.25rem;
      padding: 0.35rem 0.75rem;
      border-radius: var(--radius-sm);
      border: 1px solid var(--border-strong);
      transition: color 150ms ease, border-color 150ms ease, background-color 150ms ease;
    }

    .back-link:hover {
      color: var(--text-primary);
      border-color: var(--accent-amber);
      background-color: var(--bg-elevated);
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
      width: min(100%, 29rem);
      background-color: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      padding: clamp(1.75rem, 4vw, 2.35rem);
    }

    .lock-meta {
      font-size: 0.8rem;
      font-weight: 500;
      color: var(--accent-amber);
      margin-bottom: 0.5rem;
    }

    .lock-title {
      font-family: var(--font-serif);
      font-size: clamp(1.45rem, 1.2rem + 1vw, 1.8rem);
      font-weight: 500;
      line-height: 1.2;
      letter-spacing: -0.015em;
      color: var(--text-primary);
      margin-bottom: 0.65rem;
    }

    .lock-lead {
      font-size: 0.925rem;
      color: var(--text-secondary);
      line-height: 1.55;
      margin-bottom: 1.6rem;
    }

    .auth-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .input-group {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }

    .input-label {
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--text-muted);
    }

    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }

    .passcode-input {
      width: 100%;
      padding: 0.7rem 3rem 0.7rem 0.9rem;
      background: var(--bg-canvas);
      border: 1px solid var(--border-strong);
      border-radius: var(--radius-sm);
      color: var(--text-primary);
      font-family: var(--font-sans);
      font-size: 1rem; /* >=16px prevents iOS zoom */
      transition: border-color 150ms ease;
    }

    .passcode-input:focus {
      outline: 2px solid var(--accent-amber);
      outline-offset: 1px;
      border-color: var(--accent-amber);
    }

    .toggle-pwd-btn {
      position: absolute;
      right: 0.55rem;
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
      font-size: 0.85rem;
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
      min-height: 2.75rem;
      padding: 0.6rem 1.3rem;
      background-color: var(--accent-amber);
      color: #070b14;
      font-size: 0.925rem;
      font-weight: 600;
      border: 1px solid transparent;
      border-radius: var(--radius-sm);
      cursor: pointer;
      transition: background-color 150ms ease, opacity 150ms ease;
    }

    .btn-unlock:hover:not(:disabled) {
      background-color: var(--accent-amber-bright);
    }

    .btn-unlock:disabled {
      opacity: 0.65;
      cursor: not-allowed;
    }

    .auth-error {
      font-size: 0.85rem;
      color: #fca5a5;
      background-color: #2b1418;
      border: 1px solid #7f1d1d;
      border-radius: var(--radius-sm);
      padding: 0.55rem 0.85rem;
      display: none;
    }

    .auth-error.visible {
      display: block;
    }

    .auth-status {
      font-size: 0.85rem;
      color: var(--accent-teal);
      background-color: #0e221e;
      border: 1px solid #115e59;
      border-radius: var(--radius-sm);
      padding: 0.55rem 0.85rem;
      display: none;
      align-items: center;
      gap: 0.45rem;
      margin-bottom: 1rem;
    }

    .auth-status.visible {
      display: flex;
    }

    .card-footer {
      margin-top: 1.5rem;
      padding-top: 1.15rem;
      border-top: 1px solid var(--border-subtle);
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 0.825rem;
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
      font-size: 0.875rem;
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

    @media (forced-colors: active) {
      .site-header, .lock-card, .card-footer, .site-footer {
        border-color: CanvasText;
      }
      .passcode-input, .back-link {
        border-color: ButtonText;
      }
      .btn-unlock {
        background-color: Highlight;
        color: HighlightText;
        border-color: Highlight;
        forced-color-adjust: none;
      }
    }
  </style>
</head>
<body>
  <header class="site-header">
    <div class="container header-inner">
      <a href="index.html" class="brand-logo" aria-label="Jeremy Mendel, Ph.D. Home">Jeremy Mendel, Ph.D.</a>
      <a href="index.html#featured-work" class="back-link">
        <span aria-hidden="true">&larr;</span> Selected Work
      </a>
    </div>
  </header>

  <main class="lock-main">
    <div class="lock-card">
      <p class="lock-meta">${study.badge}</p>
      <h1 class="lock-title">${study.shortTitle}</h1>
      <p class="lock-lead">This case study is password-protected. Enter the passcode to view it.</p>

      <div id="auth-status" class="auth-status" role="status" aria-live="polite">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" class="spin"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle><path d="M12 2a10 10 0 0 1 10 10"></path></svg>
        <span>Saved session detected: unlocking case study...</span>
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
  <script data-goatcounter="https://jeremy7509.goatcounter.com/count"
          async src="//gc.zgo.at/count.js"></script>
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
