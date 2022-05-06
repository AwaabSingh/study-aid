import express from 'express';
import { regUser, logUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/', regUser);
router.post('/login', logUser)

export default router;