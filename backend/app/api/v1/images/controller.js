const { createImage } = require("../../../service/mongoose/images");
const { StatusCodes } = require("http-status-codes");

const create = async (req, res, next) => {
  try {
    const result = await createImage(req);

    res.status(StatusCodes.CREATED).json({
      status: true,
      message: "Gambar berhasil dibuat",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  create,
};
