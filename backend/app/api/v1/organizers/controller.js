const { StatusCodes } = require("http-status-codes");

const {
  createOrganizer,
  createUser,
  getAllUsers,
} = require("../../../service/mongoose/users");

const getCMSUsers = async (req, res, next) => {
  try {
    const result = await getAllUsers();

    res.status(StatusCodes.OK).json({
      status: true,
      message: "List Users",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const create = async (req, res, next) => {
  try {
    const result = await createOrganizer(req);

    res.status(StatusCodes.CREATED).json({
      status: true,
      message: "Organizer berhasil dibuat",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const createCMSUser = async (req, res, next) => {
  try {
    const result = await createUser(req);

    res.status(StatusCodes.CREATED).json({
      status: true,
      message: "Kategori berhasil dibuat",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  create,
  createCMSUser,
  getCMSUsers,
};
