// Builds the Token Reference frame on the Design Tokens page from the local variables.
// Run in the ver 4.0 file, once per collection. Set ROOT_ID, COLLECTION and DATE before running.
// The first run for a page should set RESET to true to clear the frame below its header.
const ROOT_ID = __ROOT_ID__;
const COLLECTION = __COLLECTION__; // 'semantic-color' | 'semantic-flow' | 'semantic-spacing' | 'semantic-grid'
const DATE = __DATE__;             // e.g. '21/10/2026'
const RESET = __RESET__;

// Colour groups in reading order, from the interface concepts in the spec's naming grammar.
// The palette is left out: the Color System page documents the ramps.
const COLOR_ORDER = ['canvas', 'surface', 'text', 'label', 'border', 'interactive', 'static', 'data', 'chart', 'geo', 'inverse'];
const SKIP = ['palette'];
const W = { name: 260, color: 300, number: 170, desc: 360 };

const styles = new Map((await figma.getLocalTextStylesAsync()).map(s => [s.name, s]));
for (const s of ['Doc/Heading', 'Doc/Subheading', 'Doc/Body', 'Doc/Body-sm', 'Doc/Caption', 'Doc/Mono']) await figma.loadFontAsync(styles.get(s).fontName);
const cols = await figma.variables.getLocalVariableCollectionsAsync();
const all = await figma.variables.getLocalVariablesAsync();
const byId = new Map(all.map(v => [v.id, v]));
const sc = cols.find(c => c.name === 'semantic-color');
const ui = new Map(all.filter(v => v.variableCollectionId === sc.id).map(v => [v.name, v]));
const col = cols.find(c => c.name === COLLECTION);
const vars = all.filter(v => v.variableCollectionId === col.id);

