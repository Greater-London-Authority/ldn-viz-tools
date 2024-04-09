import ldnColors from '@ldn-viz/themes/colors.json';

export { ldnColors };

export const theme = {
  light: {
    primary: ldnColors.core.blue[600],
    secondary: ldnColors.core.darkPink[500],
    tertiary: ldnColors.core.green[500],
    axis: ldnColors.core.grey[500],
    grid: ldnColors.core.grey[200],
    labels: ldnColors.core.grey[500],
    body: ldnColors.core.grey[500],
    headlines: ldnColors.core.grey[600],
    subHeadlines: ldnColors.core.grey[500],
    background: '#FFFFFF',
    neutral: ldnColors.core.grey[200],
    neutralB: ldnColors.core.grey[300],
    empty: ldnColors.core.grey[100],
    positive: ldnColors.core.blue[600],
    negative: ldnColors.core.red[400],
    male: ldnColors.core.green[500],
    female: ldnColors.core.purple[500]
  },
  mid: {
    primary: ldnColors.core.blue[500],
    secondary: ldnColors.core.glaPink[400],
    // "tertiary": ldnColors.core.yellow[300],
    tertiary: ldnColors.core.green[300],
    axis: '#FFFFFF',
    grid: ldnColors.core.grey[500],
    labels: '#FFFFFF',
    body: '#FFFFFF',
    headlines: '#FFFFFF',
    subHeadlines: '#FFFFFF',
    background: ldnColors.core.grey[600],
    neutral: ldnColors.core.grey[500],
    neutralB: ldnColors.core.grey[400],
    empty: ldnColors.core.grey[500],
    positive: ldnColors.core.blue[500],
    negative: ldnColors.core.red[300],
    male: ldnColors.core.green[400],
    female: ldnColors.core.purple[300]
  },
  dark: {
    primary: ldnColors.core.blue[600],
    secondary: ldnColors.core.glaPink[500],
    tertiary: ldnColors.core.green[300],
    axis: '#FFFFFF',
    grid: ldnColors.core.grey[500],
    labels: '#FFFFFF',
    body: '#FFFFFF',
    headlines: '#FFFFFF',
    subHeadlines: '#FFFFFF',
    background: ldnColors.core.grey[900],
    neutral: ldnColors.core.grey[600],
    neutralB: ldnColors.core.grey[500],
    empty: ldnColors.core.grey[700],
    positive: ldnColors.core.blue[600],
    negative: ldnColors.core.red[400],
    male: ldnColors.core.green[500],
    female: ldnColors.core.purple[500]
  }
};
