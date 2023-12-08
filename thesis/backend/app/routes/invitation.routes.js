
const controller = require("../controllers/invitation.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );

        next();
    });


    app.post("/api/invitation/", controller.create)

    app.get("/api/invitation-1/", controller.getByStatus1)

    app.put("/api/invitation/:id", controller.Update)

    app.get("/api/invitation/student/:student", controller.findByStudent)

    app.put("/api/invitation-bulk/", controller.BulkUpdate)


};

