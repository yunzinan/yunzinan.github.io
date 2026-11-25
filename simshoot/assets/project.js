'use strict';

/* ==========================================================================
   SimShoot Public Project Page Interactivity (project.js)
   Powers:
     1. KaTeX math rendering across static & dynamic sections
     2. Sticky nav scroll state & active-section highlight
     3. Dataset figure lightbox zoom
     4. Quantitative Results & Human Evaluation Tabs + Win-Rate CI Chart
     5. BibTeX one-click copy
   ========================================================================== */

(function () {
  /* ---------- 0. KaTeX Auto-Render Helper ---------- */
  function renderTex(node) {
    if (typeof window.renderMathInElement !== 'function') return;
    window.renderMathInElement(node || document.body, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '\\[', right: '\\]', display: true },
        { left: '\\(', right: '\\)', display: false },
        { left: '$', right: '$', display: false },
      ],
      throwOnError: false,
    });
  }

  /* ---------- 1. Sticky Navigation & Active Scroll Spy ---------- */
  function initStickyNav() {
    const nav = document.getElementById('sticky-nav');
    const links = Array.from(document.querySelectorAll('#sticky-links a'));
    if (!nav || !links.length) return;

    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 12);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const sectionPairs = links
      .map(a => {
        const id = a.getAttribute('href')?.slice(1);
        const target = id ? document.getElementById(id) : null;
        return target ? { a, target } : null;
      })
      .filter(Boolean);

    const navAlias = {
      'sec-replan': 'sec-selector',
      'sec-executor': 'sec-selector',
    };
    const targets = [
      ...sectionPairs.map(p => p.target),
      ...Object.keys(navAlias).map(id => document.getElementById(id)).filter(Boolean),
    ];

    if ('IntersectionObserver' in window && targets.length) {
      const obs = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const navId = navAlias[entry.target.id] || entry.target.id;
            links.forEach(a => {
              a.classList.toggle('active', a.getAttribute('href') === `#${navId}`);
            });
          });
        },
        { rootMargin: '-22% 0px -65% 0px', threshold: 0.01 }
      );
      targets.forEach(t => obs.observe(t));
    }
  }

  /* ---------- 2. Dataset Figure Lightbox Zoom ---------- */
  function initDatasetZoom() {
    const dsBtn = document.getElementById('btn-dataset-zoom');
    if (dsBtn && typeof window.openLightbox === 'function') {
      dsBtn.addEventListener('click', () => {
        window.openLightbox(
          [
            {
              src: 'assets/media/simshoot-dataset.png',
              title: 'Dataset Construction Overview',
              caption:
                '(a) BlenderSynth renders 3D camera trajectories, (b) RealSynth generates transitions from verified endpoint pairs, (c) Lighting blends verified relit pairs in linear-light RGB, and (d) Progress-aware sampling yields uniform 39-frame visual progression.',
            },
          ],
          0
        );
      });
    }
  }

  /* ---------- 3. Quantitative Results & Human Evaluation ---------- */
  function initResultsSection() {
    const root = document.getElementById('results-root');
    if (!root) return;

    let activeTab = 'aesthetics';
    let humanTrack = 'overall';

    const HUMAN_PREF = {
      overall: {
        subtitle: 'All 240 portraits · 2,400 votes per baseline (12,000 total forced-choice votes)',
        rows: [
          { name: 'ChronoEdit', wr: 60.79, lo: 57.96, hi: 63.54, p: 'p < 0.001', texP: '\\(p < 0.001\\)', sig: true },
          { name: 'AesFormer', wr: 56.33, lo: 53.63, hi: 59.04, p: 'p < 0.001', texP: '\\(p < 0.001\\)', sig: true },
          { name: 'FLUX 3 Klein', wr: 55.00, lo: 52.33, hi: 57.63, p: 'p < 0.001', texP: '\\(p < 0.001\\)', sig: true },
          { name: 'Qwen-Image 2.1', wr: 54.92, lo: 52.33, hi: 57.50, p: 'p < 0.001', texP: '\\(p < 0.001\\)', sig: true },
          { name: 'Nano Banana 2.1', wr: 49.67, lo: 47.17, hi: 52.08, p: 'p = 0.789', texP: 'parity', sig: false },
        ],
      },
      open: {
        subtitle: 'Open-ended reshooting · 120 portraits · 1,200 votes per baseline',
        rows: [
          { name: 'ChronoEdit', wr: 56.75, lo: 52.83, hi: 60.67, p: 'p = 0.004', texP: '\\(p = 0.004\\)', sig: true },
          { name: 'Qwen-Image 2.1', wr: 55.08, lo: 51.67, hi: 58.42, p: 'p = 0.013', texP: '\\(p = 0.013\\)', sig: true },
          { name: 'AesFormer', wr: 54.83, lo: 50.92, hi: 58.75, p: 'p = 0.050', texP: '\\(p = 0.050\\)', sig: true },
          { name: 'FLUX 3 Klein', wr: 53.42, lo: 49.67, hi: 57.08, p: 'p = 0.137', texP: 'parity', sig: false },
          { name: 'Nano Banana 2.1', wr: 48.33, lo: 44.83, hi: 51.92, p: 'p = 0.356', texP: 'parity', sig: false },
        ],
      },
      targeted: {
        subtitle: 'Targeted reshooting · 120 portraits · 1,200 votes per baseline',
        rows: [
          { name: 'ChronoEdit', wr: 64.83, lo: 60.92, hi: 68.67, p: 'p < 0.001', texP: '\\(p < 0.001\\)', sig: true },
          { name: 'AesFormer', wr: 57.83, lo: 54.17, hi: 61.58, p: 'p < 0.001', texP: '\\(p < 0.001\\)', sig: true },
          { name: 'FLUX 3 Klein', wr: 56.58, lo: 52.75, hi: 60.33, p: 'p = 0.002', texP: '\\(p = 0.002\\)', sig: true },
          { name: 'Qwen-Image 2.1', wr: 54.75, lo: 50.92, hi: 58.67, p: 'p = 0.032', texP: '\\(p = 0.032\\)', sig: true },
          { name: 'Nano Banana 2.1', wr: 51.00, lo: 47.67, hi: 54.33, p: 'p = 0.560', texP: 'parity', sig: false },
        ],
      },
    };

    const TABS = [
      { id: 'aesthetics', label: 'Aesthetic Quality' },
      { id: 'adherence', label: 'Instruction Following & Background' },
      { id: 'human', label: 'Human Evaluation' },
    ];

    function renderAestheticsTab() {
      return `
        <div class="results-table-wrap">
          <table class="acad-table">
            <thead>
              <tr>
                <th class="method-col">Method</th>
                <th>PortraitAes-S (%)</th>
                <th>PortraitAes-C (%)</th>
                <th>PortraitAes-E (%)</th>
                <th>PhotoFramer (%)</th>
                <th>Q-Align (%)</th>
                <th>ArtiMuse (%)</th>
              </tr>
            </thead>
            <tbody>
              <tr class="group-row"><td colspan="7">Open-Ended Reshooting (120 Portraits &middot; Relative Mean-Score Change from Input)</td></tr>
              <tr><td class="method-col">Qwen-Image 2.1</td><td>+6.69</td><td>+4.93</td><td>+1.76</td><td>+1.87</td><td>+3.11</td><td class="cell-second">+12.03</td></tr>
              <tr><td class="method-col">FLUX 3 Klein</td><td>+4.25</td><td>+4.55</td><td>&minus;1.37</td><td>+2.72</td><td class="cell-second">+7.60</td><td>+2.85</td></tr>
              <tr><td class="method-col">Nano Banana 2.1</td><td class="cell-second">+14.65</td><td class="cell-best">+7.17</td><td class="cell-best">+3.93</td><td>+3.59</td><td>+0.38</td><td class="cell-best">+13.32</td></tr>
              <tr><td class="method-col">ChronoEdit</td><td>+2.16</td><td>+0.99</td><td>&minus;0.92</td><td>+2.17</td><td>+4.27</td><td>+1.99</td></tr>
              <tr><td class="method-col">AesFormer</td><td>&minus;2.36</td><td>+4.42</td><td>&minus;0.95</td><td class="cell-second">+5.03</td><td>+7.11</td><td>+3.27</td></tr>
              <tr class="ours-row"><td class="method-col"><strong>SimShoot (Ours)</strong></td><td class="cell-best">+15.47</td><td class="cell-second">+5.05</td><td class="cell-second">+2.79</td><td class="cell-best">+5.10</td><td class="cell-best">+10.15</td><td>+5.35</td></tr>

              <tr class="group-row"><td colspan="7">Targeted Reshooting (120 Portraits &middot; Relative Mean-Score Change from Input)</td></tr>
              <tr><td class="method-col">Qwen-Image 2.1</td><td>+0.57</td><td class="cell-second">+2.00</td><td class="cell-second">+0.06</td><td>+2.56</td><td>+1.77</td><td class="cell-best">+7.26</td></tr>
              <tr><td class="method-col">FLUX 3 Klein</td><td>&minus;0.05</td><td>+1.42</td><td>&minus;0.27</td><td>+2.39</td><td>+3.38</td><td>+1.39</td></tr>
              <tr><td class="method-col">Nano Banana 2.1</td><td class="cell-second">+5.85</td><td>&minus;0.49</td><td>&minus;0.48</td><td>&minus;0.49</td><td>&minus;2.28</td><td>&minus;1.72</td></tr>
              <tr><td class="method-col">ChronoEdit</td><td>&minus;3.81</td><td>&minus;0.80</td><td>&minus;3.24</td><td>+1.40</td><td class="cell-second">+4.08</td><td>&minus;0.07</td></tr>
              <tr><td class="method-col">AesFormer</td><td>&minus;10.57</td><td>+0.64</td><td>&minus;1.34</td><td class="cell-best">+4.29</td><td class="cell-best">+4.27</td><td class="cell-second">+4.57</td></tr>
              <tr class="ours-row"><td class="method-col"><strong>SimShoot (Ours)</strong></td><td class="cell-best">+10.16</td><td class="cell-best">+2.08</td><td class="cell-best">+0.54</td><td class="cell-second">+2.78</td><td>+3.51</td><td>+1.77</td></tr>
            </tbody>
          </table>
        </div>
        <p class="table-footnote">
          Dark green marks the best score per metric within each task and light green marks second best.
          PortraitAes-S, -C, and -E denote Structure, Composition, and Emotion. In targeted reshooting, SimShoot ranks 1st across all three PortraitAes dimensions and surpasses Nano Banana 2.1 across all six metrics.
        </p>
      `;
    }

    function renderAdherenceTab() {
      return `
        <div class="grid-2">
          <div>
            <div class="b3-block-label">Instruction Following in Targeted Reshooting (VLM Judges, %)</div>
            <div class="results-table-wrap">
              <table class="acad-table">
                <thead>
                  <tr>
                    <th class="method-col">Method</th>
                    <th>GPT-6.1 Sol</th>
                    <th>Gemini 3.8 Flash</th>
                    <th>Qwen3.8 Max</th>
                    <th>Avg.</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td class="method-col">Qwen-Image 2.1</td><td>71.61</td><td>57.77</td><td>71.47</td><td>66.95</td></tr>
                  <tr><td class="method-col">FLUX 3 Klein</td><td class="cell-second">75.85</td><td class="cell-second">66.88</td><td class="cell-second">83.47</td><td class="cell-second">75.40</td></tr>
                  <tr><td class="method-col">Nano Banana 2.1</td><td>72.18</td><td>61.72</td><td>76.55</td><td>70.15</td></tr>
                  <tr><td class="method-col">ChronoEdit</td><td>63.49</td><td>54.10</td><td>60.59</td><td>59.39</td></tr>
                  <tr><td class="method-col">AesFormer</td><td>50.21</td><td>41.60</td><td>51.27</td><td>47.69</td></tr>
                  <tr class="ours-row"><td class="method-col"><strong>SimShoot (Ours)</strong></td><td class="cell-best">90.40</td><td class="cell-best">75.21</td><td class="cell-best">85.52</td><td class="cell-best">83.71</td></tr>
                </tbody>
              </table>
            </div>
            <p class="table-footnote">
              SimShoot ranks 1st under every VLM judge individually, leading runner-up FLUX 3 Klein by +8.31 pp on average (+5.19 pp across cross-family judges Gemini 3.8 Flash &amp; Qwen3.8 Max alone).
            </p>
          </div>
          <div>
            <div class="b3-block-label">Background Preservation under Fixed Capture (60 Portraits)</div>
            <div class="results-table-wrap">
              <table class="acad-table">
                <thead>
                  <tr>
                    <th class="method-col">Method</th>
                    <th>PSNR \\(\\uparrow\\)</th>
                    <th>SSIM \\(\\uparrow\\)</th>
                    <th>LPIPS \\(\\downarrow\\)</th>
                    <th>\\(\\lvert\\Delta L^*\\rvert \\downarrow\\)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td class="method-col">Qwen-Image 2.1</td><td>19.70</td><td>0.5364</td><td>0.1343</td><td>7.04</td></tr>
                  <tr><td class="method-col">FLUX 3 Klein</td><td class="cell-best">34.05</td><td class="cell-best">0.9434</td><td class="cell-best">0.0263</td><td class="cell-best">1.54</td></tr>
                  <tr><td class="method-col">Nano Banana 2.1</td><td>21.35</td><td>0.6133</td><td>0.1239</td><td>5.58</td></tr>
                  <tr><td class="method-col">ChronoEdit</td><td>18.90</td><td>0.5668</td><td>0.2097</td><td>8.23</td></tr>
                  <tr><td class="method-col">AesFormer</td><td>19.18</td><td>0.5627</td><td>0.3182</td><td>7.85</td></tr>
                  <tr class="ours-row"><td class="method-col"><strong>SimShoot (Ours)</strong></td><td class="cell-second">27.51</td><td class="cell-second">0.7921</td><td class="cell-second">0.1083</td><td class="cell-second">3.11</td></tr>
                </tbody>
              </table>
            </div>
            <p class="table-footnote">
              Evaluated on the shared visible background during pose/expression edits with fixed camera and lighting; \\(\\lvert\\Delta L^*\\rvert\\) denotes mean absolute CIELAB lightness shift. SimShoot ranks 2nd across all four metrics.
            </p>
          </div>
        </div>
      `;
    }

    function renderHumanTab() {
      const data = HUMAN_PREF[humanTrack];
      const rowsHtml = data.rows
        .map(r => {
          const ciLeft = Math.max(0, Math.min(100, r.lo));
          const ciWidth = Math.max(0.5, Math.min(100 - ciLeft, r.hi - r.lo));
          return `
            <div class="wr-row">
              <div class="wr-name">vs. ${r.name}</div>
              <div class="wr-track" title="SimShoot win rate: ${r.wr.toFixed(2)}% (95% CI [${r.lo.toFixed(2)}%, ${r.hi.toFixed(2)}%], Holm ${r.p})">
                <div class="wr-parity"></div>
                <div class="wr-bar ${r.sig ? 'sig' : 'tie'}" style="width:${r.wr}%"></div>
                <div class="wr-ci" style="left:${ciLeft}%;width:${ciWidth}%"></div>
              </div>
              <div class="wr-val">
                <span>${r.wr.toFixed(1)}%</span>
                <span class="wr-p ${r.sig ? 'sig' : 'ns'}">${r.sig ? r.texP : 'parity'}</span>
              </div>
            </div>
          `;
        })
        .join('');

      return `
        <div class="human-grid">
          <div class="chart-card">
            <div class="chart-head">
              <h4>Photographic Preference (SimShoot Win Rate)</h4>
              <div class="seg-switch" id="human-track-switch">
                <button type="button" data-ht="overall" class="${humanTrack === 'overall' ? 'active' : ''}">All (240)</button>
                <button type="button" data-ht="open" class="${humanTrack === 'open' ? 'active' : ''}">Open-Ended</button>
                <button type="button" data-ht="targeted" class="${humanTrack === 'targeted' ? 'active' : ''}">Targeted</button>
              </div>
            </div>
            <div style="font-size:0.78rem;color:var(--muted);margin-bottom:12px;">${data.subtitle}</div>
            <div class="winrate-list">${rowsHtml}</div>
            <div class="wr-axis">
              <div></div>
              <div class="wr-axis-scale"><span>0%</span><span>25%</span><span>50% (Parity)</span><span>75%</span><span>100%</span></div>
              <div>Holm \\(p\\)</div>
            </div>
            <p class="table-footnote">
              Whiskers show portrait-clustered 95% bootstrap CIs (20,000 replicates). SimShoot significantly outperforms 4 of 5 baselines overall (all Holm \\(p < 0.001\\)) and achieves parity with proprietary Nano Banana 2.1.
            </p>
          </div>
          <div class="chart-card">
            <div class="chart-head">
              <h4>Human Action Completion</h4>
            </div>
            <div style="font-size:0.78rem;color:var(--muted);margin-bottom:12px;">Targeted reshooting &middot; 120 portraits &middot; 308 requested actions</div>
            <div class="results-table-wrap">
              <table class="acad-table">
                <thead>
                  <tr>
                    <th class="method-col">Method</th>
                    <th>By Action</th>
                    <th>By Portrait</th>
                    <th>Holm \\(p\\)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="ours-row"><td class="method-col"><strong>SimShoot (Ours)</strong></td><td class="cell-best">71.13%</td><td class="cell-best">71.33%</td><td>&mdash;</td></tr>
                  <tr><td class="method-col">FLUX 3 Klein</td><td class="cell-second">70.06%</td><td class="cell-second">70.95%</td><td>0.790</td></tr>
                  <tr><td class="method-col">Nano Banana 2.1</td><td>69.81%</td><td>70.01%</td><td>0.768</td></tr>
                  <tr><td class="method-col">Qwen-Image 2.1</td><td>68.88%</td><td>69.32%</td><td>0.468</td></tr>
                  <tr><td class="method-col">ChronoEdit</td><td>66.65%</td><td>66.79%</td><td class="cell-second">0.030</td></tr>
                  <tr><td class="method-col">AesFormer</td><td>64.55%</td><td>64.94%</td><td class="cell-best">\\(<0.001\\)</td></tr>
                </tbody>
              </table>
            </div>
            <p class="table-footnote">
              Completion rates exclude <em>Can&rsquo;t tell</em> responses; Holm \\(p\\) tests paired portrait-level differences vs. SimShoot. Human ranking matches the 3-judge VLM ordering on all 6 of 6 methods (Spearman \\(\\rho = 1.00\\), Pearson \\(r = 0.98\\)).
            </p>
          </div>
        </div>
      `;
    }

    function render() {
      const frag = document.createDocumentFragment();
      const tabBar = document.createElement('div');
      tabBar.className = 'tab-bar';
      TABS.forEach(t => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'tab-btn' + (t.id === activeTab ? ' active' : '');
        b.textContent = t.label;
        b.addEventListener('click', () => {
          activeTab = t.id;
          render();
        });
        tabBar.append(b);
      });
      frag.append(tabBar);

      const panel = document.createElement('div');
      panel.className = 'panel';
      if (activeTab === 'aesthetics') panel.innerHTML = renderAestheticsTab();
      else if (activeTab === 'adherence') panel.innerHTML = renderAdherenceTab();
      else panel.innerHTML = renderHumanTab();

      if (activeTab === 'human') {
        const sw = panel.querySelector('#human-track-switch');
        if (sw) {
          sw.querySelectorAll('button[data-ht]').forEach(btn => {
            btn.addEventListener('click', () => {
              humanTrack = btn.getAttribute('data-ht') || 'overall';
              render();
            });
          });
        }
      }

      renderTex(panel);
      frag.append(panel);
      root.replaceChildren(frag);
    }

    render();
  }

  /* ---------- 5. BibTeX One-Click Copy ---------- */
  function initBibtexCopy() {
    const copyBtn = document.getElementById('btn-copy-bibtex');
    const codeEl = document.getElementById('bibtex-code');
    if (!copyBtn || !codeEl) return;

    copyBtn.addEventListener('click', async () => {
      const text = codeEl.textContent || '';
      try {
        await navigator.clipboard.writeText(text);
      } catch (_) {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.append(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
      }
      copyBtn.textContent = 'Copied \u2713';
      copyBtn.classList.add('copied');
      setTimeout(() => {
        copyBtn.textContent = 'Copy BibTeX';
        copyBtn.classList.remove('copied');
      }, 1800);
    });
  }

  function boot() {
    renderTex(document.body);
    initStickyNav();
    initDatasetZoom();
    initResultsSection();
    initBibtexCopy();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
