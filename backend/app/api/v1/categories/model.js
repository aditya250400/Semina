const mongoose = require("mongoose");
const { model, Schema } = mongoose;

let categorySchema = Schema(
  {
    name: {
      type: String,
      minLength: 3,
      maxLength: 50,
      required: true,
    },
    organizer: {
      type: mongoose.Types.ObjectId,
      ref: "Organizer",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = model("Category", categorySchema);
