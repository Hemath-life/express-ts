"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import 'dotenv/config'; ro
const dotenv = __importStar(require("dotenv"));
dotenv.config({ path: __dirname + `/.env.${process.env.NODE_ENV}` });
// middleware
const res_1 = require("./middleware/res");
// routes
const routes_1 = __importDefault(require("./routes"));
const database_1 = __importDefault(require("./config/database"));
const role_1 = require("./seed/role");
const app = (0, express_1.default)();
(0, database_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
(0, role_1.roleSeed)();
app.use(res_1.response);
app.use('/api/v1', routes_1.default);
// add custom error handler middleware as the last middleware
// app.use(
//     // error handler
//     app.use(function (err: Error, req: Request, res: Response) {
//         console.log(err);
//     }),
// );
exports.default = app;
