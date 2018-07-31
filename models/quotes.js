module.exports = function (sequelize, DataTypes) {
    var Quote = sequelize.define("Quote", {
        Quote: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        Author: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Unknown",
            len: [1]
        },
        Category: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [1],
        },
        Subcategory: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    Quote.associate = function (models) {
        Quote.belongsTo(models.User)
        ;
    };
    return Quote;
};
