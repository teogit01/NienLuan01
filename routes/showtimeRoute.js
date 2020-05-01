import express from 'express';
import session from '../sessions/session'
import loaclStorage from '../localStorage/data'

//import validator from '../validators/validator.login';
const router = express.Router();

import controller from '../controllers/showtimeController';

router.get('/',controller.index)
router.get('/add/',session.message,controller.getAdd)
router.post('/add/',controller.postAdd)
router.post('/getidschedule/',controller.getIdSchedule)
router.post('/setDay/',controller.setDay)
//router.post('/',validator.login,controller.postLogin);

//search
router.post('/search/',controller.postSearch)

// Set Date
router.post('/getday/',controller.getDay)
// Set Action
router.post('/setActive/',controller.setActive)
// Set time start
router.post('/timestart/',controller.setTimeStart)
export default router;