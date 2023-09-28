import { glob } from 'glob'
import sharp from 'sharp'

export async function ImageMetaFetcher(pattern) {
  try {
    const files = glob.sync(pattern, { posix: true })
    const imagePromises = files.map(async (file) => {
      const src = file.replace(/^.*[\\\/]/, '')
      const metadata = await sharp(file).metadata()
      const { width, height, format } = metadata
      const buffer = await sharp(file).toBuffer()
      const base64 = `data:image/${format};base64,${buffer.toString('base64')}`
      return { src, width, height, base64 }
    })

    const images = await Promise.all(imagePromises)

    images.sort((a, b) => a.src.localeCompare(b.src))

    return images
  } catch (error) {
    console.error('Error fetching images:', error)
    throw error
  }
}
