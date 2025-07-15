import { mkdirSync, writeFileSync } from "node:fs";
import { ImageMetaFetcher } from "../index.js";

try {
  const images = await ImageMetaFetcher("examples/assets/*.{jpg,png}", {
    resize: { width: 20, height: 20, fit: "cover" },
    sort: false,
  });

  mkdirSync("examples/output", { recursive: true });
  writeFileSync(
    "examples/output/thumbnails.json",
    JSON.stringify(images, null, 2)
  );
  console.log("Image metadata saved to examples/output/thumbnails.json");
} catch (error) {
  console.error("Failed to process images:", error);
}
