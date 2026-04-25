const mongoose = require("mongoose");

const ticketCategoriesSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, "Tipe tiket harus diisi"],
  },
  price: {
    type: Number,
    default: 0,
  },
  stock: {
    type: Number,
    default: 0,
  },
  statusTicketCategories: {
    type: Boolean,
    enum: [true, false],
    default: true,
  },
  expired: {
    type: Date,
  },
});

const EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Judul harus diisi"],
      minLength: 3,
      maxLength: 50,
    },
    date: {
      type: Date,
      required: [true, "Tanggal dan waktu harus diisi"],
    },
    about: {
      type: String,
    },
    tagline: {
      type: String,
      required: [true, "Tagline harus diisi"],
    },
    keyPoints: {
      type: [String],
    },
    venueName: {
      type: String,
      required: [true, "Tempat acara harus diisi"],
    },
    statusEvent: {
      type: String,
      enum: ["Draft", "Published"],
    },
    tickets: {
      type: [ticketCategoriesSchema],
      required: true,
    },
    image: {
      type: mongoose.Types.ObjectId,
      ref: "Image",
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
    talent: {
      type: mongoose.Types.ObjectId,
      ref: "Talent",
    },
  },
  {
    timeStamps: true,
  },
);

module.exports = mongoose.model("Event", EventSchema);
