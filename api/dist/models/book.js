"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Book extends sequelize_2.Model {
        static associate(models) {
            // define association here
            Book.belongsTo(models.User);
        }
    }
    Book.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: sequelize_1.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        title: DataTypes.STRING,
        author: DataTypes.STRING,
    }, {
        sequelize,
        modelName: "Book",
    });
    return Book;
};
