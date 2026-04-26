const {
  createCategories,
  getAllCategories,
  getOneCategories,
  updateCategories,
  deleteCategories,
} = require("../../../service/mongoose/categories");
const Categories = require("./model");
const { StatusCodes } = require("http-status-codes");

const create = async (req, res, next) => {
  try {
    const result = await createCategories(req);
    res.status(StatusCodes.CREATED).json({
      status: true,
      message: "Kategori berhasil dibuat",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const index = async (req, res, next) => {
  try {
    const result = await getAllCategories(req);

    res.status(StatusCodes.OK).json({
      status: true,
      message: "List Categories Data",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const show = async (req, res, next) => {
  try {
    const result = await getOneCategories(req);

    res.status(StatusCodes.OK).json({
      status: true,
      message: `Category ${result.name}`,
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await updateCategories(req);
    res.status(StatusCodes.OK).json({
      status: true,
      message: "Kategori berhasil diupdate",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const destroy = async (req, res, next) => {
  try {
    const result = await deleteCategories(req);

    res.status(StatusCodes.OK).json({
      status: true,
      message: `Kategori dengan nama ${result.name} berhasil dihapus`,
      data: null,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  create,
  index,
  show,
  update,
  destroy,
};
