import fs from 'node:fs/promises'
import { ImageMetaFetcher } from '../index.js'

// Get all images inside the folder images
const images = await ImageMetaFetcher('./images/*.{jpg,jpeg,png,webp}')

fs.writeFile('examples/images.json', JSON.stringify(images, null, 2))
