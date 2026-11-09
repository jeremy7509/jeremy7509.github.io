(() => {
  const STORAGE_KEY = 'uxr-portfolio-palette';
  const PANEL_STATE_KEY = 'uxr-palette-panel-minimized';

  const PALETTES = [
    {
      id: 'midnight-amber',
      name: 'Midnight Amber',
      subtitle: 'Dark · Default',
      scheme: 'dark',
      swatches: ['#0b0f17', '#f59e0b', '#2dd4bf']
    },
    {
      id: 'editorial-ivory',
      name: 'Editorial Ivory',
      subtitle: 'Light · Warm Paper',
      scheme: 'light',
      swatches: ['#f9f6f0', '#c2410c', '#0f766e']
    },
    {
      id: 'sapphire-mint',
      name: 'Sapphire & Mint',
      subtitle: 'Dark · Product Tech',
      scheme: 'dark',
      swatches: ['#070b14', '#38bdf8', '#34d399']
    },
    {
      id: 'swiss-daylight',
      name: 'Swiss Daylight',
      subtitle: 'Light · Crisp Slate',
      scheme: 'light',
      swatches: ['#f8fafc', '#2563eb', '#0d9488']
    },
    {
      id: 'espresso-sage',
      name: 'Espresso & Sage',
      subtitle: 'Dark · Warm Studio',
      scheme: 'dark',
      swatches: ['#111210', '#4ade80', '#fbbf24']
    },
    {
      id: 'obsidian-iris',
      name: 'Obsidian & Iris',
      subtitle: 'Dark · AI Systems',
      scheme: 'dark',
      swatches: ['#090912', '#a78bfa', '#22d3ee']
    }
  ];

  function getStoredPaletteId() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && PALETTES.some((p) => p.id === saved)) {
        return saved;
      }
    } catch {
      // Ignore storage access errors
    }
    return PALETTES[0].id;
  }

  function applyPalette(paletteId, persist = true) {
    const palette = PALETTES.find((p) => p.id === paletteId) || PALETTES[0];
    document.documentElement.dataset.palette = palette.id;

    const metaScheme = document.querySelector('meta[name="color-scheme"]');
    if (metaScheme) {
      metaScheme.content = palette.scheme;
    }

    if (persist) {
      try {
        localStorage.setItem(STORAGE_KEY, palette.id);
        localStorage.setItem('color-scheme', palette.scheme);
      } catch {
        // Ignore storage errors
      }
    }

    updateWidgetSelection(palette);
  }

  function updateWidgetSelection(activePalette) {
    const buttons = document.querySelectorAll('.palette-option');
    buttons.forEach((btn) => {
      const isSelected = btn.dataset.paletteId === activePalette.id;
      btn.setAttribute('aria-pressed', String(isSelected));
    });

    const fabLabel = document.getElementById('palette-fab-label');
    if (fabLabel) {
      fabLabel.textContent = `Palette: ${activePalette.name}`;
    }
  }

  function cyclePalette(direction) {
    const currentId = document.documentElement.dataset.palette || getStoredPaletteId();
    const currentIndex = PALETTES.findIndex((p) => p.id === currentId);
    const nextIndex = (currentIndex + direction + PALETTES.length) % PALETTES.length;
    applyPalette(PALETTES[nextIndex].id, true);
  }

  function buildPaletteWidget() {
    if (document.getElementById('palette-dock')) return;

    const dock = document.createElement('aside');
    dock.id = 'palette-dock';
    dock.className = 'palette-dock';
    dock.setAttribute('aria-label', 'Color palette switcher');

    const panel = document.createElement('div');
    panel.id = 'palette-panel';
    panel.className = 'palette-panel';

    let isMinimized = false;
    try {
      const savedState = localStorage.getItem(PANEL_STATE_KEY);
      if (savedState !== null) {
        isMinimized = savedState === 'true';
      } else {
        isMinimized = window.matchMedia('(max-width: 640px)').matches;
      }
    } catch {
      isMinimized = false;
    }
    panel.hidden = isMinimized;

    const header = document.createElement('div');
    header.className = 'palette-panel-header';

    const title = document.createElement('div');
    title.className = 'palette-panel-title';
    title.textContent = 'Color Palette Explorer';

    const controls = document.createElement('div');
    controls.className = 'palette-panel-controls';

    const prevBtn = document.createElement('button');
    prevBtn.type = 'button';
    prevBtn.className = 'palette-step-btn';
    prevBtn.setAttribute('aria-label', 'Previous color palette');
    prevBtn.title = 'Previous palette';
    prevBtn.textContent = '‹';
    prevBtn.addEventListener('click', () => cyclePalette(-1));

    const nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.className = 'palette-step-btn';
    nextBtn.setAttribute('aria-label', 'Next color palette');
    nextBtn.title = 'Next palette';
    nextBtn.textContent = '›';
    nextBtn.addEventListener('click', () => cyclePalette(1));

    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'palette-close-btn';
    closeBtn.setAttribute('aria-label', 'Minimize palette explorer');
    closeBtn.title = 'Minimize';
    closeBtn.textContent = '−';

    controls.append(prevBtn, nextBtn, closeBtn);
    header.append(title, controls);

    const grid = document.createElement('div');
    grid.className = 'palette-grid';
    grid.setAttribute('role', 'group');
    grid.setAttribute('aria-label', 'Available color palettes');

    PALETTES.forEach((p) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'palette-option';
      btn.dataset.paletteId = p.id;
      btn.setAttribute('aria-pressed', 'false');

      const swatches = document.createElement('span');
      swatches.className = 'palette-swatches';
      swatches.setAttribute('aria-hidden', 'true');

      p.swatches.forEach((hex) => {
        const dot = document.createElement('span');
        dot.className = 'palette-swatch-dot';
        dot.style.backgroundColor = hex;
        swatches.appendChild(dot);
      });

      const info = document.createElement('span');
      info.className = 'palette-option-info';

      const name = document.createElement('span');
      name.className = 'palette-option-name';
      name.textContent = p.name;

      const mode = document.createElement('span');
      mode.className = 'palette-option-mode';
      mode.textContent = p.subtitle;

      info.append(name, mode);

      const checkSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      checkSvg.setAttribute('viewBox', '0 0 20 20');
      checkSvg.setAttribute('fill', 'currentColor');
      checkSvg.setAttribute('aria-hidden', 'true');
      checkSvg.classList.add('palette-check');
      const checkPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      checkPath.setAttribute('fill-rule', 'evenodd');
      checkPath.setAttribute('d', 'M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z');
      checkSvg.setAttribute('clip-rule', 'evenodd');
      checkSvg.appendChild(checkPath);

      btn.append(swatches, info, checkSvg);
      btn.addEventListener('click', () => applyPalette(p.id, true));
      grid.appendChild(btn);
    });

    panel.append(header, grid);

    const fab = document.createElement('button');
    fab.type = 'button';
    fab.className = 'palette-fab';
    fab.setAttribute('aria-expanded', String(!isMinimized));
    fab.setAttribute('aria-controls', 'palette-panel');

    const fabDot = document.createElement('span');
    fabDot.className = 'palette-fab-dot';
    fabDot.setAttribute('aria-hidden', 'true');

    const fabLabel = document.createElement('span');
    fabLabel.id = 'palette-fab-label';
    fabLabel.textContent = 'Palette Explorer';

    fab.append(fabDot, fabLabel);

    function togglePanel(forceOpen) {
      const nextHidden = typeof forceOpen === 'boolean' ? !forceOpen : !panel.hidden;
      panel.hidden = nextHidden;
      fab.setAttribute('aria-expanded', String(!nextHidden));
      try {
        localStorage.setItem(PANEL_STATE_KEY, String(nextHidden));
      } catch {
        // Ignore storage errors
      }
    }

    fab.addEventListener('click', () => togglePanel());
    closeBtn.addEventListener('click', () => togglePanel(false));

    dock.append(panel, fab);
    document.body.appendChild(dock);

    const activeId = getStoredPaletteId();
    applyPalette(activeId, false);
  }

  // Apply immediately before DOMContentLoaded if possible
  applyPalette(getStoredPaletteId(), false);

  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY && e.newValue) {
      applyPalette(e.newValue, false);
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildPaletteWidget);
  } else {
    buildPaletteWidget();
  }
})();
