#!/usr/bin/env node
/*
 * Static-site generator for the Phase 1 Digital Literacy curriculum.
 *
 * Zero runtime dependencies. Reads ../curriculum, renders bilingual lesson
 * pages, an index, glossary, and safety-playbook page into ./dist, and copies
 * the reusable template (CSS/JS) plus PWA assets (manifest + service worker).
 *
 * Run:  node build.js   (from the site/ directory)
 */

'use strict';

const fs = require('fs');
const path = require('path');

const SITE_DIR = __dirname;
const CURRICULUM_DIR = path.join(SITE_DIR, '..', 'curriculum');
const DOMAINS_DIR = path.join(CURRICULUM_DIR, 'domains');
const SHARED_DIR = path.join(CURRICULUM_DIR, 'shared');
const TEMPLATE_DIR = path.join(SITE_DIR, 'template');
const DIST_DIR = path.join(SITE_DIR, 'dist');
const ASSETS_DIR = path.join(DIST_DIR, 'assets');

/* ------------------------------------------------------------------ *
 * Platform branding + course catalog (home page).
 * To rename the platform, change PLATFORM.name below.
 * ------------------------------------------------------------------ */
const PLATFORM = {
  name: 'Paila',
  tagline_en: 'Skills school and college skip — taught a modern way, for every age.',
  tagline_ne: 'विद्यालय र कलेजले नसिकाउने सिप — आधुनिक तरिकाले, हरेक उमेरका लागि।',
};

// Paila is a multi-subject learning platform — not limited to digital skills.
// Courses are grouped on the home page by subject area (`category_en`).
// The first AVAILABLE course (Digital Literacy) is generated from curriculum/;
// the rest are catalog placeholders that show the roadmap.
// To add a new subject later: add course objects with a new `category_en`/`category_ne`.
const COURSES = [
  {
    id: 'digital-literacy', status: 'available',
    category_en: 'Digital Skills', category_ne: 'डिजिटल सिप',
    title_en: 'Digital Literacy', title_ne: 'डिजिटल साक्षरता',
    subtitle_en: 'Become a confident, safe, independent digital citizen.',
    subtitle_ne: 'आत्मविश्वासी, सुरक्षित र स्वतन्त्र डिजिटल नागरिक बनौं।',
    level_en: 'Beginner · Phase 1', level_ne: 'सुरुवाती · चरण १',
  },
  { id: 'digital-worker', status: 'soon', category_en: 'Digital Skills', category_ne: 'डिजिटल सिप',
    title_en: 'Digital Worker', title_ne: 'डिजिटल कामदार',
    subtitle_en: 'Productivity tools and everyday work skills.', subtitle_ne: 'उत्पादकत्व उपकरण र दैनिक काम सिप।',
    level_en: 'Phase 2', level_ne: 'चरण २' },
  { id: 'digital-creator', status: 'soon', category_en: 'Digital Skills', category_ne: 'डिजिटल सिप',
    title_en: 'Digital Creator', title_ne: 'डिजिटल सर्जक',
    subtitle_en: 'Make and share your own content.', subtitle_ne: 'आफ्नै सामग्री बनाउने र साझा गर्ने।',
    level_en: 'Phase 3', level_ne: 'चरण ३' },
  { id: 'technology-builder', status: 'soon', category_en: 'Digital Skills', category_ne: 'डिजिटल सिप',
    title_en: 'Technology Builder', title_ne: 'प्रविधि निर्माता',
    subtitle_en: 'Coding and building with technology.', subtitle_ne: 'कोडिङ र प्रविधि निर्माण।',
    level_en: 'Phase 4', level_ne: 'चरण ४' },
  // Future subjects — the platform will grow beyond digital skills:
  { id: 'life-study-skills', status: 'soon', category_en: 'Life & Study Skills', category_ne: 'जीवन र अध्ययन सिप',
    title_en: 'Life & Study Skills', title_ne: 'जीवन र अध्ययन सिप',
    subtitle_en: 'Everyday skills for school, work, and life.', subtitle_ne: 'विद्यालय, काम र जीवनका दैनिक सिप।',
    level_en: 'Coming soon', level_ne: 'छिट्टै' },
];
const COURSE = COURSES[0]; // the course built from curriculum/
const BUILD_ID = Date.now(); // cache-busting stamp for assets

// Soft gate for the reviewer/QA suggestion tool. NOTE: this is NOT real
// security (it ships in the page); it only hides the feedback widget from
// learners. Change it to whatever you share privately with your reviewers.
const REVIEWER_PASS = 'Onemorelight';

// Estimated facilitated time (from the facilitator guides).
const COURSE_HOURS = 24; // total, guided
const CHAPTER_HOURS = { D1: 3, D2: 3, D3: 5, D4: 4, D5: 4, D6: 5 };

/* ------------------------------------------------------------------ *
 * Tiny Markdown renderer (vendored, dependency-free).
 * Supports: headings, bold, italic, inline code, links, blockquotes,
 * horizontal rules, ordered/unordered (one-level nested) lists, and
 * GitHub-style pipe tables. Enough for this curriculum's content.
 * ------------------------------------------------------------------ */

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

let hotspotSeq = 0;

// Render an interactive figure with clickable numbered hotspots.
// Block body: first line "src | alt", then rows "num | x% | y% | labelEn | labelNe | descEn | descNe".
function renderHotspots(buf) {
  const rows = buf.map((l) => l.trim()).filter(Boolean);
  if (!rows.length) return '';
  const head = rows[0].split('|').map((s) => s.trim());
  let src = head[0] || '';
  const alt = head[1] || '';
  const base = src.split('/').pop();
  if (/\.(svg|png|jpe?g|gif|webp)$/i.test(base) && !/^https?:/i.test(src)) src = 'assets/figures/' + base;

  const group = ++hotspotSeq;
  let buttons = '';
  let pops = '';
  for (let r = 1; r < rows.length; r++) {
    const c = rows[r].split('|').map((s) => s.trim());
    if (c.length < 7) continue;
    const [num, x, y, labEn, labNe, descEn, descNe] = c;
    const id = `hp${group}-${num}`;
    buttons += `<button type="button" class="hotspot" style="left:${x}%;top:${y}%" data-pop="${id}" aria-label="${escapeHtml(labEn)}">${escapeHtml(num)}</button>`;
    pops += `<div class="hotspot-pop" id="${id}" style="left:${x}%;top:${y}%" hidden role="status">` +
      `<strong><span class="lang-en">${escapeHtml(num)}. ${escapeHtml(labEn)}</span><span class="lang-ne">${escapeHtml(num)}. ${escapeHtml(labNe)}</span></strong>` +
      `<span class="hp-desc lang-en">${escapeHtml(descEn)}</span><span class="hp-desc lang-ne">${escapeHtml(descNe)}</span>` +
      `</div>`;
  }
  return `<figure class="hotspot-figure">
  <div class="hotspot-wrap">
    <img class="figure-img" src="${src}" alt="${escapeHtml(alt)}" loading="lazy">
    ${buttons}
    ${pops}
  </div>
  <figcaption class="hp-cap"><span class="lang-en">Tap a number to learn each part.</span><span class="lang-ne">हरेक भाग जान्न अंकमा थिच्नुहोस्।</span></figcaption>
</figure>`;
}

