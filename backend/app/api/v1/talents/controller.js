const {
  createTalents,
  getAllTalents,
  getOneTalents,
  updateTalents,
  deleteTalents,
} = require("../../../service/mongoose/talents");
const Talents = require("./model");
const { StatusCodes } = require("http-status-codes");

const create = async (req, res, next) => {
  try {
    const result = await createTalents(req);
    res.status(StatusCodes.CREATED).json({
      status: true,
      message: "Pembicara berhasil dibuat",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const index = async (req, res, next) => {
  try {
    const result = await getAllTalents(req);

    res.status(StatusCodes.OK).json({
      status: true,
      message: "List Talenst Data",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const show = async (req, res, next) => {
  try {
    const result = await getOneTalents(req);

    res.status(StatusCodes.OK).json({
      status: true,
      message: `Pembicara atas nama: ${result.name}`,
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await updateTalents(req);
    res.status(StatusCodes.OK).json({
      status: true,
      message: "Pembicara berhasil diupdate",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const destroy = async (req, res, next) => {
  try {
    const result = await deleteTalents(req);

    res.status(StatusCodes.OK).json({
      status: true,
      message: `Pembicara dengan nama ${result.name} berhasil dihapus`,
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
