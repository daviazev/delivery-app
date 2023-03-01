const { Router } = require('express');
const { login, register } = require('../controllers/user.controller');

const { loginValidation } = require('../middlewares/login.middleware');
const { registerValidation } = require('../middlewares/register.middleware');
// const { validateJWT } = require('../auth/jwtFunctions');

const router = Router();

router.post('/login', loginValidation, login);
router.post('/register', registerValidation, register);

module.exports = router;
