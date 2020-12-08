const asyncHandler = require("express-async-handler");
const Review = require("../models/reviewModel");
const mongoose = require("mongoose");

// @desc    Fetch all reviews
// @router  GET /api/reviews
// @access  Public
const getReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({});
  res.json(reviews);
});

// @desc    Fetch single review
// @router  GET /api/reviews/:id
// @access  Public
const getReviewById = asyncHandler(async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const review = await Review.findById(req.params.id);
    if (review) {
      res.json(review);
    } else {
      res.status(404).json({
        message: "Review not found",
      });
    }
  } else {
    res.status(404).json({
      message: "Invalid ID. Review not found",
    });
  }
});

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Private/Admin
const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (review) {
    await review.remove();
    res.json({ message: "Review removed" });
  } else {
    res.status(404);
    throw new Error("Review not found");
  }
});

// @desc    Create a review
// @route   POST /api/reviews
// @access  Private/Admin
const createReview = asyncHandler(async (req, res) => {
  console.log(`req.body: ${req.body}`)
  const { name, relation, msg, date } = req.body;

  console.log(`req.body: ${req.body.subject}`);

  const review = await Review.create({
    // user: req.user._id,
    name,
    relation,
    msg,
    date,
  });

  if (review) {
    res.status(201).json({
      _id: review._id,
      name: req.name_id,
      relation: review.relation,
      msg: review.msg,
      date: review.date,
      approved: review.approved,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data.");
  }
  
});

// @desc    Update a review
// @route   PUT /api/reviews/:id
// @access  Private/Admin
const updateReview = asyncHandler(async (req, res) => {
  console.log(req.params.id)
  const review = await Review.findById(req.params.id);

  // console.log('Inside Reviews controller')
  const { user, name, relation, msg, approved } = req.body;

  console.log(user, name, relation, msg, approved)


  // if (review) {
  //     console.log('Review')
  //     const updatedReview = await review.save();
  //     res.json(updatedReview);
  //   } else {
  //     res.status(404);
  //   throw new Error("Review not found");
  //   }
  



  if (review) {
    review.user = user;
    review.name = name;
    review.relation = relation;
    review.msg = msg;
    review.approved = approved;

    const updatedReview = await review.save();
    res.json(updatedReview);
  } else {
    res.status(404);
    throw new Error("Review not found");
  }
});

module.exports = {
  getReviews,
  getReviewById,
  deleteReview,
  createReview,
  updateReview,
};
