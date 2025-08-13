import * as d3 from 'd3';

export const formatLow = d3.format(',.0f'); // for lower than 10000, format commas and not dp
export const formatHigh = d3.format(',.4~s'); // for 10000 and above, format commas and SI numbering (M & K)
