import ldnColors from '@ldn-viz/themes/colors.json';

export { ldnColors };

export const theme = {
  light: {
    primary: ldnColors.core.blue[500],
    secondary: ldnColors.core.darkPink[500],
    axis: ldnColors.core.grey[500],
    grid: ldnColors.core.grey[200],
    labels: ldnColors.core.grey[500],
    body: ldnColors.core.grey[500],
    headlines: ldnColors.core.grey[600],
    subHeadlines: ldnColors.core.grey[500],
    background: '#FFFFFF',
    neutral: ldnColors.core.grey[200],
    neutralB: ldnColors.core.grey[300],
    empty: ldnColors.core.grey[100]
  },
  dark: {
    primary: ldnColors.core.blue[500],
    secondary: ldnColors.core.glaPink[500],
    axis: '#FFFFFF',
    grid: ldnColors.core.grey[500],
    labels: '#FFFFFF',
    body: '#FFFFFF',
    headlines: '#FFFFFF',
    subHeadlines: '#FFFFFF',
    background: ldnColors.core.grey[600],
    neutral: ldnColors.core.grey[500],
    neutralB: ldnColors.core.grey[400],
    empty: ldnColors.core.grey[700]
  }
};
