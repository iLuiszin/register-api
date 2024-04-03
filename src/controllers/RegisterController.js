"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Register_1 = __importDefault(require("../models/Register"));
const http_status_codes_1 = require("http-status-codes");
class RegisterController {
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { phoneNumber, cpf, protocol, projectId } = req.body;
            if (!phoneNumber || !cpf || !protocol || !projectId) {
                return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                    message: 'Preencha todos os campos'
                });
            }
            const registerExists = yield Register_1.default.findOne({ protocol: protocol });
            if (registerExists) {
                return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                    message: 'Protocolo ja registrado'
                });
            }
            const register = new Register_1.default({ phoneNumber, cpf, protocol, projectId });
            try {
                yield register.save();
                return res.status(http_status_codes_1.StatusCodes.CREATED).json({
                    message: 'Protocolo criado com sucesso'
                });
            }
            catch (error) {
                res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                    message: error
                });
            }
        });
    }
    static getRegister(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { protocol } = req.params;
            if (!protocol || typeof protocol !== 'string') {
                return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                    message: 'O protocolo fornecido não é válido'
                });
            }
            const register = yield Register_1.default.findOne({ protocol: protocol });
            if (!register) {
                return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                    message: 'Registo não encontrado para esse protocolo'
                });
            }
            return res.status(http_status_codes_1.StatusCodes.OK).json(register);
        });
    }
    static getAllRegisters(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const registers = yield Register_1.default.find();
            if (!registers) {
                return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                    message: 'Nenhum registro encontrado'
                });
            }
            return res.status(http_status_codes_1.StatusCodes.OK).json(registers);
        });
    }
}
exports.default = RegisterController;
