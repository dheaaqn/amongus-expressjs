const router = require("express").Router();
const { getMessageByRoom } = require("../controller/MessageController");

// HAMA
router.get("/:id", getMessageByRoom);
module.exports = router;
