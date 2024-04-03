"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const RegisterController_1 = __importDefault(require("../controllers/RegisterController"));
const router = express_1.default.Router();
router.route('/').post(RegisterController_1.default.register).get(RegisterController_1.default.getAllRegisters);
router.route('/:protocol').get(RegisterController_1.default.getRegister);
exports.default = router;
