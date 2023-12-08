const controller = require("../controllers/topiclecturer.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );

        next();
    });

    app.post("/api/topiclecturer/", controller.create);

    app.post("/api/topiclecturer-bulk/", controller.bulkCreate);

    app.get("/api/topiclecturer/:lecturer_id", controller.findByLecturer);

    app.get("/api/topiclecturer/topic/:lecturer_id", controller.findByTopic);



};
