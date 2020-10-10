const router = require("express").Router();
const {
  addFriend,
  getListFriend,
  getFriendLocation,
} = require("../controller/FriendController");

// POST
router.post("/add", addFriend);

// GET
router.get("/list/:id", getListFriend);
router.get("/location/:id", getFriendLocation);

module.exports = router;
