module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        name: DataTypes.STRING,
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6],
            }
        }
    });
    User.associate = function (models) {
        User.hasMany(models.Quote);
        User.hasMany(models.Favortie)
    };
    return User
};