import { Router } from 'express'
import { completePurchase } from '../buy/buy.controller.js'
import { isClient, validateJwt } from '../../middlewares/validate.jwt.js'

const router = Router()

router.post('/complete', [validateJwt, isClient], completePurchase)

export default router
