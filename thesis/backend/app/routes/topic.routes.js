const { authJwt } = require("../middlewares");
const controller = require("../controllers/topic.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );

    next();
  });

  app.get(
    "/api/topics",
    // [authJwt.verifyToken, authJwt.isAdmin],
    controller.findAll
  );

  app.get("/api/topic/:id", controller.findById);

  app.post("/api/topic/", controller.create);

  app.delete("/api/topics/delete/:id", controller.remove);

  app.put("/api/topic/:id", controller.updateTopic);

  app.put("/api/topic-bulk/status/", controller.updateBulkTopicStatus);

  app.put("/api/topic-bulk/outlinecoucil/", controller.updateBulkTopicOutlineCoucil);

  app.put("/api/topic-bulk/reportcoucil/", controller.updateBulkTopicReportCoucil);

  // app.get("/api/topics/status/:status", controller.findByStatus);

  app.get("/api/topics/status/:status", controller.findByStatus);


};
