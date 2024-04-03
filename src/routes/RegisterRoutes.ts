import express from 'express'
import RegisterController from '../controllers/RegisterController'

const router = express.Router()

router.route('/').post(RegisterController.register).get(RegisterController.getAllRegisters)
router.route('/:protocol').get(RegisterController.getRegister)

export default router