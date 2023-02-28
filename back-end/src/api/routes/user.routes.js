const { Router } = require('express');
const { login } = require('../controllers/user.controller');

const { loginValidation } = require('../middlewares/login.middleware');
// const { validateJWT } = require('../auth/jwtFunctions');

const router = Router();

router.post('/login', loginValidation, login);

module.exports = router;
