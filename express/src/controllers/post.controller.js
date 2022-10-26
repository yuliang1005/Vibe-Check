const db = require("../database");

// Select all posts from the database.
exports.all = async (req, res) => {
    const posts = await db.post.findAll({ order: [['time', 'DESC'],] });

    // Can use eager loading to join tables if needed, for example:
    // const posts = await db.post.findAll({ include: db.user });

    // Learn more about eager loading here: https://sequelize.org/master/manual/eager-loading.html

    res.json(posts);
};

// Create a post in the database.
exports.create = async (req, res) => {
    const post = await db.post.create({
        text: req.body.text,
        username: req.body.username,
        time: req.body.time,
        image: req.body.image,
        relateid: req.body.relateid
    });

    res.json(post);
};
