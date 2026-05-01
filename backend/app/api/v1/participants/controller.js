const {
  signupParticipant,
  activateParticipant,
  signinParticipant,
} = require("../../../service/mongoose/participants");

const { StatusCodes } = require("http-status-codes");

const signup = async (req, res, next) => {
  try {
    const result = await signupParticipant(req);

    res.status(StatusCodes.CREATED).json({
      status: true,
      message: "Register Successfully",
      data: result,
    });
  } catch (e) {
    next(e);
    console.log(e);
  }
};

const activeParticipant = async (req, res, next) => {
  try {
    const result = await activateParticipant(req);

    res.status(StatusCodes.CREATED).json({
      status: true,
      message:
        "Account Successfully Activated. Please Login with your account!",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const signin = async (req, res, next) => {
  try {
    const result = await signinParticipant(req);

    res.status(StatusCodes.CREATED).json({
      status: true,
      message: "Login Successfully!",
      data: { token: result },
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  signup,
  activeParticipant,
  signin,
};
