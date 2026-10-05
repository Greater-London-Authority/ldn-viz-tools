import { makeChoropleth } from './choropleth';

import boroughs from './boroughs_simplified.json' with { type: 'json' };

export const boroughChoropleth = makeChoropleth(boroughs, 'name');
