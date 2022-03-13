"use strict";

import { UUIDV4 } from "sequelize";

interface RequestAttributes {
  id: string;
  requestedBook: string;
  proposedTrade: string;
}

const { Model } = require("sequelize");
module.exports = (sequelize: any, DataTypes: any) => {
  class Request extends Model<RequestAttributes> implements RequestAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: string;
    requestedBook!: string;
    proposedTrade!: string;
    static associate(models: any) {
      // define association here
      Request.belongsTo(models.User, { foreignKey: "requester" });
    }
  }
  Request.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: UUIDV4,
      },
      requestedBook: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      proposedTrade: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Request",
    }
  );
  return Request;
};
