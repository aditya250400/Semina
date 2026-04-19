const Categories = require("./model");
const {
  getAllCategories,
  createCategories,
  getOneCategories,
} = require("../../../service/mongoose/categories");

const create = async (req, res, next) => {
  try {
    const result = await createCategories(req);
    res.status(201).json({
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
    const result = await getAllCategories();

    res.status(200).json({
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

    res.status(200).json({
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
    const { id } = req.params;
    const { name } = req.body;

    const result = await Categories.findOneAndUpdate(
      { _id: id },
      { name },
      { new: true, runValidators: true },
    );

    res.status(201).json({
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
    const { id } = req.params;
    const result = await Categories.findByIdAndDelete(id);

    res.status(200).json({
      status: true,
      message: "Kategori berhasil dihapus",
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
