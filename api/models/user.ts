"use strict";
import { UUIDV4 } from "sequelize";
import { Model } from "sequelize";

interface UserAttributes {
  id: string;
  name: string;
  location: string;
  password: string;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: string;
    name!: string;
    location!: string;
    password!: string;
    static associate(models: any) {
      // define association here
      User.hasMany(models.Book);
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: DataTypes.STRING,
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
