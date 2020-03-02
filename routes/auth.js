import express from 'express';
const router = express.Router();

import controller from '../controllers/auth.controller';
router.get('/',controller.login);

export default router;