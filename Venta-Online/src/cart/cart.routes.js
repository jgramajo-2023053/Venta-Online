import { Router } from 'express';
import { addToCart, getCart } from './cart.controller.js';
import { validateJwt, isClient } from '../../middlewares/validate.jwt.js';

const router = Router();

router.post('/add', [validateJwt, isClient], addToCart);
router.get('/view', [validateJwt, isClient], getCart);

export default router;