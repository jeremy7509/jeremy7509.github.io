const GITHUB_USERNAME = 'jeremy7509';

// Featured UX Research Case Studies
const UXR_CASE_STUDIES = [
  {
    id: 'study-onboarding',
    title: 'Reimagining Multi-Role Onboarding Mental Models',
    summary: 'Uncovered why new team admins abandoned workspace setup within the first 48 hours and redesigned the onboarding flow around collaborative Jobs-to-be-Done.',
    badge: 'Foundational Discovery',
    sample: 'n = 28 Qual · n = 420 Survey',
    outcome: 'Impact: +28% 14-day activation rate & -38% time-to-first-value',
    tags: ['Contextual Inquiry', 'Jobs-to-be-Done', 'Journey Mapping', 'Survey'],
    category: 'foundational mixed-methods',
    question: 'Why were 42% of newly invited organization admins stalling during initial workspace configuration despite high sign-up intent?',
    method: 'Conducted 16 remote contextual inquiries observing admins setting up live workspaces, followed by a 12-participant 7-day diary study and a quantitative survey (n = 420) to size friction points across company segments.',
    impact: 'Discovered that admins thought in terms of "team permissions first" rather than "project templates first." Re-sequenced the onboarding architecture, increasing 14-day workspace activation by 28%.'
  },
  {
    id: 'study-navigation',
    title: 'Information Architecture Overhaul for Complex Analytics',
    summary: 'Restructured a sprawling 40+ item settings and reporting taxonomy using card sorting and tree testing to match real user mental models.',
    badge: 'Mixed-Methods IA',
    sample: 'n = 185 Tree Test · n = 15 Interviews',
    outcome: 'Impact: First-click accuracy jumped from 51% to 86%',
    tags: ['Open Card Sort', 'Tree Testing', 'Usability Benchmarking', 'IA'],
    category: 'mixed-methods evaluative',
    question: 'How can we consolidate three legacy analytics modules into a unified navigation system without disrupting daily workflows for power users?',
    method: 'Ran moderated open card sorts with 15 cross-role users to surface natural groupings, then validated three candidate navigation trees via unmoderated tree testing (n = 185) measuring directness and first-click success.',
    impact: 'Eliminated jargon-heavy category labels and reduced navigation depth from 4 levels to 2. Post-launch benchmarking showed first-click accuracy improved from 51% to 86% and support tickets dropped by 31%.'
  },
  {
    id: 'study-trust',
    title: 'Calibrating User Trust in AI-Assisted Recommendations',
    summary: 'Evaluated how confidence indicators and explainability cues influence user adoption of automated workflow suggestions.',
    badge: 'Evaluative & Concept Test',
    sample: 'n = 24 Moderated Lab',
    outcome: 'Impact: +44% recommendation acceptance with provenance cues',
    tags: ['Cognitive Walkthrough', 'RITE Testing', 'Prototype Evaluation', 'AI UX'],
    category: 'evaluative foundational',
    question: 'What level of transparency and control do practitioners need before trusting an AI assistant to bulk-update customer records?',
    method: 'Executed 3 iterative rounds of Rapid Iterative Testing and Evaluation (RITE) with 24 participants comparing three explainability paradigms (black-box, confidence scores, and source-citation previews).',
    impact: 'Found that numeric confidence scores ("87% confident") confused users, whereas showing a 2-line "Why this was suggested" preview increased recommendation acceptance by 44% and reduced manual verification time.'
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
  readBtn.setAttribute('aria-label', `Read research brief: ${study.title}`);
  const btnText = document.createElement('span');
  btnText.textContent = 'Read Research Brief';
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

function setupCopyPortfolioUrl() {
  const copyBtn = document.getElementById('copy-url-btn');
  const copyBtnText = document.getElementById('copy-btn-text');
  const copyFeedback = document.getElementById('copy-feedback');

  if (!copyBtn || !copyBtnText) return;

  copyBtn.addEventListener('click', async () => {
    const portfolioUrl = `https://${GITHUB_USERNAME}.github.io`;
    try {
      await navigator.clipboard.writeText(portfolioUrl);
      copyBtnText.textContent = 'Copied https://jeremy7509.github.io!';
      if (copyFeedback) {
        copyFeedback.textContent = 'Portfolio link copied to clipboard.';
      }
      setTimeout(() => {
        copyBtnText.textContent = 'Copy Portfolio Link';
      }, 2500);
    } catch {
      copyBtnText.textContent = portfolioUrl;
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
  setupCopyPortfolioUrl();
});
