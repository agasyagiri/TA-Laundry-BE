const userModel = require(`../models/index`).user;
const md5 = require(`md5`);
const Op = require(`sequelize`).Op;

// mendapatkan semua data
exports.getAllUser = async (request, response) => {
  let users = await userModel.findAll();
  return response.json({
    success: true,
    data: users,
    message: `All data have been loaded`,
  });
};

// cari data
exports.finduser = async (request, response) => {
  let keyword = request.params.key;
  let users = await userModel.findAll({
    where: {
      [Op.or]: [
        { userID: { [Op.substring]: keyword } },
        { username: { [Op.substring]: keyword } },
        { email: { [Op.substring]: keyword } },
        { password: { [Op.substring]: keyword } },
        { role: { [Op.substring]: keyword } },
      ],
    },
  });
  return response.json({
    success: true,
    data: users,
    message: `All Users have been loaded`,
  });
};

// penambahan data
exports.adduser = (request, response) => {
  let newuser = {
    username: request.body.username,
    email: request.body.email,
    password: md5(request.body.password),
    role: request.body.role,
  };

  userModel
    .create(newuser)
    .then((result) => {
      return response.json({
        success: true,
        data: result,
        message: `okk! berhasil menambahkan data`,
      });
    })
    .catch((error) => {
      return response.json({
        success: false,
        message: error.message,
      });
    });
};

// update data
exports.updateuser = (request, response) => {
  let datauser = {
    username: request.body.username,
    email: request.body.email,
    role: request.body.role,
  };
  if (request.body.password) {
    datauser.password = md5(request.body.password);
  }
  let userID = request.params.id;
  userModel
    .update(datauser, { where: { userID: userID } })
    .then((result) => {
      return response.json({
        success: true,
        message: `udah berhasil ke update`,
      });
    })
    .catch((error) => {
      return response.json({
        success: false,
        message: error.message,
      });
    });
};

// penghapusan data
exports.deleteuser = (request, response) => {
  let userID = request.params.id;

  userModel
    .destroy({ where: { userID: userID } })
    .then((result) => {
      return response.json({
        success: true,
        message: `berhasil kehapusss yey`,
      });
    })
    .catch((error) => {
      return response.json({
        success: false,
        message: error.message,
      });
    });
};

exports.resetPassword = (request, response) => {
  const { oldpass, newpass } = request.body;
  let userID = request.params.id;

  if (!oldpass || !newpass) {
      return response.json({
        success: false,
        message: 'Please provide both old password and new password.'
      });
    }

  userModel.findOne({ where: { userID: userID } })
      .then(user => {
          if (!user) {
              return response.json({
                  success: false,
                  message: "User not found"
              });
          }

          // Check if the provided old password matches the one in the database
          if (user.password !== md5(oldpass)) {
              return response.json({
                  success: false,
                  message: "Old password does not match"
              });
          }

          // Update the password
          let dataUser = {
              password: md5(newpass)
          };
          
          userModel.update(dataUser, { where: { userID: userID } })
              .then(result => {
                  return response.json({
                      success: true,
                      data: dataUser,
                      message: "Password has been updated"
                  });
              })
              .catch(error => {
                  return response.json({
                      success: false,
                      message: error.message
                  });
              });
      })
      .catch(error => {
          return response.json({
              success: false,
              message: error.message
          });
      });
}
