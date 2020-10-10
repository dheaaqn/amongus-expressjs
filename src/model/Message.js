const connection = require("../config/mysql");

module.exports = {
  insertMessage: (data) => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO messages SET ?", data, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(new Error(error));
        }
      });
    });
  },
  getMessageByRoom: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM messages WHERE room_id = ?`,
        id,
        (error, result) => {
          !error ? resolve(result) : console.log(error);
        }
      );
    });
  },
};
