// Rebinds layers pasted from "Design System ver 3.1" to the local v4 variables and styles.
// Run in the ver 4.0 file. Set ROOT_IDS, DRY and TEXT_OVERRIDES before running.
const ROOT_IDS = __ROOTS__;
const DRY = __DRY__;
const TEXT_OVERRIDES = __TEXT_OVERRIDES__; // e.g. { 'Semantic/Product/label-tight': 'Usage/product/ui/button-label' }
// Grid brand page used { 'typography/title-lg': 'Typeset/longform/display-md' }.

const ROLE = {
  display: 'display/lg', headline: 'headline/lg', subhead: 'subhead/lg',
  'title-1': 'headline/lg', 'title-2': 'headline/sm', 'title-3': 'title/lg', 'title-4': 'title/md',
  'page-head': 'headline/md', 'section-head': 'title/lg', title: 'title/sm', subtitle: 'subtitle/sm',
  lead: 'body/lg', body: 'body/md', 'body-sm': 'body/sm', label: 'label/md', 'label-sm': 'label/sm',
  'label-tight': 'label/md', 'label-sm-tight': 'label/sm', caption: 'caption/sm',
  metric: 'metric/lg', 'metric-sm': 'metric/sm', eyebrow: 'eyebrow'
};
const CHART_ROLE = {
  title: 'title/sm', subtitle: 'subtitle/sm', eyebrow: 'eyebrow', label: 'label/md', 'axis-title': 'label/md',
  tick: 'caption/md', 'tick-sm': 'caption/sm', note: 'caption/sm'
};
const SET = { prose: 'longform', product: 'product', chart: 'product' };
const FLOW = { prose: 'spacious', product: 'standard', compact: 'compact' };
const COLOR_RENAME = {
  container: 'surface', 'container-default': 'surface', 'container-level-0': 'surface',
  'container-level-1': 'surface-muted', 'container-level-2': 'surface-muted', 'container-level-3': 'surface-muted',
  'inverse/container': 'inverse/surface', 'inverse/container-level-0': 'inverse/surface',
  'inverse/container-level-1': 'inverse/surface-muted', 'inverse/container-level-2': 'inverse/surface-muted',
  'inverse/container-level-3': 'inverse/surface-muted',
  // Names from the library older than v3, used only by documentation scaffolding.
  // Renders #D6D8DA in both modes in 3.1, which is border-muted, not border.
  'Color - ui/color-border': 'border-muted','interactive/text/error': 'interactive/error',
  'interactive/text/primary': 'interactive/primary-text', 'interactive/text/primary-active': 'interactive/primary-text-active',
  'interactive/text/secondary': 'interactive/secondary', 'interactive/text/secondary-hover': 'interactive/secondary-hover',
  'interactive/text/secondary-active': 'interactive/secondary-active',
  // Input names from the same older library, matched to packages/themes/sd/forms.css.
  'input/background': 'surface', 'input/background-disabled': 'interactive/disabled-muted',
  'input/border': 'border-muted', 'input/border-selected': 'interactive/focus', 'input/border-focussed': 'interactive/focus',
  'input/label-secondary': 'label-muted', 'input/label-error': 'interactive/error',
  'input/label-disabled': 'interactive/disabled', 'text/disabled': 'interactive/disabled', icon: 'text-muted'
};
// Modes set from the older library's collection had no effect in 3.1, because the layers use
// 3.1's own colour variables. Clear them; mapping them to semantic-color changes how layers render.
const CLEAR_COLLECTIONS = ['Semantic Tokens'];
// Collections renamed in v4. Their modes keep their names.
const COLLECTION_RENAME = { 'grid-spacing': 'semantic-grid' };
const legacy = n => n.replace(/^interactive\/(background|border)\//, 'interactive/');
const EFFECT = {
  'focus ring/default': 'focus-ring/default', 'focus ring/negative': 'focus-ring/negative',
  'focus ring/positive': 'focus-ring/positive', 'focus ring/warning': 'focus-ring/warning',
  'shadow-sm': 'elevation/1', shadow: 'elevation/2', 'shadow-md': 'elevation/3',
  'shadow-lg': 'elevation/4', 'shadow-xl': 'elevation/5', 'shadow-2xl': 'elevation/6',
  // Not an elevation level, so it keeps its shadow style.
  'shadow-inner': 'primitive/shadow-inner'
};
const roleStyle = r => r.replace('/', '-');

function textTarget(name) {
  if (TEXT_OVERRIDES[name]) return TEXT_OVERRIDES[name];
  if (name.startsWith('Doc/')) return name;
  let m = name.match(/^Semantic\/(Product|Prose|Chart)\/(.+)$/);
  if (!m) return null;
  const [, set, role] = m;
  if (set === 'Chart') {
    if (role === 'eyebrow') return 'Typeset/product/eyebrow';
    return 'Usage/product/chart/' + role;
  }
  if (set === 'Prose' && role === 'lead') return 'Usage/longform/p.lead';
  const r = ROLE[role];
  if (!r) return null;
  const s = roleStyle(r);
  return `Typeset/${set === 'Prose' ? 'longform' : 'product'}/${s}`;
}

// Names from other older libraries (Grid brand page) with no rule above: [collection, name].
// GLA brand hues only exist in primitive; they don't change by mode.
const VAR_OVERRIDES = {
  'Color - ui/color-text-secondary': ['semantic-color', 'text-muted'],
  'Color - ui/color-background-level-0': ['semantic-color', 'surface'],
  'Color - categorical/color-categorical-turquoise': ['semantic-color', 'data/categorical/turquoise'],
  'color/action/text/static-white': ['semantic-color', 'static/white'],
  // Application Shells page: a light-mode frame background and icons in a dark sidebar.
  'core/white': ['semantic-color', 'surface'],
  // v4 keeps the measure as a Figma-only copy (ADR 0015, normalise.js step 5).
  'prose/readable-width': ['semantic-typography', 'longform/measure/text'],
  'Buttons/button-color-text': ['semantic-color', 'text'],
  'color/static/gla/purple': ['primitive', 'color/static/gla/purple'],
  'color/static/gla/green': ['primitive', 'color/static/gla/green'],
  'prose/title/lg/fontFamily': ['semantic-typography', 'longform/display/md/font-family'],
  'prose/title/lg/fontSize': ['semantic-typography', 'longform/display/md/font-size'],
  'prose/title/lg/fontWeight': ['semantic-typography', 'longform/display/md/font-weight'],
  'prose/title/lg/lineHeight': ['semantic-typography', 'longform/display/md/line-height'],
  'prose/title/lg/letterSpacing': ['semantic-typography', 'longform/display/md/letter-spacing']
};

function varTarget(v) {
  const n = v.name;
  if (VAR_OVERRIDES[n]) return VAR_OVERRIDES[n];
  if (v.resolvedType === 'COLOR') {
    // Primitive ramps and statics keep their names in v4.
    if (/^color\/(mode|static)\//.test(n) && local.has('primitive::' + n)) return ['primitive', n];
    const name = n.startsWith('color/') ? n.slice(6) : n;
    return ['semantic-color', COLOR_RENAME[name] || legacy(name)];
  }
  let m = n.match(/^(prose|product|chart)\/([^/]+)\/(font-family|font-size|font-weight|line-height|letter-spacing)$/);
  if (m) {
    const r = (m[1] === 'chart' ? CHART_ROLE : ROLE)[m[2]];
    return r ? ['semantic-typography', `${SET[m[1]]}/${r}/${m[3]}`] : null;
  }
  // An older library names typography by role and size with camelCase properties: prose/title/sm/fontSize.
  m = n.match(/^(prose|product)\/([a-z]+)(?:\/(sm|md|lg))?\/(fontFamily|fontSize|fontWeight|lineHeight|letterSpacing)$/);
  if (m) {
    const prop = m[4].replace(/[A-Z]/g, c => '-' + c.toLowerCase());
    return ['semantic-typography', `${SET[m[1]]}/${m[2]}/${m[3] || 'lg'}/${prop}`];
  }
  m = n.match(/^(prose|product|compact)\/(tight|default|loose|section)$/);
  if (m) return ['semantic-flow', `${FLOW[m[1]]}/${m[2]}`];
  m = n.match(/^(contained|fluid)\/(container padding|gutter)$/);
  if (m) return ['semantic-grid', `${m[1]}/${m[2].replace(' ', '-')}`];
  m = n.match(/^(?:spacing\/)?(px|\d+(?:-5)?)$/);
  if (m) return ['semantic-spacing', m[1]];
  // Otherwise a local variable with exactly the same name, in any collection (breakpoint/sm).
  for (const k of local.keys()) if (k.endsWith('::' + n)) return k.split('::');
  return null;
}

const cols = await figma.variables.getLocalVariableCollectionsAsync();
const colName = new Map(cols.map(c => [c.id, c.name]));
const local = new Map();
for (const v of await figma.variables.getLocalVariablesAsync()) local.set(colName.get(v.variableCollectionId) + '::' + v.name, v);
const textStyles = new Map((await figma.getLocalTextStylesAsync()).map(s => [s.name, s]));
const effectStyles = new Map((await figma.getLocalEffectStylesAsync()).map(s => [s.name, s]));

const varCache = new Map();
async function newVar(id) {
  if (varCache.has(id)) return varCache.get(id);
  const v = await figma.variables.getVariableByIdAsync(id);
  let out = null;
  if (v && v.remote) { const t = varTarget(v); out = { old: v.name, target: t && local.get(t.join('::')) }; }
  varCache.set(id, out);
  return out;
}

const stats = { vars: 0, paints: 0, text: 0, effects: 0 };
const unmapped = new Map();
const miss = (k) => unmapped.set(k, (unmapped.get(k) || 0) + 1);

async function rebindPaints(paints) {
  let changed = false;
  const out = [];
  for (const p of paints) {
    const id = p.boundVariables?.color?.id;
    if (id) {
      const r = await newVar(id);
      if (r && r.target) { out.push(figma.variables.setBoundVariableForPaint(p, 'color', r.target)); changed = true; stats.paints++; continue; }
      if (r) miss('var ' + r.old);
    }
    out.push(p);
  }
  return changed ? out : null;
}

// Modes set on a layer (the Appearance panel) point at the 3.1 collections too. Move each to the
// local collection with the same name and the mode with the same name.
const colByName = new Map(cols.map(c => [c.name, c]));
const remoteCols = new Map();
async function fixModes(n) {
  for (const [cid, mid] of Object.entries(n.explicitVariableModes || {})) {
    if (!remoteCols.has(cid)) remoteCols.set(cid, await figma.variables.getVariableCollectionByIdAsync(cid));
    const c = remoteCols.get(cid);
    if (!c || !c.remote) continue;
    if (CLEAR_COLLECTIONS.includes(c.name)) {
      if (!DRY) n.clearExplicitVariableModeForCollection(c);
      stats.modesCleared = (stats.modesCleared || 0) + 1;
      continue;
    }
    const t = colByName.get(COLLECTION_RENAME[c.name] || c.name);
    const mode = t && t.modes.find(m => m.name === c.modes.find(x => x.modeId === mid)?.name);
    if (!mode) { miss('mode ' + c.name); continue; }
    if (!DRY) { n.setExplicitVariableModeForCollection(t, mode.modeId); n.clearExplicitVariableModeForCollection(c); }
    stats.modes = (stats.modes || 0) + 1;
  }
}

async function fix(n) {
  await fixModes(n);
  // Text with typography variables bound directly (no style) needs its fonts loaded before rebinding.
  if (!DRY && n.type === 'TEXT' && n.characters.length) for (const f of n.getRangeAllFontNames(0, n.characters.length)) await figma.loadFontAsync(f);
  for (const [field, val] of Object.entries(n.boundVariables || {})) {
    if (['fills', 'strokes', 'effects', 'layoutGrids', 'textRangeFills', 'componentProperties'].includes(field)) continue;
    for (const a of [].concat(val)) {
      if (!a?.id) continue;
      const r = await newVar(a.id);
      if (!r) continue;
      if (!r.target) { miss('var ' + r.old); continue; }
      if (!DRY) n.setBoundVariable(field, r.target);
      stats.vars++;
    }
  }
  // Layout grids bind their gutter, offset and section size separately.
  if (Array.isArray(n.layoutGrids) && n.layoutGrids.some(g => g.boundVariables && Object.keys(g.boundVariables).length)) {
    let changed = false;
    const grids = [];
    for (let g of n.layoutGrids) {
      for (const [field, a] of Object.entries(g.boundVariables || {})) {
        const r = await newVar(a.id);
        if (!r) continue;
        if (!r.target) { miss('var ' + r.old); continue; }
        g = figma.variables.setBoundVariableForLayoutGrid(g, field, r.target);
        changed = true; stats.vars++;
      }
      grids.push(g);
    }
    if (changed && !DRY) n.layoutGrids = grids;
  }
  for (const key of ['fills', 'strokes']) {
    if (key in n && Array.isArray(n[key])) {
      const out = await rebindPaints(n[key]);
      if (out && !DRY) n[key] = out;
    }
  }
  // Effects can bind their colour (and offset, radius, spread) to variables directly.
  if (Array.isArray(n.effects) && n.effects.some(e => e.boundVariables && Object.keys(e.boundVariables).length)) {
    let changed = false;
    const effects = [];
    for (let e of n.effects) {
      for (const [field, a] of Object.entries(e.boundVariables || {})) {
        const r = await newVar(a.id);
        if (!r) continue;
        if (!r.target) { miss('var ' + r.old); continue; }
        e = figma.variables.setBoundVariableForEffect(e, field, r.target);
        changed = true; stats.vars++;
      }
      effects.push(e);
    }
    if (changed && !DRY) n.effects = effects;
  }
  if ('effectStyleId' in n && n.effectStyleId) {
    const s = await figma.getStyleByIdAsync(n.effectStyleId);
    if (s && s.remote) {
      const t = effectStyles.get(EFFECT[s.name]);
      if (t) { if (!DRY) await n.setEffectStyleIdAsync(t.id); stats.effects++; } else miss('effect ' + s.name);
    }
  }
  // Empty text has no segments, so its style is read from the node.
  if (n.type === 'TEXT' && !n.characters.length && typeof n.textStyleId === 'string' && n.textStyleId) {
    const s = await figma.getStyleByIdAsync(n.textStyleId);
    if (s && s.remote) {
      const t = textStyles.get(textTarget(s.name));
      if (t) { if (!DRY) { await figma.loadFontAsync(n.fontName); await figma.loadFontAsync(t.fontName); await n.setTextStyleIdAsync(t.id); } stats.text++; } else miss('text ' + s.name);
    }
  }
  if (n.type === 'TEXT') {
    const segs = n.getStyledTextSegments(['textStyleId', 'fills']);
    for (const seg of segs) {
      if (seg.textStyleId) {
        const s = await figma.getStyleByIdAsync(seg.textStyleId);
        if (s && s.remote) {
          const t = textStyles.get(textTarget(s.name));
          if (t) {
            if (!DRY) { await figma.loadFontAsync(t.fontName); await n.setRangeTextStyleIdAsync(seg.start, seg.end, t.id); }
            stats.text++;
          } else miss('text ' + s.name);
        }
      }
      // A range can keep an old fill binding even when the node's own fill is already local.
      const out = await rebindPaints(seg.fills);
      if (out && !DRY) n.setRangeFills(seg.start, seg.end, out);
    }
  }
}

const roots = [];
for (const id of ROOT_IDS) { const r = await figma.getNodeByIdAsync(id); if (r) roots.push(r); }
// Components first, so instances inherit the new bindings and only real overrides are left.
const inComp = [], rest = [];
for (const r of roots) for (const n of [r, ...(r.findAll ? r.findAll(() => true) : [])]) {
  let p = n, inst = false;
  while (p && p !== r.parent) { if (p.type === 'INSTANCE') { inst = true; break; } p = p.parent; }
  (inst ? rest : inComp).push(n);
}
// Skip layers inside instances of components that are still in 3.1; they change when those components move.
const mainRemote = new Map();
async function inRemote(n) {
  for (let p = n.parent; p && p.type !== 'PAGE'; p = p.parent) {
    if (p.type !== 'INSTANCE') continue;
    if (!mainRemote.has(p.id)) { const m = await p.getMainComponentAsync(); mainRemote.set(p.id, !!(m && m.remote)); }
    if (mainRemote.get(p.id)) return true;
  }
  return false;
}
// Keep each call under figma_execute's 30s limit; rerun until timedOut is false.
const t0 = Date.now(); let timedOut = false; const errors = [];
for (const n of [...inComp, ...rest]) {
  if (Date.now() - t0 > 24000) { timedOut = true; break; }
  if (await inRemote(n)) continue;
  try { await fix(n); } catch (e) { if (errors.length < 10) errors.push(n.name + ': ' + e.message); }
}
return { DRY, timedOut, nodes: inComp.length + rest.length, stats, errors, unmapped: Object.fromEntries([...unmapped].sort((a, b) => b[1] - a[1])) };
