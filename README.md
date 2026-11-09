# Jeremy Mendel, Ph.D. — UX Research Leader Portfolio

Portfolio website for **Jeremy Mendel, Ph.D.** (`@jeremy7509`), UX Research Leader, Applied Cognitive & Human Factors Psychologist, and AI Research Workflow Innovator.

## Featured Case Study Presentations

1. **[AI Workflows in UX Research (`ai-workflows.html`)](ai-workflows.html)** — *Scaling UX research rigor and speed with AI workflows* (6 slides · 2026)
2. **[Cross-OS Messaging & Scaling RCS (`cross-os-rcs.html`)](cross-os-rcs.html)** — *Solving the cross-OS messaging divide and scaling RCS* (5 slides · 2019–2026)
3. **[Annual Benchmarking & Premiumness (`benchmarking-premiumness.html`)](benchmarking-premiumness.html)** — *Measuring competitive quality and premiumness in Google Messages* (6 slides · 2023–2026)
4. **[Google AdMob UX Research (`admob.html`)](admob.html)** — *Rebuilding Google AdMob around how app businesses run* (6 slides · 2014–2017)

## Highlights

- **14+ Years in UX Research (12+ Years at Google):** Google Messages,Consumer Communications Rapid Research, Google Fi, and Google AdMob, plus Nuance Communications.
- **Strategic Platform Impact:** Led choice-based conjoint and mixed-methods research driving Samsung and global OEM default messaging agreements (1B+ monthly active users) and shaping advocacy for Apple's adoption of RCS in iOS 18.
- **AI Research Tooling & Production Code:** Built an autonomous discovery agent used across Google, shipped live production code joining product usage logs with in-product surveys, and created agentic AI skills for codebase-grounded survey drafting and statistical analysis.
- **Academic Background:** Ph.D. & M.S. in Applied Psychology (Human Factors) from Clemson University; B.A. in Psychology from North Carolina State University.

## Editing & Encrypting Case Studies

The 4 deep-dive case studies are encrypted with **AES-256-GCM** using the browser's native Web Crypto API.

- **Unencrypted source files**: Located in the local `case-studies-src/` directory (ignored by git so your proprietary methods remain private).
- **Encrypt for publishing**: Run:
  ```bash
  npm run encrypt
  # or: node encrypt.js
  ```
  This encrypts the 4 pages using your passcode and generates the public lockfiles in the root directory.
- **Decrypt to source**: Run:
  ```bash
  npm run decrypt
  # or: node decrypt.js
  ```
- **Recruiter Experience**: Recruiters enter the passcode once; `sessionStorage` keeps all four case studies unlocked for their browsing session.
