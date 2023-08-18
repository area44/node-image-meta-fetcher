import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { ImageMetaFetcher } from '../index.js'

const images = await ImageMetaFetcher('images/*.{jpg,jpeg,png}')

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
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAECAIAAADETxJQAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAMUlEQVR4nGP48+TZnJL82cW5DAuampNM9fdP7WNQYWCwEBK6vnM7Q0FAQK6P7/+vXwFwfBHUaTcNcAAAAABJRU5ErkJggg==',
  )
  assert.equal(
    images[1].base64,
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAECAIAAADETxJQAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAM0lEQVR4nAEoANf/AKjg/6zf/7jr/wDt//+0vsPq5+QALjFWNDZOa15vAAAANAAFOgACOPlHEtuYfOsCAAAAAElFTkSuQmCC',
  )
})

test.run()
