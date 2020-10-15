const router = require("express").Router();
const {authUser} = require('../middleware/auth')
const {
  createRoom,
  getListRoom,
  getRoomById,
} = require("../controller/RoomController");

// POST
router.post("/create", authUser, createRoom);

// GET
router.get("/list/:id", authUser, getListRoom);
router.get("/byid", authUser, getRoomById);

module.exports = router;
