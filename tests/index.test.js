import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { ImageMetaFetcher } from '../index.js'

const images = await ImageMetaFetcher('images/*.{jpg,jpeg,png,webp}')

test('should return an array of images', () => {
  assert.type(images, 'object')
  assert.equal(images.length, 2)

  assert.type(images[0].src, 'string')
  assert.type(images[0].width, 'number')
  assert.type(images[0].height, 'number')
  assert.type(images[0].base64, 'string')
})

test('should sort images alphabetically', () => {
  assert.equal(images[0].src, 'eveling-salazar-TqikiXaDrf4-unsplash.jpg')
  assert.equal(images[1].src, 'mo-ZLBmpXhbzMk-unsplash.jpg')
})

test('should get width and height of images', () => {
  assert.equal(images[0].width, 480)
  assert.equal(images[0].height, 600)

  assert.equal(images[1].width, 480)
  assert.equal(images[1].height, 613)
})

test('should get base64 of images', () => {
  assert.equal(
    images[0].base64,
    'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKAAgDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAMH/8QAHxAAAQMDBQAAAAAAAAAAAAAAAQACEQMEIRIUM1GB/8QAFQEBAQAAAAAAAAAAAAAAAAAAAwT/xAAZEQEAAgMAAAAAAAAAAAAAAAABAAIDESH/2gAMAwEAAhEDEQA/ANmp1jcXEaXtDAGtM4PZRUsAN67A459lEJUey++Vq6J//9k=',
  )
  assert.equal(
    images[1].base64,
    'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKAAgDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUI/8QAIRAAAQQCAAcAAAAAAAAAAAAAAQACAwQRIQYHEyIxUcH/xAAVAQEBAAAAAAAAAAAAAAAAAAAEBf/EABkRAAMAAwAAAAAAAAAAAAAAAAABEwJRUv/aAAwDAQACEQMRAD8ArVuaHC0l6ExPux04Y3yWepVw5w7Q0MGck5J16RZ5ZskHxv6iqTfTDSw0f//Z',
  )
})

test.run()
