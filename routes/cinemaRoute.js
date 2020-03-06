import express from 'express';
import multer from 'multer';

import cinemaController from '../controllers/cinemaController';

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
router.get('/list',cinemaController.list);

//Them phim
router.get('/add',cinemaController.getAdd);
router.post('/add',
		upload.single('fposter'),
			cinemaController.postAdd);

export default router;