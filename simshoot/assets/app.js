'use strict';

const DATA = window.SIMSHOOT_GALLERY;

function el(tag, cls, text) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text !== undefined && text !== null) n.textContent = text;
  return n;
}
function setCommandText(node, text) {
  const s = String(text || '');
  node.replaceChildren();
  // Insert <wbr> after syntax delimiters so DSL commands wrap at boundaries rather than mid-token
  const parts = s.split(/([(=,+])/);
  for (const p of parts) {
    if (!p) continue;
    node.append(document.createTextNode(p));
    if (p === '(' || p === '=' || p === ',' || p === '+') {
      node.append(document.createElement('wbr'));
    }
  }
  node.title = s;
  if (node.parentElement) node.parentElement.title = s;
}
function stripIdPrefix(label, cid) {
  if (!label) return '';
  let s = String(label).trim();
  if (s.startsWith(cid)) {
    s = s.slice(cid.length).trim();
    if (s.startsWith('·') || s.startsWith(':') || s.startsWith('-')) s = s.slice(1).trim();
  }
  return s;
}
function crossFadeLayers(layers, prevIdx, nextIdx) {
  if (prevIdx === nextIdx || prevIdx < 0 || prevIdx >= layers.length) {
    layers.forEach((im, i) => {
      im.className = 'flip-layer' + (i === nextIdx ? ' active' : '');
    });
    return;
  }
  layers.forEach((im, i) => {
    if (i === prevIdx) {
      im.className = 'flip-layer prev';
    } else if (i === nextIdx) {
      im.className = 'flip-layer incoming';
    } else {
      im.className = 'flip-layer';
    }
  });
  // Force style flush so incoming starts strictly at opacity 0 on top of opaque prev (zero background bleed)
  void layers[nextIdx].offsetWidth;
  layers[nextIdx].className = 'flip-layer active';
}
function btn(text, fn, cls = '') {
  const b = el('button', cls, text);
  b.type = 'button';
  b.addEventListener('click', fn);
  return b;
}

/* ---------- Back to top ---------- */
const backTop = document.querySelector('#back-top');
window.addEventListener('scroll', () => {
  backTop.classList.toggle('show', window.scrollY > 420);
}, { passive: true });

/* ---------- Lightbox ---------- */
const lb = document.querySelector('#lightbox');
const lbImg = document.querySelector('#lb-img');
const lbTitle = document.querySelector('#lb-title');
const lbCap = document.querySelector('#lb-caption');
const lbCounter = document.querySelector('#lb-counter');
let lbItems = [], lbPos = 0;

function openLightbox(items, idx) {
  lbItems = items;
  lbPos = idx;
  renderLb();
  lb.showModal();
}
function renderLb() {
  const it = lbItems[lbPos];
  if (!it) return;
  lbTitle.textContent = it.title || it.label || 'Preview';
  lbImg.src = it.src;
  lbImg.alt = lbTitle.textContent;
  lbCap.textContent = it.caption || '';
  lbCounter.textContent = `${lbPos + 1} / ${lbItems.length}`;
}
function moveLb(d) {
  if (!lbItems.length) return;
  lbPos = (lbPos + d + lbItems.length) % lbItems.length;
  renderLb();
}
document.querySelector('#lb-close').addEventListener('click', () => lb.close());
document.querySelector('#lb-prev').addEventListener('click', () => moveLb(-1));
document.querySelector('#lb-next').addEventListener('click', () => moveLb(1));
lb.addEventListener('click', e => { if (e.target === lb) lb.close(); });
window.addEventListener('keydown', e => {
  if (!lb.open) return;
  if (e.key === 'ArrowLeft') { e.preventDefault(); moveLb(-1); }
  if (e.key === 'ArrowRight') { e.preventDefault(); moveLb(1); }
});

const wfZoomBtn = document.querySelector('#btn-workflow-zoom');
if (wfZoomBtn) {
  wfZoomBtn.addEventListener('click', () => openLightbox([{
    src: 'assets/media/simshoot-workflow.png',
    title: 'SimShoot Closed-Loop Workflow',
    caption: 'Planner proposes one DSL action -> Action Simulator (H3 + Action LoRA) generates a 39-frame transition -> Coarse-to-Fine Selector chooses the optimal stopping extent and feeds the result back to the Planner.',
  }], 0));
}

/* ---------- B.1: 7 ACTION LORAS ---------- */
let loraIdx = 0;
let loraSubIdx = 0;

function initLoraSection() {
  const tabs = document.querySelector('#lora-tabs');
  const stage = document.querySelector('#lora-stage');
  const items = DATA.b1_adapters;

  function drawTabs() {
    tabs.replaceChildren();
    items.forEach((ad, i) => {
      const b = btn('', () => { loraIdx = i; loraSubIdx = 0; drawAll(); }, 'tab-btn' + (i === loraIdx ? ' active' : ''));
      b.append(el('span', 'tcode', `${i + 1}.`), el('span', '', ad.adapter_label));
      tabs.append(b);
    });
  }

  function drawStage() {
    const ad = items[loraIdx];
    const c = ad.cases[loraSubIdx] || ad.cases[0];
    const panel = el('div', 'panel');

    const topBar = el('div', 'compact-bar');
    topBar.append(el('div', 'action-code', `Action: ${c.action_id}`));
    panel.append(topBar);

    // Sync Toolbar
    const bar = el('div', 'toolbar');
    const grp = el('div', 'toolbar-group');
    const playBtn = btn('⏸ Pause Both', () => {}, 'ctrl-btn primary');
    const restartBtn = btn('↺ Restart', () => {}, 'ctrl-btn');
    grp.append(playBtn, restartBtn);

    const scrubWrap = el('label', 'scrub-wrap');
    const frameLbl = el('span', 'mono', 'F00 / F38');
    const scrubber = el('input');
    scrubber.type = 'range'; scrubber.min = '0'; scrubber.max = '38'; scrubber.step = '1'; scrubber.value = '0';
    scrubWrap.append(el('span', '', 'Frame:'), scrubber, frameLbl);
    bar.append(grp, scrubWrap);
    panel.append(bar);

    // 3-Column Comparison: Input | SimShoot LoRA | Native H3
    const grid = el('div', 'grid-3');

    const pIn = el('div', 'media-card');
    const hIn = el('div', 'media-card-head');
    hIn.append(el('strong', '', 'Input Portrait (F0)'));
    const bIn = el('div', 'media-card-body');
    const zBtn = btn('', () => openLightbox([{ src: c.input_img, title: `Case ${c.case_id} · Input F0`, caption: c.action_id }], 0), 'zoom-btn');
    const imIn = el('img'); imIn.src = c.input_img; imIn.alt = `Case ${c.case_id} input`;
    zBtn.append(imIn);
    bIn.append(zBtn);
    pIn.append(hIn, bIn, el('div', 'media-card-foot', c.input_note || 'Identical input portrait, action prompt, and seed schedule for both simulators.'));

    const pOurs = el('div', 'media-card ours');
    const hOurs = el('div', 'media-card-head');
    hOurs.append(el('strong', '', 'SimShoot (H3 + Action LoRA)'));
    const bOurs = el('div', 'media-card-body');
    const vOurs = el('video');
    vOurs.src = c.lora_video; vOurs.loop = true; vOurs.muted = true; vOurs.playsInline = true; vOurs.preload = 'auto';
    vOurs.title = 'Click to play or pause both rollouts';
    bOurs.append(vOurs);
    pOurs.append(hOurs, bOurs, el('div', 'media-card-foot', c.lora_note));

    const pVan = el('div', 'media-card');
    const hVan = el('div', 'media-card-head');
    hVan.append(el('strong', '', 'Native H3 (w/o LoRA)'));
    const bVan = el('div', 'media-card-body');
    const vVan = el('video');
    vVan.src = c.vanilla_video; vVan.loop = true; vVan.muted = true; vVan.playsInline = true; vVan.preload = 'auto';
    vVan.title = 'Click to play or pause both rollouts';
    bVan.append(vVan);
    pVan.append(hVan, bVan, el('div', 'media-card-foot', c.vanilla_note));

    grid.append(pIn, pVan, pOurs);
    panel.append(grid);
    const b1Note = el('p', 'case-note');
    b1Note.innerHTML = `<strong>Case ${c.case_id} (${c.round_label}) · What to observe:</strong> ${c.summary}`;
    panel.append(b1Note);
    stage.replaceChildren(panel);

    let playing = true;
    let dragging = false;
    function syncPlay() {
      Promise.all([vOurs.play().catch(() => {}), vVan.play().catch(() => {})]);
      playing = true;
      playBtn.textContent = '⏸ Pause Both';
    }
    function syncPause() {
      vOurs.pause(); vVan.pause();
      playing = false;
      playBtn.textContent = '▶ Play Both';
    }
    const toggleBoth = () => (playing ? syncPause() : syncPlay());
    playBtn.addEventListener('click', toggleBoth);
    vOurs.addEventListener('click', toggleBoth);
    vVan.addEventListener('click', toggleBoth);
    restartBtn.addEventListener('click', () => {
      vOurs.currentTime = 0; vVan.currentTime = 0;
      scrubber.value = '0'; frameLbl.textContent = 'F00 / F38';
      syncPlay();
    });
    scrubber.addEventListener('input', () => {
      dragging = true;
      syncPause();
      const f = Number(scrubber.value);
      frameLbl.textContent = `F${String(f).padStart(2, '0')} / F38`;
      const frac = f / 38;
      if (vOurs.duration) vOurs.currentTime = frac * vOurs.duration;
      if (vVan.duration) vVan.currentTime = frac * vVan.duration;
    });
    scrubber.addEventListener('change', () => { dragging = false; });
    vOurs.addEventListener('timeupdate', () => {
      if (dragging || !vOurs.duration) return;
      const frac = vOurs.currentTime / vOurs.duration;
      const f = Math.min(38, Math.round(frac * 38));
      scrubber.value = String(f);
      frameLbl.textContent = `F${String(f).padStart(2, '0')} / F38`;
      if (vVan.duration && Math.abs(vVan.currentTime - vOurs.currentTime) > 0.25) {
        vVan.currentTime = vOurs.currentTime;
      }
    });
    syncPlay();
  }

  function drawAll() { drawTabs(); drawStage(); }
  drawAll();
}

/* ---------- B.2: FRAME SELECTOR ---------- */
let b2Idx = 0;

function initB2Section() {
  const tabs = document.querySelector('#b2-tabs');
  const stage = document.querySelector('#b2-stage');
  const cases = DATA.b2_cases;

  function shortTabTitle(label) {
    if (!label) return '';
    return String(label).split('·')[0].trim();
  }

  function makeFilmstripRow(frames, discardPrior, lbGallery) {
    const band = el('div', 'filmstrip-band');
    band.append(el('div', 'sprockets'));
    const row = el('div', 'film-frames-5');
    frames.forEach((f, fi) => {
      const isLast = fi === frames.length - 1;
      const cls = ['film-cell'];
      if (discardPrior) cls.push(isLast ? 'forced' : 'discarded');
      const cell = btn('', () => openLightbox(lbGallery, fi), cls.join(' '));
      const im = el('img'); im.src = f.src; im.alt = f.label; im.loading = 'lazy';
      cell.append(im, el('span', '', f.label));
      row.append(cell);
    });
    band.append(row, el('div', 'sprockets'));
    return band;
  }

  function draw() {
    tabs.replaceChildren();
    cases.forEach((c, i) => {
      const b = btn(shortTabTitle(c.short_label), () => { b2Idx = i; draw(); }, 'tab-btn' + (i === b2Idx ? ' active' : ''));
      tabs.append(b);
    });

    const c = cases[b2Idx];
    const panel = el('div', 'panel');

    const grid = el('div', 'grid-2');

    const lbCompare = [
      { src: c.input_img, title: `Case ${c.case_id} · Input (F0)`, caption: 'Starting portrait before this action.' },
      { src: c.f38_img, title: `Case ${c.case_id} · w/o Selector (Forced F38)`, caption: c.f38_note },
      { src: c.selected_img, title: `Case ${c.case_id} · SimShoot Selected (${c.selected_label})`, caption: c.ours_note },
    ];

    // Left: w/o Selector (Matching 2-Row Stitched 5-Frame Filmstrip)
    const boxA = el('div', 'scheme-card');
    const hA = el('div', 'scheme-head');
    hA.append(el('h4', '', 'w/o Frame Selector (Terminal Only)'), el('span', 'tag warn', 'Forced F38'));
    boxA.append(hA);

    const stripBox = el('div', 'traj-strip-box');
    const sCap = el('div', 'strip-caption');
    sCap.append(el('span', '', 'Generated 39-frame video trajectory'), el('span', '', 'F0 → F38'));
    stripBox.append(sCap);

    const fiveFrames = c.coarse_frames; // 5 evenly spaced frames F0, F10, F19, F29, F38
    const filmGallery = fiveFrames.map(f => ({
      src: f.src,
      title: `Case ${c.case_id} · Video Trajectory ${f.label}`,
      caption: f.label === 'F38' ? 'Terminal frame F38 (forced without visual selection)' : 'Intermediate frame discarded by terminal-only baseline',
    }));
    // Row 1: Full continuous 5-frame video filmstrip
    stripBox.append(makeFilmstripRow(fiveFrames, false, filmGallery));
    stripBox.append(el('div', 'discard-note', '↓ Discard all intermediate frames (F0–F29) · keep terminal F38 only'));
    // Row 2: Duplicate filmstrip with left 4 frames semi-transparent (discarded) and F38 highlighted
    stripBox.append(makeFilmstripRow(fiveFrames, true, filmGallery));
    boxA.append(stripBox);

    function makeSyncedWipe(beforeSrc, afterSrc, leftLabel, rightLabel) {
      const wStage = el('div', 'wipe-stage');
      const imgAfter = el('img'); imgAfter.src = afterSrc; imgAfter.alt = rightLabel;
      const wOver = el('div', 'wipe-overlay');
      const imgBefore = el('img'); imgBefore.src = beforeSrc; imgBefore.alt = leftLabel;
      wOver.append(imgBefore);
      const wDiv = el('div', 'wipe-divider');
      wDiv.append(el('span', 'wipe-handle', '◀ ▶'));
      const tagL = el('span', 'wipe-tag left', leftLabel);
      const tagR = el('span', 'wipe-tag right', rightLabel);
      const wRange = el('input', 'wipe-range');
      wRange.type = 'range'; wRange.min = '0'; wRange.max = '100'; wRange.value = '30';
      wRange.setAttribute('aria-label', `Drag to compare ${leftLabel} and ${rightLabel}`);
      wStage.append(imgAfter, wOver, wDiv, tagL, tagR, wRange);
      return { wStage, wOver, wDiv, wRange };
    }

    const wipeA = makeSyncedWipe(c.input_img, c.f38_img, 'Input F0', 'Forced F38');
    const outA = el('div', 'scheme-output');
    const barA = el('div', 'scheme-output-bar');
    barA.append(
      el('span', '', 'Drag Input F0 ↔ Forced F38 (synced)'),
      btn('Zoom', () => openLightbox(lbCompare, 1), 'zoom-pill'),
    );
    outA.append(barA, wipeA.wStage, el('p', '', c.f38_note));
    boxA.append(outA);

    // Right: SimShoot Selector (Coarse-5 -> Interval Refinement)
    const boxB = el('div', 'scheme-card ours');
    const hB = el('div', 'scheme-head');
    hB.append(el('h4', '', 'SimShoot Frame Selector'), el('span', 'tag ours', `Selected ${c.selected_label}`));
    boxB.append(hB);

    const selBox = el('div', 'sel-box');
    const cCap = el('div', 'strip-caption');
    cCap.append(el('span', '', 'Stage 1: Coarse 5-frame inspection'), el('span', '', c.refine_bracket ? `Bracket ${c.refine_bracket}` : 'Direct selection'));
    selBox.append(cCap);

    const cStrip = el('div', 'sel-strip');
    const coarseLb = c.coarse_frames.map(f => ({ src: f.src, title: `Case ${c.case_id} · Stage 1 ${f.label}`, caption: c.action_id }));
    c.coarse_frames.forEach((f, fi) => {
      const cls = ['sel-cell'];
      if (f.in_bracket) cls.push('in-bracket');
      if (f.label === c.selected_label) cls.push('chosen');
      const cell = btn('', () => openLightbox(coarseLb, fi), cls.join(' '));
      const im = el('img'); im.src = f.src; im.alt = f.label; im.loading = 'lazy';
      cell.append(im, el('span', '', f.label === c.selected_label ? `${f.label} ★` : f.label));
      cStrip.append(cell);
    });
    selBox.append(cStrip);

    if (c.refine_frames && c.refine_frames.length) {
      selBox.append(el('div', 'refine-note', `↓ Stage 2: Interval refinement over ${c.refine_bracket} (zero extra video generation)`));
      const rStrip = el('div', 'sel-strip refine');
      const refLb = c.refine_frames.map(f => ({
        src: f.src,
        title: `Case ${c.case_id} · Stage 2 ${f.label}`,
        caption: f.label === c.selected_label ? c.ours_note : 'Inspected interior frame',
      }));
      c.refine_frames.forEach((f, fi) => {
        const cls = ['sel-cell'];
        if (f.label === c.selected_label) cls.push('chosen');
        const cell = btn('', () => openLightbox(refLb, fi), cls.join(' '));
        const im = el('img'); im.src = f.src; im.alt = f.label; im.loading = 'lazy';
        cell.append(im, el('span', '', f.label === c.selected_label ? `${f.label} ★` : f.label));
        rStrip.append(cell);
      });
      selBox.append(rStrip);
    }
    boxB.append(selBox);

    const wipeB = makeSyncedWipe(c.input_img, c.selected_img, 'Input F0', `SimShoot ${c.selected_label}`);
    const outB = el('div', 'scheme-output');
    const barB = el('div', 'scheme-output-bar');
    barB.append(
      el('span', '', `Drag Input F0 ↔ SimShoot ${c.selected_label} (synced)`),
      btn('Zoom', () => openLightbox(lbCompare, 2), 'zoom-pill'),
    );
    outB.append(barB, wipeB.wStage, el('p', '', c.ours_note));
    boxB.append(outB);

    // Synchronize left & right Before/After sliders in lockstep; initial split = 30% (Input : Edited = 3 : 7)
    const syncedWipes = [wipeA, wipeB];
    function applySyncedSplit(pct) {
      const clamped = Math.max(0, Math.min(100, Number(pct)));
      for (const w of syncedWipes) {
        w.wRange.value = String(clamped);
        w.wOver.style.clipPath = `inset(0 ${100 - clamped}% 0 0)`;
        w.wDiv.style.left = clamped + '%';
      }
    }
    for (const w of syncedWipes) {
      w.wRange.addEventListener('input', () => applySyncedSplit(w.wRange.value));
    }
    applySyncedSplit(30);

    grid.append(boxA, boxB);
    panel.append(grid);

    const b2Note = el('p', 'case-note');
    b2Note.innerHTML = `<strong>Case ${c.case_id} (${c.round_label}) · What to observe:</strong> ${c.summary}`;
    panel.append(b2Note);
    stage.replaceChildren(panel);
  }

  draw();
}

/* ---------- B.3: ADAPTIVE REPLANNING (SEPARATE FINALS + INDEPENDENT CAROUSELS) ---------- */
let b3Idx = 0;
let b3FixSlide = 0;
let b3OurSlide = 0;

function initB3Section() {
  const tabsWrap = document.querySelector('#b3-tabs');
  const stage = document.querySelector('#b3-stage');
  const cases = DATA.b3_cases;

  const SVG_VIDEO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>';
  const SVG_IMAGE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>';
  const SVG_ZOOM = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>';
  const SVG_UP_ARROW = '<svg viewBox="0 0 14 15" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="14" x2="7" y2="2.5"/><polyline points="3 6.5 7 2 11 6.5"/></svg>';

  function buildArmTimeline(steps, inputImg) {
    const out = [];
    let heldImg = inputImg;
    let hadEarlyStop = false;
    for (const st of steps) {
      if (st.is_stop) {
        if (st.change_kind === 'stopped') hadEarlyStop = true;
        continue;
      }
      const img = st.accepted ? (st.img || heldImg) : heldImg;
      if (st.accepted && st.img) heldImg = st.img;
      out.push({ ...st, display_img: img });
    }
    return { steps: out, hadEarlyStop };
  }

  function buildIndependentDeck({ armLabel, isOurs, steps, hadEarlyStop, getIdx, setIdx }) {
    const col = el('div', 'b3-deck-col');
    const shell = el('div', 'b3-carousel-shell');
    const prevBtn = btn('‹', () => {
      const cur = getIdx();
      if (cur > 0) { setIdx(cur - 1); renderDeck(); }
    }, 'carousel-arrow prev');
    prevBtn.setAttribute('aria-label', `${armLabel} previous round`);

    const nextBtn = btn('›', () => {
      const cur = getIdx();
      if (cur < steps.length - 1) { setIdx(cur + 1); renderDeck(); }
    }, 'carousel-arrow next');
    nextBtn.setAttribute('aria-label', `${armLabel} next round`);

    const cardMount = el('div');
    shell.append(prevBtn, cardMount, nextBtn);

    const footer = el('div', 'deck-footer');
    const dotsWrap = el('div', 'deck-dots');
    const titleEl = el('div', 'deck-title' + (isOurs ? ' ours' : ''), armLabel);
    const subEl = el('div', 'deck-sub', '');
    footer.append(dotsWrap, titleEl, subEl);

    col.append(shell, footer);

    function renderDeck() {
      const idx = Math.max(0, Math.min(steps.length - 1, getIdx()));
      setIdx(idx);
      const st = steps[idx];
      prevBtn.disabled = idx === 0;
      nextBtn.disabled = idx === steps.length - 1;

      dotsWrap.replaceChildren();
      steps.forEach((s, si) => {
        const d = btn('', () => { setIdx(si); renderDeck(); }, 'deck-dot' + (si === idx ? ' active' : ''));
        d.setAttribute('aria-label', `${armLabel} ${s.round_label}`);
        dotsWrap.append(d);
      });
      subEl.textContent = `${st.round_label} / ${steps.length}` + (hadEarlyStop ? ' · Voluntary Early Stop' : '');

      const card = el('div', 'b3-slide-card' + (isOurs ? ' ours' : ''));

      // 1. TOP: Simulator Action Instruction
      const cmdBox = el('div', 'slide-cmd-box');
      const cmdTxtEl = el('div', 'slide-cmd-text');
      cmdBox.append(
        el('div', 'slide-cmd-label', st.is_stop ? `${st.round_label} · Planner Termination` : `${st.round_label} · Simulator Action Command`),
        cmdTxtEl,
      );
      setCommandText(cmdTxtEl, st.is_stop ? 'planner_stop (terminate session)' : (st.action_full || st.action_short));
      card.append(cmdBox);

      // 2. Planner Change / Step Explanation
      const ban = el('div', 'plan-banner ' + (st.change_kind || 'neutral'));
      ban.append(
        el('strong', '', st.change_label || st.round_label),
        el('span', '', st.change_desc || st.planner_reason || st.outcome || ''),
      );
      card.append(ban);

      // 3. Plan Sequence Chain + Connected Active-Step Status Pointer
      const diag = el('div', 'pq-diagram');
      const row = el('div', 'pq-row');
      const queue = st.plan_queue || [];
      const sym = { done: '✓', pending: '●', dropped: '✕' };
      let activeChipEl = null;

      queue.forEach((ps, pi) => {
        if (pi > 0) row.append(el('span', 'pq-sep', '→'));
        const isFirstPending = !st.is_stop && !activeChipEl && ps.status === 'pending';
        const chip = el('span', 'pq-chip ' + ps.status + (isFirstPending ? ' active-target' : ''), `${sym[ps.status] || '•'} ${ps.label}`);
        if (isFirstPending) activeChipEl = chip;
        row.append(chip);
      });
      if (st.is_stop) {
        if (queue.length) row.append(el('span', 'pq-sep', '→'));
        const stopChip = el('span', 'pq-chip stop-node active-target', '⏹ stop');
        activeChipEl = stopChip;
        row.append(stopChip);
      }

      const ptrArea = el('div', 'pq-pointer-area');
      const tone = st.accepted ? 'ok' : (st.is_stop ? (isOurs ? 'ours' : 'neutral') : 'warn');
      const arrowWrap = el('span', 'pq-arrow-svg ' + (tone === 'ours' ? '' : tone));
      arrowWrap.innerHTML = SVG_UP_ARROW;
      const statusText = `${st.round_label} · ${st.badge}`;
      const statusPill = el('span', 'pq-status-pill ' + (tone === 'neutral' ? '' : tone), statusText);
      ptrArea.append(arrowWrap, statusPill);
      diag.append(row, ptrArea);
      card.append(diag);

      // Align the arrow & status pill cleanly beneath the active action chip without overflowing card bounds
      requestAnimationFrame(() => {
        const areaW = ptrArea.clientWidth || 400;
        let cx = areaW / 2;
        if (activeChipEl) {
          const rowRect = row.getBoundingClientRect();
          const chipRect = activeChipEl.getBoundingClientRect();
          if (rowRect.width > 0 && chipRect.width > 0) {
            cx = (chipRect.left - rowRect.left) + chipRect.width / 2;
          }
        }
        cx = Math.max(14, Math.min(areaW - 14, cx));
        arrowWrap.style.left = `${cx}px`;
        const pillW = statusPill.offsetWidth || 160;
        const leftPx = Math.max(0, Math.min(areaW - pillW, cx - pillW / 2));
        statusPill.style.left = `${leftPx}px`;
      });

      // 4. Portrait / Video Frame with Top-Left Video Icon & Top-Right Zoom Icon
      const slot = el('div', 'slide-visual-slot');
      const vis = el('div', 'slide-visual');
      let showingVid = false;

      const mediaMount = el('div');
      vis.append(mediaMount);

      function drawMedia() {
        mediaMount.replaceChildren();
        if (showingVid && st.video) {
          const v = el('video');
          v.src = st.video; v.controls = true; v.loop = true; v.autoplay = true; v.muted = true; v.playsInline = true;
          mediaMount.append(v);
        } else {
          const im = el('img');
          im.src = st.display_img;
          im.alt = `${armLabel} ${st.round_label}`;
          mediaMount.append(im);
        }
      }

      if (st.video) {
        const vBtn = btn('', () => {
          showingVid = !showingVid;
          vBtn.classList.toggle('active', showingVid);
          vBtn.innerHTML = showingVid ? SVG_IMAGE : SVG_VIDEO;
          vBtn.title = showingVid ? 'Return to selected frame' : 'Play 39-frame simulation video';
          drawMedia();
        }, 'media-icon-btn pos-left');
        vBtn.innerHTML = SVG_VIDEO;
        vBtn.title = 'Play 39-frame simulation video';
        vBtn.setAttribute('aria-label', 'Toggle 39-frame simulation video');
        vis.append(vBtn);
      }

      const zBtn = btn('', () => openLightbox([{
        src: st.display_img,
        title: `${armLabel} · ${statusText}`,
        caption: st.action_full || st.action_short || statusText,
      }], 0), 'media-icon-btn pos-right');
      zBtn.innerHTML = SVG_ZOOM;
      zBtn.title = 'Zoom image';
      zBtn.setAttribute('aria-label', 'Zoom image');
      vis.append(zBtn);

      drawMedia();
      slot.append(vis);
      card.append(slot);
      cardMount.replaceChildren(card);
    }

    renderDeck();
    return col;
  }

  function draw() {
    tabsWrap.replaceChildren();
    const groups = [
      { id: 'adapt', title: 'Dynamic Adaptation:' },
      { id: 'robust', title: 'Resilience & Early Stop:' },
    ];
    for (const g of groups) {
      const grp = el('div', 'tab-group');
      grp.append(el('span', 'tab-group-label', g.title));
      cases.forEach((c, i) => {
        if (c.benefit_group !== g.id) return;
        const b = btn('', () => { b3Idx = i; b3FixSlide = 0; b3OurSlide = 0; draw(); }, 'tab-btn' + (i === b3Idx ? ' active' : ''));
        b.textContent = stripIdPrefix(c.short_label, c.case_id);
        grp.append(b);
      });
      tabsWrap.append(grp);
    }

    const c = cases[b3Idx];
    const fixTL = buildArmTimeline(c.fixed_steps, c.input_img);
    const ourTL = buildArmTimeline(c.feedback_steps, c.input_img);
    const fixSteps = fixTL.steps;
    const ourSteps = ourTL.steps;
    if (b3FixSlide >= fixSteps.length) b3FixSlide = 0;
    if (b3OurSlide >= ourSteps.length) b3OurSlide = 0;

    const panel = el('div', 'panel');

    // Part A (Standalone): Direct 3-Column Final Comparison (Original | Fixed | SimShoot)
    panel.append(el('div', 'b3-block-label', 'Final Output Comparison (Original vs. Fixed Initial Plan vs. SimShoot)'));
    const finalsRow = el('div', 'b3-finals-row');
    const lbFinals = [
      { src: c.input_img, title: `Case ${c.case_id} · Original Input (S0)`, caption: 'Shared starting portrait' },
      { src: c.fixed_final, title: `Case ${c.case_id} · Fixed Initial Plan (Final)`, caption: c.fixed_summary },
      { src: c.feedback_final, title: `Case ${c.case_id} · SimShoot Adaptive Replanning (Final)`, caption: c.feedback_summary },
    ];
    [
      { img: c.input_img, title: 'Original Portrait (S0)', sub: 'Shared starting state', ours: false, idx: 0 },
      { img: c.fixed_final, title: 'Fixed Initial Plan (w/o Replanning)', sub: c.fixed_summary, ours: false, idx: 1 },
      { img: c.feedback_final, title: 'SimShoot · Adaptive Replanning (Ours)', sub: c.feedback_summary, ours: true, idx: 2 },
    ].forEach(item => {
      const fc = el('div', 'b3-final-card' + (item.ours ? ' ours' : ''));
      const wrap = el('div', 'b3-final-img');
      const zb = btn('', () => openLightbox(lbFinals, item.idx), 'zoom-btn');
      const im = el('img'); im.src = item.img; im.alt = item.title;
      zb.append(im);
      wrap.append(zb);
      const cap = el('div', 'b3-final-cap');
      cap.append(el('strong', '', item.title), el('span', '', item.sub));
      fc.append(wrap, cap);
      finalsRow.append(fc);
    });
    panel.append(finalsRow);

    panel.append(el('hr', 'b3-sep'));

    // Part B: Shared Initial Plan + Independent Left/Right Round Carousels
    const initBar = el('div', 'b3-init-bar');
    initBar.append(el('span', 'b3-init-label', 'Shared Initial Plan (before Round 1):'));
    const initSteps = el('div', 'b3-init-steps');
    (c.initial_plan || []).forEach((ps, idx) => {
      if (idx > 0) initSteps.append(el('span', 'pq-sep', '→'));
      initSteps.append(el('span', 'b3-init-chip', `${ps.index}. ${ps.label}`));
    });
    initBar.append(initSteps);
    panel.append(initBar);

    const decks = el('div', 'b3-decks');
    const fixDeck = buildIndependentDeck({
      armLabel: 'Fixed Initial Plan (w/o Replanning)',
      isOurs: false,
      steps: fixSteps,
      hadEarlyStop: false,
      getIdx: () => b3FixSlide,
      setIdx: v => { b3FixSlide = v; },
    });
    const ourDeck = buildIndependentDeck({
      armLabel: 'SimShoot · Adaptive Replanning (Ours)',
      isOurs: true,
      steps: ourSteps,
      hadEarlyStop: ourTL.hadEarlyStop,
      getIdx: () => b3OurSlide,
      setIdx: v => { b3OurSlide = v; },
    });
    decks.append(fixDeck, ourDeck);
    panel.append(decks);

    const b3Note = el('p', 'case-note');
    b3Note.innerHTML = `<strong>Case ${c.case_id} · What to observe:</strong> ${c.case_note || c.summary}`;
    panel.append(b3Note);

    stage.replaceChildren(panel);
  }

  draw();
}

/* ---------- B.4A: SINGLE-STEP MONOTONICITY FLIPBOOK ---------- */
let b4aIdx = 0;
let flipTimer = null;
let flipStep = 0;
let flipSpeed = 850;
let flipPlaying = true;
let b4aPromptOpen = false;
let b4aPromptExtent = 'F10';

function initB4ASection() {
  const tabs = document.querySelector('#b4a-tabs');
  const stage = document.querySelector('#b4a-stage');
  const cases = DATA.b4a_cases;
  const STAGES = ['F0 (0%)', 'F10 (26%)', 'F19 (50%)', 'F29 (76%)', 'F38 (100%)'];

  function stopTimer() {
    if (flipTimer) { clearInterval(flipTimer); flipTimer = null; }
  }

  function draw() {
    stopTimer();
    flipStep = 0;
    tabs.replaceChildren();
    cases.forEach((c, i) => {
      const b = btn('', () => { b4aIdx = i; draw(); }, 'tab-btn' + (i === b4aIdx ? ' active' : ''));
      b.textContent = c.adapter_label;
      tabs.append(b);
    });

    const c = cases[b4aIdx];
    const panel = el('div', 'panel');

    const topBar = el('div', 'compact-bar');
    topBar.append(el('div', 'action-code', `Action: ${c.action_id}`));
    panel.append(topBar);

    // Controls Toolbar
    const bar = el('div', 'toolbar');
    const playBtn = btn('⏸ Pause Loop', () => {
      flipPlaying = !flipPlaying;
      syncTimer();
    }, 'ctrl-btn primary');

    const stepGroup = el('div', 'toolbar-group');
    const stepBtns = STAGES.map((lbl, si) => {
      const sb = btn(lbl, () => {
        flipPlaying = false;
        flipStep = si;
        syncTimer();
        syncFrames();
      }, 'ctrl-btn' + (si === 0 ? ' active' : ''));
      stepGroup.append(sb);
      return sb;
    });

    const spdSwitch = el('div', 'seg-switch');
    const spdBtns = [[550, 'Fast'], [850, 'Normal'], [1350, 'Slow']].map(([ms, lbl]) => {
      const b = btn(lbl, () => {
        flipSpeed = ms;
        spdBtns.forEach(x => x.btn.classList.toggle('active', x.ms === ms));
        if (flipPlaying) syncTimer();
      }, ms === flipSpeed ? 'active' : '');
      spdSwitch.append(b);
      return { ms, btn: b };
    });

    bar.append(playBtn, stepGroup, spdSwitch);
    panel.append(bar);

    // 3-Column Flipbook
    const fgrid = el('div', 'flip-grid');
    const orderedArms = [...c.arms.filter(a => !a.is_ours), ...c.arms.filter(a => a.is_ours)];
    const armRefs = orderedArms.map(arm => {
      const col = el('div', 'flip-col' + (arm.is_ours ? ' ours' : ''));
      const ch = el('div', 'flip-col-head');
      ch.append(
        el('strong', '', arm.name),
        el('span', 'tag ' + (arm.selected !== 'F0' ? (arm.is_ours ? 'ours' : '') : 'warn'),
          arm.selected === 'F0' ? 'Rejected (F0)' : `Selected ${arm.selected}`),
      );

      const vp = el('div', 'flip-viewport');
      const layers = arm.frames.map((f, fi) => {
        const im = el('img', 'flip-layer' + (fi === 0 ? ' active' : ''));
        im.src = f.src;
        im.alt = `${arm.name} ${f.label}`;
        vp.append(im);
        return im;
      });
      vp.addEventListener('click', () => {
        openLightbox(arm.frames.map(f => ({ src: f.src, title: `${arm.name} · ${f.label}`, caption: c.action_id })), flipStep);
      });
      const hud = el('div', 'flip-hud');
      const hudStage = el('span', 'hud-chip', STAGES[0]);
      const hudSel = el('span', 'hud-chip', '');
      hudSel.hidden = true;
      hud.append(hudStage, hudSel);
      vp.append(hud);

      const mstrip = el('div', 'flip-mini-strip');
      const mbtns = arm.frames.map((f, fi) => {
        const isSel = f.label === arm.selected;
        const mb = btn('', () => { flipPlaying = false; flipStep = fi; syncTimer(); syncFrames(); },
          'flip-mini-btn' + (fi === 0 ? ' now' : '') + (isSel ? ' sel' : ''));
        const mim = el('img'); mim.src = f.src; mim.alt = f.label;
        mb.append(mim, el('span', '', isSel ? `${f.label}★` : f.label));
        mstrip.append(mb);
        return mb;
      });

      const foot = el('div', 'flip-col-foot', arm.note);
      col.append(ch, vp, mstrip, foot);
      fgrid.append(col);
      return { arm, layers, curIdx: -1, hudStage, hudSel, mbtns };
    });
    panel.append(fgrid);

    const b4aNote = el('p', 'case-note');
    b4aNote.innerHTML = `<strong>Case ${c.case_id} (${c.adapter_label}) · What to observe:</strong> ${c.summary}`;
    panel.append(b4aNote);

    // Collapsible Extent-Prompt Protocol & Verbatim Prompt Inspector (default collapsed)
    if (c.prompts && c.prompts.extents) {
      const EXTENT_META = [
        { key: 'F10', pct: '26.3%', clause: 'Show an early, small but visible part of the action (26.3% of the full change from this input).' },
        { key: 'F19', pct: '50.0%', clause: 'Show the action exactly halfway toward its endpoint (50.0% of the full change from this input).' },
        { key: 'F29', pct: '76.3%', clause: 'Show a strong, nearly completed movement (76.3% of the full change from this input).' },
        { key: 'F38', pct: '100%',  clause: 'Show the action at its full natural endpoint (100%).' },
      ];

      const drawer = el('details', 'prompt-drawer');
      drawer.open = b4aPromptOpen;
      drawer.addEventListener('toggle', () => { b4aPromptOpen = drawer.open; });

      const sum = el('summary', 'prompt-drawer-summary');
      const sumLeft = el('span', 'prompt-drawer-title');
      sumLeft.innerHTML = '<svg class="prompt-chevron" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 4 10 8 6 12"/></svg><span>How are extent prompts constructed for Qwen-Image 2.1 &amp; FLUX 3 Klein?</span>';
      const sumRight = el('span', 'prompt-drawer-hint');
      sumRight.innerHTML = '<span class="hint-closed">Template &amp; exact prompts · Click to expand</span><span class="hint-open">Click to collapse</span>';
      sum.append(sumLeft, sumRight);

      const body = el('div', 'prompt-drawer-body');

      // 1) Protocol explanation + structured template skeleton
      const proto = el('div', 'prompt-proto');
      const protoP = el('p', 'prompt-proto-text');
      protoP.innerHTML = 'Each non-zero extent (<code>F10</code>, <code>F19</code>, <code>F29</code>, <code>F38</code>) is generated <strong>independently from the same input portrait (<code>F0</code>)</strong> using the <strong>same seed</strong>, translating the frozen action prompt into a shared extent-editing template at nominal progress <code>j/38</code>. <strong>Qwen-Image 2.1</strong> receives this template verbatim; <strong>FLUX 3 Klein Base</strong> passes the exact same template through its <strong>official prompt upsampler</strong> (matching our baseline setup). In contrast, <strong>SimShoot (H3 + Action LoRA)</strong> takes the single video prompt once and rolls out all 39 continuous frames in one forward pass.';
      proto.append(protoP);

      const tplWrap = el('div', 'prompt-tpl-wrap');
      tplWrap.append(el('div', 'prompt-sub-label', 'Shared Extent-Editing Template (identical raw input for Qwen-Image 2.1 & FLUX 3)'));
      const tplBox = el('div', 'prompt-tpl-box');
      tplBox.innerHTML =
        'Edit the input photograph. The full endpoint for this one action is: ' +
        '<span class="pt-slot pt-end">{endpoint clause}</span>. ' +
        '<span class="pt-slot pt-ext">{extent clause (F10–F38)}</span> ' +
        '<span class="pt-slot pt-axis">{action-axis guidance}</span> ' +
        '<span class="pt-slot pt-pres">{preservation clause}</span> ' +
        'Return one natural photograph.';
      tplWrap.append(tplBox);

      // 4 Extent Clauses reference (clickable to switch verbatim inspector)
      const extGrid = el('div', 'prompt-extent-grid');
      const extCards = [];
      EXTENT_META.forEach(m => {
        const card = el('button', 'prompt-extent-card' + (b4aPromptExtent === m.key ? ' active' : ''));
        card.type = 'button';
        card.append(
          el('span', 'prompt-extent-k', `${m.key} · ${m.pct}`),
          el('span', 'prompt-extent-v', `“${m.clause}”`),
        );
        card.addEventListener('click', () => {
          b4aPromptExtent = m.key;
          syncPromptView();
        });
        extGrid.append(card);
        extCards.push({ key: m.key, node: card });
      });
      tplWrap.append(extGrid);
      proto.append(tplWrap);
      body.append(proto);

      // 2) Live Verbatim Prompt Inspector for the active case
      const live = el('div', 'prompt-live');
      const liveHead = el('div', 'prompt-live-head');
      liveHead.append(el('div', 'prompt-sub-label', `Exact Verbatim Prompts for Case ${c.case_id} (${c.adapter_label})`));
      const extTabs = el('div', 'prompt-ext-tabs');
      const extTabBtns = EXTENT_META.map(m => {
        const eb = btn(`${m.key} (${m.pct})`, () => {
          b4aPromptExtent = m.key;
          syncPromptView();
        }, 'prompt-ext-btn' + (b4aPromptExtent === m.key ? ' active' : ''));
        extTabs.append(eb);
        return { key: m.key, btn: eb };
      });
      liveHead.append(extTabs);
      live.append(liveHead);

      const cmpGrid = el('div', 'prompt-compare-grid');

      const rawCard = el('div', 'prompt-box-card');
      const rawHead = el('div', 'prompt-box-head');
      const rawTitle = el('strong', '', 'Shared Template Prompt');
      const rawBadge = el('span', 'prompt-box-badge', 'Qwen direct · FLUX raw');
      rawHead.append(rawTitle, rawBadge);
      const rawBody = el('div', 'prompt-box-text');
      rawCard.append(rawHead, rawBody);

      const fxCard = el('div', 'prompt-box-card');
      const fxHead = el('div', 'prompt-box-head');
      const fxTitle = el('strong', '', 'FLUX 3 Klein Base (Upsampled)');
      const fxBadge = el('span', 'prompt-box-badge', 'Official prompt upsampler output');
      fxHead.append(fxTitle, fxBadge);
      const fxBody = el('div', 'prompt-box-text');
      fxCard.append(fxHead, fxBody);

      cmpGrid.append(rawCard, fxCard);
      live.append(cmpGrid);

      // Single Video Prompt strip for SimShoot reference
      const h3Strip = el('div', 'prompt-h3-strip');
      const h3Head = el('div', 'prompt-box-head');
      h3Head.append(
        el('strong', '', 'SimShoot (H3 + Action LoRA) — Single Video Prompt'),
        el('span', 'prompt-box-badge ours', '1 forward pass → continuous F0–F38'),
      );
      const h3Body = el('div', 'prompt-box-text compact', c.prompts.h3);
      h3Strip.append(h3Head, h3Body);
      live.append(h3Strip);

      body.append(live);
      drawer.append(sum, body);
      panel.append(drawer);

      function syncPromptView() {
        const meta = EXTENT_META.find(m => m.key === b4aPromptExtent) || EXTENT_META[0];
        const entry = c.prompts.extents[meta.key] || { raw: '', flux_expanded: '' };
        extCards.forEach(x => x.node.classList.toggle('active', x.key === meta.key));
        extTabBtns.forEach(x => x.btn.classList.toggle('active', x.key === meta.key));
        rawTitle.textContent = `Shared Template Prompt · ${meta.key} (${meta.pct})`;
        fxTitle.textContent = `FLUX 3 Official Upsampler · ${meta.key} (${meta.pct})`;

        // Safely highlight the varying extent clause inside the verbatim template prompt
        rawBody.replaceChildren();
        const rawText = entry.raw;
        const idx = rawText.indexOf(meta.clause);
        if (idx >= 0) {
          rawBody.append(
            document.createTextNode(rawText.slice(0, idx)),
            el('mark', 'prompt-hl', meta.clause),
            document.createTextNode(rawText.slice(idx + meta.clause.length)),
          );
        } else {
          rawBody.textContent = rawText;
        }
        fxBody.textContent = entry.flux_expanded;
      }

      syncPromptView();
    }

    stage.replaceChildren(panel);

    function syncFrames() {
      stepBtns.forEach((b, i) => b.classList.toggle('active', i === flipStep));
      for (const ref of armRefs) {
        const f = ref.arm.frames[flipStep];
        crossFadeLayers(ref.layers, ref.curIdx, flipStep);
        ref.curIdx = flipStep;
        ref.hudStage.textContent = STAGES[flipStep];
        const isSel = f.label === ref.arm.selected;
        ref.hudSel.hidden = !isSel;
        if (isSel) {
          ref.hudSel.textContent = f.label === 'F0' ? 'Rejected → F0' : `Selected (${f.label})`;
          ref.hudSel.className = 'hud-chip' + (f.label !== 'F0' ? ' active-sel' : '');
        }
        ref.mbtns.forEach((b, i) => b.classList.toggle('now', i === flipStep));
      }
    }

    function syncTimer() {
      stopTimer();
      playBtn.textContent = flipPlaying ? '⏸ Pause Loop' : '▶ Play Loop';
      if (flipPlaying) {
        flipTimer = setInterval(() => {
          flipStep = (flipStep + 1) % STAGES.length;
          syncFrames();
        }, flipSpeed);
      }
    }

    syncFrames();
    syncTimer();
  }

  draw();
}

/* ---------- B.4B: MULTI-ROUND CUMULATIVE DRIFT (B.3-STYLE MANUAL IN-PLACE CAROUSELS) ---------- */
let b4bIdx = 0;

function initB4BSection() {
  const tabs = document.querySelector('#b4b-tabs');
  const stage = document.querySelector('#b4b-stage');
  const cases = DATA.b4b_cases;

  const SVG_ZOOM = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>';
  const SVG_UP_ARROW = '<svg viewBox="0 0 14 15" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="14" x2="7" y2="2.5"/><polyline points="3 6.5 7 2 11 6.5"/></svg>';

  function draw() {
    tabs.replaceChildren();
    cases.forEach((c, i) => {
      const b = btn(stripIdPrefix(c.short_label, c.case_id), () => { b4bIdx = i; draw(); }, 'tab-btn' + (i === b4bIdx ? ' active' : ''));
      tabs.append(b);
    });

    const c = cases[b4bIdx];
    const orderedArms = [...c.arms.filter(a => !a.is_ours), ...c.arms.filter(a => a.is_ours)];
    const panel = el('div', 'panel');

    // 3 Independent B.3-Style Cards (FLUX 3 | Qwen 2.1 | SimShoot Ours) — manual stepping only
    const decks = el('div', 'b4b-decks');
    const inits = [];

    orderedArms.forEach(arm => {
      const states = arm.states;
      let curStep = states.length - 1; // start on Final so all 3 outcomes are immediately comparable
      let prevLayerIdx = -1;

      const col = el('div', 'b3-deck-col');
      const shell = el('div', 'b3-carousel-shell');
      const prevBtn = btn('‹', () => {
        if (curStep > 0) goTo(curStep - 1);
      }, 'carousel-arrow prev');
      prevBtn.setAttribute('aria-label', `${arm.name} previous state`);

      const nextBtn = btn('›', () => {
        if (curStep < states.length - 1) goTo(curStep + 1);
      }, 'carousel-arrow next');
      nextBtn.setAttribute('aria-label', `${arm.name} next state`);

      const card = el('div', 'b4b-slide-card' + (arm.is_ours ? ' ours' : ''));

      // Slot 1 (Top): Exact Simulator / Editor Action Command
      const cmdBox = el('div', 'slide-cmd-box');
      const cmdLbl = el('div', 'slide-cmd-label', '');
      const cmdTxt = el('div', 'slide-cmd-text', '');
      cmdBox.append(cmdLbl, cmdTxt);
      card.append(cmdBox);

      // Slot 2: Interactive State Chain (S0 -> S1 -> ... -> Final) + Upward Connector Arrow
      const diag = el('div', 'pq-diagram');
      const row = el('div', 'pq-row');
      const chips = states.map((st, si) => {
        if (si > 0) row.append(el('span', 'pq-sep', '→'));
        const chip = btn(st.state_label, () => goTo(si), 'pq-chip');
        row.append(chip);
        return chip;
      });
      const ptrArea = el('div', 'pq-pointer-area');
      const arrowWrap = el('span', 'pq-arrow-svg');
      arrowWrap.innerHTML = SVG_UP_ARROW;
      const statusPill = el('span', 'pq-status-pill', '');
      ptrArea.append(arrowWrap, statusPill);
      diag.append(row, ptrArea);
      card.append(diag);

      // Slot 3: Stacked Opaque Cross-Dissolve Viewport + Top-Right Zoom Icon
      const slot = el('div', 'b4b-visual-slot');
      const vp = el('div', 'flip-viewport');
      const layers = states.map((st, si) => {
        const im = el('img', 'flip-layer' + (si === curStep ? ' active' : ''));
        im.src = st.src;
        im.alt = `${arm.name} ${st.state_label}`;
        vp.append(im);
        return im;
      });
      const zBtn = btn('', () => {
        openLightbox(states.map(s => ({
          src: s.src,
          title: `${arm.name} · ${s.state_label}`,
          caption: s.action_label,
        })), curStep);
      }, 'media-icon-btn pos-right');
      zBtn.innerHTML = SVG_ZOOM;
      zBtn.title = 'Zoom image';
      zBtn.setAttribute('aria-label', `Zoom ${arm.name}`);
      vp.append(zBtn);
      slot.append(vp);
      card.append(slot);

      shell.append(prevBtn, card, nextBtn);

      // Centered Method Name, Dots & Concise Summary BELOW Card
      const footer = el('div', 'deck-footer');
      const dotsWrap = el('div', 'deck-dots');
      const dots = states.map((st, si) => {
        const d = btn('', () => goTo(si), 'deck-dot');
        d.setAttribute('aria-label', `${arm.name} ${st.state_label}`);
        dotsWrap.append(d);
        return d;
      });
      const titleEl = el('div', 'deck-title' + (arm.is_ours ? ' ours' : ''), arm.name);
      const subEl = el('div', 'deck-sub', '');
      const noteEl = el('p', 'b4b-deck-note', arm.note || '');
      footer.append(dotsWrap, titleEl, subEl, noteEl);

      col.append(shell, footer);
      decks.append(col);

      function alignPointer() {
        requestAnimationFrame(() => {
          const areaW = ptrArea.clientWidth || 260;
          const chip = chips[curStep];
          let cx = areaW / 2;
          if (chip) {
            const rRow = row.getBoundingClientRect();
            const rChip = chip.getBoundingClientRect();
            if (rRow.width > 0 && rChip.width > 0) {
              cx = (rChip.left - rRow.left) + rChip.width / 2;
            }
          }
          cx = Math.max(12, Math.min(areaW - 12, cx));
          arrowWrap.style.left = `${cx}px`;
          const pillW = statusPill.offsetWidth || 100;
          const leftPx = Math.max(0, Math.min(areaW - pillW, cx - pillW / 2));
          statusPill.style.left = `${leftPx}px`;
        });
      }

      function goTo(stepIdx) {
        const clamped = Math.max(0, Math.min(states.length - 1, stepIdx));
        curStep = clamped;
        const st = states[curStep];
        const isFinal = curStep === states.length - 1 && curStep > 0;
        const isFallback = st.outcome === 'fallback';

        prevBtn.disabled = curStep === 0;
        nextBtn.disabled = curStep === states.length - 1;

        cmdLbl.textContent = curStep === 0
          ? 'S0 · Starting Portrait'
          : `${st.state_label} · ${isFallback ? 'Action (Fallback)' : 'Accepted Action'}`;
        setCommandText(cmdTxt, st.action_label);

        chips.forEach((ch, ci) => {
          ch.className = 'pq-chip' + (ci < curStep ? ' done' : (ci === curStep ? ' pending active-target' : ''));
        });
        const tone = curStep === 0 ? '' : (arm.is_ours ? 'ours' : (isFinal ? 'warn' : ''));
        arrowWrap.className = 'pq-arrow-svg ' + (tone === 'ours' ? '' : (tone || 'neutral'));
        statusPill.className = 'pq-status-pill ' + tone;
        statusPill.textContent = curStep === 0 ? 'Original S0' : (isFinal ? `${st.state_label} (Final)` : `After Edit ${curStep}`);

        dots.forEach((d, di) => d.classList.toggle('active', di === curStep));
        subEl.textContent = isFinal ? `${st.state_label} (Final) / S${states.length - 1}` : `${st.state_label} / S${states.length - 1}`;

        crossFadeLayers(layers, prevLayerIdx, curStep);
        prevLayerIdx = curStep;
        alignPointer();
      }

      inits.push(() => goTo(curStep));
    });

    panel.append(decks);
    const b4bNote = el('p', 'case-note');
    b4bNote.innerHTML = `<strong>Case ${c.case_id} · What to observe:</strong> ${c.summary}`;
    panel.append(b4bNote);

    stage.replaceChildren(panel);
    inits.forEach(fn => fn());
  }

  draw();
}

/* ---------- INTERACTIVE ROLLOUT STUDIO ---------- */
let runIdx = 0;
let runStepIdx = 0;
let runRailStateIdx = 0;
let runAutoPlay = true;      // Guided Auto-Play enabled by default
let runUserPaused = false;   // Respect explicit user pause across case switches
let runAutoFinished = false; // True once auto-play has naturally reached Stop
let runRenderEpoch = 0;
let prevRunPillGeom = null; // { caseIdx, left, top, width, height } for sliding capsule transition

function initRunsSection() {
  const tabs = document.querySelector('#runs-tabs');
  const stage = document.querySelector('#runs-stage');
  const runs = DATA.full_runs;

  const ICO_PLANNER = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.2003 2.79553C15.8175 3.1709 18.6855 5.82178 19.0824 9.15718L21.5001 12.6499L19.132 13.5693V18.0499H15.224V20.7499H6.43108V18.2662C6.43108 14.5352 4.2549 14.4032 3.65283 11.5568M6.5 2.75L6.8395 3.47746C7.23684 4.32882 7.92118 5.01316 8.77254 5.4105L9.5 5.75L8.77254 6.0895C7.92118 6.48684 7.23684 7.17118 6.83951 8.02254L6.5 8.75L6.1605 8.02254C5.76316 7.17118 5.07882 6.48684 4.22746 6.08951L3.5 5.75L4.22746 5.4105C5.07882 5.01316 5.76316 4.32882 6.1605 3.47746L6.5 2.75Z"/></svg>';
  const ICO_SIM = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11.5312 4H4V20H20V12.4688M15.5 12L9.5 15.5L9.5 8.5L15.5 12ZM18 3L18.3395 3.72746C18.7368 4.57882 19.4212 5.26316 20.2725 5.6605L21 6L20.2725 6.3395C19.4212 6.73684 18.7368 7.42118 18.3395 8.27254L18 9L17.6605 8.27254C17.2632 7.42118 16.5788 6.73684 15.7275 6.33951L15 6L15.7275 5.6605C16.5788 5.26316 17.2632 4.57882 17.6605 3.72746L18 3Z"/></svg>';
  const ICO_SEL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9V4H9M20 9V4H15M4 15V20H9M20 15V20H15M13.6035 13.6035L15.75 15.75M14.75 11.25C14.75 12.9069 13.4069 14.25 11.75 14.25C10.0931 14.25 8.75 12.9069 8.75 11.25C8.75 9.59315 10.0931 8.25 11.75 8.25C13.4069 8.25 14.75 9.59315 14.75 11.25Z"/></svg>';

  let activeObserver = null;
  let activeCleanupFns = [];
  function cleanupAll() {
    runRenderEpoch += 1;
    if (activeObserver) {
      activeObserver.disconnect();
      activeObserver = null;
    }
    activeCleanupFns.forEach(fn => {
      try { fn(); } catch (_) {}
    });
    activeCleanupFns = [];
  }

  function makeRoleAvatar(role, svgHtml) {
    const av = el('span', 'beat-avatar ' + role);
    av.innerHTML = svgHtml;
    return av;
  }

  function makeWipeCompare(beforeSrc, afterSrc, leftLabel, rightLabel) {
    const wStage = el('div', 'wipe-stage');
    const imgAfter = el('img'); imgAfter.src = afterSrc; imgAfter.alt = rightLabel;
    const wOver = el('div', 'wipe-overlay');
    const imgBefore = el('img'); imgBefore.src = beforeSrc; imgBefore.alt = leftLabel;
    wOver.append(imgBefore);
    const wDiv = el('div', 'wipe-divider');
    wDiv.append(el('span', 'wipe-handle', '◀ ▶'));
    const tagL = el('span', 'wipe-tag left', leftLabel);
    const tagR = el('span', 'wipe-tag right', rightLabel);
    const wRange = el('input', 'wipe-range');
    wRange.type = 'range'; wRange.min = '0'; wRange.max = '100'; wRange.value = '30';
    wRange.setAttribute('aria-label', `Drag to compare ${leftLabel} and ${rightLabel}`);
    wStage.append(imgAfter, wOver, wDiv, tagL, tagR, wRange);

    function setSplit(pct) {
      const clamped = Math.max(0, Math.min(100, Number(pct)));
      wRange.value = String(clamped);
      wOver.style.clipPath = `inset(0 ${100 - clamped}% 0 0)`;
      wDiv.style.left = clamped + '%';
    }
    wRange.addEventListener('input', () => setSplit(wRange.value));
    setSplit(30);
    return wStage;
  }

  function draw() {
    cleanupAll();
    const myEpoch = runRenderEpoch;

    tabs.replaceChildren();
    runs.forEach((r, i) => {
      const b = btn('', () => {
        runIdx = i;
        runStepIdx = 0;
        runRailStateIdx = 0;
        // Start auto-play cleanly for newly selected case unless user explicitly paused
        if (!runUserPaused) {
          runAutoPlay = true;
          runAutoFinished = false;
        }
        draw();
      }, 'tab-btn' + (i === runIdx ? ' active' : ''));
      const caseLbl = r.display_id || `Case ${i + 1}`;
      b.append(
        el('span', 'tcode', caseLbl),
        el('span', '', stripIdPrefix(r.short_label, r.case_id)),
      );
      tabs.append(b);
    });

    const r = runs[runIdx];
    const caseDisplay = r.display_id || `Case ${runIdx + 1}`;
    const simRounds = r.rounds.filter(rd => !rd.is_stop);
    const stopRound = r.rounds.find(rd => rd.is_stop) || null;
    const totalSteps = simRounds.length + 1;
    if (runStepIdx >= totalSteps) runStepIdx = 0;
    const isFinalStep = runStepIdx === simRounds.length;
    const activeRd = isFinalStep ? null : simRounds[runStepIdx];

    // If auto-play arrived at the Final Stop step, halt cleanly here (do NOT loop back to Round 1)
    if (isFinalStep && runAutoPlay) {
      runAutoPlay = false;
      runAutoFinished = true;
    }

    const stateInIdx = isFinalStep ? r.states.length - 1 : (activeRd.state_in || 0);
    const stateOutIdx = isFinalStep ? r.states.length - 1 : (activeRd.state_out ?? stateInIdx);
    if (runRailStateIdx < 0 || runRailStateIdx >= r.states.length) {
      runRailStateIdx = stateInIdx;
    }

    const panel = el('div', 'panel run-studio-panel');

    function goStep(idx, { preserveAuto = false } = {}) {
      if (!preserveAuto) {
        runAutoPlay = false;
        runUserPaused = true;
        runAutoFinished = false;
      }
      runStepIdx = Math.max(0, Math.min(totalSteps - 1, idx));
      if (runStepIdx === simRounds.length) {
        runRailStateIdx = r.states.length - 1;
      } else {
        runRailStateIdx = simRounds[runStepIdx].state_in || 0;
      }
      draw();
    }

    /* --- 1. TOP ROLLOUT STEPPER BAR --- */
    const stepperBar = el('div', 'run-stepper-bar');
    const track = el('div', 'run-stepper-track');
    const stepIndicator = el('span', 'run-step-indicator');
    stepIndicator.setAttribute('aria-hidden', 'true');
    let activePillEl = null;

    simRounds.forEach((rd, idx) => {
      if (idx > 0) track.append(el('span', 'run-step-arrow', '→'));
      const pill = btn('', () => goStep(idx, { preserveAuto: false }), 'run-step-pill' + (idx === runStepIdx ? ' active' : ''));
      const badgeCls = !rd.accepted
        ? 'rejected'
        : (rd.refined ? 'refined' : (rd.step_pill.includes('◐') ? 'partial' : ''));
      pill.append(
        el('span', 'run-step-num', `R${rd.round}`),
        el('span', '', rd.step_short),
        el('span', 'run-step-badge ' + badgeCls, rd.step_pill),
      );
      if (idx === runStepIdx) activePillEl = pill;
      track.append(pill);
    });

    track.append(el('span', 'run-step-arrow', '→'));
    const finalPill = btn('', () => goStep(simRounds.length, { preserveAuto: false }), 'run-step-pill' + (isFinalStep ? ' active' : ''));
    finalPill.append(
      el('span', 'run-step-num', stopRound ? `R${stopRound.round}` : 'END'),
      el('span', '', stopRound ? 'Stop' : 'Final'),
      el('span', 'run-step-badge ' + (r.final_summary.decision_tone === 'warn' ? 'partial' : 'stop'),
        r.final_summary.final_label),
    );
    if (isFinalStep) activePillEl = finalPill;
    track.append(finalPill, stepIndicator);

    const navWrap = el('div', 'run-step-nav');

    // Auto-Play Toggle Button (default ON; click to pause/resume or replay from Stop)
    const autoBtn = btn('', () => {}, 'run-auto-btn' + (runAutoPlay ? ' playing' : ''));
    const autoDot = el('span', 'run-auto-dot');
    const autoTxt = el('span', '', '');
    autoBtn.append(autoDot, autoTxt);

    function syncAutoBtnUI() {
      autoBtn.classList.toggle('playing', runAutoPlay);
      if (runAutoPlay) {
        autoTxt.textContent = '⏸ Auto';
        autoBtn.title = 'Pause guided auto-play walkthrough';
      } else if (isFinalStep) {
        autoTxt.textContent = '▶ Replay';
        autoBtn.title = 'Replay guided walkthrough from Round 1';
      } else {
        autoTxt.textContent = '▶ Auto';
        autoBtn.title = 'Resume guided auto-play (Planner → Simulator → Selector)';
      }
    }
    syncAutoBtnUI();

    const prevBtn = btn('‹ Prev', () => goStep(runStepIdx - 1, { preserveAuto: false }), 'run-nav-btn');
    prevBtn.disabled = runStepIdx === 0;
    const nextBtn = btn('Next ›', () => goStep(runStepIdx + 1, { preserveAuto: false }), 'run-nav-btn');
    nextBtn.disabled = runStepIdx === totalSteps - 1;
    navWrap.append(autoBtn, prevBtn, nextBtn);

    stepperBar.append(track, navWrap);
    panel.append(stepperBar);

    /* --- 2. TWO-COLUMN WALKTHROUGH WORKBENCH --- */
    const workbench = el('div', 'run-workbench');

    /* --- LEFT PERSISTENT RAIL --- */
    const rail = el('aside', 'run-rail');

    // Card 1: 3-Module Reshooting Loop Dial
    const loopCard = el('div', 'rail-card loop-rail-card');
    const loopHead = el('div', 'rail-eyebrow');
    loopHead.append(el('span', '', 'Reshooting Loop'));
    loopCard.append(loopHead);

    const dial = el('div', 'loop-dial');
    const nodePlan = el('div', 'loop-node planner');
    nodePlan.innerHTML = `<span class="loop-dot">${ICO_PLANNER}</span><span>Planner</span>`;
    nodePlan.title = 'Hover to focus Planner';
    const nodeSim = el('div', 'loop-node simulator');
    nodeSim.innerHTML = `<span class="loop-dot">${ICO_SIM}</span><span>Simulator</span>`;
    nodeSim.title = 'Hover to focus Simulator';
    const nodeSel = el('div', 'loop-node selector');
    nodeSel.innerHTML = `<span class="loop-dot">${ICO_SEL}</span><span>Selector</span>`;
    nodeSel.title = 'Hover to focus Selector';
    dial.append(nodePlan, el('span', 'loop-sep', '→'), nodeSim, el('span', 'loop-sep', '→'), nodeSel);
    loopCard.append(dial);
    rail.append(loopCard);

    let activeFocusRole = null;
    let pendingFocusTimer = null;
    const ENTER_DELAY_MS = 380;
    const SWITCH_DELAY_MS = 120;
    const LEAVE_DELAY_MS = 160;
    const roleCards = { planner: null, simulator: null, selector: null };
    const loopNodes = { planner: nodePlan, simulator: nodeSim, selector: nodeSel };

    function applyFocusState(role) {
      activeFocusRole = role;
      workbench.classList.toggle('has-focus', Boolean(role));
      if (role) workbench.setAttribute('data-focus', role);
      else workbench.removeAttribute('data-focus');

      ['planner', 'simulator', 'selector'].forEach(rName => {
        const isFoc = role === rName;
        if (loopNodes[rName]) loopNodes[rName].classList.toggle('is-focused', isFoc);
        if (roleCards[rName]) roleCards[rName].classList.toggle('is-focused', isFoc);
      });
    }

    function clearHoverTimer() {
      if (pendingFocusTimer) {
        clearTimeout(pendingFocusTimer);
        pendingFocusTimer = null;
      }
    }
    activeCleanupFns.push(clearHoverTimer);

    function scheduleHoverFocus(targetRole) {
      if (runAutoPlay) return; // Auto-play owns focus cleanly while running
      clearHoverTimer();
      if (targetRole === activeFocusRole) return;
      const delay = targetRole === null
        ? LEAVE_DELAY_MS
        : (activeFocusRole === null ? ENTER_DELAY_MS : SWITCH_DELAY_MS);
      pendingFocusTimer = setTimeout(() => {
        pendingFocusTimer = null;
        if (myEpoch !== runRenderEpoch || runAutoPlay) return;
        applyFocusState(targetRole);
      }, delay);
    }

    ['planner', 'simulator', 'selector'].forEach(role => {
      const nd = loopNodes[role];
      nd.addEventListener('mouseenter', () => {
        if (!isFinalStep || role === 'planner') scheduleHoverFocus(role);
      });
      nd.addEventListener('mouseleave', () => scheduleHoverFocus(null));
    });

    function bindFocusCard(role, cardEl) {
      roleCards[role] = cardEl;
      cardEl.addEventListener('mouseenter', () => scheduleHoverFocus(role));
      cardEl.addEventListener('mouseleave', () => scheduleHoverFocus(null));
    }

    // Card 2: Anchored Current Portrait State
    const stateCard = el('div', 'rail-card state-rail-card');
    const stateHead = el('div', 'rail-eyebrow');
    stateHead.append(el('span', '', 'Portrait State'));

    const stateCodeText = isFinalStep
      ? `${r.states[r.states.length - 1].short_label} Final`
      : (activeRd.accepted ? `S${stateInIdx} → S${stateOutIdx}` : `S${stateInIdx} kept`);
    stateHead.append(el('span', 'rail-state-code' + (!isFinalStep && !activeRd.accepted ? ' rejected' : ''), stateCodeText));
    stateCard.append(stateHead);

    const railImgWrap = el('div', 'rail-portrait-wrap');
    const railLb = r.states.map(s => ({ src: s.src, title: `${caseDisplay} · ${s.label}`, caption: s.note }));
    const railImgEl = el('img');
    const railPillEl = el('span', 'rail-portrait-pill');
    const railZoomBtn = btn('', () => openLightbox(railLb, runRailStateIdx), 'zoom-btn');
    railZoomBtn.append(railImgEl);
    railImgWrap.append(railZoomBtn, railPillEl);
    stateCard.append(railImgWrap);

    const stateSelRow = el('div', 'rail-state-selector');
    stateSelRow.style.setProperty('--state-count', String(r.states.length));
    const stateCapEl = el('p', 'rail-state-caption');
    const stateBtnRefs = [];

    function syncRailPortrait() {
      const st = r.states[Math.min(runRailStateIdx, r.states.length - 1)];
      railImgEl.src = st.src;
      railImgEl.alt = st.label;
      let roleTxt = st.label;
      if (!isFinalStep) {
        if (st.index === stateInIdx && activeRd.accepted) roleTxt = `${st.short_label} · Round Input`;
        else if (st.index === stateInIdx && !activeRd.accepted) roleTxt = `${st.short_label} · Retained`;
        else if (st.index === stateOutIdx && activeRd.accepted) roleTxt = `${st.short_label} · Round Output`;
      }
      railPillEl.textContent = roleTxt;
      stateCapEl.textContent = `Viewing ${st.short_label}: ${st.note}`;
      stateBtnRefs.forEach((b, si) => b.classList.toggle('viewing', si === runRailStateIdx));
    }

    r.states.forEach((st, si) => {
      let sub = '';
      if (isFinalStep) {
        sub = si === 0 ? 'Orig' : (si === r.states.length - 1 ? 'Final' : '');
      } else if (si === stateInIdx && !activeRd.accepted) {
        sub = 'Kept';
      } else if (si === stateInIdx) {
        sub = 'In';
      } else if (si === stateOutIdx && activeRd.accepted) {
        sub = 'Out';
      } else if (si === 0) {
        sub = 'Orig';
      }
      const isRoundOut = !isFinalStep && activeRd.accepted && si === stateOutIdx;
      const sb = btn('', () => {
        runRailStateIdx = si;
        syncRailPortrait();
      }, 'rail-state-btn' + (isRoundOut ? ' round-out' : ''));
      sb.title = `Preview ${st.label} (${st.note})`;
      sb.append(el('strong', '', st.short_label), el('span', '', sub || '\u00A0'));
      stateBtnRefs.push(sb);
      stateSelRow.append(sb);
    });
    syncRailPortrait();
    stateCard.append(stateSelRow, stateCapEl);
    rail.append(stateCard);

    // Card 3: Live User Brief Checklist
    const briefCard = el('div', 'rail-card brief-rail-card');
    const briefHead = el('div', 'rail-eyebrow');
    briefHead.append(el('span', '', 'User Brief'), el('span', '', `${r.track_label} · ${r.goal_items.length}`));
    briefCard.append(briefHead);

    const cl = el('ul', 'rail-checklist');
    const statuses = isFinalStep ? r.final_summary.checklist_state : (activeRd.checklist_state || []);
    const iconSym = { done: '✓', active: '◉', retry: '↻', rejected: '✕', partial: '◐', pending: '○' };
    r.goal_items.forEach((gi, idx) => {
      const st = statuses[idx] || 'pending';
      const li = el('li', 'rail-check-item ' + st);
      li.append(el('span', 'rail-check-icon', iconSym[st] || '○'));
      const txt = el('div', 'rail-check-text');
      txt.append(el('strong', '', `${gi.num}. ${gi.title}`), el('span', '', gi.detail));
      li.append(txt);
      cl.append(li);
    });
    briefCard.append(cl);
    rail.append(briefCard);

    /* --- RIGHT HERO STAGE --- */
    const mainStage = el('div', 'run-stage');

    if (isFinalStep) {
      /* === FINAL STOP & BEFORE/AFTER FINALE === */
      autoBtn.addEventListener('click', () => {
        runAutoPlay = true;
        runUserPaused = false;
        runAutoFinished = false;
        goStep(0, { preserveAuto: true });
      });

      const fin = r.final_summary;
      const banner = el('div', 'beat-card beat-planner run-finale-banner' + (fin.decision_tone === 'warn' ? ' warn' : ''));
      bindFocusCard('planner', banner);
      const bHead = el('div', 'beat-head');
      const bRole = el('div', 'beat-role');
      bRole.append(
        makeRoleAvatar('planner', ICO_PLANNER),
        el('span', 'beat-role-title', stopRound ? `Round ${stopRound.round} · Planner Termination Decision` : 'Run Termination · Budget Complete'),
      );
      bHead.append(
        bRole,
        el('span', 'beat-pill ' + (fin.decision_tone === 'warn' ? 'amber' : 'selector'), fin.decision_badge),
      );
      banner.append(bHead, el('h4', '', fin.headline), el('p', '', fin.rationale));
      mainStage.append(banner);

      const fGrid = el('div', 'run-finale-grid');

      const wCard = el('div', 'run-finale-wipe-card');
      const wHead = el('div', 'run-finale-wipe-head');
      const finalLb = [
        { src: fin.before_src, title: `${caseDisplay} · Original Input (S0)`, caption: 'Starting portrait before reshooting.' },
        { src: fin.after_src, title: `${caseDisplay} · Final Reshot (${fin.final_label})`, caption: fin.rationale },
      ];
      wHead.append(
        el('span', '', `Original S0 vs. Reshot ${fin.final_label} · drag divider`),
        btn('Zoom', () => openLightbox(finalLb, 1), 'zoom-pill'),
      );
      wCard.append(wHead, makeWipeCompare(fin.before_src, fin.after_src, 'Original S0', `Reshot ${fin.final_label}`));
      fGrid.append(wCard);

      const fRight = el('div', 'run-finale-right');
      const trailCard = el('div', 'run-trail-card');
      trailCard.append(el('div', 'run-trail-title', 'Accepted States (Click to jump)'));
      const tGrid = el('div', 'run-trail-grid');
      tGrid.style.setProperty('--state-count', String(r.states.length));
      r.states.forEach((st, si) => {
        const cell = btn('', () => {
          if (si === 0) {
            openLightbox(railLb, 0);
          } else {
            const targetIdx = simRounds.findIndex(x => x.round === st.round);
            if (targetIdx >= 0) goStep(targetIdx, { preserveAuto: false });
            else openLightbox(railLb, si);
          }
        }, 'run-trail-cell' + (si === r.states.length - 1 ? ' final' : ''));
        const im = el('img'); im.src = st.src; im.alt = st.label; im.loading = 'lazy';
        const cap = el('div', 'run-trail-cap');
        const trailNote = si === 0 && st.note === 'Original portrait' ? 'Original' : st.note;
        cap.append(el('strong', '', st.short_label + (si === 0 ? ' In' : (si === r.states.length - 1 ? ' Final' : ''))), el('span', '', trailNote));
        cell.append(im, cap);
        tGrid.append(cell);
      });
      trailCard.append(tGrid);
      fRight.append(trailCard);

      const recapCard = el('div', 'run-recap-card');
      recapCard.append(el('div', 'run-trail-title', 'Round-by-Round Rollout Recap'));
      const recapList = el('ul', 'run-recap-list');
      simRounds.forEach((rd, idx) => {
        const li = el('li');
        const rowBtn = btn('', () => goStep(idx, { preserveAuto: false }), 'run-recap-row');
        const left = el('span', 'run-recap-left');
        left.append(
          el('span', 'run-recap-rd', `R${rd.round}`),
          el('span', 'run-recap-desc', `${rd.adapter_label.replace(' LoRA', '')}: ${rd.verdict_head}`),
        );
        const bCls = !rd.accepted ? 'rejected' : (rd.refined ? 'refined' : (rd.step_pill.includes('◐') ? 'partial' : ''));
        rowBtn.append(left, el('span', 'run-step-badge ' + bCls, rd.step_pill));
        li.append(rowBtn);
        recapList.append(li);
      });
      recapCard.append(recapList);
      fRight.append(recapCard);

      const replayRow = el('div', 'run-selector-foot');
      replayRow.append(
        btn('↺ Replay from Round 1', () => {
          runAutoPlay = true;
          runUserPaused = false;
          runAutoFinished = false;
          goStep(0, { preserveAuto: true });
        }, 'run-next-cta'),
      );
      fRight.append(replayRow);

      fGrid.append(fRight);
      mainStage.append(fGrid);

      // Brief calm Planner highlight on Stop arrival, then release to all-vivid
      if (runAutoFinished) {
        applyFocusState('planner');
        const stopRelease = setTimeout(() => {
          if (myEpoch === runRenderEpoch) applyFocusState(null);
        }, 1200);
        activeCleanupFns.push(() => clearTimeout(stopRelease));
      }

    } else {
      /* === SIMULATION ROUND VIEW (1. PLANNER -> 2. HERO VIDEO <-> 3. SYNCED SELECTOR) === */
      const rd = activeRd;
      const isRejected = !rd.accepted;
      const isPartial = rd.step_pill.includes('◐');
      const allRoundFrames = [...(rd.coarse_frames || []), ...(rd.refine_frames || [])];
      const f0Frame = (rd.coarse_frames || []).find(f => f.frame_index === 0) || null;
      const chosenFrameObj = allRoundFrames.find(f => f.chosen) || f0Frame;

      /* --- BEAT 1: PLANNER CARD (BLUE) --- */
      const planCard = el('div', 'beat-card beat-planner');
      bindFocusCard('planner', planCard);
      const pHead = el('div', 'beat-head');
      const pRole = el('div', 'beat-role');
      pRole.append(
        makeRoleAvatar('planner', ICO_PLANNER),
        el('span', 'beat-role-title', `1. Planner (VLM) · Round ${rd.round} of ${r.rounds.length}`),
      );
      const pMeta = el('div', 'beat-meta-row');
      pMeta.append(el('span', 'beat-pill planner', `seed ${rd.seed ?? 42}`));
      if (rd.retry_note) {
        pMeta.append(el('span', 'beat-pill amber', '↻ Retry + retry_note'));
      }
      pHead.append(pRole, pMeta);
      planCard.append(pHead);
      planCard.append(el('p', 'planner-diag', rd.planner_diag));

      const actChip = el('div', 'planner-action-chip');
      actChip.append(
        el('span', 'planner-fam-tag', rd.family || 'action'),
        el('span', 'planner-action-text', rd.action_chip),
      );
      planCard.append(actChip);

      if (rd.retry_note) {
        const retryBox = el('div', 'planner-retry-box');
        retryBox.append(el('strong', '', '+ retry_note:'), document.createTextNode(rd.retry_note));
        planCard.append(retryBox);
      }
      mainStage.append(planCard);

      /* --- BEAT 2 + BEAT 3 SPLIT DECK --- */
      const splitGrid = el('div', 'run-sim-sel-grid');

      /* --- BEAT 2: HERO 39-FRAME VIDEO SIMULATOR (ORANGE) --- */
      const simCard = el('div', 'beat-card beat-simulator');
      bindFocusCard('simulator', simCard);

      const simHead = el('div', 'beat-head');
      const simRole = el('div', 'beat-role');
      simRole.append(
        makeRoleAvatar('simulator', ICO_SIM),
        el('span', 'beat-role-title', '2. Simulator'),
      );
      simHead.append(simRole, el('span', 'beat-pill simulator', rd.adapter_label));
      simCard.append(simHead);

      const vidStage = el('div', 'hero-vid-stage');
      const BASE_RATE = 0.5;
      const SLOW_RATE = 0.25;
      const vid = el('video');
      vid.src = rd.video;
      vid.muted = true;
      vid.loop = true;
      vid.playsInline = true;
      vid.preload = 'auto';
      vid.defaultPlaybackRate = BASE_RATE;
      vid.playbackRate = BASE_RATE;

      const stillImg = el('img', 'hero-vid-still');
      stillImg.alt = `Round ${rd.round} frame preview`;

      const badgeTL = el('span', 'hero-vid-badge-tl');
      const liveDot = el('span', 'live-dot');
      const badgeTLText = el('span', '', '39-FRAME ROLLOUT');
      badgeTL.append(liveDot, badgeTLText);

      const badgeTR = el('span', 'hero-vid-badge-tr', 'F00 / 38');
      vidStage.append(vid, stillImg, badgeTL, badgeTR);
      simCard.append(vidStage);

      const deck = el('div', 'hero-vid-deck');
      const scrubWrap = el('div', 'scrubber-wrap');

      if (rd.refined && rd.selected_frame_idx != null) {
        const pinLane = el('div', 'scrubber-pin-lane');
        const pinBtn = btn(`★ ${rd.selected_label}`, () => {
          stopAutoPlayManual();
          if (chosenFrameObj) jumpToFrameObj(chosenFrameObj);
        }, 'scrubber-refine-pin');
        pinBtn.style.left = `${(rd.selected_frame_idx / 38) * 100}%`;
        pinLane.append(pinBtn);
        scrubWrap.append(pinLane);
      }

      const scrubber = el('input', 'hero-scrubber');
      scrubber.type = 'range'; scrubber.min = '0'; scrubber.max = '38'; scrubber.value = '0';
      scrubber.setAttribute('aria-label', `Scrub Round ${rd.round} 39-frame simulation`);
      scrubWrap.append(scrubber);

      if (rd.refined && rd.refine_bracket) {
        const brRow = el('div', 'scrubber-bracket-row');
        const br = el('div', 'scrubber-bracket');
        const p0 = (rd.refine_bracket[0] / 38) * 100;
        const p1 = (rd.refine_bracket[1] / 38) * 100;
        br.style.left = `${p0}%`;
        br.style.width = `${p1 - p0}%`;
        brRow.append(br);
        scrubWrap.append(brRow);
      }

      const ticks = el('div', 'scrubber-ticks');
      const coarseTicks = [0, 10, 19, 29, 38];

      const btnRow = el('div', 'hero-vid-btns');
      const playBtn = btn('⏸ Pause', () => {}, 'vid-mini-btn active');
      const slowBtn = btn('0.5× Slow', () => {}, 'vid-mini-btn');
      const jumpBtn = btn(
        isRejected ? '↩ Jump F0' : `★ Jump ${rd.selected_label}`,
        () => {},
        'vid-mini-btn jump-ok',
      );
      const peekBtn = btn('👁 Hold F0', () => {}, 'vid-mini-btn peek-btn');
      btnRow.append(playBtn, slowBtn, jumpBtn, peekBtn);

      const readout = el('div', 'hero-frame-readout');

      scrubWrap.append(ticks);
      deck.append(scrubWrap, btnRow, readout);
      simCard.append(deck);

      /* --- BEAT 3: SYNCED SELECTOR FILMSTRIP + SEQUENTIAL STAGE ANIMATION + VERDICT --- */
      const selCard = el('div', 'beat-card beat-selector');
      bindFocusCard('selector', selCard);

      const selHead = el('div', 'beat-head');
      const selRole = el('div', 'beat-role');
      selRole.append(
        makeRoleAvatar('selector', ICO_SEL),
        el('span', 'beat-role-title', '3. Selector (VLM)'),
      );
      const selBadgeCls = isRejected ? 'warn' : (isPartial ? 'amber' : 'selector');
      selHead.append(
        selRole,
        el('span', 'beat-pill ' + selBadgeCls, rd.refined ? `Refined → ${rd.selected_label}` : rd.badge),
      );
      selCard.append(selHead);
      selCard.append(el('p', 'sel-sync-hint', 'Click any frame to jump the hero video to that exact moment.'));

      const coarseCells = [];
      const refineCells = [];
      const noteRowByLabel = {};
      let coarseBlockEl = null;
      let refineBlockEl = null;
      let funnelEl = null;

      let lockedStillFrame = null;
      let peekingF0 = false;
      let isPlaying = false;
      let slowMode = false;
      let dragging = false;
      let autoPhase = null; // 'planner' | 'simulator' | 'selector' | null
      let inViewport = false;
      let autoStartedHere = false;

      const phaseTimers = new Set();
      let activeSimEndedCleanup = null;
      let manualSeqTimer = null;

      function addPhaseTimer(fn, ms) {
        const id = setTimeout(() => {
          phaseTimers.delete(id);
          if (myEpoch !== runRenderEpoch) return;
          fn();
        }, ms);
        phaseTimers.add(id);
        return id;
      }

      function clearAutoTimers() {
        phaseTimers.forEach(id => clearTimeout(id));
        phaseTimers.clear();
        if (activeSimEndedCleanup) {
          activeSimEndedCleanup();
          activeSimEndedCleanup = null;
        }
      }

      function stopManualSeqLoop() {
        if (manualSeqTimer) {
          clearTimeout(manualSeqTimer);
          manualSeqTimer = null;
        }
      }

      activeCleanupFns.push(() => {
        clearAutoTimers();
        stopManualSeqLoop();
        try { vid.pause(); } catch (_) {}
      });

      function clearScanVisuals() {
        coarseCells.forEach(c => c.el.classList.remove('sel-scanning', 'playhead'));
        refineCells.forEach(c => c.el.classList.remove('sel-scanning', 'playhead'));
        Object.values(noteRowByLabel).forEach(li => li.classList.remove('sel-scanning'));
        if (coarseBlockEl) coarseBlockEl.classList.remove('stage-muted', 'stage-active');
        if (refineBlockEl) refineBlockEl.classList.remove('stage-muted', 'stage-active');
        if (funnelEl) funnelEl.classList.remove('funnel-muted', 'funnel-active');
        vBox.classList.remove('verdict-pop');
      }

      function updateReadoutForFrame(fIdx, exactObj) {
        const nearest = exactObj
          || (rd.refine_frames || []).find(f => f.frame_index === fIdx)
          || (rd.coarse_frames || []).reduce((best, cur) =>
              (!best || Math.abs(cur.frame_index - fIdx) < Math.abs(best.frame_index - fIdx)) ? cur : best, null);
        if (nearest) {
          const isSel = nearest.frame_index === rd.selected_frame_idx;
          const prefix = isSel
            ? (isRejected ? `${nearest.label} (Kept S${rd.state_in}):` : `${nearest.label} ★ Selected:`)
            : `${nearest.label} (${nearest.tag}):`;
          readout.replaceChildren(
            el('strong', '', prefix),
            document.createTextNode(' ' + (nearest.raw_note || nearest.tag)),
          );
        }
      }

      function syncPlayheadUI(fIdx, exactObj = null, { highlightStrips = true } = {}) {
        const clamped = Math.max(0, Math.min(38, Math.round(fIdx)));
        if (!dragging) scrubber.value = String(clamped);
        const fStr = `F${String(clamped).padStart(2, '0')}`;
        const isOnChosen = rd.selected_frame_idx != null && Math.abs(clamped - rd.selected_frame_idx) <= (exactObj ? 0 : 1);
        badgeTR.textContent = isOnChosen
          ? (isRejected ? 'F0 · Kept' : `★ ${rd.selected_label} / 38`)
          : `${fStr} / 38`;
        badgeTR.classList.toggle('chosen', isOnChosen && !isRejected);
        badgeTR.classList.toggle('rejected', isOnChosen && isRejected);

        // On single-stage rounds (outside active Selector scan), track coarse playhead softly.
        // On 2-stage refined rounds, NEVER highlight both strips in parallel — sequential Stage 1 -> Stage 2 drives them!
        if (highlightStrips && !rd.refined && autoPhase !== 'selector') {
          const nearest = (rd.coarse_frames || []).reduce((best, f) =>
            Math.abs(f.frame_index - clamped) < Math.abs(best.frame_index - clamped) ? f : best
          , (rd.coarse_frames || [])[0]);
          coarseCells.forEach(entry => {
            entry.el.classList.toggle('playhead', nearest && entry.frame.frame_index === nearest.frame_index);
          });
        }

        updateReadoutForFrame(clamped, exactObj);
      }

      function clearStill() {
        lockedStillFrame = null;
        if (!peekingF0) stillImg.classList.remove('visible');
      }

      function applyPlaybackRate() {
        const rate = slowMode ? SLOW_RATE : BASE_RATE;
        vid.defaultPlaybackRate = rate;
        vid.playbackRate = rate;
      }
      vid.addEventListener('loadedmetadata', applyPlaybackRate);
      vid.addEventListener('play', applyPlaybackRate);

      function startPlay({ loop = true } = {}) {
        clearStill();
        vid.loop = loop;
        applyPlaybackRate();
        vid.play().catch(() => {});
        isPlaying = true;
        playBtn.textContent = '⏸ Pause';
        playBtn.classList.add('active');
        liveDot.classList.remove('paused');
        if (!peekingF0) {
          badgeTL.classList.remove('peeking');
          badgeTLText.textContent = slowMode ? '39-FRAME · 0.5× SLOW' : '39-FRAME ROLLOUT';
        }
      }

      function pausePlay(labelText = 'PAUSED') {
        vid.pause();
        isPlaying = false;
        playBtn.textContent = '▶ Play';
        playBtn.classList.remove('active');
        liveDot.classList.add('paused');
        if (!peekingF0) {
          badgeTL.classList.remove('peeking');
          badgeTLText.textContent = labelText;
        }
      }

      function showFramePreview(fObj, badgeLabel) {
        pausePlay(badgeLabel);
        lockedStillFrame = fObj;
        if (!peekingF0 && (fObj.src_hi || fObj.src)) {
          stillImg.src = fObj.src_hi || fObj.src;
          stillImg.classList.add('visible');
        }
        if (vid.duration && isFinite(vid.duration)) {
          const targetT = fObj.frame_index === 0 ? 0 : Math.min(vid.duration - 0.02, (fObj.frame_index / 38) * vid.duration);
          try { vid.currentTime = targetT; } catch (_) {}
        }
        syncPlayheadUI(fObj.frame_index, fObj, { highlightStrips: false });
      }

      function jumpToFrameObj(fObj) {
        stopManualSeqLoop();
        clearScanVisuals();
        showFramePreview(fObj, `LOCKED · ${fObj.label}`);
      }

      function jumpToFrameIndex(idx) {
        stopAutoPlayManual();
        const match = (rd.refine_frames || []).find(f => f.frame_index === idx)
          || (rd.coarse_frames || []).find(f => f.frame_index === idx);
        if (match) {
          jumpToFrameObj(match);
          return;
        }
        stopManualSeqLoop();
        clearScanVisuals();
        clearStill();
        pausePlay(`FRAME F${idx}`);
        if (vid.duration && isFinite(vid.duration)) {
          vid.currentTime = Math.min(vid.duration - 0.02, (idx / 38) * vid.duration);
        }
        syncPlayheadUI(idx);
      }

      function buildSyncedFilmstrip(framesList, stageTitle, rightTag, isRefineStage, targetArr) {
        const blk = el('div', 'run-strip-block');
        const cap = el('div', 'run-strip-cap');
        cap.append(el('span', '', stageTitle), el('span', '', rightTag));
        blk.append(cap);

        const strip = el('div', 'run-filmstrip' + (isRefineStage ? ' refined-strip' : ''));
        strip.append(el('div', 'run-sprockets'));
        const grid = el('div', 'run-film-grid');
        const lbItems = framesList.map(f => ({
          src: f.src_hi || f.src,
          title: `${caseDisplay} · Round ${rd.round} · ${f.label} (${f.tag})`,
          caption: f.raw_note || rd.action_id,
        }));

        framesList.forEach((f, fi) => {
          const cls = ['run-film-cell'];
          if (f.in_bracket) cls.push('in-bracket');
          if (f.chosen) {
            cls.push('chosen');
            if (isRejected) cls.push('rejected-pick');
          }
          const cell = el('div', cls.join(' '));
          cell.setAttribute('role', 'button');
          cell.setAttribute('tabindex', '0');
          cell.title = `Click to seek video to ${f.label} — ${f.tag}`;
          const activate = () => {
            stopAutoPlayManual();
            jumpToFrameObj(f);
          };
          cell.addEventListener('click', activate);
          cell.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); } });

          const thumb = el('div', 'run-film-thumb');
          const im = el('img'); im.src = f.src; im.alt = f.label; im.loading = 'lazy';
          const lblText = f.is_new ? `+${f.label}` : f.label;
          thumb.append(im, el('span', 'run-film-lbl' + (f.is_new ? ' is-new' : ''), lblText));
          if (f.chosen) {
            thumb.append(el('span', 'run-film-check', isRejected ? '✕' : '✓'));
          }
          const zBtn = btn('⊕', e => {
            e.stopPropagation();
            stopAutoPlayManual();
            openLightbox(lbItems, fi);
          }, 'run-film-zoom');
          zBtn.title = `Zoom ${f.label} full-res`;
          thumb.append(zBtn);

          cell.append(thumb, el('div', 'run-film-tag', f.tag));
          grid.append(cell);
          targetArr.push({ el: cell, frame: f });
        });

        strip.append(grid, el('div', 'run-sprockets'));
        blk.append(strip);
        return blk;
      }

      // Stage 1: Coarse 5-frame strip
      if (rd.coarse_frames && rd.coarse_frames.length) {
        const rightLbl = rd.refined && rd.refine_bracket
          ? `Bracket [F${rd.refine_bracket[0]}–F${rd.refine_bracket[1]}]`
          : (isRejected ? 'No frame accepted' : `Selected ${rd.selected_label}`);
        coarseBlockEl = buildSyncedFilmstrip(rd.coarse_frames, 'Stage 1 · Coarse 5-Frame Strip', rightLbl, false, coarseCells);
        selCard.append(coarseBlockEl);
      }

      // Stage 2: Funnel + Fine strip OR Single-stage status + clickable notes
      if (rd.refined && rd.refine_frames && rd.refine_frames.length) {
        funnelEl = el('div', 'run-refine-funnel');
        const fTop = el('div', 'run-refine-funnel-top');
        fTop.append(
          el('span', '', `↓ REFINE F${rd.refine_bracket[0]}–F${rd.refine_bracket[1]} · 3 IN-BETWEEN FRAMES`),
          el('span', 'run-refine-same', 'SAME TRAJECTORY · 0 extra video rollouts'),
        );
        funnelEl.append(fTop);
        if (rd.coarse_reason) funnelEl.append(el('p', '', rd.coarse_reason));
        selCard.append(funnelEl);

        refineBlockEl = buildSyncedFilmstrip(
          rd.refine_frames,
          'Stage 2 · Fine Sampling Strip',
          `Selected ${rd.selected_label} ✓`,
          true,
          refineCells,
        );
        selCard.append(refineBlockEl);
      } else if (rd.coarse_frames && rd.coarse_frames.length) {
        const stChip = el('div', 'run-stage-status' + (isRejected ? ' rejected' : (isPartial ? ' partial' : '')));
        stChip.append(
          el('strong', '', isRejected
            ? 'Stage 2 · Skipped (Rejected)'
            : (isPartial ? 'Stage 2 · Conservative Stop' : 'Stage 2 · Not Needed')),
          el('span', '', isRejected
            ? 'All candidates stalled near F0 — retained current state.'
            : (isPartial
              ? `Stops at early ${rd.selected_label} rather than refining deeper — later frames dim the warm tower eaves.`
              : `Coarse frame ${rd.selected_label} hits the target extent directly.`)),
        );
        selCard.append(stChip);

        const notesCard = el('div', 'run-frame-notes-card');
        notesCard.append(el('div', 'run-frame-notes-head', 'Selector Per-Frame Assessment (Click row to jump video)'));
        const nList = el('ul', 'run-frame-notes-list');
        rd.coarse_frames.filter(f => f.frame_index > 0).forEach(f => {
          const li = el('li', 'run-frame-note-row' + (f.chosen ? ' chosen' : '') + (isRejected && f.chosen ? ' rejected' : ''));
          li.append(
            el('span', 'run-frame-note-id', f.label),
            el('span', '', f.raw_note || f.tag),
          );
          li.addEventListener('click', () => {
            stopAutoPlayManual();
            jumpToFrameObj(f);
          });
          noteRowByLabel[f.label] = li;
          nList.append(li);
        });
        notesCard.append(nList);
        selCard.append(notesCard);
      }

      // Selector Verdict Box
      const vBox = el('div', 'run-verdict' + (isRejected ? ' rejected' : (isPartial ? ' partial' : '')));
      vBox.append(el('strong', '', rd.verdict_head), document.createTextNode(rd.verdict_body));
      selCard.append(vBox);

      // Selector Footer
      const selFoot = el('div', 'run-selector-foot');
      if (chosenFrameObj) {
        selFoot.append(btn(`Zoom ${chosenFrameObj.label} Full-Res`, () => {
          stopAutoPlayManual();
          const list = [
            ...(f0Frame ? [{ src: f0Frame.src_hi || f0Frame.src, title: `${caseDisplay} · Round ${rd.round} Input (F0)`, caption: `Round start state S${rd.state_in}` }] : []),
            ...(chosenFrameObj.frame_index !== 0 ? [{ src: chosenFrameObj.src_hi || chosenFrameObj.src, title: `${caseDisplay} · Round ${rd.round} Selected (${chosenFrameObj.label})`, caption: rd.verdict_body }] : []),
          ];
          openLightbox(list, list.length - 1);
        }, 'vid-mini-btn'));
      }
      const nextStepLabel = runStepIdx < simRounds.length - 1
        ? `Next: Round ${simRounds[runStepIdx + 1].round} (${simRounds[runStepIdx + 1].step_short}) →`
        : (stopRound ? `Next: Round ${stopRound.round} (Stop & Final Compare) →` : 'Next: Final Before & After →');
      selFoot.append(btn(nextStepLabel, () => goStep(runStepIdx + 1, { preserveAuto: false }), 'run-next-cta'));
      selCard.append(selFoot);

      splitGrid.append(simCard, selCard);
      mainStage.append(splitGrid);

      /* --- OPTIONAL COLLAPSIBLE RAW TRACE DRAWER --- */
      const trace = rd.raw_trace || {};
      const tDet = el('details', 'run-trace-drawer');
      tDet.append(el('summary', '', `Inspect verbatim Planner & Selector logs · Round ${rd.round} (JSON trace)`));
      const tBody = el('div', 'run-trace-body');
      const addTrace = (title, text, full = false) => {
        if (!text) return;
        const b = el('div', 'run-trace-block' + (full ? ' full' : ''));
        b.append(el('h5', '', title), el('p', '', text));
        tBody.append(b);
      };
      addTrace('Verbatim DSL Action Command', rd.action_id, true);
      addTrace('Planner · Last Round Review', trace.last_round_review);
      addTrace('Planner · Plan Step Intent', trace.plan_step);
      addTrace('Simulator · Video Summary', trace.video_summary);
      addTrace('Selector · Full Decision Rationale', trace.selector_reason);
      if (trace.coarse_trajectory) addTrace('Selector · Coarse Trajectory Notes', trace.coarse_trajectory, !trace.refine_trajectory);
      if (trace.refine_trajectory) addTrace('Selector · Fine Refinement Notes', trace.refine_trajectory);
      tDet.append(tBody);
      mainStage.append(tDet);

      /* =====================================================================
         UNIFIED SEQUENTIAL SELECTOR ANIMATION (Stage 1 -> Funnel -> Stage 2)
         Used BOTH once-through during Auto-Play AND as a single unified loop
         in manual mode on 2-stage refined rounds (never 2 parallel loops!).
         ===================================================================== */
      const SCAN_STEP_MS = 420;
      const FUNNEL_PAUSE_MS = 620;
      const LOCK_HOLD_MS = 650;
      const BUFFER_MS = 500;

      function buildSelectorSequence() {
        const seq = [];
        coarseCells.forEach(c => seq.push({ kind: 'coarse', entry: c, ms: SCAN_STEP_MS }));
        if (rd.refined && refineCells.length) {
          seq.push({ kind: 'funnel', ms: FUNNEL_PAUSE_MS });
          refineCells.forEach(c => seq.push({ kind: 'refine', entry: c, ms: SCAN_STEP_MS }));
        }
        seq.push({ kind: 'lock', ms: LOCK_HOLD_MS + BUFFER_MS });
        return seq;
      }

      function renderSelectorStep(stepObj, { syncHero = true } = {}) {
        coarseCells.forEach(c => c.el.classList.remove('sel-scanning', 'playhead'));
        refineCells.forEach(c => c.el.classList.remove('sel-scanning', 'playhead'));
        Object.values(noteRowByLabel).forEach(li => li.classList.remove('sel-scanning'));
        vBox.classList.remove('verdict-pop');

        if (stepObj.kind === 'coarse') {
          if (coarseBlockEl) { coarseBlockEl.classList.add('stage-active'); coarseBlockEl.classList.remove('stage-muted'); }
          if (refineBlockEl) { refineBlockEl.classList.add('stage-muted'); refineBlockEl.classList.remove('stage-active'); }
          if (funnelEl) { funnelEl.classList.add('funnel-muted'); funnelEl.classList.remove('funnel-active'); }
          stepObj.entry.el.classList.add('sel-scanning');
          const nr = noteRowByLabel[stepObj.entry.frame.label];
          if (nr) nr.classList.add('sel-scanning');
          if (syncHero) {
            showFramePreview(stepObj.entry.frame, `STAGE 1 · ${stepObj.entry.frame.label}`);
          }
        } else if (stepObj.kind === 'funnel') {
          if (coarseBlockEl) { coarseBlockEl.classList.add('stage-active'); coarseBlockEl.classList.remove('stage-muted'); }
          if (refineBlockEl) { refineBlockEl.classList.add('stage-muted'); refineBlockEl.classList.remove('stage-active'); }
          if (funnelEl) { funnelEl.classList.add('funnel-active'); funnelEl.classList.remove('funnel-muted'); }
        } else if (stepObj.kind === 'refine') {
          if (coarseBlockEl) { coarseBlockEl.classList.add('stage-muted'); coarseBlockEl.classList.remove('stage-active'); }
          if (refineBlockEl) { refineBlockEl.classList.add('stage-active'); refineBlockEl.classList.remove('stage-muted'); }
          if (funnelEl) { funnelEl.classList.remove('funnel-muted'); funnelEl.classList.add('funnel-active'); }
          stepObj.entry.el.classList.add('sel-scanning');
          if (syncHero) {
            showFramePreview(stepObj.entry.frame, `STAGE 2 · ${stepObj.entry.frame.label}`);
          }
        } else if (stepObj.kind === 'lock') {
          if (rd.refined && refineBlockEl) {
            if (coarseBlockEl) { coarseBlockEl.classList.add('stage-muted'); coarseBlockEl.classList.remove('stage-active'); }
            refineBlockEl.classList.add('stage-active'); refineBlockEl.classList.remove('stage-muted');
            if (funnelEl) { funnelEl.classList.remove('funnel-muted'); funnelEl.classList.remove('funnel-active'); }
          } else if (coarseBlockEl) {
            coarseBlockEl.classList.add('stage-active'); coarseBlockEl.classList.remove('stage-muted');
          }
          vBox.classList.add('verdict-pop');
          if (syncHero && chosenFrameObj) {
            showFramePreview(chosenFrameObj, isRejected ? 'RETAINED · F0' : `SELECTED · ${chosenFrameObj.label}`);
          }
        }
      }

      // Unified sequential loop for manual mode on 2-stage refined rounds (Stage 1 -> Funnel -> Stage 2 -> repeat)
      function startManualTwoStageLoop() {
        stopManualSeqLoop();
        if (!rd.refined || runAutoPlay || lockedStillFrame) return;
        const seq = buildSelectorSequence();
        let idx = 0;
        function tick() {
          if (myEpoch !== runRenderEpoch || runAutoPlay || lockedStillFrame) return;
          const step = seq[idx];
          // Don't hijack hero video while user is watching continuous playback in manual mode — animate the Selector strips sequentially!
          renderSelectorStep(step, { syncHero: false });
          idx = (idx + 1) % seq.length;
          manualSeqTimer = setTimeout(tick, step.ms);
        }
        tick();
      }

      /* =====================================================================
         GUIDED AUTO-PLAY DIRECTOR (Planner -> Simulator -> Selector -> Next)
         ===================================================================== */
      function stopAutoPlayManual() {
        if (!runAutoPlay && autoPhase === null) return;
        runAutoPlay = false;
        runUserPaused = true;
        runAutoFinished = false;
        autoPhase = null;
        autoStartedHere = false;
        clearAutoTimers();
        clearScanVisuals();
        applyFocusState(null);
        syncAutoBtnUI();
        // Keep video looping cleanly in manual mode if not locked on a specific frame
        vid.loop = true;
        if (!lockedStillFrame && inViewport) {
          startPlay({ loop: true });
          if (rd.refined) startManualTwoStageLoop();
        }
      }

      function runGuidedRound() {
        if (!runAutoPlay || myEpoch !== runRenderEpoch) return;
        stopManualSeqLoop();
        clearAutoTimers();
        clearHoverTimer();
        clearScanVisuals();
        autoStartedHere = true;

        // --- PHASE 1: PLANNER (shorter than Simulator's ~3.25s playback) ---
        autoPhase = 'planner';
        applyFocusState('planner');
        runRailStateIdx = stateInIdx;
        syncRailPortrait();
        if (f0Frame) {
          showFramePreview(f0Frame, `READY · S${rd.state_in}`);
        } else {
          pausePlay('READY');
        }
        const plannerMs = rd.retry_note ? 2400 : 2000;

        addPhaseTimer(() => {
          if (!runAutoPlay) return;
          // --- PHASE 2: SIMULATOR (1 full rollout F0 -> F38 + 0.5s buffer) ---
          autoPhase = 'simulator';
          applyFocusState('simulator');
          clearScanVisuals();
          clearStill();
          try { vid.currentTime = 0; } catch (_) {}
          startPlay({ loop: false });

          let simDone = false;
          function finishSimulatorPhase() {
            if (simDone || myEpoch !== runRenderEpoch || !runAutoPlay) return;
            simDone = true;
            if (activeSimEndedCleanup) {
              activeSimEndedCleanup();
              activeSimEndedCleanup = null;
            }
            pausePlay('ROLLOUT DONE · F38');
            // 0.5s buffer after Simulator finishes 1 full rollout
            addPhaseTimer(() => {
              if (!runAutoPlay) return;
              // --- PHASE 3: SELECTOR (sequential Stage 1 [-> Funnel -> Stage 2] + lock + 0.5s buffer) ---
              autoPhase = 'selector';
              applyFocusState('selector');
              const seq = buildSelectorSequence();
              let sIdx = 0;

              function nextSelStep() {
                if (!runAutoPlay || myEpoch !== runRenderEpoch) return;
                if (sIdx >= seq.length) {
                  // Done with this round -> smoothly advance to next round (or Stop!)
                  goStep(runStepIdx + 1, { preserveAuto: true });
                  return;
                }
                const step = seq[sIdx++];
                renderSelectorStep(step, { syncHero: true });
                if (step.kind === 'lock' && rd.accepted) {
                  runRailStateIdx = stateOutIdx;
                  syncRailPortrait();
                }
                addPhaseTimer(nextSelStep, step.ms);
              }
              nextSelStep();
            }, BUFFER_MS);
          }

          const onEnded = () => finishSimulatorPhase();
          vid.addEventListener('ended', onEnded, { once: true });
          activeSimEndedCleanup = () => vid.removeEventListener('ended', onEnded);

          // Safety fallback in case video duration/ended event is delayed in headless or slow decoder
          const rate = slowMode ? SLOW_RATE : BASE_RATE;
          const estDurSec = (vid.duration && isFinite(vid.duration) && vid.duration > 0.2) ? vid.duration : 1.625;
          const fallbackMs = Math.round((estDurSec / rate) * 1000) + 900;
          addPhaseTimer(finishSimulatorPhase, fallbackMs);
        }, plannerMs);
      }

      // Wire top Auto-Play toggle button
      autoBtn.addEventListener('click', () => {
        if (runAutoPlay) {
          stopAutoPlayManual();
        } else {
          runAutoPlay = true;
          runUserPaused = false;
          runAutoFinished = false;
          syncAutoBtnUI();
          runGuidedRound();
        }
      });

      // Wire tick buttons & manual controls (any manual interaction pauses Auto-Play cleanly)
      coarseTicks.forEach(tIdx => {
        const isChosenTick = !rd.refined && tIdx === rd.selected_frame_idx;
        const tk = btn(`F${tIdx}`, () => jumpToFrameIndex(tIdx), 'scrubber-tick' + (isChosenTick ? ' chosen' : ''));
        tk.style.left = `${(tIdx / 38) * 100}%`;
        ticks.append(tk);
      });

      vidStage.addEventListener('click', () => {
        stopAutoPlayManual();
        if (isPlaying) {
          pausePlay('PAUSED');
        } else {
          startPlay({ loop: true });
          if (rd.refined) startManualTwoStageLoop();
        }
      });
      playBtn.addEventListener('click', () => {
        stopAutoPlayManual();
        if (isPlaying) {
          pausePlay('PAUSED');
        } else {
          startPlay({ loop: true });
          if (rd.refined) startManualTwoStageLoop();
        }
      });
      slowBtn.addEventListener('click', () => {
        slowMode = !slowMode;
        slowBtn.classList.toggle('active', slowMode);
        applyPlaybackRate();
        if (isPlaying && !peekingF0) {
          badgeTLText.textContent = slowMode ? '39-FRAME · 0.5× SLOW' : '39-FRAME ROLLOUT';
        }
      });
      jumpBtn.addEventListener('click', () => {
        stopAutoPlayManual();
        if (chosenFrameObj) jumpToFrameObj(chosenFrameObj);
      });

      function startPeekF0() {
        if (!f0Frame) return;
        stopAutoPlayManual();
        peekingF0 = true;
        stillImg.src = f0Frame.src_hi || f0Frame.src;
        stillImg.classList.add('visible');
        peekBtn.classList.add('peeking');
        badgeTL.classList.add('peeking');
        badgeTLText.textContent = `PEEKING S${rd.state_in} (F0)`;
      }
      function endPeekF0() {
        if (!peekingF0) return;
        peekingF0 = false;
        peekBtn.classList.remove('peeking');
        badgeTL.classList.remove('peeking');
        if (lockedStillFrame) {
          stillImg.src = lockedStillFrame.src_hi || lockedStillFrame.src;
          stillImg.classList.add('visible');
          badgeTLText.textContent = `LOCKED · ${lockedStillFrame.label}`;
        } else {
          stillImg.classList.remove('visible');
          badgeTLText.textContent = isPlaying ? (slowMode ? '39-FRAME · 0.5× SLOW' : '39-FRAME ROLLOUT') : 'PAUSED';
        }
      }
      peekBtn.addEventListener('pointerdown', e => {
        e.preventDefault();
        startPeekF0();
        window.addEventListener('pointerup', endPeekF0, { once: true });
        window.addEventListener('pointercancel', endPeekF0, { once: true });
      });
      peekBtn.addEventListener('pointerleave', endPeekF0);
      peekBtn.addEventListener('keydown', e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); startPeekF0(); } });
      peekBtn.addEventListener('keyup', endPeekF0);

      scrubber.addEventListener('input', () => {
        stopAutoPlayManual();
        stopManualSeqLoop();
        clearScanVisuals();
        dragging = true;
        clearStill();
        pausePlay(`SCRUB · F${scrubber.value}`);
        const f = Number(scrubber.value);
        if (vid.duration && isFinite(vid.duration)) {
          vid.currentTime = Math.min(vid.duration - 0.02, (f / 38) * vid.duration);
        }
        syncPlayheadUI(f);
      });
      scrubber.addEventListener('change', () => { dragging = false; });

      vid.addEventListener('timeupdate', () => {
        if (dragging || lockedStillFrame || !vid.duration) return;
        const f = Math.min(38, Math.round((vid.currentTime / vid.duration) * 38));
        syncPlayheadUI(f);
      });

      // Initialize readout
      updateReadoutForFrame(chosenFrameObj ? chosenFrameObj.frame_index : 0, chosenFrameObj);

      // Observe viewport visibility so Auto-Play starts politely once the walkthrough section is visible (and pauses if scrolled away)
      if ('IntersectionObserver' in window) {
        activeObserver = new IntersectionObserver(entries => {
          if (myEpoch !== runRenderEpoch) return;
          for (const ent of entries) {
            inViewport = ent.isIntersecting;
            if (ent.isIntersecting) {
              if (runAutoPlay) {
                if (!autoStartedHere) runGuidedRound();
              } else if (!lockedStillFrame && !dragging) {
                startPlay({ loop: true });
                if (rd.refined) startManualTwoStageLoop();
              }
            } else {
              if (runAutoPlay && autoStartedHere) {
                clearAutoTimers();
                autoStartedHere = false;
                autoPhase = null;
                pausePlay('PAUSED');
                applyFocusState(null);
              } else if (isPlaying) {
                stopManualSeqLoop();
                pausePlay('PAUSED');
              }
            }
          }
        }, { threshold: 0.2 });
        activeObserver.observe(panel);
      } else if (runAutoPlay) {
        runGuidedRound();
      } else {
        startPlay({ loop: true });
        if (rd.refined) startManualTwoStageLoop();
      }
    }

    workbench.append(rail, mainStage);
    panel.append(workbench);

    const dNote = el('p', 'case-note');
    dNote.innerHTML = `<strong>${caseDisplay} (${r.short_label}) · What to observe:</strong> ${r.summary}`;
    panel.append(dNote);
    stage.replaceChildren(panel);

    // Position & smoothly slide the active blue capsule ring from previous round pill to current pill
    function placeIndicator(geom, animate) {
      stepIndicator.classList.toggle('animating', Boolean(animate));
      stepIndicator.style.width = `${geom.width}px`;
      stepIndicator.style.height = `${geom.height}px`;
      stepIndicator.style.transform = `translate3d(${geom.left}px, ${geom.top}px, 0)`;
      stepIndicator.classList.add('ready');
    }

    if (activePillEl) {
      const targetGeom = {
        caseIdx: runIdx,
        left: activePillEl.offsetLeft,
        top: activePillEl.offsetTop,
        width: activePillEl.offsetWidth,
        height: activePillEl.offsetHeight,
      };
      const canSlide = Boolean(
        prevRunPillGeom &&
        prevRunPillGeom.caseIdx === runIdx &&
        (Math.abs(prevRunPillGeom.left - targetGeom.left) > 1 || Math.abs(prevRunPillGeom.width - targetGeom.width) > 1)
      );
      if (canSlide) {
        placeIndicator(prevRunPillGeom, false);
        stepIndicator.getBoundingClientRect(); // flush starting position
        requestAnimationFrame(() => {
          if (myEpoch !== runRenderEpoch) return;
          placeIndicator(targetGeom, true);
        });
      } else {
        placeIndicator(targetGeom, false);
      }
      prevRunPillGeom = targetGeom;

      const onResize = () => {
        if (myEpoch !== runRenderEpoch || !activePillEl) return;
        const g = {
          caseIdx: runIdx,
          left: activePillEl.offsetLeft,
          top: activePillEl.offsetTop,
          width: activePillEl.offsetWidth,
          height: activePillEl.offsetHeight,
        };
        placeIndicator(g, false);
        prevRunPillGeom = g;
      };
      window.addEventListener('resize', onResize);
      activeCleanupFns.push(() => window.removeEventListener('resize', onResize));
    }
  }

  draw();
}

/* ---------- Boot ---------- */
initLoraSection();
initB2Section();
initB3Section();
initB4ASection();
initB4BSection();
initRunsSection();
