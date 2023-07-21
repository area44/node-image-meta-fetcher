import fs from 'node:fs/promises';
import { getImages } from './src/getImages.mjs';

// Get all images inside the folder images
const images = await getImages('images/*.{jpg,png}');

fs.writeFile('images.json', JSON.stringify(images, null, 2));
