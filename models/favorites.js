module.exports = function (sequelize, DataTypes) {
    var Favorite = sequelize.define("Favorite", {
        Quote: DataTypes.STRING,
        Author: DataTypes.STRING,
        Category: DataTypes.STRING,
        Subcategory: DataTypes.STRING,
        LoginId: DataTypes.INTEGER
    });
    Favorite.associate = function (models) {
        Favorite.belongsTo(models.User)
    };
    return Favorite
};