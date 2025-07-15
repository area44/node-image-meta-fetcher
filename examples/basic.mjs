import { ImageMetaFetcher } from "../index.js";

const images = await ImageMetaFetcher("examples/assets/*.{jpg,png}");

console.log(images);
