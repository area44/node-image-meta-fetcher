import fs from 'node:fs/promises';
import { glob } from 'glob';
import { getPlaiceholder } from 'plaiceholder';

export async function getImages(pattern) {
  const images = await Promise.all(
    glob.sync(pattern, { posix: true }).map(async (file) => {
      const src = file.replace('images/', '');
      const buffer = await fs.readFile(file);
      const {
        metadata: { height, width },
      } = await getPlaiceholder(buffer);
      const { base64 } = await getPlaiceholder(buffer);
      return {
        src,
        width,
        height,
        base64,
      };
    })
  );
  images.sort((a, b) => {
    if (a.src < b.src) {
      return -1;
    }
    if (a.src > b.src) {
      return 1;
    }
    return 0;
  });
  return images;
}
