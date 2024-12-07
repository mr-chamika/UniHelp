import Router from 'express';
const router = new Router();

import { createUser, checkUser, handleLogin } from '../Controllers/userController.js';




router.post('/create', createUser);
router.post('/check', checkUser)
router.post('/islogin', handleLogin)

export default router;