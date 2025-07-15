# 📸 Image Meta Fetcher

**Image Meta Fetcher** extracts metadata from images in a directory — including width, height, and a lightweight base64-encoded preview.

## 🚀 Getting Started

Clone the repository and install dependencies:

```sh
git clone https://github.com/AREA44/node-image-meta-fetcher
cd node-image-meta-fetcher
bun install
````

## 🖼️ Using the Example

1. Replace the contents of the `images/` folder with your own images (`.jpg`, `.jpeg`, `.png`, `.webp`).
2. Run the example script:

```sh
bun run examples/basic.js
```

3. This will output metadata in your terminal and optionally create a `images.json` file.

## 📦 Output Format

Each image is represented as an object with the following properties:

| Property | Description                                                |
| -------- | ---------------------------------------------------------- |
| `src`    | File name of the image                                     |
| `width`  | Image width in pixels                                      |
| `height` | Image height in pixels                                     |
| `base64` | Base64-encoded image preview (resized to 10×10 by default) |

## 🧪 Testing

Run unit tests with:

```sh
bun run test
```

or with Vitest in watch mode:

```sh
bun run test:watch
```

## 📄 License

MIT © [AREA44](https://github.com/area44)
