const mongoose = require("mongoose");
const { model, Schema } = mongoose;

let categorySchema = Schema(
  {
    name: {
      type: String,
      minLength: 13,
      maxLength: 50,
      required: true,
    },
  },
  {
    timeStamps: true,
  },
);

module.exports = model("Category", categorySchema);
