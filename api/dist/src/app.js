"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const models_1 = __importDefault(require("../models"));
const app = express_1.default();
const port = 3001;
models_1.default.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`now listening on port ${port}`);
    });
});
