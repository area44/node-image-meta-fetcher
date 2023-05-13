const fs = require("fs");

// Get the list of image file paths
const imagePaths = fs.readdirSync("./images");

// Create an empty JSON object
const images = {};

// Iterate over the image file paths
for (const imagePath of imagePaths) {
  // Get the image file name
  const imageName = imagePath.split(".")[0];

  // Add the image file name to the JSON object
  images[imageName] = imagePath;
}

// Write the JSON object to a file
fs.writeFileSync("images.json", JSON.stringify(images, null, 2));
