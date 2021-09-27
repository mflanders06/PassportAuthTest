const express = require('express'),
    user = require('./user');
const cors = require('cors');
const passport = require('passport');
const passportlocal = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const session = require('express-session');
const massive = require('massive');
require ('dotenv').config();
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cors({
    origin: `http://localhost:3000`,
    credentials: true
}));


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));

app.use(cookieParser(process.env.SESSION_SECRET));

massive({
    connectionString: process.env.CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false,
    }
}).then(dbInstance => {
    app.set('db', dbInstance);
    console.log('Database Connected!')
}).catch(err => {
    console.log(err);
})


app.post('/login', user.login);
app.post('/register', user.register);

app.get('/user', (req, res) => {
    console.log(req.body);
});

app.listen(process.env.SERVER_PORT, () => console.log(`running on ${process.env.SERVER_PORT}`));