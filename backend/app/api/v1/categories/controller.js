const Categories = require("./model");

const create = async (req, res, next) => {
  try {
    const { name } = req.body;
    const result = await Categories.create({ name });

    res.status(201).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const index = async (req, res, next) => {
  try {
    const result = await Categories.find().select("_id name");

    res.status(200).json({
      status: true,
      message: "List Categories Data",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const show = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await Categories.findOne({ _id: id });

    res.status(200).json({
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
};
