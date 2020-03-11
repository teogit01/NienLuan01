import express from 'express';
//import validator from '../validators/validator.login';
const router = express.Router();

import controller from '../controllers/showtimeController';

router.get('/',controller.index);
router.get('/add',controller.getAdd);
//router.post('/',validator.login,controller.postLogin);

//search
router.post('/search',controller.postSearch)

// Set date
router.post('/getday',controller.getDay)
export default router;