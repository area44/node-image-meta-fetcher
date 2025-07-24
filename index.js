import sharp from "sharp";
import { glob } from "tinyglobby";

export async function ImageMetaFetcher(pattern, options = {}) {
  const { resize = { width: 10, height: 10, fit: "inside" }, sort = true } =
    options;

  try {
    const files = glob.sync(pattern, { posix: true });

    const imagePromises = files.map(async (file) => {
      try {
        const src = file.replace(/^.*[\\/]/, "");
        const image = sharp(file);
        const metadata = await image.metadata();
        const { width, height, format } = metadata;

        const buffer = await image
          .resize(resize.width, resize.height, { fit: resize.fit })
          .toBuffer();

        const base64 = `data:image/${format};base64,${buffer.toString("base64")}`;

        return { src, width, height, base64 };
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
