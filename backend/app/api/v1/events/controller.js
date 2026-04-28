const {
  createEvents,
  getAllEvents,
  getOneEvents,
  updateEvents,
  deleteEvents,
  changeStatusEvents,
} = require("../../../service/mongoose/events");
const Events = require("./model");
const { StatusCodes } = require("http-status-codes");

const create = async (req, res, next) => {
  try {
    const result = await createEvents(req);
    res.status(StatusCodes.CREATED).json({
      status: true,
      message: "Acara berhasil dibuat",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const index = async (req, res, next) => {
  try {
    const result = await getAllEvents(req);

    res.status(StatusCodes.OK).json({
      status: true,
      message: "List Acara",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const show = async (req, res, next) => {
  try {
    const result = await getOneEvents(req);

    res.status(StatusCodes.OK).json({
      status: true,
      message: `Acara dengan judul: ${result.title}`,
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await updateEvents(req);
    res.status(StatusCodes.OK).json({
      status: true,
      message: "Acara berhasil diupdate",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const destroy = async (req, res, next) => {
  try {
    const result = await deleteEvents(req);

    res.status(StatusCodes.OK).json({
      status: true,
      message: `Acara dengan judul ${result.title} berhasil dihapus`,
      data: null,
    });
  } catch (e) {
    next(e);
  }
};

const changeStatus = async (req, res, next) => {
  try {
    const result = await changeStatusEvents(req);
    res.status(StatusCodes.OK).json({
      status: true,
      message: `Status event berhasil diubah`,
      data: result,
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
  changeStatus,
};
