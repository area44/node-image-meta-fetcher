import { test } from 'uvu';
import * as assert from 'uvu/assert';
import { getImages } from '../src/getImages.mjs';

const images = await getImages('images/*.{jpg,png}');

test('function returns an array of images', async () => {
  assert.type(images, 'object');
  assert.is(images.length, 2);

  assert.type(images[0].src, 'string');
  assert.type(images[0].width, 'number');
  assert.type(images[0].height, 'number');
  assert.type(images[0].base64, 'string');
});

test('function sorts images alphabetically', async () => {
  assert.is(images[0].src, 'eveling-salazar-TqikiXaDrf4-unsplash.jpg');
  assert.is(images[1].src, 'mo-ZLBmpXhbzMk-unsplash.jpg');
});

test('function gets width and height of images', async () => {
  assert.is(images[0].width, 480);
  assert.is(images[0].height, 600);

  assert.is(images[1].width, 480);
  assert.is(images[1].height, 613);
});

test('function gets base64 of images', async () => {
  assert.is(
    images[0].base64,
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAECAIAAADETxJQAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAMUlEQVR4nGP48+TZnJL82cW5DAuampNM9fdP7WNQYWCwEBK6vnM7Q0FAQK6P7/+vXwFwfBHUaTcNcAAAAABJRU5ErkJggg=='
  );
  assert.is(
    images[1].base64,
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAECAIAAADETxJQAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAM0lEQVR4nAEoANf/AKjg/6zf/7jr/wDt//+0vsPq5+QALjFWNDZOa15vAAAANAAFOgACOPlHEtuYfOsCAAAAAElFTkSuQmCC'
  );
});

test.run();
