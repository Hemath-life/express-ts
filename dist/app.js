"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const res_1 = require("./middleware/res");
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
app.use(res_1.response);
app.use('/api/v1/', routes_1.default);
// add custom error handler middleware as the last middleware
// app.use(
//     // error handler
//     app.use(function (err: Error, req: Request, res: Response) {
//         console.log(err);
//     }),
// );
exports.default = app;
