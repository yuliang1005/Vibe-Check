module.exports = (sequelize, DataTypes) =>
    sequelize.define("post", {
        post_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        text: {
            type: DataTypes.STRING(600),
            allowNull: true
        },
        time: {
            type: DataTypes.STRING(40),
            allowNull: false
        },
        image: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        relateid: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        // Don't add the timestamp attributes (updatedAt, createdAt).
        timestamps: false
    });
