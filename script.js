const CONTACT_EMAIL = 'Jeremy.Mendel@gmail.com';

// The 4 Featured Case Study Presentations
const UXR_CASE_STUDIES = [
  {
    id: 'ai-workflows',
    number: '01',
    url: 'ai-workflows.html',
    slideCount: '6 Slides',
    timeframe: 'Google Messages UXR \u00b7 2026',
    title: 'Scaling UX research rigor and speed with AI workflows',
    summary: 'Treated AI adoption like a research program\u2014testing where AI helps and where it fails across a ~5,000-respondent US survey, building strict evidence safeguards into shared synthesis tools, shipping production survey-log code, and codifying 25 senior writing and statistics standards.',
    badge: '01 \u00b7 AI in UX Research',
    sample: '6-Slide Presentation',
    outcome: 'Outcomes: 117 users across 90 teams (~40-min syntheses, ~60% non-UXR) \u00b7 36-slide researcher playbook \u00b7 Feature-level survey code in a 1B+ user app \u00b7 25 shared standards',
    tags: [
      'AI Synthesis & Guardrails',
      'Production App Code',
      'MaxDiff & TURF',
      '25 Writing & Stats Rules',
      'Research Operations'
    ],
    category: 'ai messages',
    question: 'Product teams decide faster than research cycles run, and shortcuts like AI "synthetic users" or unchecked chatbot summaries can mislead. Where can AI be trusted in real research, and how do we scale rigor across researchers and partners?',
    method: '1) Ran a national US survey (~5,000 respondents) with AI assisting all 10 study phases and trained fellow researchers with a 36-slide playbook. 2) Built a synthesis tool with strict evidence rules and piloted our discovery tool. 3) Built a 1-page survey planning tool and shipped production code in Google Messages linking survey responses to real feature use. 4) Turned my own revision history into 25 automated writing and statistics rules.',
    impact: '117 users across 90 teams ran ~400 syntheses in 3 months (cutting reviews from days to ~40 minutes while routing open questions to UXRs), unblocked feature-level survey splits for 1B+ monthly users without waiting quarters for engineering, and embedded senior reporting standards into shared tools.'
  },
  {
    id: 'cross-os-rcs',
    number: '02',
    url: 'cross-os-rcs.html',
    slideCount: '5 Slides',
    timeframe: 'Google Messages UXR \u00b7 2019\u20132026',
    title: 'Solving the cross-OS messaging divide and scaling RCS',
    summary: 'Built and managed the Google Messages UXR team from 1 to 5+ researchers and led or directed 25+ mixed-methods studies across 13 methods\u2014from early SMS/MMS bridges to 1B+ Android RCS users, Apple iOS 18 RCS interoperability, and post-launch evaluation.',
    badge: '02 \u00b7 Cross-OS & RCS Scale',
    sample: '5-Slide Presentation',
    outcome: 'Outcomes: Priced iMessage lock-in (rivaled 3 hardware upgrades) \u00b7 Backed Samsung & carrier defaults past 1B+ MAU \u00b7 Shaped iOS 18 RCS advocacy & post-launch parity roadmap',
    tags: [
      'Choice-Based Conjoint',
      'MaxDiff Prioritization',
      'Between-Subjects A/B',
      'Dual-OS Qualitative',
      'User-Mix Decomposition'
    ],
    category: 'messages',
    question: 'Mixed Android and iPhone group chats felt broken in the US, yet leaders lacked data on which protocol failures mattered to everyday adults, how messaging lock-in compared to hardware specs, and why headline US satisfaction softened after iOS 18 RCS launched.',
    method: 'Combined 13 research methods across 25+ studies (2019\u20132026): choice-based conjoint pricing iMessage/FaceTime lock-in against hardware upgrades, rapid sharing-menu A/B experiments, dual-OS and recipient usability studies, and post-iOS-18 group surveys, MaxDiff modeling, and user-mix decomposition.',
    impact: 'Shipped cross-OS video links, translated tapback reactions, intact SMS-to-RCS group upgrades, and the global "RCS chats" auto-on setup past 1B+ active users; backed global OEM/carrier defaults and #GetTheMessage advocacy ahead of iOS 18 RCS; and separated post-launch delivery gains from legacy app-switcher headwinds.'
  },
  {
    id: 'benchmarking-premiumness',
    number: '03',
    url: 'benchmarking-premiumness.html',
    slideCount: '6 Slides',
    timeframe: 'Google Messages UXR \u00b7 2023\u20132026',
    title: 'Measuring competitive quality and premiumness in Google Messages',
    summary: 'Architected a multi-wave competitive benchmarking program (US, UK, India), coached an early-career researcher into owning execution, modeled what makes an app feel "premium" vs. "works fine," and authored a 3-part org-wide governance model.',
    badge: '03 \u00b7 Benchmarks',
    sample: '6-Slide Presentation',
    outcome: 'Outcomes: Set Engineering & UX craft OKRs \u00b7 Prevented reactive redesign during app-store rating dips \u00b7 Shifted strategy from AI badges to visual beauty (#1) & uniqueness (#2)',
    tags: [
      'Psychometric Benchmarking',
      'Key Driver Analysis',
      '4-Domain Premiumness Model',
      'UX Governance & OKRs'
    ],
    category: 'messages',
    question: 'In-app surveys missed competitors, app-store stars skewed toward vocal switchers from retired legacy apps, and even after our US satisfaction gap narrowed post-iOS 18 RCS, users still viewed rival apps as more "premium."',
    method: 'Paired representative US/UK/India panels (with start-and-end visual app-icon checks, Top-2 Box satisfaction, and 7-item USE scales audited via think-alouds) with regression-based satisfaction driver models and a 4-domain premiumness model controlling for halo effects.',
    impact: 'Proved new-switcher dissatisfaction faded after acclimation (preventing a reactive redesign), sparked encryption cue studies, showed "beautifully designed" (#1) and "unique features" (#2) led premiumness while standalone AI ranked last, and established a 3-part governance model linking annual panels to co-owned launch surveys.'
  },
  {
    id: 'admob',
    number: '04',
    url: 'admob.html',
    slideCount: '6 Slides',
    timeframe: 'Google AdMob UXR \u00b7 2014\u20132017',
    title: 'Rebuilding Google AdMob around how app businesses run',
    summary: 'As AdMob\u2019s sole UX researcher, built a 1,267-publisher research panel from zero and led 24 mixed-methods studies that pivoted Ad Network Mediation to rule-based Mediation Groups and guided a ground-up Material Design console overhaul.',
    badge: '04 \u00b7 0-to-1 Monetization UXR',
    sample: '6-Slide Presentation',
    outcome: 'Outcomes: Shipped at Google I/O 2017 \u00b7 Migrated 300,000+ publishers \u00b7 Cut core workflows to 1\u20132 steps \u00b7 Prevented unmatched-traffic revenue drops (14 of 14 in usability)',
    tags: [
      '0-to-1 Research Panel (N=1,267)',
      'Design Sprint Facilitation',
      'Card Sort & Tree Testing (N=107)',
      'Multi-Language SUS Benchmarks',
      'B2B Monetization UX'
    ],
    category: 'admob',
    question: 'After two years without dedicated UXR, AdMob planned two multi-quarter rewrites based on internal assumptions ("Shared Stacks" and org-chart navigation tabs) while studios struggled with manual country price floors and onboarding drop-off.',
    method: 'Recruited 1,267 verified publishers in 3 weeks via an in-product banner and led 24 studies across 4 stages: contextual studio interviews, a 2-day cross-functional design sprint, 10+ iterative prototype rounds (catching a 14/14 group-priority misconception), and a 3-step IA validation (card sort, nav prototype, and N=107 tree test) plus multi-language SUS benchmarks.',
    impact: 'Pivoted mediation architecture before engineering build, restored a catch-all Default Mediation Group to protect publisher revenue, launched both overhauls at Google I/O 2017 for 300,000+ publishers (cutting core tasks to 1\u20132 steps), and scaled the panel and 3-step IA method to Firebase, AdSense, and DoubleClick.'
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
  sample.textContent = `${study.timeframe} \u00b7 ${study.slideCount}`;

  top.append(badge, sample);

  const title = document.createElement('h3');
  title.className = 'project-title';
  const titleLink = document.createElement('a');
  titleLink.href = study.url;
  titleLink.textContent = study.title;
  title.appendChild(titleLink);

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

  const actionsRow = document.createElement('div');
  actionsRow.className = 'project-card-actions';

  const openDeckLink = document.createElement('a');
  openDeckLink.href = study.url;
  openDeckLink.className = 'btn btn-primary btn-sm';
  const deckText = document.createElement('span');
  deckText.textContent = 'Open Slide Deck';
  openDeckLink.append(deckText, createArrowIcon());

  const quickBriefBtn = document.createElement('button');
  quickBriefBtn.type = 'button';
  quickBriefBtn.className = 'btn btn-ghost btn-sm summary-btn';
  quickBriefBtn.dataset.studyId = study.id;
  quickBriefBtn.setAttribute('aria-label', `Quick executive summary: ${study.title}`);
  quickBriefBtn.textContent = 'Executive Summary';
  quickBriefBtn.addEventListener('click', () => openCaseStudyModal(study));

  actionsRow.append(openDeckLink, quickBriefBtn);

  li.append(top, title, desc, outcome, tagsList, actionsRow);
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
  const deckLinkEl = document.getElementById('modal-deck-link');

  if (badgeEl) badgeEl.textContent = `${study.badge} \u00b7 ${study.timeframe}`;
  if (titleEl) titleEl.textContent = study.title;
  if (summaryEl) summaryEl.textContent = study.summary;
  if (questionEl) questionEl.textContent = study.question;
  if (methodEl) methodEl.textContent = study.method;
  if (impactEl) impactEl.textContent = study.impact;
  if (deckLinkEl) {
    deckLinkEl.href = study.url;
    deckLinkEl.textContent = 'Open Full Slide Deck';
  }

  modal.showModal();
}

function initCaseStudies() {
  const projectsGrid = document.getElementById('projects-grid');
  if (!projectsGrid) return;

  // Check if cards are already rendered in HTML
  const existingCards = projectsGrid.querySelectorAll('.project-card');
  if (existingCards.length === 0) {
    // Render from data if not present
    const cards = UXR_CASE_STUDIES.map((study) => createCaseStudyCard(study));
    projectsGrid.replaceChildren(...cards);
  } else {
    // Bind click events to existing summary buttons
    const summaryButtons = projectsGrid.querySelectorAll('.summary-btn');
    summaryButtons.forEach((btn) => {
      const studyId = btn.dataset.studyId;
      const study = UXR_CASE_STUDIES.find((s) => s.id === studyId);
      if (study) {
        btn.addEventListener('click', () => openCaseStudyModal(study));
      }
    });
  }
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

  initCaseStudies();
  setupStudyFilters();
  setupCopyEmail();
});
