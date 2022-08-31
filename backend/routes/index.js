const router = require('express').Router();

const { loginValidator, createUserValidator } = require('../middlewares/validators');
const { login, createUser, signout } = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const NotFoundError = require('../errors/not-found-error');

router.post('/signin', loginValidator, login);
router.post('/signup', createUserValidator, createUser);

// Данный код нужен только для проверки восстановления работы сервера после падения
router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.use(auth);

router.get('/signout', signout);

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Некорректный путь'));
});

module.exports = router;
