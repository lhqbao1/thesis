const controller = require("../controllers/notification.controller");

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
        "/api/notifications/",
        controller.findAll
    );

    app.post(
        "/api/notification/",
        controller.create
    );
    app.get(
        "/api/notifications-addtopic/",
        controller.findAddTopic
    );
    app.put(
        "/api/notification/:id",
        controller.update
    );
    app.delete(
        "/api/notification/:id",
        controller.delete
    );


};