const paint = (v) => [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', v)];
async function text(chars, style, colour) {
  const t = figma.createText();
  await t.setTextStyleIdAsync(styles.get(style).id);
  t.characters = chars;
  t.fills = paint(ui.get(colour));
  return t;
}
function frame(name, dir, gap) {
  const f = figma.createFrame();
  f.name = name; f.layoutMode = dir; f.itemSpacing = gap; f.fills = [];
  f.primaryAxisSizingMode = 'AUTO'; f.counterAxisSizingMode = 'AUTO';
  return f;
}
function cell(name, width) {
  const f = frame(name, 'HORIZONTAL', 6);
  f.counterAxisAlignItems = 'CENTER';
  f.paddingLeft = f.paddingRight = 8; f.paddingTop = f.paddingBottom = 8;
  f.primaryAxisSizingMode = 'FIXED'; f.resize(width, 36);
  f.counterAxisSizingMode = 'AUTO';
  return f;
}
const hex = (c) => '#' + [c.r, c.g, c.b].map(x => Math.round(x * 255).toString(16).padStart(2, '0')).join('').toUpperCase();
// A value is shown as the variable it points at, then the value it resolves to in that mode.
function resolve(v, modeName) {
  const c = cols.find(c => c.id === v.variableCollectionId);
  const mode = c.modes.find(m => m.name === modeName) || c.modes[0];
  let val = v.valuesByMode[mode.modeId];
  let alias = null;
  for (let i = 0; i < 6 && val && val.type === 'VARIABLE_ALIAS'; i++) {
    const a = byId.get(val.id);
    if (!a) break;
    if (!alias) alias = a.name;
    const ac = cols.find(c => c.id === a.variableCollectionId);
    const am = ac.modes.find(m => m.name === modeName) || ac.modes[0];
    val = a.valuesByMode[am.modeId];
  }
  const raw = val && typeof val === 'object' && 'r' in val ? hex(val) : (typeof val === 'number' ? val + 'px' : String(val));
  return alias ? `${alias} (${raw})` : raw;
}

const root = await figma.getNodeByIdAsync(ROOT_ID);
const header = root.children.find(c => c.name === '.DS-Section-header');
if (RESET) {
  for (const c of [...root.children]) if (c !== header) c.remove();
  root.layoutMode = 'VERTICAL'; root.itemSpacing = 0;
  root.primaryAxisSizingMode = 'AUTO'; root.counterAxisSizingMode = 'AUTO';
  root.paddingBottom = 60;
  header.layoutSizingHorizontal = 'FILL';
  const body = frame('body', 'VERTICAL', 48);
  body.paddingLeft = body.paddingRight = 60; body.paddingTop = 32;
  root.appendChild(body);
  const intro = await text(`The tables list every semantic colour, flow, spacing and grid token, read from the Figma variables on ${DATE}. Colour swatches are bound to the token, so each column shows its value in that mode. Values are shown as the token they point at, then the value that resolves to. The palette is on the Color System page and type is on the Typography page.`, 'Doc/Body', 'text');
  body.appendChild(intro);
  intro.textAutoResize = 'HEIGHT'; intro.resize(835, intro.height);
}
const body = root.children.find(c => c.name === 'body');
body.children.find(c => c.name === COLLECTION)?.remove();

// Group by the first path segment, or by the first word of a top-level name (surface-muted → surface).
const groups = new Map();
for (const v of vars) {
  const parts = v.name.split('/');
  const g = COLLECTION === 'semantic-color' ? (parts.length > 1 ? parts[0] : parts[0].split('-')[0]) : COLLECTION.replace('semantic-', '');
  if (SKIP.includes(g)) continue;
  if (!groups.has(g)) groups.set(g, []);
  groups.get(g).push(v);
}
const order = [...groups.keys()].sort((a, b) => {
  const i = COLOR_ORDER.indexOf(a), j = COLOR_ORDER.indexOf(b);
  return (i < 0 ? 99 : i) - (j < 0 ? 99 : j) || a.localeCompare(b);
});

const section = frame(COLLECTION, 'VERTICAL', 16);
section.appendChild(await text(COLLECTION, 'Doc/Heading', 'text'));
const wrap = frame('groups', 'HORIZONTAL', 40);
wrap.layoutWrap = 'WRAP'; wrap.counterAxisSpacing = 40;
wrap.primaryAxisSizingMode = 'FIXED'; wrap.resize(3 * (W.name + 2 * W.color + W.desc + 50) + 80, 100);
wrap.counterAxisSizingMode = 'AUTO';
section.appendChild(wrap);
body.appendChild(section);

const isColor = COLLECTION === 'semantic-color';
const valueW = isColor ? W.color : W.number;
for (const g of order) {
  const card = frame(g, 'VERTICAL', 12);
  card.paddingLeft = card.paddingRight = card.paddingTop = card.paddingBottom = 24;
  card.fills = paint(ui.get('surface'));
  card.strokes = paint(ui.get('border-muted')); card.strokeWeight = 1;
  card.appendChild(await text(g.charAt(0).toUpperCase() + g.slice(1), 'Doc/Subheading', 'text'));
  const table = frame('table', 'VERTICAL', 0);
  const head = frame('header', 'HORIZONTAL', 0);
  head.fills = paint(ui.get('surface-muted'));
  const columns = ['Token', ...col.modes.map(m => col.modes.length === 1 ? 'Value' : m.name), ...(isColor ? ['Description'] : [])];
  for (const [i, h] of columns.entries()) {
    const c = cell('header ' + h, i === 0 ? W.name : (isColor && i === columns.length - 1 ? W.desc : valueW));
    c.appendChild(await text(h, 'Doc/Caption', 'text-muted'));
    head.appendChild(c);
  }
  table.appendChild(head);
  for (const v of groups.get(g).sort((a, b) => a.name.localeCompare(b.name, 'en', { numeric: true }))) {
    const row = frame('row ' + v.name, 'HORIZONTAL', 0);
    row.strokes = paint(ui.get('border-muted')); row.strokeTopWeight = 0; row.strokeLeftWeight = 0; row.strokeRightWeight = 0; row.strokeBottomWeight = 1;
    const n = cell('name', W.name);
    n.appendChild(await text(v.name, 'Doc/Mono', 'text'));
    row.appendChild(n);
    for (const m of col.modes) {
      const c = cell(m.name, valueW);
      if (isColor) {
        // The mode is set on a frame around the swatch only, so the cell's text keeps the page's mode.
        const holder = frame('swatch', 'HORIZONTAL', 0);
        holder.setExplicitVariableModeForCollection(col, m.modeId);
        const sw = figma.createRectangle(); sw.name = 'swatch'; sw.resize(16, 16);
        sw.fills = paint(v); sw.strokes = paint(ui.get('border')); sw.strokeWeight = 0.5;
        holder.appendChild(sw);
        c.appendChild(holder);
      }
      const t = await text(resolve(v, m.name), 'Doc/Body-sm', 'text-muted');
      c.appendChild(t);
      if (isColor) { t.layoutSizingHorizontal = 'FILL'; t.textAutoResize = 'HEIGHT'; }
      row.appendChild(c);
    }
    if (isColor) {
      const d = cell('description', W.desc);
      const t = await text(v.description || '–', 'Doc/Body-sm', 'text-muted');
      d.appendChild(t); t.layoutSizingHorizontal = 'FILL'; t.textAutoResize = 'HEIGHT';
      row.appendChild(d);
    }
    table.appendChild(row);
  }
  card.appendChild(table);
  card.appendChild(await text(`${groups.get(g).length} tokens`, 'Doc/Caption', 'text-muted'));
  wrap.appendChild(card);
}
return { collection: COLLECTION, groups: order.map(g => `${g} (${groups.get(g).length})`) };
