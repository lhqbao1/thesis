const controller = require("../controllers/document.controller");

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
        "/api/documents/",
        controller.findAll
    );

    app.post(
        "/api/document/",
        controller.create
    )

    app.put(
        "/api/document/:id",
        controller.update
    )

};
