const helper = require("../helper/helper.js");
const { getMessageByRoom } = require("../model/Message");

module.exports = {
  getMessageByRoom: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await getMessageByRoom(id);
      return helper.response(res, 200, "Get Messages Success", result);
    } catch (error) {
      return helper.response(res, 400, "Bad Request");
    }
  },
};
