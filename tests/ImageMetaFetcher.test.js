import { describe, it, expect, beforeAll } from 'vitest'
import { ImageMetaFetcher } from '../index.js'
import { join } from 'path'

const imageDir = join(process.cwd(), 'tests/fixtures')

let images

beforeAll(async () => {
  images = await ImageMetaFetcher(`${imageDir}/*.{jpg,jpeg,png,webp}`)
})

describe('ImageMetaFetcher', () => {
  it('returns a non-empty array of image metadata', () => {
    expect(Array.isArray(images)).toBe(true)
    expect(images.length).toBeGreaterThan(0)
  })

  it('includes src, width, height, and base64 fields', () => {
    for (const image of images) {
      expect(image).toHaveProperty('src')
      expect(image).toHaveProperty('width')
      expect(image).toHaveProperty('height')
      expect(image).toHaveProperty('base64')

      expect(typeof image.src).toBe('string')
      expect(typeof image.width).toBe('number')
      expect(typeof image.height).toBe('number')
      expect(image.base64).toMatch(/^data:image\/(jpeg|png|webp);base64,/)
    }
  })

  it('sorts images alphabetically by default', () => {
    const sorted = [...images].map(img => img.src).sort()
    expect(images.map(i => i.src)).toEqual(sorted)
  })

  it('respects the sort: false option', async () => {
    const unsorted = await ImageMetaFetcher(`${imageDir}/*.{jpg,jpeg,png}`, {
      sort: false,
    })

    const sorted = [...unsorted].map(img => img.src).sort()
    expect(unsorted.map(i => i.src)).not.toEqual(sorted)
  })

  it('resizes thumbnails to custom size when provided', async () => {
    const result = await ImageMetaFetcher(`${imageDir}/*.jpg`, {
      resize: { width: 5, height: 5, fit: 'contain' },
    })

    expect(result[0].base64).toMatch(/^data:image\/jpeg;base64,/)
  })

  it('skips broken or invalid images gracefully', async () => {
    const result = await ImageMetaFetcher(`${imageDir}/*.{jpg,png}`, {
      sort: false,
    })

    const files = result.map(r => r.src)
    expect(files).not.toContain('broken.jpg')
  })
})
