module.exports = (sequelize, DataTypes) =>
  sequelize.define("like", {
  }, {
    // Don't add the timestamp attributes (updatedAt, createdAt).
    timestamps: false
  });
