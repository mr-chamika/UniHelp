import Router from 'express';
const router = new Router();

import { createUser, checkUser, handleLogin, getUser, forgotPassword, updatePassword } from '../Controllers/userController.js';




router.post('/create', createUser);
router.post('/check', checkUser)
router.post('/islogin', handleLogin)
router.get('/get/:id', getUser)
router.post('/forgotpassword', forgotPassword)
router.post('/changepassword', updatePassword)

export default router;