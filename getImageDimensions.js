const fs = require("fs");
const imageSize = require("image-size");

const imagesDir = "./images";

// Get the list of image files in the images directory.
const imageFiles = fs.readdirSync(imagesDir);

// For each image file, get the dimensions.
const imageDimensions = imageFiles.map((imageFile) => {
  const dimensions = imageSize(imagesDir + "/" + imageFile);
  return {
    src: imageFile,
    width: dimensions.width,
    height: dimensions.height,
  };
});

// Write the JSON object to a file
fs.writeFileSync("data-images.json", JSON.stringify(imageDimensions, null, 2));
