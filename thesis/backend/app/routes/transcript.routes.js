const controller = require("../controllers/transcript.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );

        next();
    });

    app.post("/api/transcript/", controller.create);

    app.put("/api/transcript/comment/:id", controller.updateComment);

    app.get("/api/transcripts/", controller.getAll);

    app.get("/api/transcripts/topic/:id", controller.findByTopic);

};
