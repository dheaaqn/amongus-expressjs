const router = require("express").Router();
const { getMessageByRoom } = require("../controller/MessageController");
const { authUser } = require("../middleware/auth");

// HAMA
router.get("/:id", authUser, getMessageByRoom);
module.exports = router;
