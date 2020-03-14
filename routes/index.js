import express from 'express';
const router = express.Router();

import controller from '../controllers/index';
router.get('/',controller.index);

// addRoom
router.get('/addroom',controller.addRoom)
router.post('/addroom',controller.postaddRoom)
export default router;