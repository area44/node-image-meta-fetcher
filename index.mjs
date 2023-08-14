import fs from 'node:fs/promises'
import { ImageMetaFetcher } from './src/ImageMetaFetcher.mjs'

// Get all images inside the folder images
const images = await ImageMetaFetcher('images/*.{jpg,jpeg,png}')

fs.writeFile('images.json', JSON.stringify(images, null, 2))
