const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );

    next();
  });

  app.get(
    "/api/users/",
    controller.findAll
  );

  app.delete("/api/user/:id", controller.remove);

  // app.put(
  //   "/api/users/status/:id",
  //   [authJwt.verifyToken, authJwt.isAdmin],
  //   controller.updateStatus
  // );
};
