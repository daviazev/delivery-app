const { Router } = require('express');
const { login, register, findByRole } = require('../controllers/user.controller');

const { loginValidation } = require('../middlewares/login.middleware');
const { registerValidation } = require('../middlewares/register.middleware');
const validateUser = require('../middlewares/user.middleware');

const router = Router();

router.post('/login', loginValidation, login);
router.post('/register', registerValidation, register);
router.get('/seller', validateUser, findByRole);

module.exports = router;
