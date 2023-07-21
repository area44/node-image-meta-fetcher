# getImages

This code will get all images from a folder and write them to a JSON file called `images.json`.

## Requirements

- Node.js 18+
- The [`glob`](https://github.com/isaacs/node-glob) and [`plaiceholder`](https://github.com/joe-bell/plaiceholder) modules

## Getting Started

```sh
git clone https://github.com/AREA44/node-getImages
cd node-getImages
pnpm install
```

Now, remove example images then copy your images into `images` folder and run:

```sh
node index.mjs
```

The `images.json` file will contain an array of objects, where each object represents an image. The objects will have the following properties:

- `src`: The path to the image file
- `width`: The width of the image in pixels
- `height`: The height of the image in pixels
- `base64`: The base64 encoded image data

## License

Licensed under the [MIT](./LICENSE) license.
