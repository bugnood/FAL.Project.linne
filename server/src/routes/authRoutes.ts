import { Router } from 'express';
import { login, register } from '../controllers/authController';

const router = Router();

// ログインエンドポイント
router.post('/login', login);

// ユーザー登録エンドポイント
router.post('/register', register);

export default router;