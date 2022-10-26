const db = require("../database");

// like a post
exports.create = async (req, res) => {
    const like = await db.like.create({
        post_id: req.body.post_id,
        username: req.body.username
    });

    res.json(like);
};

//unlike from a post
exports.delete = async (req, res) => {
    const like = await db.like.destroy({
        where: {
            post_id: req.body.post_id,
            username: req.body.username
        }
    });

    res.json(like);
}
