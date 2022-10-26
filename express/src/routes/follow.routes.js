module.exports = (express, app) => {
    const controller = require("../controllers/follow.controller.js");
    const router = express.Router();

    // Select all follows.
    router.get("/get", controller.all);

    //select one user's follow
    router.post("/select", controller.one);

    //select follow status between two users
    router.get("/findFollow/:id", controller.findFollow);

    // follow someone
    router.post("/create", controller.create);

    // unfollow someone
    router.post("/delete", controller.delete);

    // Add routes to server.
    app.use("/api/follows", router);
};
