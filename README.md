# Image Meta Fetcher

Image Meta Fetcher allows you to fetch metadata for images in a directory. It retrieves information such as the image width, height, and base64 encoded image data.

## Requirements

- Node.js 18+
- The [`glob`](https://github.com/isaacs/node-glob) and [`plaiceholder`](https://github.com/joe-bell/plaiceholder) modules

## Getting Started

```sh
git clone https://github.com/AREA44/node-image-meta-fetcher
cd node-image-meta-fetcher
pnpm install
```

After that, remove example images then copy your images into `images` folder and run:

```sh
node examples/ImageMetaFetcher.js
```

You'll get an `images.json` in the `examples` directory. This file will contain an array of objects, where each object represents an image. The objects will have the following properties:

- `src`: The path to the image file
- `width`: The width of the image in pixels
- `height`: The height of the image in pixels
- `base64`: The base64 encoded image data

## License

Licensed under the [MIT License](./LICENSE).
