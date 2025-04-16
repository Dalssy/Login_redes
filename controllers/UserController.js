const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { use } = require('../routes/userroutes');

class UserController {
    async index(req, res) {

        const users = await User.findAll({
            order:[['createdAt','DESC']],   
        });
        res.render('home',{users});

       
    }

    async registrar1(req, res) {
        // try {
        //   const { username, password, email } = req.body;
        let username = 'testUser'
        let password = 'password'
        let email = 'test@user.com'

        const usuarioExistente = await User.findOne({ where: { email } });
        //   console.log(usuarioExistente);
        if (usuarioExistente) {
            return res.status(400).json({ error: 'El correo ya está registrado' });
        }

        const hashedContraseña = await bcrypt.hash(password, 10);
        //   console.log(hashedContraseña);

        const nuevoUsuario = await User.create({ username, email, password: hashedContraseña });
        //   console.log(nuevoUsuario);
        const token = jwt.sign({ usuarioId: nuevoUsuario.id }, 'tu_secreto', { expiresIn: '1h' }); // Deberías usar una clave secreta más segura en producción


        res.json({ token });
        // } catch (error) {
        //   res.status(500).json({ error: 'Error al registrar el usuario',
        // message:error });
        // }
    }

    async registrar(req,res){
        try {
            await User.create(req.body);
            res.redirect('/registrar')
        } catch (error) {
            res.send('Error al guardar' + error)
        }
    }
    async login(req, res) {
        try {
            const { username, password } = req.body;

            const user = await User.findOne({ where: { username } });
            // console.log(user);
            if (!user) {
                // return res.status(401).json({ error: 'Credenciales inválidas' });
                // return res.redirect('/login?mensaje=Credenciales%20inv%C3%A1lidas');
                res.render('login', {
                    message: 'Credenciales Invalidas'
                });
            }

            const passwordValida = await bcrypt.compare(password, user.password);
            if (!passwordValida) {
                // return res.status(401).json({ error: 'Credenciales inválidas' });
                // return res.redirect('/login?mensaje=Credenciales%20inv%C3%A1lidas');
                res.render('login', {
                    message: 'Credenciales Invalidas'
                });

            }

            // Genera un token de acceso con expiración de 1 hora (3600 segundos)
            const token = jwt.sign({ usuarioId: user.id }, 'tu_secreto', { expiresIn: '1h' }); // Deberías usar una clave secreta más segura en producción

            // Devuelve el token
            // res.json({ token });
            res.cookie('username', username);
            res.cookie('token', token);
            res.redirect('/home');
        } catch (error) {
            // res.status(500).json({ error: 'Error en el inicio de sesión' });
            // return res.redirect('/login?mensaje=Error%20en%20el%20inicio%20de%20sesi%C3%B3n');
            res.render('login', {
                message: 'Error en el inicio de sesión'
            });
        }

    }

    async show_form(req,res){
        try {
            const users = await User.findAll({
                order:[['createdAt','DESC']],   
            });
            res.render('registrar',{users});
            // res.render('registrar');
        } catch (error) {
            
        }
    }

    async logout(req, res) {
        try {
            res.clearCookie('username');
            res.clearCookie('token');
            res.redirect('/login');
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error en el cierre de sesión' });
        }
    }
    async home(req, res) {

        const token = req.cookies.token;
        const username = req.cookies.username;

        if (token) {
            // Si el usuario está autenticado, renderiza la página de inicio.
            res.render('home', { user: username ,message:'Login successful'});
        } else {
            // Si el usuario no está autenticado, redirígelos a la página de inicio de sesión.
            res.redirect('/login');
        }
    }

    async profile(req, res) {
        try {
            const username = req.cookies.username;
            const user = await User.findOne({ where: { username } });
    
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
    
            // Deshashear la contraseña si es necesario
            // En este ejemplo, suponemos que la contraseña está hasheada
            const hashedPassword = user.password;
            console.log(hashedPassword);
            const decryptedPassword = await bcrypt.compare(hashedPassword, user.password);
    
            res.render('profile', { user: { 
                username: user.username, 
                email: user.email,
                password : user.password,
                // Mandar la contraseña deshasheada a la vista
                passwordcrypt: decryptedPassword 
            }});
        } catch (error) {
            console.error('Error al obtener el perfil del usuario:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
}

module.exports = UserController;
