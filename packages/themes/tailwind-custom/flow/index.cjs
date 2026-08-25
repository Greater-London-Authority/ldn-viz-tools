// Flow is a layout system, not a typographic one. It ships as its own plugin —
// a peer of customTypography, not a part of it — so that tracing a flow rule
// leads here rather than into typography.
const plugin = require('tailwindcss/plugin');
const flow = require('./flow');

module.exports = plugin(function ({ addComponents }) {
	addComponents(flow);
});
