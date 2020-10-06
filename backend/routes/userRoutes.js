const express = require("express");
const router = express.Router();
const { authUser, getUserProfile, registerUser, updateUserProfile } = require("../controllers/userController");
const protect = require("../middleware/authMiddleware")

router.route('/').post(registerUser)
router.post('/login', authUser)
////////////////////////////////
// Note: To implement middleware, you just make it the first arguement, such as below
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)

module.exports = router;
