const CONTACT_EMAIL = 'Jeremy.Mendel@gmail.com';

// Real UXR Case Studies & Strategic Initiatives from Jeremy Mendel, Ph.D.'s Resume
const UXR_CASE_STUDIES = [
  {
    id: 'oem-default-strategy',
    title: 'Global OEM Default Strategy for Google Messages',
    summary: 'Quantified how preloaded messaging apps influence smartphone OS choice using choice-based conjoint modeling to align global OEM partners.',
    badge: 'Platform Strategy · Conjoint',
    sample: 'Google Messages · Global',
    outcome: 'Impact: Helped grow Google Messages to 1B+ monthly active users worldwide',
    tags: ['Choice-Based Conjoint (CBC)', 'OEM Strategy', 'Executive Alignment'],
    category: 'strategy quant',
    question: 'How do preloaded messaging experiences affect consumer smartphone and OS switching decisions across international markets?',
    method: 'Designed and executed choice-based conjoint (CBC) studies quantifying the incremental utility and OS retention value of a unified default messaging experience.',
    impact: 'Provided the empirical case that helped persuade and align Samsung and global OEMs to make Google Messages their default messaging app worldwide, scaling the platform to 1B+ monthly active users.'
  },
  {
    id: 'apple-rcs-interoperability',
    title: 'Android–iOS Messaging Friction & Apple RCS Adoption',
    summary: 'Conducted multi-study mixed-methods research on cross-OS messaging pain points that informed executive advocacy and product marketing.',
    badge: 'Cross-OS Strategy · Mixed-Methods',
    sample: 'Google Messages · iOS 18',
    outcome: 'Impact: Shaped executive advocacy contributing to Apple adopting RCS in iOS 18',
    tags: ['Mixed-Methods', 'Cross-OS UX', 'Executive Advocacy', 'RCS'],
    category: 'strategy',
    question: 'How do broken group chats, degraded media, and reaction fallbacks between Android and iOS impact user communication and brand perception?',
    method: 'Led multiple qualitative and quantitative studies isolating the user and social cost of cross-platform messaging friction across key demographic segments.',
    impact: 'Findings directly informed Google Directors, VPs, SVPs, Samsung executives, and Product Marketing—shaping the strategic narrative and advocacy that contributed to Apple adopting RCS in iOS 18.'
  },
  {
    id: 'ai-discovery-agent-tooling',
    title: 'Autonomous AI Discovery Agent & Production Survey Pipelines',
    summary: 'Built internal AI research tools and shipped live production code joining product usage logs with in-product surveys across Google.',
    badge: 'AI Tooling & Production Code',
    sample: 'Google-Wide Adoption',
    outcome: 'Impact: Compressed multi-source literature & market synthesis from weeks to hours',
    tags: ['Autonomous AI Agents', 'Production Code', 'Usage-Survey Joins', 'Agentic Workflows'],
    category: 'ai quant',
    question: 'How can UX researchers eliminate weeks of manual synthesis, survey programming, and disconnected behavioral-attitudinal analysis?',
    method: 'Engineered an autonomous discovery agent for multi-source literature/market review, shipped live production code joining usage telemetry with in-product surveys, and built an agentic AI skill that searches the codebase to draft surveys and suggest launch metrics.',
    impact: 'Adopted by researchers across Google, turning weeks of synthesis into hours and enabling automated behavioral + attitudinal triangulation for GenAI and RCS launches.'
  },
  {
    id: 'genai-magic-compose',
    title: 'Gemini in Google Messages, Magic Compose & Quality Drivers',
    summary: 'Led foundational and evaluative GenAI research alongside international regression-based key driver modeling to guide Engineering and UX OKRs.',
    badge: 'GenAI UX & Key Driver Modeling',
    sample: 'Google Messages · Multi-Market',
    outcome: 'Impact: Guided GenAI launch decisions & set Engineering/UX craft OKRs',
    tags: ['Generative AI UX', 'Key Driver Analysis', 'Longitudinal Benchmarking', 'In-Product Surveys'],
    category: 'ai quant',
    question: 'What are user expectations for conversational AI and assisted writing inside personal messaging, and which UX factors drive overall product satisfaction?',
    method: 'Combined foundational and evaluative studies on Gemini in Messages and Magic Compose with an international UX benchmarking program using regression-based key driver analysis and continuous in-product CSAT intercepts.',
    impact: 'Clarified user boundaries for conversational AI and messaging identity, while key driver models established Engineering and UX craft OKRs to close competitive satisfaction gaps.'
  },
  {
    id: 'global-field-ethnography',
    title: '7-Country Global Field Ethnography on Anti-Abuse & Spam',
    summary: 'Led multi-market field sessions and cross-cultural surveys mapping thresholds of unwanted messaging to design safer communication defaults.',
    badge: 'Global Ethnography',
    sample: '7 Countries (US, IN, ID, EU)',
    outcome: 'Impact: Shaped global spam warning dialogs and anti-abuse protections',
    tags: ['International Ethnography', 'Cross-Market Surveys', 'Trust & Safety', 'Field Research'],
    category: 'field',
    question: 'How do cultural norms and regional communication habits across 7 countries shape what users perceive as spam, scam, or unwanted contact?',
    method: 'Led and moderated in-situ field research across rural low-income US communities, India, Indonesia, the UK, France, Germany, and Sweden, paired with large-scale cross-market surveys.',
    impact: 'Mapped distinct cultural thresholds for commercial vs. personal messaging, directly shaping Google Messages spam warning dialogs and anti-abuse product protections.'
  },
  {
    id: 'google-fi-pricing-admob',
    title: 'Google Fi "Bill Protection" Pricing & AdMob Console Redesign',
    summary: 'Modeled price-sensitivity thresholds to prevent subscriber bill shock on Google Fi and guided a ground-up Material Design overhaul for AdMob.',
    badge: 'Pricing & Monetization UX',
    sample: 'Google Fi & AdMob (1M+ Apps)',
    outcome: 'Impact: Improved Fi retention, backed Google Fi rebrand & lifted AdMob task success',
    tags: ['Price Sensitivity Modeling', 'Discrete Choice', 'Brand Research', 'B2B Developer UX'],
    category: 'quant strategy',
    question: 'How can Google Fi structure data-cap pricing to eliminate bill shock without hurting acquisition, and how can AdMob connect ad yield to app retention?',
    method: 'Combined qualitative interviews with price-elasticity and discrete choice modeling for Google Fi ("Bill Protection", third-party OEM expansion, and Project Fi -> Google Fi rebrand), and led iterative usability and generative studies for AdMob console and mediation.',
    impact: 'Identified optimal Bill Protection thresholds that boosted subscriber retention, secured executive sign-off for the Google Fi rebrand, and simplified multi-network mediation for 1M+ AdMob apps.'
  }
];

