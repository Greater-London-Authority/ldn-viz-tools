// Builds a Typeset frame on the Typography page: every role in one typeset at each breakpoint.
// Run in the ver 4.0 file, once per typeset. Set TYPESET, INTRO, PAGE_ID, X and Y before running.
// Each breakpoint column sets the semantic-typography mode, so the specimens render at that
// breakpoint's size, and the figures under them are read from the same variables.
const TYPESET = __TYPESET__; // 'longform' | 'product'
const INTRO = __INTRO__;
const PAGE_ID = __PAGE_ID__;
const X = __X__, Y = __Y__;

const ROLES = ['display-lg', 'display-md', 'display-sm', 'headline-lg', 'headline-md', 'headline-sm',
  'subhead-lg', 'subhead-md', 'subhead-sm', 'title-lg', 'title-md', 'title-sm',
  'subtitle-lg', 'subtitle-md', 'subtitle-sm', 'body-lg', 'body-md', 'body-sm',
  'label-lg', 'label-md', 'label-sm', 'metric-lg', 'metric-md', 'metric-sm',
  'caption-lg', 'caption-md', 'caption-sm', 'eyebrow'];
// A cell fits display-lg at xl (72px).
const W = { role: 200, cell: 400 };

await figma.loadAllPagesAsync();
const styles = new Map((await figma.getLocalTextStylesAsync()).map(s => [s.name, s]));
for (const s of styles.values()) if (s.name.startsWith('Doc/') || s.name.startsWith(`Typeset/${TYPESET}/`)) await figma.loadFontAsync(s.fontName);
const cols = await figma.variables.getLocalVariableCollectionsAsync();
const all = await figma.variables.getLocalVariablesAsync();
const byId = new Map(all.map(v => [v.id, v]));
const byName = new Map(all.map(v => [v.name, v]));
const sc = cols.find(c => c.name === 'semantic-color');
const ui = new Map(all.filter(v => v.variableCollectionId === sc.id).map(v => [v.name, v]));
const typo = cols.find(c => c.name === 'semantic-typography');

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
// Resolve a variable in a mode, following aliases into collections with other modes.
function value(name, modeName) {
  let v = byName.get(name);
  if (!v) return null;
  let modeId = typo.modes.find(m => m.name === modeName).modeId;
  let val = v.valuesByMode[modeId];
  for (let i = 0; i < 6 && val && val.type === 'VARIABLE_ALIAS'; i++) {
    v = byId.get(val.id);
    const c = cols.find(c => c.id === v.variableCollectionId);
    const m = c.modes.find(m => m.name === modeName) || c.modes[0];
    val = v.valuesByMode[m.modeId];
  }
  return val;
}
const header = figma.root.findOne(n => n.type === 'COMPONENT' && n.name === '.DS-Section-header');
const page = await figma.getNodeByIdAsync(PAGE_ID);
const name = `Typeset: ${TYPESET}`;
page.children.find(c => c.name === name)?.remove();

const outer = frame(name, 'VERTICAL', 0);
outer.fills = paint(ui.get('surface'));
outer.paddingBottom = 60;
page.appendChild(outer); outer.x = X; outer.y = Y;
const h = header.createInstance();
h.setProperties({ [Object.keys(h.componentProperties)[0]]: name });
outer.appendChild(h); h.layoutSizingHorizontal = 'FILL';
const body = frame('body', 'VERTICAL', 40);
body.paddingLeft = body.paddingRight = 60; body.paddingTop = 32;
outer.appendChild(body);
const intro = await text(INTRO, 'Doc/Body', 'text');
body.appendChild(intro); intro.textAutoResize = 'HEIGHT'; intro.resize(835, intro.height);

const table = frame('table', 'VERTICAL', 0);
body.appendChild(table);
const head = frame('header', 'HORIZONTAL', 0);
head.fills = paint(ui.get('surface-muted'));
const hc = async (label, width) => {
  const c = frame('header ' + label, 'HORIZONTAL', 0);
  c.paddingLeft = c.paddingRight = 12; c.paddingTop = c.paddingBottom = 10;
  c.primaryAxisSizingMode = 'FIXED'; c.resize(width, 40); c.counterAxisSizingMode = 'AUTO';
  c.appendChild(await text(label, 'Doc/Caption', 'text-muted'));
  head.appendChild(c);
};
await hc('Role', W.role);
for (const m of typo.modes) await hc(m.name, W.cell);
table.appendChild(head);

for (const role of ROLES) {
  const style = styles.get(`Typeset/${TYPESET}/${role}`);
  if (!style) continue;
  const [r, size] = role.split('-');
  const base = size ? `${TYPESET}/${r}/${size}` : `${TYPESET}/${r}`;
  const row = frame('row ' + role, 'HORIZONTAL', 0);
  row.strokes = paint(ui.get('border-muted'));
  row.strokeTopWeight = 0; row.strokeLeftWeight = 0; row.strokeRightWeight = 0; row.strokeBottomWeight = 1;
  const rc = frame('role', 'VERTICAL', 4);
  rc.paddingLeft = rc.paddingRight = 12; rc.paddingTop = rc.paddingBottom = 16;
  rc.primaryAxisSizingMode = 'AUTO'; rc.counterAxisSizingMode = 'FIXED'; rc.resize(W.role, 10); rc.primaryAxisSizingMode = 'AUTO';
  rc.appendChild(await text('.' + role, 'Doc/Mono', 'text'));
  rc.appendChild(await text(`weight ${value(base + '/font-weight', typo.modes[0].name)}`, 'Doc/Caption', 'text-muted'));
  row.appendChild(rc);
  for (const m of typo.modes) {
    const c = frame(m.name, 'VERTICAL', 8);
    c.paddingLeft = c.paddingRight = 12; c.paddingTop = c.paddingBottom = 16;
    c.counterAxisSizingMode = 'FIXED'; c.resize(W.cell, 10); c.primaryAxisSizingMode = 'AUTO';
    c.setExplicitVariableModeForCollection(typo, m.modeId);
    const label = role.charAt(0).toUpperCase() + role.slice(1).replace('-', ' ');
    const s = figma.createText();
    await s.setTextStyleIdAsync(style.id);
    s.characters = label;
    s.fills = paint(ui.get('text'));
    c.appendChild(s);
    c.appendChild(await text(`${value(base + '/font-size', m.name)}/${value(base + '/line-height', m.name)}`, 'Doc/Caption', 'text-muted'));
    row.appendChild(c);
  }
  table.appendChild(row);
}
return { name, id: outer.id, size: [outer.width, outer.height] };
