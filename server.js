const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const db = require('./database/conexion');
const appRoutes = require('./routes/userroutes');
// const productsRoutes = require('./routes/products');

const User = require('./models/user');
// const Products = require('./app/models/Products');


const app = express();
//Donde cargar archivos staticos
app.use(express.static('public'));
//habilitar ejs
app.set("view engine","ejs");
const PORT = 8082;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
db.authenticate()
  .then(() => console.log('Conexión a la base de datos establecida correctamente.'))
  .catch((error) => console.error('Error al conectar a la base de datos:', error));

  
User.sync();
// Products.sync();


app.use('/',appRoutes);
// app.use('/products',productsRoutes);


app.listen(PORT, () => {
  console.log(` Servidor corriendo en http://localhost:${PORT}`);
});