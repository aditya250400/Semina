const { StatusCodes } = require("http-status-codes");

const { createOrganizer } = require("../../../service/mongoose/users");

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

module.exports = {
  create,
};
