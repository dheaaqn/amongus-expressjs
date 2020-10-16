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
  deleteImageUser,
} = require("../controller/UserController");
const uploadFilter = require("../middleware/multer");

// GET
router.get("/search", authUser, searchUser);

// POST
router.post("/login", loginUser);
router.post("/register", registerUser);

// PATCH
router.patch("/update/profile/:id", authUser, patchUser);
router.patch("/update/location/:id", authUser, patchLocation);
router.patch("/update/image/:id", authUser, uploadFilter, patchImageUser);
router.patch('/delete/image/:id', authUser, deleteImageUser)

// HAMA
router.get("/:id", getUserById);
module.exports = router;
