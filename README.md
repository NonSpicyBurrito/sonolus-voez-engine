# Sonolus VOEZ Engine

A recreation of VOEZ engine in [Sonolus](https://sonolus.com).

## Links

- [Sonolus Website](https://sonolus.com)
- [Sonolus Wiki](https://github.com/NonSpicyBurrito/sonolus-wiki)

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

### `databaseEngineItem`

Partial database engine item compatible with [sonolus-express](https://github.com/NonSpicyBurrito/sonolus-express).

### `engineConfigurationPath`

Path to Engine Configuration file.

### `enginePlayDataPath`

Path to Engine Play Data file.

### `engineWatchDataPath`

Path to Engine Watch Data file.

### `enginePreviewDataPath`

Path to Engine Preview Data file.

### `engineTutorialDataPath`

Path to Engine Tutorial Data file.

### `engineThumbnailPath`

Path to Engine Thumbnail file.

### `vsToVC(vs)`

Converts VS (VOEZ Source) to VC (VOEZ Chart).

- `vs`: VOEZ source.

### `vcToLevelData(vc, offset?)`

Converts VC (VOEZ Chart) to Level Data.

- `vc`: VOEZ chart.
- `offset`: offset (default: `0`).
