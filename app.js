require('dotenv').config();
const express = require('express');
const createError = require('http-errors');
const logger = require('morgan');
const path = require('path');

const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const indexRouter = require('./routes/index.router');
const registerRouter = require('./routes/register.router');
const loginRouter = require('./routes/login.router');
const logoutRouter = require('./routes/logout.router');
// const userRouter = require('./routes/user.router');
// const itemRouter = require('./routes/item.router');
// const changeRouter = require('./routes/change.router');
const { addToLocals, checkUser } = require('./middleware/allmid');

const app = express();
const PORT = process.env.MAIN_PORT || 3000;

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const sessionConfig = {
    name: 'cookieName',
    secret: 'keyboard cat',
    store: new FileStore(),
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1e3 * 86400, // COOKIE'S LIFETIME — 1 DAY
    },
    resave: false,
    saveUninitialized: false,
};

app.use(session(sessionConfig));

app.use(addToLocals);
app.use('/', indexRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
// app.use('/user', checkUser, userRouter);
// app.use('/item', checkUser, itemRouter);
// app.use('/change', checkUser, changeRouter);

// Если HTTP-запрос дошёл до этой строчки, значит ни один из ранее встречаемых рутов не ответил на запрос. Это значит, что искомого раздела просто нет на сайте. Для таких ситуаций используется код ошибки 404. Создаём небольшое middleware, которое генерирует соответствующую ошибку.
app.use((req, res, next) => {
    const error = createError(404, '404, Запрашиваемой страницы не существует на сервере.');
    next(error);
});

app.listen(PORT, () => {
    console.log(`server started PORT: ${PORT}`);
});
