const { getAllOrders } = require("../../../service/mongoose/orders");

const { StatusCodes } = require("http-status-codes");

const index = async (req, res, next) => {
  try {
    const result = await getAllOrders(req);

    res.status(StatusCodes.CREATED).json({
      status: true,
      message: "List Orders",
      data: {
        order: result.data,
        total_pages: result.total_pages,
        total: result.total,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  index,
};
