const bcrypt = require("bcrypt");
const helper = require("../helper/helper.js");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const {
  postUser,
  checkUser,
  patchUser,
  getUserById,
  searchUserByPhone,
  searchUserByEmail,
} = require("../model/Users");

module.exports = {
  registerUser: async (req, res) => {
    const { user_email, user_password, user_name } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const encryptPassword = bcrypt.hashSync(user_password, salt);

    const setData = {
      user_email,
      user_password: encryptPassword,
      user_name,
      user_status: 1,
      user_phone: "",
      user_image: "unamed.png",
      user_created_at: new Date(),
    };

    try {
      const checkDataUser = await checkUser(user_email);
      if (checkDataUser.length > 0) {
        return helper.response(res, 400, "Email already registered");
      } else if (
        req.body.user_password.length < 8 ||
        req.body.user_password.length > 16
      ) {
        return helper.response(res, 400, "password must be 8-16 characters");
      } else {
        const result = await postUser(setData);
        return helper.response(res, 200, "Success Register User");
      }
    } catch (error) {
      console.log(error);
      return helper.response(res, 400, "Bad Request");
    }
  },
  loginUser: async (req, res) => {
    try {
      const { user_email, user_password } = req.body;
      const checkDataUser = await checkUser(user_email);

      if (checkDataUser.length >= 1) {
        const checkPassword = bcrypt.compareSync(
          user_password,
          checkDataUser[0].user_password
        );
        if (checkPassword) {
          const {
            user_id,
            user_email,
            user_name,
            user_status,
          } = checkDataUser[0];
          let payload = {
            user_id,
            user_email,
            user_name,
            user_status,
          };
          const token = jwt.sign(payload, "Secret", { expiresIn: "2h" });
          payload = { ...payload, token };
          return helper.response(res, 200, "Success Login", payload);
        } else {
          return helper.response(res, 400, "Invalid Password");
        }
      } else {
        return helper.response(res, 400, "Account not Registed");
      }
    } catch (error) {
      return helper.response(res, 400, "Bad Request");
    }
  },
  getUserById: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await getUserById(id);
      return helper.response(res, 200, "Get User by Id Success", result);
    } catch (error) {
      return helper.response(res, 400, "Bad Request");
    }
  },
  patchImageUser: async (req, res) => {
    const { id } = req.params;
    try {
      const setData = {
        user_image: req.file.filename,
      };
      const checkId = await getUserById(id);
      if (checkId.length > 0) {
        if (checkId[0].user_image === "unamed.png" || req.file == undefined) {
          const result = await patchUser(setData, id);
          return helper.response(res, 201, "Profile Updated", result);
        } else {
          fs.unlink(`./uploads/${checkId[0].user_image}`, async (error) => {
            if (error) {
              throw error;
            } else {
              const result = await patchUser(setData, id);
              return helper.response(res, 201, "Profile Updated", result);
            }
          });
        }
      }
    } catch (error) {
      console.log(error);
      return helper.response(res, 400, "Bad Request", error);
    }
  },
  patchUser: async (req, res) => {
    const { id } = req.params;
    try {
      const setData = {
        user_name: req.body.user_name,
        user_phone: req.body.user_phone,
        user_updated_at: new Date(),
      };
      const result = await patchUser(setData, id);
      return helper.response(res, 201, "Profile Updated", result);
    } catch (error) {
      console.log(error);
      return helper.response(res, 400, "Bad Request");
    }
  },
  patchLocation: async (req, res) => {
    const { id } = req.params;
    try {
      const setData = {
        user_lat: req.body.user_lat,
        user_lng: req.body.user_lng,
        user_updated_at: new Date(),
      };
      const result = await patchUser(setData, id);
      return helper.response(res, 201, "Location Updated", result);
    } catch (error) {
      console.log(error);
    }
  },
  searchUser: async (req, res) => {
    const { email } = req.query;
    try {
      const result = await searchUserByEmail(email);
      if (result.length > 0) {
        return helper.response(res, 200, `Found ${result.length} user`, result);
      } else {
        return helper.response(res, 404, "User Not Found");
      }
    } catch (error) {
      return helper.response(res, 400, "Bad Request");
    }
  },
};
