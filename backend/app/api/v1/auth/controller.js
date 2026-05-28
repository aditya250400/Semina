const { signin } = require("../../../service/mongoose/auth");
const { StatusCodes } = require("http-status-codes");

const signinCms = async (req, res, next) => {
  try {
    const { token, result: user } = await signin(req);
    delete user._doc.password;
    res.status(StatusCodes.CREATED).json({
      status: true,
      message: "Login Berhasil",
      data: { token, user },
    });
  } catch (e) {
    next(e);
    console.log(e);
  }
};

module.exports = { signinCms };
