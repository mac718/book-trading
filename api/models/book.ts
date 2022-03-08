"use strict";
import { userInfo } from "os";
import { UUIDV4 } from "sequelize";
import { Model } from "sequelize";

interface BookAttributes {
  id: string;
  title: string;
  author: string;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class Book extends Model<BookAttributes> implements BookAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: string;
    title!: string;
    author!: string;
    static associate(models: any) {
      // define association here
      Book.belongsTo(models.User, { foreignKey: "UserId" });
    }
  }
  Book.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      title: DataTypes.STRING,
      author: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Book",
    }
  );
  return Book;
};
