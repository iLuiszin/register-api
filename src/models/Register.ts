import mongoose from "../db/conn";
import { Schema } from "mongoose";

interface IRegister {
  phoneNumber: string;
  cpf: string;
  protocol: string;
  projectId: string;
}

const registerSchema = new Schema<IRegister>({
  phoneNumber: { type: String, required: true },
  cpf: { type: String, required: true },
  protocol: { type: String, required: true },
  projectId: { type: String, required: true },
})

const Register = mongoose.model<IRegister>('Register', registerSchema)

export default Register
