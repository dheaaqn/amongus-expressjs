const router = require("express").Router();
const {authUser} = require('../middleware/auth')
const {
  registerUser,
  loginUser,
  patchUser,
  getUserById,
  searchUser,
  patchImageUser,
  patchLocation,
} = require("../controller/UserController");
const uploadFilter = require("../middleware/multer");

// GET
router.get("/search", searchUser);

// POST
router.post("/login", loginUser);
router.post("/register", registerUser);

// PATCH
router.patch("/update/profile/:id", authUser, patchUser);
router.patch("/update/location/:id", authUser, patchLocation);
router.patch("/update/image/:id", authUser, uploadFilter, patchImageUser);

// HAMA
router.get("/:id", getUserById);
module.exports = router;
