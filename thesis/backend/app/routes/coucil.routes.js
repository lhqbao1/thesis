const controller = require("../controllers/coucil.controller");

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
        "/api/coucils/",
        controller.findAll
    );
    app.get(
        "/api/coucil/:id",
        controller.findById
    );
    app.get(
        "/api/coucils1/",
        controller.findByType1
    );
    app.get(
        "/api/coucils2/",
        controller.findByType2
    );
    app.post(
        "/api/coucil/",
        controller.create
    )
    app.put("/api/coucil/:id", controller.update)

};
