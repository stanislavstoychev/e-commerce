import express from "express"
import { requireSignin, isAdmin } from '../middlewares/auth.js';

const router = express.Router();

//controllers
import { register, login, secret } from "../controllers/auth.js";

router.post('/register', register);
router.post('/login', login);
//included middleware check function
// - check for user token to make sure that user is log in
router.get('/auth-check',  requireSignin , (req, res) => {res.json({ ok: true})});
router.post('/secret',  requireSignin, isAdmin , secret);

export default router;