import fs from "node:fs/promises";
import { glob } from "glob";
import { getPlaiceholder } from "plaiceholder";

let id = 0;
const getImages = async (pattern) => {
  const files = glob.sync(pattern);
  const images = await Promise.all(
    files.map(async (file) => {
      const src = file.replace("images\\", "");
      const buffer = await fs.readFile(file);
      const {
        metadata: { height, width },
      } = await getPlaiceholder(file);
      const { base64 } = await getPlaiceholder(buffer);
      return {
        id: ++id,
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

fs.writeFile("images.json", JSON.stringify(images, null, 2));
