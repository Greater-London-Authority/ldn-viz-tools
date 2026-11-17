# @ldn-viz/utils

Colour functions for the `@ldn-viz` packages and the London City Data Design System (LCD-DS).

| Function                         | Purpose                                                                                                    |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `getColorRamp`                   | Returns `count` colours interpolated between two or more colours                                           |
| `getThresholdBreaksColorsLabels` | Returns the breaks, colours and labels for a sequential or diverging threshold scale over a data extent    |
| `colorWithBestContrast`          | Returns whichever of two text colours has the greater contrast with a background, using the APCA algorithm |
| `colorToRGBArray`                | Returns the result of converting a CSS colour string to an `[r, g, b]` array                               |
| `tokenNameToValue`               | Returns the value of a dot-separated token name, such as `data.primary`, from a theme object               |

## Install

```sh
npm i @ldn-viz/utils
```

## Links

- [Changelog](https://github.com/Greater-London-Authority/ldn-viz-tools/blob/main/packages/utils/CHANGELOG.md)

## Licence

MIT
