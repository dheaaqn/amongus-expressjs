const connection = require("../config/mysql");

module.exports = {
  createRoom: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO room SET ?", setData, (error, result) => {
        if (!error) {
          const newResult = {
            id: result.insertId,
            ...setData,
          };
          resolve(newResult);
        } else {
          reject(new Error(error));
        }
      });
    });
  },
  checkRoom: (sender, receiver) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM room WHERE sender_id = ${sender} AND receiver_id = ${receiver}`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getListRoom: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM room WHERE sender_id = ?`,
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getRoomById: (room_id, sender_id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM room WHERE room_id = ? AND sender_id = ?`, [room_id, sender_id],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
};
