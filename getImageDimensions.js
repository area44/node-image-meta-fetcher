const fs = require("fs");
const imageSize = require("image-size");

// Get the list of image files in the images directory.
const imagesDir = "./images";
const imageFiles = fs.readdirSync(imagesDir);

// For each image file, get the dimensions.
let id = 0;
const imageDimensions = imageFiles.map((imageFile) => {
  const dimensions = imageSize(imagesDir + "/" + imageFile);
  id++;
  return {
    id: id,
    imageSrc: imageFile,
    width: dimensions.width,
    height: dimensions.height,
  };
});

// Write the JSON object to a file
fs.writeFileSync("data-images.json", JSON.stringify(imageDimensions, null, 2));
