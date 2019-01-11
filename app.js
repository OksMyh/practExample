const express = require('express');
const app = express();
const path = require("path");
const expBars = require('express-handlebars');

app.use(express.static(path.join(__dirname, 'public', 'views')));

app.use(express.json());
app.use(express.urlencoded());

app.engine('.hbs', expBars({
    extname: '.hbs',
}));

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'public', 'views'));

const DataBase = require('./DataBase').getInstance();
DataBase.setModels();

const homePage = require('./controllers/homePage');
const register = require('./controllers/registerPage');
const login = require('./controllers/loginPage');
const regUser = require('./controllers/user/registerUser');
const logUser = require('./controllers/user/loginUser');
const delUser = require('./controllers/user/deleteUser');

app.get('/', homePage);
app.get('/login', login);
app.get('/register', register);

app.post('/reguser', regUser);
app.post('/loguser', logUser);
app.get('/delete/:id', delUser);

app.listen(5000, () => {
    console.log('Listen 5000...');
})
