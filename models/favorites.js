module.exports = function (sequelize, DataTypes) {
    var Favortie = sequelize.define("Favorite", {
        quote: dateTypes.STRING
    });
    Favortie.associate = function (models) {
        Favortie.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        })
        return User
    };
};