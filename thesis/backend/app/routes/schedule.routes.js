const controller = require("../controllers/schedule.controller");

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
        "/api/schedules/",
        controller.findAll
    );
    app.get(
        "/api/schedules/type1/",
        controller.findWithType1
    );
    app.get(
        "/api/schedules/type2/",
        controller.findWithType2
    );
    app.get(
        "/api/schedules/room/:room",
        controller.findByRoom
    );
    app.get(
        "/api/schedules/day/:start/:end",
        controller.findByDay
    );
    app.post(
        "/api/schedule/",
        controller.create
    );

    app.put(
        "/api/schedule/:id",
        controller.update
    );


};
