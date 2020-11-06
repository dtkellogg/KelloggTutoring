const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    relation: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      // required: true,
      default: new Date(),
    },
    msg: {
      type: String,
      required: true,
    },
    approved: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
