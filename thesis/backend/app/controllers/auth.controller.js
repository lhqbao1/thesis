const config = require("../config/config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../models");
const User = db.user;
const Role = db.role;
// const Invoice = db.invoice;

responsePayload = (status, message, payload) => ({
  status,
  message,
  payload,
});

exports.signup = async (req, res) => {
  try {

    const hashedPassword = bcrypt.hashSync(req.body.password, 8);

    console.log(req.body)
    let user = await User.create({
      user_email: req.body.email,
      password: hashedPassword,
      role: req.body.role
    });

    // await user.setRole(role);

    res.json(
      responsePayload(
        true,
        "Đăng ký tài khoản thành công! Vui lòng trở lại đăng nhập để tiếp tục!",
        user
      )
    );
  } catch (err) {
    res.status(500).json(responsePayload(false, err.message, null));
    console.log(err.message)
  }
};

exports.bulkSignup = async (req, res) => {
  try {


    let data = []
    if (req.body) {
      req.body.map((item, index) => {
        item.password = bcrypt.hashSync(item.password.toString(), 8)
        data.push(item)
      })
    }
    const user = await User.bulkCreate(data)

    res.json(
      responsePayload(
        true,
        "Đăng ký tài khoản thành công! Vui lòng trở lại đăng nhập để tiếp tục!",
        user
      )
    );
  } catch (err) {
    res.status(500).json(responsePayload(false, err.message, null));
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        user_email: req.body.email,
      },
      include: [
        {
          model: Role,
          as: 'roleInfo'
        }
      ], // Include the Role model
    });
    console.log(user)

    if (!user) {
      return res
        .status(400)
        .json(responsePayload(false, "Người dùng này không tồn tại!", null));
    }

    let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res
        .status(401)
        .json(responsePayload(false, "Mật khẩu không đúng!", null));
    }

    // Generate JWT token with user role
    let token = jwt.sign(
      {
        id: user.user_id,
        role: user.role ? user.role.role_name : "guest", // Get user roleCode or use 'guest' as default
      },
      config.auth.secret,
      {
        expiresIn: 86400, // 24 hours
      }
    );

    res.json(
      responsePayload(true, "Đăng nhập thành công!", {
        accessToken: token,
        user: {
          id: user.user_id,
          email: user.user_email,
          role: user.roleInfo.role_name, // Get user role name or use 'guest' as default
          // subRole: user.sub_role
        },
      })
    );
  } catch (err) {
    res.status(500).json(responsePayload(false, err.message, null));
  }
};
