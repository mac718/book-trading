"use strict";

import { UUIDV4 } from "sequelize";
import { Model } from "sequelize";

interface RequestAttributes {
  id: string;
  requestedBooks: string;
  offeredBooks: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Request extends Model<RequestAttributes> implements RequestAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    id!: string;
    requestedBooks!: string;
    offeredBooks!: string;

    static associate(models: any) {
      // define association here
      Request.belongsTo(models.User);
    }
  }
  Request.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      requestedBooks: { type: DataTypes.STRING, allowNull: false },
      offeredBooks: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "Request",
    }
  );
  return Request;
};
