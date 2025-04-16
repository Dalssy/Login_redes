const express = require('express');
const UserController = require('../controllers/UserController');
const User = require('../models/user');
// const { authorize } = require('../app/mildware/authMiddwalre'); 
// const { verificarToken } = require('../app/middleware/auth');

const router = express.Router();
const controller = new UserController(User);
router.get('/',(req,res)=>controller.index(req,res));
// router.get('/login',(req,res)=>controller.index(req,res));
// router.get('/logout',(req,res)=>controller.logout(req,res));
router.get('/home',(req,res)=>controller.home(req,res));
// router.get('/profile',(req,res)=>controller.profile(req,res));
router.get('/registrar',(req,res)=>controller.show_form(req,res));
router.post('/register',(req,res)=>controller.registrar(req,res));
// router.post('/login',(req,res)=>controller.login(req,res));



module.exports = router;