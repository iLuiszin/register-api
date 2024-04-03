import Register from '../models/Register'
import { StatusCodes } from 'http-status-codes'
import { Request, Response } from "express";


export default class RegisterController {
  static async register(req: Request, res: Response) {

    const { phoneNumber, cpf, protocol, projectId } = req.body

    if (!phoneNumber || !cpf || !protocol || !projectId) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Preencha todos os campos',
        body: req.body
      })
    }

    const registerExists = await Register.findOne({ protocol: protocol })

    if (registerExists) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Protocolo ja registrado'
      })
    }

    const register = new Register({ phoneNumber, cpf, protocol, projectId })

    try {
      await register.save()
      return res.status(StatusCodes.CREATED).json({
        message: 'Protocolo criado com sucesso'
      })
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error
      })
    }

  }

  static async getRegister(req: Request, res: Response) {

    const { protocol } = req.params

    if (!protocol || typeof protocol !== 'string') {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'O protocolo fornecido não é válido'
      })
    }

    const register = await Register.findOne({ protocol: protocol })

    if (!register) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: 'Registo não encontrado para esse protocolo'
      })
    }

    return res.status(StatusCodes.OK).json(register)
  }

  static async getAllRegisters(req: Request, res: Response) {
    const registers = await Register.find()

    if (!registers) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: 'Nenhum registro encontrado'
      })
    }

    return res.status(StatusCodes.OK).json(registers)
  }

}