import { makeChoropleth } from './choropleth';

import wards from './wards_simplified.json' with { type: 'json' };

export const wardChoropleth = makeChoropleth(wards, 'gss_code');
