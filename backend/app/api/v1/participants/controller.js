const {
  signupParticipant,
  activateParticipant,
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
  } catch (err) {
    next(err);
    console.log(err);
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
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signup,
  activeParticipant,
};
