const controller = require("../controllers/lecturercouncil.controller");

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
        "/api/lecturer-council/council/:id",
        controller.findByCouncil
    );
    app.post(
        "/api/lecturer-council/",
        controller.create
    )
    app.get(
        "/api/lecturer-council-report/:id",
        controller.findByLecturerReport
    )
    app.get(
        "/api/lecturer-council-outline/:id",
        controller.findByLecturerOutline
    )

};
