import { writeFile } from "node:fs/promises";
import { ImageMetaFetcher } from "../index.js";

async function main() {
  try {
    const images = await ImageMetaFetcher(
      "examples/assets/*.{jpg,jpeg,png,webp}"
    );

    if (images.length === 0) {
      console.log("No images found in examples/assets/");
      return;
    }

    console.log("Image metadata extracted:\n");
    console.table(
      images.map(({ src, width, height, format }) => ({
        src,
        width,
        height,
        format,
      }))
    );

    await writeFile("examples/images.json", JSON.stringify(images, null, 2));
    console.log("\nMetadata saved to examples/images.json");
  } catch (err) {
    console.error("Failed to fetch image metadata:", err);
  }
}

main();
