const {
  signupParticipant,
  activateParticipant,
  signinParticipant,
  getAllEvents,
  getAllOrders,
  getOneEvent,
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

const getAllLandingPage = async (req, res, next) => {
  try {
    const result = await getAllEvents(req);

    res.status(StatusCodes.CREATED).json({
      status: true,
      message: "List data events",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getDashboard = async (req, res, next) => {
  try {
    const result = await getAllOrders(req);

    res.status(StatusCodes.CREATED).json({
      status: true,
      message: "List data orders",
      data: result,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getDetailLandingPage = async (req, res, next) => {
  try {
    const result = await getOneEvent(req);

    res.status(StatusCodes.CREATED).json({
      status: true,
      message: "Detail event " + result.title,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signup,
  activeParticipant,
  signin,
  getDetailLandingPage,
  getAllEvents,
  getAllLandingPage,
  getDetailLandingPage,
  getDashboard,
};
