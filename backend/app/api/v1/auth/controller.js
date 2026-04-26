const { signin } = require("../../../service/mongoose/auth");
const { StatusCodes } = require("http-status-codes");

const signinCms = async (req, res, next) => {
  try {
    const result = await signin(req);
    res.status(StatusCodes.CREATED).json({
      status: true,
      message: "Login Berhasil",
      data: { token: result },
    });
  } catch (e) {
    next(e);
    console.log(e);
  }
};

module.exports = { signinCms };
