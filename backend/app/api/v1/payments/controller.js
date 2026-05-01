const { StatusCodes } = require("http-status-codes");

const {
  getAllPayments,
  createPayments,
  getOnePayments,
  updatePayments,
  deletePayments,
} = require("../../../service/mongoose/payments");

const create = async (req, res, next) => {
  try {
    const result = await createPayments(req);

    res.status(StatusCodes.CREATED).json({
      status: true,
      message: "Payment successfully created",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const index = async (req, res, next) => {
  try {
    const result = await getAllPayments(req);

    res.status(StatusCodes.CREATED).json({
      status: true,
      message: "List data payment",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const find = async (req, res, next) => {
  try {
    const result = await getOnePayments(req);

    res.status(StatusCodes.CREATED).json({
      status: true,
      message: "Payment " + result.type,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await updatePayments(req);

    res.status(StatusCodes.CREATED).json({
      status: true,
      message: "Payment successfully updated",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const result = await deletePayments(req);

    res.status(StatusCodes.CREATED).json({
      status: true,
      message: "Payment successfully deleted!",
      data: null,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  index,
  find,
  update,
  destroy,
  create,
};
