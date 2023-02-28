const  { Router } = require('express');
const { login } = require( "../controllers/user.controller");

const { loginValidation } = require('../middlewares/login.middleware')

const router = Router();

router.post('/login', loginValidation, login);

module.exports = router;

