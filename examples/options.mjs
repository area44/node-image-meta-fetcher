import { mkdirSync, writeFileSync } from "node:fs";
import { ImageMetaFetcher } from "../index.js";

async function main() {
  try {
    const images = await ImageMetaFetcher("examples/assets/*.{jpg,png}", {
      resize: { width: 20, height: 20, fit: "cover" },
      sort: false,
    });

    if (images.length === 0) {
      console.warn("No matching images found in examples/assets/");
      return;
    }

    mkdirSync("examples/output", { recursive: true });

    const outputPath = "examples/output/thumbnails.json";
    writeFileSync(outputPath, JSON.stringify(images, null, 2));

    console.log(`Image metadata saved to ${outputPath}`);
  } catch (error) {
    console.error("Failed to process images:", error.message);
  }
}

main();
