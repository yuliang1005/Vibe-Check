module.exports = (express, app) => {
    const controller = require("../controllers/post.controller.js");
    const router = express.Router();

    // Select all posts.
    router.get("/get", controller.all);

    // Create a new post.
    router.post("/create", controller.create);

    // Add routes to server.
    app.use("/api/posts", router);
};
