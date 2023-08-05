import { promises as fs } from 'fs';
import { glob } from 'glob';
import { getPlaiceholder } from 'plaiceholder';

export async function getImages(pattern) {
  try {
    const files = glob.sync(pattern, { posix: true });
    const imagePromises = files.map(async (file) => {
      const src = file.replace(/^.*[\\\/]/, '');
      const buffer = await fs.readFile(file);
      const {
        metadata: { height, width },
        base64,
      } = await getPlaiceholder(buffer);
      return { src, width, height, base64 };
    });

    const images = await Promise.all(imagePromises);

    images.sort((a, b) => a.src.localeCompare(b.src));

    return images;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}
