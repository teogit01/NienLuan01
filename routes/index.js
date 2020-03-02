import express from 'express';
const router = express.Router();

import controller from '../controllers/index';
router.get('/',controller.index);
export default router;