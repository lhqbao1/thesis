
const controller = require("../controllers/lecturer.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );

        next();
    });


    app.get("/api/lecturers/", controller.getAll)
    app.post("/api/lecturer/", controller.create)

    app.get("/api/lecturer/:id", controller.findById)

    app.get("/api/lecturer-login/:id", controller.findByIdLogin)

    app.get("/api/lecturer/workplace/:id", controller.findByWorkPlace)

    app.get("/api/lecturer/outline/:id", controller.findByIdOutline)
    app.get("/api/lecturer/report/:id", controller.findByIdReport)

};

