"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends sequelize_2.Model {
        static associate(models) {
            // define association here
            User.hasMany(models.Book);
        }
    }
    User.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: sequelize_1.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        location: DataTypes.STRING,
    }, {
        sequelize,
        modelName: "User",
    });
    return User;
};