function createArrowIcon() {
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('viewBox', '0 0 20 20');
  svg.setAttribute('width', '16');
  svg.setAttribute('height', '16');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');

  const path = document.createElementNS(svgNS, 'path');
  path.setAttribute('stroke-linecap', 'round');
  path.setAttribute('stroke-linejoin', 'round');
  path.setAttribute('d', 'M5 10h10m-4-4l4 4-4 4');
  svg.appendChild(path);

  return svg;
}

function createCaseStudyCard(study) {
  const li = document.createElement('li');
  li.className = 'project-card';
  li.dataset.category = study.category;

  const top = document.createElement('div');
  top.className = 'project-card-top';

  const badge = document.createElement('span');
  badge.className = 'project-badge';
  badge.textContent = study.badge;

  const sample = document.createElement('span');
  sample.className = 'project-sample';
  sample.textContent = study.sample;

  top.append(badge, sample);

  const title = document.createElement('h3');
  title.className = 'project-title';
  title.textContent = study.title;

  const desc = document.createElement('p');
  desc.className = 'project-description';
  desc.textContent = study.summary;

  const outcome = document.createElement('p');
  outcome.className = 'project-outcome';
  outcome.textContent = study.outcome;

  const tagsList = document.createElement('ul');
  tagsList.setAttribute('role', 'list');
  tagsList.className = 'project-tags';

  study.tags.forEach((tagText) => {
    const tagItem = document.createElement('li');
    tagItem.textContent = tagText;
    tagsList.appendChild(tagItem);
  });

  const readBtn = document.createElement('button');
  readBtn.type = 'button';
  readBtn.className = 'study-read-btn';
  readBtn.setAttribute('aria-label', `Read executive brief: ${study.title}`);
  const btnText = document.createElement('span');
  btnText.textContent = 'Read Executive Brief';
  readBtn.append(btnText, createArrowIcon());

  readBtn.addEventListener('click', () => openCaseStudyModal(study));

  li.append(top, title, desc, outcome, tagsList, readBtn);
  return li;
}

function openCaseStudyModal(study) {
  const modal = document.getElementById('case-study-modal');
  if (!modal) return;

  const badgeEl = document.getElementById('modal-study-badge');
  const titleEl = document.getElementById('modal-study-title');
  const summaryEl = document.getElementById('modal-study-summary');
  const questionEl = document.getElementById('modal-study-question');
  const methodEl = document.getElementById('modal-study-method');
  const impactEl = document.getElementById('modal-study-impact');

  if (badgeEl) badgeEl.textContent = `${study.badge} · ${study.sample}`;
  if (titleEl) titleEl.textContent = study.title;
  if (summaryEl) summaryEl.textContent = study.summary;
  if (questionEl) questionEl.textContent = study.question;
  if (methodEl) methodEl.textContent = study.method;
  if (impactEl) impactEl.textContent = study.impact;

  modal.showModal();
}

function renderCaseStudies() {
  const projectsGrid = document.getElementById('projects-grid');
  if (!projectsGrid) return;

  const cards = UXR_CASE_STUDIES.map((study) => createCaseStudyCard(study));
  projectsGrid.replaceChildren(...cards);
}

function setupStudyFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectsGrid = document.getElementById('projects-grid');

  if (!filterButtons.length || !projectsGrid) return;

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const selected = btn.dataset.filter || 'all';

      filterButtons.forEach((other) => {
        const isCurrent = other === btn;
        other.classList.toggle('active', isCurrent);
        other.setAttribute('aria-pressed', String(isCurrent));
      });

      const cards = projectsGrid.querySelectorAll('.project-card');
      cards.forEach((card) => {
        const categories = (card.dataset.category || '').split(' ');
        const matches = selected === 'all' || categories.includes(selected);
        card.hidden = !matches;
      });
    });
  });
}

function setupCopyEmail() {
  const copyBtn = document.getElementById('copy-url-btn');
  const copyBtnText = document.getElementById('copy-btn-text');
  const copyFeedback = document.getElementById('copy-feedback');

  if (!copyBtn || !copyBtnText) return;

  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      copyBtnText.textContent = `Copied ${CONTACT_EMAIL}!`;
      if (copyFeedback) {
        copyFeedback.textContent = 'Email address copied to clipboard.';
      }
      setTimeout(() => {
        copyBtnText.textContent = 'Copy Email Address';
      }, 2500);
    } catch {
      copyBtnText.textContent = CONTACT_EMAIL;
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  renderCaseStudies();
  setupStudyFilters();
  setupCopyEmail();
});
