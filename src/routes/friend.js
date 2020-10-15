const router = require("express").Router();
const { authUser } = require("../middleware/auth");
const {
  addFriend,
  getListFriend,
  getFriendLocation,
} = require("../controller/FriendController");

// POST
router.post("/add", authUser, addFriend);

// GET
router.get("/list/:id", authUser, getListFriend);
router.get("/location/:id", authUser, getFriendLocation);

module.exports = router;
