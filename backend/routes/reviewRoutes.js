const express = require("express");
const router = express.Router();
const {
  getReviews,
  getReviewById,
  deleteReview,
  createReview,
  updateReview,
} = require("../controllers/reviewController.js");
const { protect, admin } = require("../middleware/authMiddleware.js");

router.route("/").get(getReviews).post(protect, createReview);
router
  .route("/:id")
  .get(getReviewById)
  .delete(protect, admin, deleteReview)
  .put(protect, admin, updateReview);

module.exports = router;
