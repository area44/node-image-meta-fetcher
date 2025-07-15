import { ImageMetaFetcher } from '../index.js'
import { writeFileSync } from 'fs'

const images = await ImageMetaFetcher('examples/assets/*.{jpg,png}', {
  resize: { width: 20, height: 20, fit: 'cover' },
  sort: false,
})

writeFileSync('examples/output/thumbnails.json', JSON.stringify(images, null, 2))

console.log('✅ Image metadata saved to examples/output/thumbnails.json')
