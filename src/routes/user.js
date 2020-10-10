const router = require("express").Router();
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
router.patch("/update/profile/:id", patchUser);
router.patch("/update/location/:id", patchLocation);
router.patch("/update/image/:id", uploadFilter, patchImageUser);

// HAMA
router.get("/:id", getUserById);
module.exports = router;
