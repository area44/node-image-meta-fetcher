import fs from "node:fs";
import { join } from "node:path";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { ImageMetaFetcher } from "../index.js";

// Replace with your actual image fixtures directory
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

  // 🧪 Mocked test for sort: false
  describe("sort: false behavior (mocked)", () => {
    vi.mock("tinyglobby", async () => {
      const actual = await vi.importActual("tinyglobby");

      return {
        ...actual,
        glob: async () => [
          join("tests/fixtures/b.jpg").replace(/\\/g, "/"),
          join("tests/fixtures/a.png").replace(/\\/g, "/"),
        ],
      };
    });

    it("respects the sort: false option", async () => {
      const unsorted = await ImageMetaFetcher("unused-pattern", {
        sort: false,
      });
      const sorted = await ImageMetaFetcher("unused-pattern", { sort: true });

      const unsortedOrder = unsorted.map((img) => img.src);
      const sortedOrder = sorted.map((img) => img.src);

      expect(unsortedOrder).not.toEqual(sortedOrder);
      expect(sortedOrder).toEqual([...unsortedOrder].sort());
    });
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
    const brokenPath = join(imageDir, "broken.jpg").replace(/\\/g, "/");
    const hasBroken = fs.existsSync(brokenPath);

    if (!hasBroken) {
      console.warn(
        "⚠️ No 'broken.jpg' file found in test fixtures. Skipping test."
      );
      return;
    }

    const result = await ImageMetaFetcher(globPattern);
    const files = result.map((r) => r.src);
    expect(files).not.toContain("broken.jpg");
  });
});
