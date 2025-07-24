import { mkdirSync, writeFileSync } from "node:fs";
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

    mkdirSync("examples/output", { recursive: true });
    const outputPath = "examples/output/images.json";
    writeFileSync(outputPath, JSON.stringify(images, null, 2));

    console.log(`Image metadata saved to ${outputPath}`);
  } catch (err) {
    console.error("Failed to fetch image metadata:", err);
  }
}

main();
