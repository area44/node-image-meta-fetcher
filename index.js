import fs from 'node:fs/promises';
import { getImages } from './lib/getImages.js';

// Get all images inside the folder images
const images = await getImages('images/*.{jpg,png}');

fs.writeFile('images.json', JSON.stringify(images, null, 2));
