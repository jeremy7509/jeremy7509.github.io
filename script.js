const GITHUB_USERNAME = 'jeremy7509';

// Curated showcase projects that supplement live GitHub repositories
const CURATED_PROJECTS = [
  {
    name: 'DevFlow CLI & Automation',
    description: 'Lightweight developer workflow scripts and terminal utilities designed to streamline repository setup, linting, and local testing.',
    html_url: `https://github.com/${GITHUB_USERNAME}`,
    tags: ['JavaScript', 'Node.js', 'CLI', 'Automation'],
    badge: 'Featured Concept',
    category: 'featured'
  },
  {
    name: 'Realtime Metrics Dashboard',
    description: 'Responsive analytics interface featuring dark-mode data visualizations, accessible keyboard navigation, and zero-dependency UI components.',
    html_url: `https://github.com/${GITHUB_USERNAME}`,
    tags: ['HTML5', 'CSS Grid', 'Web APIs', 'UI/UX'],
    badge: 'Featured UI',
    category: 'featured'
  }
];

function createExternalLinkIcon() {
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('width', '20');
  svg.setAttribute('height', '20');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');

  const path = document.createElementNS(svgNS, 'path');
  path.setAttribute('stroke-linecap', 'round');
  path.setAttribute('stroke-linejoin', 'round');
  path.setAttribute('d', 'M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14');
  svg.appendChild(path);

  return svg;
}

function createProjectCard(project) {
  const li = document.createElement('li');
  li.className = 'project-card';
  li.dataset.category = project.category || 'featured';

  const top = document.createElement('div');
  top.className = 'project-card-top';

  const badge = document.createElement('span');
  badge.className = 'project-badge';
  badge.textContent = project.badge || 'Repository';

  const links = document.createElement('div');
  links.className = 'project-links';

  const repoLink = document.createElement('a');
  repoLink.href = project.html_url;
  repoLink.target = '_blank';
  repoLink.rel = 'noopener noreferrer';
  repoLink.setAttribute('aria-label', `View ${project.name} on GitHub`);
  repoLink.appendChild(createExternalLinkIcon());
  links.appendChild(repoLink);

  top.append(badge, links);

  const title = document.createElement('h3');
  title.className = 'project-title';
  const titleLink = document.createElement('a');
  titleLink.href = project.html_url;
  titleLink.target = '_blank';
  titleLink.rel = 'noopener noreferrer';
  titleLink.textContent = project.name;
  title.appendChild(titleLink);

  const desc = document.createElement('p');
  desc.className = 'project-description';
  desc.textContent = project.description;

  const tagsList = document.createElement('ul');
  tagsList.setAttribute('role', 'list');
  tagsList.className = 'project-tags';

  project.tags.forEach((tagText) => {
    const tagItem = document.createElement('li');
    tagItem.textContent = tagText;
    tagsList.appendChild(tagItem);
  });

  li.append(top, title, desc, tagsList);
  return li;
}

async function loadGitHubData() {
  const projectsGrid = document.getElementById('projects-grid');
  const syncStatus = document.getElementById('github-sync-status');
  const statRepos = document.getElementById('stat-repos');
  const profileBio = document.getElementById('profile-bio');

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`)
    ]);

    if (userRes.ok) {
      const user = await userRes.json();
      if (typeof user.public_repos === 'number' && statRepos) {
        statRepos.textContent = String(user.public_repos);
      }
      if (user.bio && profileBio) {
        profileBio.textContent = user.bio;
      }
    }

    const renderedCards = [];

    if (reposRes.ok) {
      const repos = await reposRes.json();
      if (Array.isArray(repos) && repos.length > 0) {
        repos.forEach((repo) => {
          const isPortfolioRepo = repo.name.toLowerCase() === `${GITHUB_USERNAME}.github.io`;
          const tags = [];
          if (repo.language) tags.push(repo.language);
          if (isPortfolioRepo) {
            tags.push('HTML5', 'Modern CSS', 'JavaScript', 'GitHub Pages');
          } else if (tags.length === 0) {
            tags.push('Open Source', 'GitHub');
          }

          renderedCards.push(
            createProjectCard({
              name: repo.name,
              description:
                repo.description ||
                'Personal developer portfolio built with modern CSS cascade layers, responsive dark mode theming, and live GitHub REST API integration.',
              html_url: repo.html_url,
              tags: [...new Set(tags)],
              badge: isPortfolioRepo ? 'Live on GitHub Pages' : 'GitHub Repo',
              category: 'github featured'
            })
          );
        });
      }
    }

    CURATED_PROJECTS.forEach((item) => {
      renderedCards.push(createProjectCard(item));
    });

    if (projectsGrid && renderedCards.length > 0) {
      projectsGrid.replaceChildren(...renderedCards);
    }

    if (syncStatus) {
      syncStatus.textContent = `Live synced with github.com/${GITHUB_USERNAME}`;
    }
  } catch {
    if (projectsGrid) {
      CURATED_PROJECTS.forEach((item) => {
        projectsGrid.appendChild(createProjectCard(item));
      });
    }
  }
}

function setupProjectFilters() {
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
        copyFeedback.textContent = 'Portfolio URL copied to clipboard.';
      }
      setTimeout(() => {
        copyBtnText.textContent = 'Copy Portfolio URL';
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

  setupProjectFilters();
  setupCopyPortfolioUrl();
  loadGitHubData();
});
