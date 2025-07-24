# 📸 Image Meta Fetcher

**Image Meta Fetcher** is a lightweight Node.js utility that extracts image metadata from a folder using [Sharp](https://github.com/lovell/sharp) — including image dimensions, format, and a base64-encoded thumbnail preview.

It’s ideal for static site generators, gallery builders, or scripts that need fast metadata and previews without loading full images in the browser.

## ⚡ Features

* 🔍 Extracts width, height, format
* 🖼️ Generates base64 previews (default size: 10×10)
* 📁 Supports glob patterns (e.g. `images/*.{jpg,png}`)
* ⚙️ Optional resizing and sorting
* 🧪 Tested with [Vitest](https://vitest.dev/)
* 🔧 Built with [Bun](https://bun.sh)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/AREA44/node-image-meta-fetcher
cd node-image-meta-fetcher
```

### 2. Install dependencies

```bash
bun install
```

## 🖼️ Usage Example

Add images (`.jpg`, `.jpeg`, `.png`, `.webp`) to the `examples/assets/` folder.

### Run the basic example:

```bash
bun run examples/basic.js
```

This will print image metadata to the console.

### Run with custom options:

```bash
bun run examples/options.js
```

This will:

* Resize each preview to `20x20`
* Disable filename sorting
* Write the result to `examples/output/thumbnails.json`

## 📦 Output Format

Each image is returned as an object like:

```json
{
  "src": "example.jpg",
  "width": 1024,
  "height": 768,
  "format": "jpeg",
  "base64": "data:image/jpeg;base64,..."
}
```

| Field    | Description                                            |
| -------- | ------------------------------------------------------ |
| `src`    | File name (e.g. `photo.jpg`)                           |
| `width`  | Original width in pixels                               |
| `height` | Original height in pixels                              |
| `format` | File format (`jpeg`, `png`, `webp`, etc.)              |
| `base64` | Base64 preview of a resized thumbnail (default: 10×10) |

## 📚 API

```js
ImageMetaFetcher(globPattern, options?)
```

| Parameter     | Type                   | Description                                       |
| ------------- | ---------------------- | ------------------------------------------------- |
| `globPattern` | `string` or `string[]` | File path(s) to match (e.g. `images/*.{jpg,png}`) |
| `options`     | `object`               | Optional configuration                            |

### Options

```js
{
  resize: {
    width: 10,
    height: 10,
    fit: "inside" // or "cover", "contain", etc. (from sharp)
  },
  sort: true // sort results by filename
}
```

## 🧪 Running Tests

Run the full test suite:

```bash
bun run test
```

Watch mode:

```bash
bun run test:watch
```

Tests cover:

* Basic metadata extraction
* Sorting
* Thumbnail resizing
* Handling invalid/corrupt images

## 📁 Project Structure

```
.
├── examples/
│   ├── assets/              # Sample input images
│   ├── basic.js             # Basic usage example
│   └── options.js           # Example with custom options
├── tests/
│   ├── fixtures/            # Test images (valid + broken)
│   └── ImageMetaFetcher.test.js
├── index.js                 # Main module
├── README.md
└── package.json
```

## 📄 License

MIT © [AREA44](https://github.com/area44)
