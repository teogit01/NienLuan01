import express from 'express';
import multer from 'multer';

import cinemaController from '../controllers/cinemaController';
import session from '../sessions/session';

const router = express.Router();
var storage = multer.diskStorage({
			destination:function(req, file, callback){
				callback(null,'public/images/posters');
			},
			filename:function(req,file,callback){
				callback(null,file.originalname);
			}
		});
var upload = multer({storage:storage});

router.get('/',cinemaController.index);
//Danh sach phim
router.get('/list',session.message,cinemaController.list);

//Them phim
router.get('/add',session.message,cinemaController.getAdd);
router.post('/add',
		upload.single('fposter'),
			cinemaController.postAdd);

router.get('/delete/:id',cinemaController.delete);

export default router;