// Render a real image with always-visible labeled annotation boxes drawn over it.
// Block body: first line "src | alt", then rows "x% | y% | w% | h% | labelEn | labelNe".
function renderAnnotate(buf) {
  const rows = buf.map((l) => l.trim()).filter(Boolean);
  if (!rows.length) return '';
  const head = rows[0].split('|').map((s) => s.trim());
  let src = head[0] || '';
  const alt = head[1] || '';
  const base = src.split('/').pop();
  if (/\.(svg|png|jpe?g|gif|webp)$/i.test(base) && !/^https?:/i.test(src)) src = 'assets/figures/' + base;

  let boxes = '';
  for (let r = 1; r < rows.length; r++) {
    const c = rows[r].split('|').map((s) => s.trim());
    if (c.length < 4) continue;
    const [x, y, w, h, labEn, labNe] = c;
    const label = (labEn || labNe)
      ? `<span class="anno-label"><span class="lang-en">${escapeHtml(labEn || '')}</span><span class="lang-ne">${escapeHtml(labNe || '')}</span></span>`
      : '';
    boxes += `<span class="anno-box" style="left:${x}%;top:${y}%;width:${w}%;height:${h}%">${label}</span>`;
  }
  return `<figure class="annotate-figure">
  <div class="annotate-wrap">
    <img class="figure-img" src="${src}" alt="${escapeHtml(alt)}" loading="lazy">
    ${boxes}
  </div>
  <figcaption class="hp-cap"><span class="lang-en">The orange boxes show the parts to find on the real page.</span><span class="lang-ne">सुन्तला रंगका बाकसले साँचो पृष्ठमा खोज्नुपर्ने भाग देखाउँछन्।</span></figcaption>
</figure>`;
}

// Render an offline, self-checking quiz from a ```quiz block.
// Each line: "MCQ | q_en | q_ne | a;;b;;c | क;;ख;;ग | answerIndex(1-based) | explain_en | explain_ne"
//        or: "TF | q_en | q_ne | true|false | explain_en | explain_ne"
function renderQuiz(buf) {
  const rows = buf.map((l) => l.trim()).filter(Boolean);
  if (!rows.length) return '';
  let out = `<div class="quiz">
  <p class="quiz-title"><span class="lang-en">Check yourself</span><span class="lang-ne">आफैं जाँच्नुहोस्</span></p>`;
  let qNum = 0;
  for (const row of rows) {
    const c = row.split('|').map((s) => s.trim());
    const type = (c[0] || '').toUpperCase();
    let qEn, qNe, optsEn, optsNe, answerIdx, exEn, exNe;
    if (type === 'TF') {
      qEn = c[1]; qNe = c[2];
      const ans = (c[3] || '').toLowerCase() === 'true';
      optsEn = ['True', 'False']; optsNe = ['सही', 'गलत'];
      answerIdx = ans ? 0 : 1;
      exEn = c[4] || ''; exNe = c[5] || '';
    } else {
      qEn = c[1]; qNe = c[2];
      optsEn = (c[3] || '').split(';;').map((s) => s.trim());
      optsNe = (c[4] || '').split(';;').map((s) => s.trim());
      answerIdx = parseInt(c[5], 10) - 1;
      exEn = c[6] || ''; exNe = c[7] || '';
    }
    out += `\n  <div class="quiz-q" data-answer="${answerIdx}">
    <p class="quiz-prompt"><span class="quiz-qnum">${++qNum}</span><span class="quiz-qtext"><span class="lang-en">${escapeHtml(qEn)}</span><span class="lang-ne">${escapeHtml(qNe)}</span></span></p>
    <div class="quiz-options">`;
    for (let i = 0; i < optsEn.length; i++) {
      const letter = String.fromCharCode(65 + i);
      out += `<button type="button" class="quiz-opt" data-i="${i}"><span class="quiz-optmark">${letter}</span><span class="quiz-opttext"><span class="lang-en">${escapeHtml(optsEn[i] || '')}</span><span class="lang-ne">${escapeHtml(optsNe[i] || optsEn[i] || '')}</span></span></button>`;
    }
    out += `</div>
    <p class="quiz-feedback" hidden>` +
      `<span class="qf qf-correct"><span class="lang-en">Correct! ✓</span><span class="lang-ne">सही! ✓</span></span>` +
      `<span class="qf qf-retry"><span class="lang-en">Not quite — try again.</span><span class="lang-ne">अलि मिलेन — फेरि प्रयास गर्नुहोस्।</span></span>` +
      `<span class="qf qf-reveal"><span class="lang-en">The correct answer is shown.</span><span class="lang-ne">सही उत्तर देखाइएको छ।</span></span>` +
      ((exEn || exNe) ? `<span class="qf-explain"><span class="lang-en">${escapeHtml(exEn)}</span><span class="lang-ne">${escapeHtml(exNe)}</span></span>` : '') +
      `</p>
  </div>`;
  }
  out += `\n</div>`;
  return out;
}

