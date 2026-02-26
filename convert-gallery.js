const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const inputFolder = "./public/homenew/gallery";
const outputFolder = "./public/homenew/gallery-webp";

if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder);
}

fs.readdirSync(inputFolder).forEach(file => {
  if (file.endsWith(".jpg") || file.endsWith(".jpeg")) {
    const inputPath = path.join(inputFolder, file);
    const outputPath = path.join(
      outputFolder,
      file.replace(/\.(jpg|jpeg)$/i, ".webp")
    );

    sharp(inputPath)
      .webp({ quality: 80 }) // adjust 75–85 if needed
      .toFile(outputPath)
      .then(() => console.log(`${file} → converted to WebP`))
      .catch(err => console.error(err));
  }
});