module.exports = (express, app) => {
    const controller = require("../controllers/like.controller.js");
    const router = express.Router();




    //unlike one post
    router.post("/delete", controller.delete);

    // add like to a post
    router.post("/create", controller.create);

    // Add routes to server.
    app.use("/api/likes", router);
};
