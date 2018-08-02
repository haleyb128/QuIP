module.exports = function (sequelize, DataTypes) {
    var Favorite = sequelize.define("Favorite", {
        Quote: DataTypes.STRING,
        Author: DataTypes.STRING
    });
    Favorite.associate = function (models) {
        Favorite.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        })
    };
    return Favorite
};