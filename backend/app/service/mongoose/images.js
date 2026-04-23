const Images = require("../../api/v1/images/model");
const { NotFoundError } = require("../../errors");

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

const checkingImage = async (id) => {
  const result = await Images.findOne({ _id: id });
  console.log(result);

  if (!result) throw new NotFoundError("Gambar tidak ditemukan");

  return result;
};

module.exports = { createImage, generateImage, checkingImage };
