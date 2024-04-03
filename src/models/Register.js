"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conn_1 = __importDefault(require("../db/conn"));
const mongoose_1 = require("mongoose");
const registerSchema = new mongoose_1.Schema({
    phoneNumber: { type: String, required: true },
    cpf: { type: String, required: true },
    protocol: { type: String, required: true },
    projectId: { type: String, required: true },
});
const Register = conn_1.default.model('Register', registerSchema);
exports.default = Register;
