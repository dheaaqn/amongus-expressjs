const helper = require("../helper/helper.js");
const {
  getListFriend,
  addFriend,
  getFriendLocation,
} = require("../model/Friend.js");

module.exports = {
  addFriend: async (req, res) => {
    const { user_id, friends_id } = req.body;
    try {
      const setData = {
        user_id,
        friends_id,
        friends_created_at: new Date(),
      };

      const result = await addFriend(setData);

      const setData2 = {
        user_id: setData.friends_id,
        friends_id: setData.user_id,
        friends_created_at: new Date(),
      };
      const result2 = await addFriend(setData2);

      return helper.response(res, 200, "Add Friend Success");
    } catch (error) {
      return helper.response(res, 400, "Bad Request");
    }
  },
  getListFriend: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await getListFriend(id);
      return helper.response(res, 200, "Ini temenmu", result);
    } catch (error) {
      return helper.response(res, 400, "Bad Request");
    }
  },
  getFriendLocation: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await getFriendLocation(id);
      return helper.response(res, 200, "Ini lokasi temenmu", result);
    } catch (error) {
      return helper.response(res, 400, "Bad Request");
    }
  },
};
