const helper = require("../helper/helper.js");
const { getMessageByRoom } = require("../model/Message.js");
const {
  createRoom,
  checkRoom,
  getListRoom,
  getRoomById,
} = require("../model/Room");
const { getUserById } = require("../model/Users");

module.exports = {
  createRoom: async (req, res) => {
    const { sender_id, receiver_id } = req.body;
    try {
      const setData = {
        room_id: Math.floor(Math.random() * 1000),
        sender_id,
        receiver_id,
        room_created_at: new Date(),
      };

      const setData2 = {
        room_id: setData.room_id,
        sender_id: setData.receiver_id,
        receiver_id: setData.sender_id,
        room_created_at: new Date(),
      };

      const checkDataRoom = await checkRoom(
        setData.sender_id,
        setData.receiver_id
      );

      if (checkDataRoom.length > 0) {
        return helper.response(res, 400, "Room already exist");
      } else {
        const result = await createRoom(setData);
        const result2 = await createRoom(setData2);
        return helper.response(res, 200, "Room Created", result);
      }
    } catch (error) {
      return helper.response(res, 400, "Bad Request");
    }
  },
  getListRoom: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await getListRoom(id);
      for (i = 0; i < result.length; i++) {
        const userData = await getUserById(result[i].receiver_id);
        result[i].user_name = userData[0].user_name;
        result[i].user_image = userData[0].user_image;
      }
      return helper.response(res, 200, "Get All List Room", result);
    } catch (error) {
      return helper.response(res, 400, "Bad Request");
    }
  },
  getRoomById: async (req, res) => {
    const { room_id, sender_id } = req.query;
    try {
      const result = await getRoomById(room_id, sender_id);

      const userData = await getUserById(result[0].receiver_id);
      result[0].user_name = userData[0].user_name;
      result[0].user_image = userData[0].user_image;

      const getMessage = await getMessageByRoom(room_id)
      result[0].messages = getMessage

      return helper.response(res, 200, "Get Room By Room ID", result[0]);
    } catch (error) {
      return helper.response(res, 400, "Bad Request");
    }
  },
};
