# Sonolus VOEZ Engine

A recreation of VOEZ engine in [Sonolus](https://sonolus.com).

## Links

-   [Sonolus Website](https://sonolus.com)
-   [Sonolus Wiki](https://github.com/NonSpicyBurrito/sonolus-wiki)

## Installation

```
npm install sonolus-voez-engine
```

## Custom Resources

### Skin Sprites

| Name                           |
| ------------------------------ |
| `VOEZ Track Body 0`            |
| `VOEZ Track Body 1`            |
| `VOEZ Track Body 2`            |
| `VOEZ Track Body 3`            |
| `VOEZ Track Body 4`            |
| `VOEZ Track Body 5`            |
| `VOEZ Track Body 6`            |
| `VOEZ Track Body 7`            |
| `VOEZ Track Body 8`            |
| `VOEZ Track Body 9`            |
| `VOEZ Track Line`              |
| `VOEZ Track Left Border`       |
| `VOEZ Track Right Border`      |
| `VOEZ Track Glow Body`         |
| `VOEZ Track Glow Left Border`  |
| `VOEZ Track Glow Right Border` |
| `VOEZ Flick`                   |

## Documentation

### `version`

Package version.

### `engineInfo`

Partial engine information compatible with [sonolus-express](https://github.com/NonSpicyBurrito/sonolus-express).

### `engineConfiguration`

Engine Configuration.

-   `engineConfiguration.path`: path to file.
-   `engineConfiguration.buffer`: buffer of file.
-   `engineConfiguration.hash`: hash of file.

### `enginePlayData`

Engine Play Data.

-   `enginePlayData.path`: path to file.
-   `enginePlayData.buffer`: buffer of file.
-   `enginePlayData.hash`: hash of file.

### `engineThumbnail`

Engine Thumbnail.

-   `engineThumbnail.path`: path to file.
-   `engineThumbnail.buffer`: buffer of file.
-   `engineThumbnail.hash`: hash of file.

### `vsToVC(vs)`

Converts VS (VOEZ Source) to VC (VOEZ Chart).

-   `vs`: VOEZ source.

### `vcToLevelData(vc, offset?)`

Converts VC (VOEZ Chart) to Level Data.

-   `vc`: VOEZ chart.
-   `offset`: offset (default: `0`).
