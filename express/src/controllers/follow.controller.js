const db = require("../database");

// Select all follows from the database.
exports.all = async (req, res) => {
    const follows = await db.follow.findAll();


    res.json(follows);
};

//get follow status between two users
exports.one = async (req, res) => {
    const follow =await db.follow.findAll({
        where: {
            followed_username: req.body.followed_username,
            username: req.body.username
        }
    });

    res.json(follow);
}

//find someone's follow
exports.findFollow = async (req, res) => {
    const follow =await db.follow.findAll({
        where: {
            username: req.params.id
        }
    });

    res.json(follow);
}

// add a follow in the database.
exports.create = async (req, res) => {
    console.log(req.body);
    const follow = await db.follow.create({
        followed_username: req.body.followed_username,
        username: req.body.username
    });

    res.json(follow);
};

//unfollow in the database
exports.delete = async (req, res) => {
    const follow = await db.follow.destroy({
        where: {
            followed_username: req.body.followed_username,
            username: req.body.username
        }
    });

    res.json(follow);
}
