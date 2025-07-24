import path from "node:path";
import sharp from "sharp";
import { glob } from "tinyglobby";

/**
 * Fetch metadata and base64 previews for images matching a glob pattern.
 *
 * @param {string|string[]} pattern - Glob pattern(s) for matching image files.
 * @param {object} options - Options for resizing and sorting.
 * @param {object} [options.resize={ width: 10, height: 10, fit: "inside" }] - Resize config for thumbnail.
 * @param {boolean} [options.sort=true] - Whether to sort the result array by filename.
 * @returns {Promise<Array<{src: string, width: number, height: number, format: string, base64: string}>>}
 */
export async function ImageMetaFetcher(pattern, options = {}) {
  const { resize = { width: 10, height: 10, fit: "inside" }, sort = true } =
    options;

  try {
    const files = await glob(pattern, { posix: true });

    const supportedFormats = [
      "jpeg",
      "jpg",
      "png",
      "webp",
      "gif",
      "avif",
      "tiff",
    ];

    const imagePromises = files.map(async (file) => {
      try {
        const src = path.posix.basename(file); // safer than regex
        const image = sharp(file);
        const metadata = await image.metadata();
        const { width, height, format } = metadata;

        if (!supportedFormats.includes(format)) {
          console.warn(
            `Skipped unsupported format "${format}" in file: ${file}`
          );
          return null;
        }

        const buffer = await image
          .resize(resize.width, resize.height, { fit: resize.fit })
          .toBuffer();

        const base64 = `data:image/${format};base64,${buffer.toString("base64")}`;

        return { src, width, height, format, base64 };
      } catch (err) {
        console.warn(`Skipped image "${file}": ${err.message}`);
        return null;
      }
    });

    const images = (await Promise.all(imagePromises)).filter(Boolean);

    if (sort) {
      images.sort((a, b) => a.src.localeCompare(b.src));
    }

    return images;
  } catch (error) {
    console.error("Error fetching images:", error);
    throw error;
  }
}

export default ImageMetaFetcher;
