const router = require("express").Router();
const {
  createRoom,
  getListRoom,
  getRoomById,
} = require("../controller/RoomController");

// POST
router.post("/create", createRoom);

// GET
router.get("/list/:id", getListRoom);
router.get("/byid", getRoomById);

module.exports = router;
