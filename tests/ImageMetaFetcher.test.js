import { join } from "node:path";
import fs from "fs";
import { beforeAll, describe, expect, it } from "vitest";
import { ImageMetaFetcher } from "../index.js";

const imageDir = join("tests", "fixtures").replace(/\\/g, "/");
const globPattern = `${imageDir}/*.{jpg,jpeg,png,webp}`;

let images;

beforeAll(async () => {
  images = await ImageMetaFetcher(globPattern);
});

describe("ImageMetaFetcher", () => {
  it("returns a non-empty array of image metadata", () => {
    expect(Array.isArray(images)).toBe(true);
    expect(images.length).toBeGreaterThan(0);
  });

  it("includes src, width, height, format, and base64 fields", () => {
    for (const image of images) {
      expect(image).toHaveProperty("src");
      expect(image).toHaveProperty("width");
      expect(image).toHaveProperty("height");
      expect(image).toHaveProperty("format");
      expect(image).toHaveProperty("base64");

      expect(typeof image.src).toBe("string");
      expect(typeof image.width).toBe("number");
      expect(typeof image.height).toBe("number");
      expect(typeof image.format).toBe("string");

      expect(image.base64).toMatch(
        /^data:image\/(jpeg|png|webp|gif|avif|tiff);base64,/
      );
    }
  });

  it("sorts images alphabetically by default", () => {
    const sorted = [...images].map((img) => img.src).sort();
    expect(images.map((i) => i.src)).toEqual(sorted);
  });

  it("respects the sort: false option", async () => {
    const resultSorted = await ImageMetaFetcher(globPattern, { sort: true });
    const resultUnsorted = await ImageMetaFetcher(globPattern, { sort: false });

    const sortedOrder = resultSorted.map((img) => img.src);
    const unsortedOrder = resultUnsorted.map((img) => img.src);

    // They should not always be equal unless tinyglobby returned sorted results
    const isActuallyDifferent = JSON.stringify(sortedOrder) !== JSON.stringify(unsortedOrder);

    if (!isActuallyDifferent) {
      console.warn("⚠️ Underlying glob returned files in sorted order; test may be inconclusive.");
    }

    expect(isActuallyDifferent).toBe(true);
  });

  it("resizes thumbnails to custom size when provided", async () => {
    const result = await ImageMetaFetcher(globPattern, {
      resize: { width: 5, height: 5, fit: "contain" },
    });

    expect(result[0].base64).toMatch(
      /^data:image\/(jpeg|png|webp|gif|avif|tiff);base64,/
    );
  });

  it("skips broken or invalid images gracefully", async () => {
    // Ensure broken.jpg exists and is invalid (e.g., zero-byte file or non-image data)
    const brokenPath = join(imageDir, "broken.jpg").replace(/\\/g, "/");
    const hasBroken = fs.existsSync(brokenPath);

    if (!hasBroken) {
      console.warn("⚠️ No 'broken.jpg' file found for this test.");
      return;
    }

    const result = await ImageMetaFetcher(globPattern);
    const files = result.map((r) => r.src);
    expect(files).not.toContain("broken.jpg");
  });
});
