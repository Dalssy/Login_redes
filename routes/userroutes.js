const express = require('express');
const UserController = require('../controllers/UserController');
const User = require('../app/models/User');
// const { authorize } = require('../app/mildware/authMiddwalre'); 
const { verificarToken } = require('../app/middleware/auth');

const router = express.Router();
const controller = new UserController(User);
router.get('/',(req,res)=>controller.index(req,res));
router.get('/login',(req,res)=>controller.index(req,res));
router.get('/logout',(req,res)=>controller.logout(req,res));
router.get('/home',verificarToken,(req,res)=>controller.home(req,res));
router.get('/profile',verificarToken,(req,res)=>controller.profile(req,res));
router.post('/register',(req,res)=>controller.registrar(req,res));
router.post('/login',(req,res)=>controller.login(req,res));



module.exports = router;