function inline(text) {
  let out = escapeHtml(text);
  // inline code
  out = out.replace(/`([^`]+)`/g, (m, c) => `<code>${c}</code>`);
  // images ![alt](src) — local figures are served from assets/figures/
  out = out.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (m, alt, src) => {
    let s = src.trim();
    const base = s.split('/').pop();
    if (/\.(svg|png|jpe?g|gif|webp)$/i.test(base) && !/^https?:/i.test(s)) {
      s = 'assets/figures/' + base;
    }
    return `<img class="figure-img" src="${s}" alt="${alt}" loading="lazy">`;
  });
  // links [text](url)
  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (m, t, u) => {
    const safe = /^(https?:|mailto:|\.|\/|#)/.test(u) ? u : '#';
    return `<a href="${safe}">${t}</a>`;
  });
  // bold then italic
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  out = out.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  return out;
}

function isTableSeparator(line) {
  return /^\s*\|?[\s:]*-{1,}[\s:|-]*\|?\s*$/.test(line) && line.includes('-');
}

function splitRow(line) {
  let s = line.trim();
  if (s.startsWith('|')) s = s.slice(1);
  if (s.endsWith('|')) s = s.slice(0, -1);
  return s.split('|').map((c) => c.trim());
}

function renderMarkdown(src) {
  const lines = src.replace(/\r\n/g, '\n').split('\n');
  const html = [];
  let i = 0;

  while (i < lines.length) {
    let line = lines[i];

    // blank line
    if (/^\s*$/.test(line)) { i++; continue; }

    // fenced block (```), with special handling for ```hotspots
    const fence = line.match(/^```(.*)$/);
    if (fence) {
      const info = fence[1].trim().toLowerCase();
      i++;
      const buf = [];
      while (i < lines.length && !/^```/.test(lines[i])) { buf.push(lines[i]); i++; }
      if (i < lines.length) i++; // skip closing fence
      if (info.startsWith('hotspots')) {
        html.push(renderHotspots(buf));
      } else if (info.startsWith('annotate')) {
        html.push(renderAnnotate(buf));
      } else if (info.startsWith('quiz')) {
        html.push(renderQuiz(buf));
      } else {
        html.push('<pre><code>' + escapeHtml(buf.join('\n')) + '</code></pre>');
      }
      continue;
    }

    // horizontal rule
    if (/^\s*(---|\*\*\*|___)\s*$/.test(line)) { html.push('<hr>'); i++; continue; }

    // heading
    const h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) {
      const level = h[1].length;
      html.push(`<h${level}>${inline(h[2].trim())}</h${level}>`);
      i++;
      continue;
    }

    // table
    if (line.includes('|') && i + 1 < lines.length && isTableSeparator(lines[i + 1])) {
      const header = splitRow(line);
      i += 2; // skip header + separator
      const rows = [];
      while (i < lines.length && lines[i].includes('|') && !/^\s*$/.test(lines[i])) {
        rows.push(splitRow(lines[i]));
        i++;
      }
      let t = '<div class="table-wrap"><table><thead><tr>';
      t += header.map((c) => `<th>${inline(c)}</th>`).join('');
      t += '</tr></thead><tbody>';
      for (const r of rows) {
        t += '<tr>' + header.map((_, idx) => `<td>${inline(r[idx] || '')}</td>`).join('') + '</tr>';
      }
      t += '</tbody></table></div>';
      html.push(t);
      continue;
    }

    // blockquote
    if (/^\s*>/.test(line)) {
      const buf = [];
      while (i < lines.length && /^\s*>/.test(lines[i])) {
        buf.push(lines[i].replace(/^\s*>\s?/, ''));
        i++;
      }
      html.push(`<blockquote>${renderMarkdown(buf.join('\n'))}</blockquote>`);
      continue;
    }

    // list (ordered or unordered, with one level of nesting)
    if (/^\s*([-*]|\d+\.)\s+/.test(line)) {
      const block = [];
      while (i < lines.length && (/^\s*([-*]|\d+\.)\s+/.test(lines[i]) || (/^\s{2,}\S/.test(lines[i]) && block.length))) {
        block.push(lines[i]);
        i++;
      }
      html.push(renderList(block));
      continue;
    }

    // paragraph
    const para = [];
    while (i < lines.length && !/^\s*$/.test(lines[i]) &&
      !/^(#{1,6})\s/.test(lines[i]) && !/^\s*>/.test(lines[i]) &&
      !/^\s*(---|\*\*\*|___)\s*$/.test(lines[i]) &&
      !/^\s*([-*]|\d+\.)\s+/.test(lines[i])) {
      para.push(lines[i].trim());
      i++;
    }
    html.push(`<p>${inline(para.join(' '))}</p>`);
  }

  return html.join('\n');
}

// Render a list block that may contain a single level of nested items.
function renderList(block) {
  const indentOf = (l) => (l.match(/^(\s*)/)[1].length);
  const baseIndent = Math.min(...block.map(indentOf));
  const ordered = /^\s*\d+\.\s/.test(block[0]);
  let out = ordered ? '<ol>' : '<ul>';
  let idx = 0;
  while (idx < block.length) {
    const line = block[idx];
    const m = line.match(/^\s*([-*]|\d+\.)\s+(.*)$/);
    let text = m ? m[2] : line.trim();
    // gather lines that belong to this item (more indented than the marker)
    const child = [];
    let j = idx + 1;
    while (j < block.length && indentOf(block[j]) > baseIndent) {
      child.push(block[j]);
      j++;
    }
    // Leading marker-less lines are wrapped continuation text, not a sublist.
    let k = 0;
    while (k < child.length && !/^\s*([-*]|\d+\.)\s+/.test(child[k])) {
      text += ' ' + child[k].trim();
      k++;
    }
    const nested = child.slice(k);
    out += `<li>${inline(text)}`;
    if (nested.length) out += renderList(nested);
    out += '</li>';
    idx = j;
  }
  out += ordered ? '</ol>' : '</ul>';
  return out;
}

/* ------------------------------------------------------------------ *
 * Front-matter + prompts parsing
 * ------------------------------------------------------------------ */

function parseFrontMatter(raw) {
  const text = raw.replace(/\r\n/g, '\n');
  const m = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: text };
  const data = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!kv) continue;
    let val = kv[2].trim();
    if (/^\[.*\]$/.test(val)) {
      val = val.slice(1, -1).split(',').map((s) => s.trim().replace(/^["']|["']$/g, '')).filter(Boolean);
    } else if (/^".*"$/.test(val) || /^'.*'$/.test(val)) {
      val = val.slice(1, -1);
    } else if (val === 'true' || val === 'false') {
      val = val === 'true';
    } else if (/^-?\d+$/.test(val)) {
      val = Number(val);
    }
    data[kv[1]] = val;
  }
  return { data, body: m[2] };
}

// Parse the ```yaml block of prompt objects in a prompts.md file.
function parsePrompts(raw) {
  const text = raw.replace(/\r\n/g, '\n');
  const block = text.match(/```ya?ml\n([\s\S]*?)```/);
  if (!block) return [];
  const lines = block[1].split('\n');
  const items = [];
  let cur = null;
  const unquote = (v) => v.trim().replace(/^["']|["']$/g, '');
  for (const line of lines) {
    if (/^\s*$/.test(line)) continue;
    const start = line.match(/^-\s+([A-Za-z0-9_]+):\s*(.*)$/);
    if (start) {
      if (cur) items.push(cur);
      cur = {};
      cur[start[1]] = unquote(start[2]);
      continue;
    }
    const kv = line.match(/^\s+([A-Za-z0-9_]+):\s*(.*)$/);
    if (kv && cur) cur[kv[1]] = unquote(kv[2]);
  }
  if (cur) items.push(cur);
  return items;
}

/* ------------------------------------------------------------------ *
 * Curriculum discovery
 * ------------------------------------------------------------------ */

function read(file) {
  return fs.readFileSync(file, 'utf8');
}

// Remove internal author/traceability codes from learner-facing text so
// students never see them. Codes stay in the source files (for traceability
// and facilitator use); they are only stripped from the rendered lesson body.
function sanitizeLearner(md) {
  if (!md) return md;
  let out = md;
  // Drop the internal "Learning Goal" outcome sentence (English + Nepali).
  out = out.replace(/This lesson serves[^.\n]*\.[ \t]*\n?/g, '');
  out = out.replace(/यो पाठले[^।\n]*सघाउँछ।[ \t]*\n?/g, '');
  // Drop inline codes like (SP-3), (O01), (Req 5.5) — with any leading space.
  out = out.replace(/[ \t]*\((?:SP-\d+|O\d{2,}|Req[^)]*)\)/g, '');
  // Friendly label: learners see "Chapter", not the internal "Domain".
  out = friendlyLabel(out);
  return out;
}

// Relabel the internal architecture word "Domain" to the learner-friendly
// "Chapter" (and Nepali डोमेन -> अध्याय) wherever it is shown to learners.
function friendlyLabel(s) {
  if (!s) return s;
  return String(s).replace(/\bDomain\b/g, 'Chapter').replace(/डोमेन/g, 'अध्याय');
}

function firstHeading(md) {
  const m = md.match(/^#\s+(.*)$/m);
  return m ? m[1].trim() : '';
}

// Strip the leading H1 from a lesson body (the title is rendered separately).
function stripTitle(body) {
  return body.replace(/^\s*#\s+.*$/m, '').trimStart();
}

// Discover the lessons inside one module folder. Handles both the plain
// layout (lesson.en.md) and the L1-/L2- prefixed layout (D3-M2).
function discoverLessons(moduleDir) {
  const files = fs.readdirSync(moduleDir);
  const prefixes = files
    .map((f) => f.match(/^(L\d+-)?lesson\.en\.md$/))
    .filter(Boolean)
    .map((m) => m[1] || '');
  const lessons = [];
  for (const prefix of prefixes) {
    const enFile = path.join(moduleDir, `${prefix}lesson.en.md`);
    const neFile = path.join(moduleDir, `${prefix}lesson.ne.md`);
    const promptsFile = path.join(moduleDir, `${prefix}prompts.md`);

    const en = parseFrontMatter(read(enFile));
    const ne = fs.existsSync(neFile) ? parseFrontMatter(read(neFile)) : null;
    const prompts = fs.existsSync(promptsFile) ? parsePrompts(read(promptsFile)) : [];

    lessons.push({
      data: en.data,
      titleEn: en.data.title_en || firstHeading(en.body),
      titleNe: en.data.title_ne || (ne ? firstHeading(ne.body) : ''),
      bodyEn: stripTitle(en.body),
      bodyNe: ne ? stripTitle(ne.body) : '',
      prompts,
      id: en.data.id || `${path.basename(moduleDir)}-${prefix || 'L1'}`,
    });
  }
  lessons.sort((a, b) => (a.data.sequence || 0) - (b.data.sequence || 0));
  return lessons;
}

function discoverCurriculum() {
  const domains = [];
  const domainDirs = fs.readdirSync(DOMAINS_DIR)
    .filter((d) => /^D\d+-/.test(d))
    .sort();

  for (const dName of domainDirs) {
    const dDir = path.join(DOMAINS_DIR, dName);
    if (!fs.statSync(dDir).isDirectory()) continue;
    const dId = dName.match(/^(D\d+)-/)[1];
    const overviewFile = path.join(dDir, `${dId}.md`);
    let titleEn = dName, titleNe = '';
    if (fs.existsSync(overviewFile)) {
      const ov = read(overviewFile);
      titleEn = firstHeading(ov) || dName;
    }

    const moduleDirs = fs.readdirSync(dDir)
      .filter((m) => /^D\d+-M\d+/.test(m) && fs.statSync(path.join(dDir, m)).isDirectory())
      .sort();

    const modules = [];
    for (const mName of moduleDirs) {
      const lessons = discoverLessons(path.join(dDir, mName));
      if (lessons.length) modules.push({ name: mName, lessons });
    }
    domains.push({ id: dId, dirName: dName, titleEn, modules });
  }
  return domains;
}

/* ------------------------------------------------------------------ *
 * HTML page templates
 * ------------------------------------------------------------------ */

// Reviewer/QA feedback widget markup — present on every page, hidden until
// reviewer mode is switched on (see app.js initReviewer/initFeedback).
function feedbackWidget() {
  return `
<button type="button" class="fb-fab" id="fbFab" hidden>
  <span aria-hidden="true">✎</span>
  <span class="lang-en">Suggest</span><span class="lang-ne">सुझाव</span>
</button>
<div class="fb-modal" id="fbModal" hidden>
  <div class="fb-dialog" role="dialog" aria-modal="true" aria-labelledby="fbTitle">
    <div class="fb-head">
      <h2 id="fbTitle"><span class="lang-en">Reviewer feedback</span><span class="lang-ne">समीक्षक सुझाव</span></h2>
      <button type="button" class="fb-x" id="fbClose" aria-label="Close">&times;</button>
    </div>
    <p class="fb-context" id="fbContext"></p>
    <label class="fb-field">
      <span class="lang-en">Your name</span><span class="lang-ne">तपाईंको नाम</span>
      <input type="text" id="fbName" maxlength="40" autocomplete="off">
    </label>
    <div class="fb-row">
      <label class="fb-field">
        <span class="lang-en">Role</span><span class="lang-ne">भूमिका</span>
        <select id="fbRole">
          <option value="Facilitator">Facilitator / सहजकर्ता</option>
          <option value="QA">QA / परीक्षक</option>
          <option value="Content reviewer">Content reviewer / सामग्री समीक्षक</option>
          <option value="Other">Other / अन्य</option>
        </select>
      </label>
      <label class="fb-field">
        <span class="lang-en">Type</span><span class="lang-ne">प्रकार</span>
        <select id="fbCat">
          <option value="Content">Content / सामग्री</option>
          <option value="Translation">Translation / अनुवाद</option>
          <option value="Bug">Bug / त्रुटि</option>
          <option value="Idea">Idea / सुझाव</option>
          <option value="Other">Other / अन्य</option>
        </select>
      </label>
    </div>
    <label class="fb-field">
      <span class="lang-en">Suggestion</span><span class="lang-ne">सुझाव</span>
      <textarea id="fbText" rows="4" maxlength="1200" placeholder="..."></textarea>
    </label>
    <div class="fb-actions">
      <button type="button" class="fb-cancel" id="fbCancel"><span class="lang-en">Cancel</span><span class="lang-ne">रद्द</span></button>
      <button type="button" class="fb-save" id="fbSave"><span class="lang-en">Save note</span><span class="lang-ne">सुझाव सुरक्षित</span></button>
    </div>
    <p class="fb-saved" id="fbSaved" hidden><span class="lang-en">Saved ✓</span><span class="lang-ne">सुरक्षित भयो ✓</span></p>
    <div class="fb-admin">
      <button type="button" class="fb-download" id="fbDownload"><span class="lang-en">Download all</span><span class="lang-ne">सबै डाउनलोड</span> (<span id="fbCount">0</span>)</button>
      <button type="button" class="fb-clear" id="fbClear"><span class="lang-en">Clear</span><span class="lang-ne">मेट्नुहोस्</span></button>
      <button type="button" class="fb-exit" id="fbExit"><span class="lang-en">Exit reviewer mode</span><span class="lang-ne">समीक्षक मोड बन्द</span></button>
    </div>
  </div>
</div>`;
}

function pageShell({ title, bodyClass, content, sidebar }) {
  const hasSidebar = !!sidebar;
  return `<!DOCTYPE html>
<html lang="ne" class="lang-show-ne">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#2a2356">
<meta name="reviewer-pass" content="${escapeHtml(REVIEWER_PASS)}">
<title>${escapeHtml(title)} · ${escapeHtml(PLATFORM.name)}</title>
<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" href="assets/icon.svg">
<link rel="stylesheet" href="assets/styles.css?v=${BUILD_ID}">
</head>
<body class="${bodyClass || ''}">
<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header">
  ${hasSidebar ? '<button type="button" class="menu-btn" id="menuBtn" aria-label="Course menu" aria-expanded="false">☰</button>' : ''}
  <a class="brand" href="index.html">${escapeHtml(PLATFORM.name)}</a>
  <div class="header-right">
    <button type="button" class="lang-btn" id="langBtn" aria-label="Switch language"><span class="lang-globe" aria-hidden="true">🌐</span><span id="langLabel">EN</span></button>
    <button type="button" class="acct-in" id="signInBtn"><span class="lang-en">Sign in</span><span class="lang-ne">साइन इन</span></button>
    <span class="acct-user" id="acctUser" hidden>
      <span class="avatar" id="avatar" aria-hidden="true"></span>
      <span class="acct-name" id="uaName"></span>
      <button type="button" class="acct-out" id="signOutBtn"><span class="lang-en">Sign out</span><span class="lang-ne">साइन आउट</span></button>
    </span>
  </div>
</header>
${hasSidebar
  ? `<div class="layout">
  <div class="sidebar-overlay" id="sidebarOverlay" hidden></div>
  <aside class="sidebar" id="sidebar">${sidebar}</aside>
  <main id="main" class="course-main">
${content}
  </main>
</div>`
  : `<main id="main">
${content}
</main>`}
${hasSidebar ? '' : `<footer class="site-footer">
  <p class="lang-en">${escapeHtml(PLATFORM.name)} — free, offline-friendly learning for every age. Works in the lab and on a phone.</p>
  <p class="lang-ne">${escapeHtml(PLATFORM.name)} — हरेक उमेरका लागि निःशुल्क, अफलाइन-मैत्री सिकाइ। ल्याब र फोन दुवैमा चल्छ।</p>
  <button type="button" class="reviewer-link" id="reviewerLink"><span class="lang-en">Reviewer / QA</span><span class="lang-ne">समीक्षक / QA</span></button>
</footer>`}
${feedbackWidget()}
<script src="assets/app.js?v=${BUILD_ID}"></script>
</body>
</html>`;
}

function lessonFileName(id) {
  return `${id}.html`;
}

function countLessons(domains) {
  return domains.reduce((a, d) => a + d.modules.reduce((b, m) => b + m.lessons.length, 0), 0);
}

// Left-sidebar course outline used on lesson and reference pages.
function buildSidebar(domains, currentId) {
  let out = `<a class="sidebar-back" href="index.html"><span class="lang-en">&larr; All courses</span><span class="lang-ne">&larr; सबै कोर्स</span></a>
  <a class="sidebar-course" href="${COURSE.id}.html"><span class="lang-en">${escapeHtml(COURSE.title_en)}</span><span class="lang-ne">${escapeHtml(COURSE.title_ne)}</span></a>
  <div class="course-progress">
    <div class="cp-track"><span class="cp-fill" id="cpFill"></span></div>
    <span class="cp-label" id="cpLabel"><span class="lang-en">0% complete</span><span class="lang-ne">०% पूरा</span></span>
  </div>
  <nav class="outline" aria-label="Course outline">`;
  for (const d of domains) {
    const label = friendlyLabel(d.titleEn);
    const mm = label.match(/^(Chapter\s*\d+)\s*[—-]\s*(.*)$/);
    const num = mm ? mm[1] : label;
    const title = mm ? mm[2].replace(/\s*\(.*\)\s*$/, '').trim() : '';
    out += `\n    <p class="outline-domain"><span class="od-num">${escapeHtml(num)}</span>${title ? `<span class="od-title">${escapeHtml(title)}</span>` : ''}</p>`;
    for (const m of d.modules) {
      for (const lesson of m.lessons) {
        const active = lesson.id === currentId ? ' active' : '';
        out += `\n    <a class="outline-lesson${active}" href="${lessonFileName(lesson.id)}" data-lesson="${escapeHtml(lesson.id)}">` +
          `<span class="ol-title"><span class="lang-en">${escapeHtml(friendlyLabel(lesson.titleEn))}</span><span class="lang-ne">${escapeHtml(friendlyLabel(lesson.titleNe || lesson.titleEn))}</span></span>` +
          `<span class="ol-check" aria-hidden="true">✓</span></a>`;
      }
    }
  }
  out += `\n    <p class="outline-domain"><span class="lang-en">Reference</span><span class="lang-ne">सन्दर्भ</span></p>
    <a class="outline-lesson${currentId === 'glossary' ? ' active' : ''}" href="glossary.html"><span class="ol-title"><span class="lang-en">Glossary</span><span class="lang-ne">शब्दकोश</span></span></a>
    <a class="outline-lesson${currentId === 'safety' ? ' active' : ''}" href="safety.html"><span class="ol-title"><span class="lang-en">Safety</span><span class="lang-ne">सुरक्षा</span></span></a>
    <a class="outline-lesson${currentId === 'certificate' ? ' active' : ''}" href="certificate.html"><span class="ol-title"><span class="lang-en">Certificate</span><span class="lang-ne">प्रमाणपत्र</span></span></a>
  </nav>`;
  return out;
}

// Home page = course catalog, grouped by subject, shown as image cards.
function buildCatalogPage(domains) {
  const lessonCount = countLessons(domains);

  function courseCard(c) {
    const available = c.status === 'available';
    const cover = `assets/figures/course-${c.id}.svg`;
    const badge = available
      ? `<span class="cc-cta" data-course-cta><span class="cta-start"><span class="lang-en">Start course</span><span class="lang-ne">कोर्स सुरु गर्नुहोस्</span></span><span class="cta-resume" hidden><span class="lang-en">Resume</span><span class="lang-ne">जारी राख्नुहोस्</span></span></span>`
      : `<span class="badge soon"><span class="lang-en">Coming soon</span><span class="lang-ne">छिट्टै</span></span>`;
    const meta = available
      ? `<p class="cc-meta"><span class="lang-en">${lessonCount} lessons · about ${COURSE_HOURS} hours · English + Nepali</span><span class="lang-ne">${lessonCount} पाठ · करिब ${COURSE_HOURS} घण्टा · अंग्रेजी + नेपाली</span></p>`
      : `<p class="cc-meta"><span class="lang-en">${escapeHtml(c.level_en)}</span><span class="lang-ne">${escapeHtml(c.level_ne)}</span></p>`;
    const body = `<div class="cc-cover"><img src="${cover}" alt="" loading="lazy"></div>
      <div class="cc-body">
        <div class="cc-head">
          <h3><span class="lang-en">${escapeHtml(c.title_en)}</span><span class="lang-ne">${escapeHtml(c.title_ne)}</span></h3>
          ${badge}
        </div>
        <p class="cc-sub"><span class="lang-en">${escapeHtml(c.subtitle_en)}</span><span class="lang-ne">${escapeHtml(c.subtitle_ne)}</span></p>
        ${meta}
      </div>`;
    return available
      ? `\n        <a class="course-card" href="${c.id}.html">${body}</a>`
      : `\n        <div class="course-card is-soon">${body}</div>`;
  }

  // Group courses by subject (category), preserving first-seen order.
  const cats = [];
  for (const c of COURSES) {
    let g = cats.find((x) => x.en === c.category_en);
    if (!g) { g = { en: c.category_en, ne: c.category_ne, list: [] }; cats.push(g); }
    g.list.push(c);
  }

  let sections = '';
  for (const g of cats) {
    let cards = '';
    for (const c of g.list) cards += courseCard(c);
    sections += `\n    <section class="subject">
      <h2 class="subject-title"><span class="lang-en">${escapeHtml(g.en)}</span><span class="lang-ne">${escapeHtml(g.ne)}</span></h2>
      <div class="course-grid">${cards}
      </div>
    </section>`;
  }

  const content = `<div class="catalog-inner">
    <section class="hero">
      <h1>${escapeHtml(PLATFORM.name)}</h1>
    </section>
    <div class="catalog">${sections}
    </div>
  </div>`;
  return pageShell({ title: 'Courses', bodyClass: 'page-catalog', content });
}

// Course landing page: full-width gradient hero + chapter/lesson outline.
function buildCourseHome(domains) {
  const lessonCount = countLessons(domains);
  const firstId = domains[0] && domains[0].modules[0] && domains[0].modules[0].lessons[0]
    ? domains[0].modules[0].lessons[0].id : null;

  let toc = '';
  for (const d of domains) {
    const label = friendlyLabel(d.titleEn);
    const mm = label.match(/^(Chapter\s*\d+)\s*[—-]\s*(.*)$/);
    const num = mm ? mm[1] : label;
    const title = mm ? mm[2].replace(/\s*\(.*\)\s*$/, '').trim() : '';
    const hrs = CHAPTER_HOURS[d.id];
    toc += `\n    <div class="toc-chapter">
      <p class="toc-chapter-title"><span class="tc-num">${escapeHtml(num)}</span>${title ? `<span class="tc-title">${escapeHtml(title)}</span>` : ''}${hrs ? `<span class="tc-time"><span class="lang-en">~${hrs} hr</span><span class="lang-ne">~${hrs} घण्टा</span></span>` : ''}</p>`;
    for (const m of d.modules) {
      for (const lesson of m.lessons) {
        const isReview = /-M9-/.test(lesson.id);
        const marker = isReview
          ? '<span class="toc-points" aria-hidden="true"></span><span class="toc-star" aria-hidden="true">★</span>'
          : '<span class="toc-check" aria-hidden="true">✓</span>';
        toc += `\n      <a class="toc-lesson${isReview ? ' is-review' : ''}" href="${lessonFileName(lesson.id)}" data-lesson="${escapeHtml(lesson.id)}">` +
          `<span class="toc-lesson-title"><span class="lang-en">${escapeHtml(friendlyLabel(lesson.titleEn))}</span><span class="lang-ne">${escapeHtml(friendlyLabel(lesson.titleNe || lesson.titleEn))}</span></span>` +
          marker + `</a>`;
      }
    }
    toc += `\n    </div>`;
  }

  toc += `\n    <a class="toc-lesson toc-cert" href="certificate.html"><span class="toc-lesson-title"><span class="lang-en">Get your certificate</span><span class="lang-ne">आफ्नो प्रमाणपत्र लिनुहोस्</span></span><span class="toc-star" aria-hidden="true">★</span></a>`;

  const content = `<header class="course-hero">
  <a class="course-hero-back" href="index.html"><span class="lang-en">&larr; All courses</span><span class="lang-ne">&larr; सबै कोर्स</span></a>
  <div class="course-hero-inner">
    <h1><span class="lang-en">${escapeHtml(COURSE.title_en)}</span><span class="lang-ne">${escapeHtml(COURSE.title_ne)}</span></h1>
    <p class="course-hero-sub"><span class="lang-en">${escapeHtml(COURSE.subtitle_en)}</span><span class="lang-ne">${escapeHtml(COURSE.subtitle_ne)}</span></p>
    ${firstId ? `<a class="begin-btn" href="${lessonFileName(firstId)}"><span class="lang-en">Begin course &rarr;</span><span class="lang-ne">कोर्स सुरु गर्नुहोस् &rarr;</span></a>` : ''}
    <div class="course-progress course-progress--hero">
      <div class="cp-track"><span class="cp-fill" id="cpFill"></span></div>
      <span class="cp-label" id="cpLabel"><span class="lang-en">0% complete</span><span class="lang-ne">०% पूरा</span></span>
    </div>
  </div>
</header>
<div class="course-home-body">
  <p class="course-intro"><span class="lang-en">${lessonCount} short lessons across ${domains.length} chapters, in English and Nepali. About ${COURSE_HOURS} hours in total — around one school term at 2–3 classes a week. Learn at your own pace, with your facilitator. Your progress is saved on this device only.</span><span class="lang-ne">${domains.length} अध्यायमा ${lessonCount} छोटा पाठ, अंग्रेजी र नेपालीमा। कुल करिब ${COURSE_HOURS} घण्टा — हप्तामा २–३ कक्षा गर्दा लगभग एक सत्र। आफ्नै गतिमा, सहजकर्तासँग सिक्नुहोस्। प्रगति यही यन्त्रमा मात्र सुरक्षित हुन्छ।</span></p>
  <nav class="course-toc" aria-label="Course lessons">${toc}
  </nav>
</div>`;
  return pageShell({ title: COURSE.title_en, bodyClass: 'page-course-home', content });
}

// Certificate page — client-side award once every chapter review is passed.
function buildCertificatePage(domains) {
  const neNum = ['०','१','२','३','४','५','६','७','८','९'];
  const toNe = (s) => String(s).split('').map((d) => (/\d/.test(d) ? neNum[+d] : d)).join('');
  let items = '';
  for (const d of domains) {
    let reviewId = null;
    for (const m of d.modules) for (const l of m.lessons) if (/-M9-/.test(l.id)) reviewId = l.id;
    if (!reviewId) continue;
    const n = (d.id.match(/\d+/) || ['?'])[0];
    items += `\n      <li data-review="${escapeHtml(reviewId)}"><span class="lang-en">Chapter ${n}</span><span class="lang-ne">अध्याय ${toNe(n)}</span></li>`;
  }
  const content = `<article class="cert-page">
  <div class="cert" id="cert" data-platform="${escapeHtml(PLATFORM.name)}" data-org="One More Light" data-orgabbr="OML" data-course="${escapeHtml(COURSE.title_en)}" hidden>
    <div class="cert-orgs">
      <div class="cert-org">
        <img class="cert-logo" src="assets/figures/logo-paila.svg" alt="${escapeHtml(PLATFORM.name)}" onerror="this.style.display='none';this.nextElementSibling.style.display='inline-block'">
        <span class="cert-logo-txt" style="display:none">${escapeHtml(PLATFORM.name)}</span>
      </div>
      <div class="cert-org cert-org-right">
        <img class="cert-logo" src="assets/figures/logo-oml.png" alt="One More Light" onerror="this.style.display='none';this.nextElementSibling.style.display='inline-block'">
        <span class="cert-logo-txt" style="display:none">One More Light<span>OML</span></span>
      </div>
    </div>
    <div class="cert-kicker"><span class="lang-en">Certificate of Completion</span><span class="lang-ne">पूर्णता प्रमाणपत्र</span></div>
    <p class="cert-line"><span class="lang-en">This certifies that</span><span class="lang-ne">यो प्रमाणित गर्दछ कि</span></p>
    <div class="cert-name" id="certName"></div>
    <p class="cert-course"><span class="lang-en">has completed the <strong>${escapeHtml(COURSE.title_en)}</strong> course.</span><span class="lang-ne"><strong>${escapeHtml(COURSE.title_ne)}</strong> कोर्स पूरा गर्नुभयो।</span></p>
    <p class="cert-date"><span id="certDate"></span></p>
    <div class="cert-sign">
      <div class="cert-sign-line"></div>
      <div class="cert-sign-label">One More Light (OML)</div>
      <div class="cert-sign-sub"><span class="lang-en">Authorised signature</span><span class="lang-ne">अधिकृत हस्ताक्षर</span></div>
    </div>
  </div>
  <div class="cert-pending" id="certPending" hidden></div>
  <div class="cert-actions no-print">
    <button type="button" class="cert-btn" id="certDownload" hidden><span class="lang-en">Download Certificate</span><span class="lang-ne">प्रमाणपत्र डाउनलोड गर्नुहोस्</span></button>
  </div>
  <ul class="cert-chapters" id="certChapters" hidden>${items}
  </ul>
</article>`;
  return pageShell({ title: 'Certificate', bodyClass: 'page-cert', content, sidebar: buildSidebar(domains, 'certificate') });
}

function buildLessonPage(lesson, prevId, nextId, domains, seq, total) {
  const outcomes = Array.isArray(lesson.data.outcomes) ? lesson.data.outcomes.join(', ') : (lesson.data.outcomes || '');
  const enHtml = renderMarkdown(sanitizeLearner(lesson.bodyEn));
  const neHtml = lesson.bodyNe ? renderMarkdown(sanitizeLearner(lesson.bodyNe)) : '';

  let prompts = '';
  if (lesson.prompts.length) {
    prompts = `\n<section class="prompts">
  <h2><span class="lang-en">Ask the AI</span><span class="lang-ne">AI लाई सोध्नुहोस्</span></h2>
  <p class="prompts-note lang-en">Copy a question and ask Sabda. Always do the verify step before you rely on the answer.</p>
  <p class="prompts-note lang-ne">प्रश्न कपी गरेर Sabda लाई सोध्नुहोस्। भरोसा गर्नुअघि सधैं जाँच चरण पूरा गर्नुहोस्।</p>`;
    for (const p of lesson.prompts) {
      const promptNe = p.prompt_ne || '';
      const promptEn = p.prompt_en || '';
      const verify = p.verify_step_ne || '';
      const copyText = (promptNe || promptEn).replace(/"/g, '&quot;');
      prompts += `\n  <article class="prompt-card">
    <p class="prompt-text prompt-ne" lang="ne">${escapeHtml(promptNe)}</p>
    ${promptEn ? `<p class="prompt-text prompt-en-line">${escapeHtml(promptEn)}</p>` : ''}
    <button type="button" class="copy-btn" data-copy="${copyText}">
      <span class="lang-en">Copy</span><span class="lang-ne">कपी</span>
    </button>
    ${verify ? `<p class="verify"><strong><span class="lang-en">Verify:</span><span class="lang-ne">जाँच:</span></strong> ${escapeHtml(verify)}</p>` : ''}
  </article>`;
    }
    prompts += `\n</section>`;
  }

  const prevLink = prevId ? `<a class="page-nav-link" href="${lessonFileName(prevId)}">&larr; <span class="lang-en">Previous</span><span class="lang-ne">अघिल्लो</span></a>` : '<span></span>';
  const nextLink = nextId ? `<a class="page-nav-link" href="${lessonFileName(nextId)}"><span class="lang-en">Next</span><span class="lang-ne">अर्को</span> &rarr;</a>` : '<span></span>';

  // Chapter (domain) this lesson belongs to — used by the reviewer feedback tool.
  let chEn = '', chNe = '';
  for (const d of domains) {
    if (d.modules.some((m) => m.lessons.some((l) => l.id === lesson.id))) {
      chEn = friendlyLabel(d.titleEn || ''); chNe = friendlyLabel(d.titleNe || d.titleEn || '');
      break;
    }
  }

  const content = `<article class="lesson" data-lesson="${escapeHtml(lesson.id)}" data-chapter-en="${escapeHtml(chEn)}" data-chapter-ne="${escapeHtml(chNe)}"${/-M9$/.test(lesson.data.module || '') || /-M9-/.test(lesson.id) ? ` data-review-id="${escapeHtml(lesson.id)}"` : ''}>
  <header class="lesson-head">
    <div class="lh-inner">
    ${seq && total ? `<p class="lesson-eyebrow"><span class="lang-en">Lesson ${seq} of ${total}</span><span class="lang-ne">पाठ ${seq} / ${total}</span></p>` : ''}
    <h1><span class="lang-en">${escapeHtml(friendlyLabel(lesson.titleEn))}</span><span class="lang-ne">${escapeHtml(friendlyLabel(lesson.titleNe || lesson.titleEn))}</span></h1>
    </div>
    <!-- source: ${escapeHtml(lesson.id)}${outcomes ? ' · ' + escapeHtml(outcomes) : ''} -->
  </header>
  <div class="lesson-inner">
  <div class="lang-en lesson-body">${enHtml}</div>
  ${neHtml ? `<div class="lang-ne lesson-body" lang="ne">${neHtml}</div>` : `<div class="lang-ne lesson-body"><p>${escapeHtml(lesson.titleNe || '')}</p></div>`}
${prompts}

  <div class="progress-box">
    <button type="button" class="done-btn" data-lesson="${escapeHtml(lesson.id)}">
      <span class="lang-en">Mark lesson done</span><span class="lang-ne">पाठ पूरा भयो भन्नुहोस्</span>
    </button>
    <span class="done-state" hidden>
      <span class="lang-en">Done ✓</span><span class="lang-ne">पूरा भयो ✓</span>
    </span>
  </div>

  <nav class="page-nav">${prevLink}${nextLink}</nav>
  </div>
  <!-- Derived from the curriculum source files. Source ID: ${escapeHtml(lesson.id)} -->
</article>`;

  return pageShell({ title: friendlyLabel(lesson.titleEn), bodyClass: 'page-lesson', content, sidebar: buildSidebar(domains, lesson.id) });
}

function buildDocPage(title, mdFile, activeId, domains) {
  const md = read(mdFile);
  const content = `<article class="doc">${renderMarkdown(md)}</article>`;
  return pageShell({ title, bodyClass: 'page-doc', content, sidebar: buildSidebar(domains, activeId) });
}

/* ------------------------------------------------------------------ *
 * File helpers + main build
 * ------------------------------------------------------------------ */

function rmrf(dir) {
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
}

function write(file, content) {
  fs.writeFileSync(file, content, 'utf8');
}

function copy(src, dest) {
  fs.copyFileSync(src, dest);
}

function build() {
  console.log('Building Digital Literacy static site...');

  // 1. Discover content
  const domains = discoverCurriculum();
  const allLessons = [];
  for (const d of domains) for (const m of d.modules) for (const l of m.lessons) allLessons.push(l);

  // 2. Reset dist
  rmrf(DIST_DIR);
  fs.mkdirSync(ASSETS_DIR, { recursive: true });

  const written = [];

  // 3. Home = course catalog, plus the course landing page.
  write(path.join(DIST_DIR, 'index.html'), buildCatalogPage(domains));
  written.push('index.html');
  write(path.join(DIST_DIR, `${COURSE.id}.html`), buildCourseHome(domains));
  written.push(`${COURSE.id}.html`);
  write(path.join(DIST_DIR, 'certificate.html'), buildCertificatePage(domains));
  written.push('certificate.html');

  // 4. Lesson pages (sidebar outline + prev/next navigation)
  for (let i = 0; i < allLessons.length; i++) {
    const lesson = allLessons[i];
    const prevId = i > 0 ? allLessons[i - 1].id : null;
    const nextId = i < allLessons.length - 1 ? allLessons[i + 1].id : null;
    const file = lessonFileName(lesson.id);
    write(path.join(DIST_DIR, file), buildLessonPage(lesson, prevId, nextId, domains, i + 1, allLessons.length));
    written.push(file);
  }

  // 5. Glossary + Safety pages (with sidebar)
  write(path.join(DIST_DIR, 'glossary.html'),
    buildDocPage('Glossary', path.join(SHARED_DIR, 'glossary.md'), 'glossary', domains));
  written.push('glossary.html');
  write(path.join(DIST_DIR, 'safety.html'),
    buildDocPage('Safety Playbook', path.join(SHARED_DIR, 'safety-playbook.md'), 'safety', domains));
  written.push('safety.html');

  // 6. Copy template assets
  copy(path.join(TEMPLATE_DIR, 'styles.css'), path.join(ASSETS_DIR, 'styles.css'));
  copy(path.join(TEMPLATE_DIR, 'app.js'), path.join(ASSETS_DIR, 'app.js'));
  copy(path.join(TEMPLATE_DIR, 'icon.svg'), path.join(ASSETS_DIR, 'icon.svg'));
  copy(path.join(TEMPLATE_DIR, 'manifest.webmanifest'), path.join(DIST_DIR, 'manifest.webmanifest'));

  // 6b. Copy curriculum figures (diagrams/images) into assets/figures
  const figureFiles = [];
  const FIGURES_SRC = path.join(SHARED_DIR, 'figures');
  if (fs.existsSync(FIGURES_SRC)) {
    const figDest = path.join(ASSETS_DIR, 'figures');
    fs.mkdirSync(figDest, { recursive: true });
    for (const f of fs.readdirSync(FIGURES_SRC)) {
      if (fs.statSync(path.join(FIGURES_SRC, f)).isFile()) {
        copy(path.join(FIGURES_SRC, f), path.join(figDest, f));
        figureFiles.push('./assets/figures/' + f);
      }
    }
  }

  // 7. Service worker with injected precache list
  const precache = ['./', './index.html', './glossary.html', './safety.html',
    './manifest.webmanifest', './assets/styles.css', './assets/app.js', './assets/icon.svg']
    .concat(figureFiles)
    .concat(written.filter((f) => f.endsWith('.html')).map((f) => './' + f));
  const uniquePrecache = Array.from(new Set(precache));
  const swTemplate = read(path.join(TEMPLATE_DIR, 'service-worker.js'));
  const sw = swTemplate
    .replace('/*__PRECACHE__*/[]', JSON.stringify(uniquePrecache, null, 2))
    .replace("digital-literacy-v1", 'digital-literacy-' + Date.now());
  write(path.join(DIST_DIR, 'service-worker.js'), sw);

  // 7b. GitHub Pages: disable Jekyll processing of the built output.
  write(path.join(DIST_DIR, '.nojekyll'), '');

  // 8. Summary
  const lessonCount = allLessons.length;
  console.log(`  Domains:        ${domains.length}`);
  console.log(`  Lesson pages:   ${lessonCount}`);
  console.log(`  Total HTML:     ${written.length}`);
  console.log(`  Output:         ${DIST_DIR}`);
  console.log('Build complete.');
  return { domains: domains.length, lessons: lessonCount, files: written.length };
}

if (require.main === module) {
  try {
    build();
  } catch (err) {
    console.error('Build failed:', err.message);
    console.error(err.stack);
    process.exit(1);
  }
}

module.exports = { build, renderMarkdown, parseFrontMatter, parsePrompts };
