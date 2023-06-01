import fs from "node:fs/promises";
import { glob } from "glob";
import { getPlaiceholder } from "plaiceholder";

const getImages = async (pattern) => {
  const images = await Promise.all(
    glob.sync(pattern).map(async (file) => {
      const src = file.replace("images\\", "");
      const {
        metadata: { height, width },
      } = await getPlaiceholder(file);
      const buffer = await fs.readFile(file);
      const { base64 } = await getPlaiceholder(buffer);
      return {
        src,
        width,
        height,
        base64,
      };
    })
  );
  return images;
};

const images = await getImages("images/*.{jpg,png}");
images.sort((a, b) => {
  if (a.src < b.src) {
    return -1;
  }
  if (a.src > b.src) {
    return 1;
  }
  return 0;
});

fs.writeFile("images.json", JSON.stringify(images, null, 2));
