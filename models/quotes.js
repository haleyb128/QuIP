module.exports = function (sequelize, DataTypes) {
    var Quote = sequelize.define("Quote", {
        quote: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Unknown",
            len: [1]
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [1],
        },
        subcategory: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    Quote.associate = function (models) {
        Quote.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Post;
};
