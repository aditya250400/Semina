const Images = require("../../api/v1/images/model");

const generateImage = async (req) => {
  const result = `uploads/${req.file.filename}`;

  return result;
};

const createImage = async (req) => {
  const result = await Images.create({
    name: req.file
      ? `uploads/${req.file.filename}`
      : "uploads/avatar/default.jpeg",
  });

  return result;
};

module.exports = { createImage, generateImage };
