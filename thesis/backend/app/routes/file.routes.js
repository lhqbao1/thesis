const controller = require("../controllers/file.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept",
            "application/json; charset=utf-8"
        );

        next();
    });

    app.get(
        "/api/files/",
        controller.findAll
    );
    app.post(
        "/api/file/",
        controller.create
    )
    app.put(
        "/api/file/:id",
        controller.update
    )

};
