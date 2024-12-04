import Router from 'express';
const router = new Router();

import createUser from '../Controllers/userController.js';




router.post('/create',createUser);

export default router;