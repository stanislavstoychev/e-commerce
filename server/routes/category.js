import express from "express"
import { requireSignin, isAdmin } from '../middlewares/auth.js';
//controllers
import {create, update, remove, list, read} from '../controllers/category.js';

const router = express.Router();

router.get('/category', list);
router.get('/category/:slug',  read);
router.post('/category', requireSignin, isAdmin, create);
//update 
router.put('/category/:categoryId', requireSignin, isAdmin, update);
router.delete('/category/:categoryId', requireSignin, isAdmin, remove);

export default router;