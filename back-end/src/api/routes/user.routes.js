const { Router } = require('express');
const { 
  login, 
  register, 
  findByRole, 
  getUsersController 
} = require('../controllers/user.controller');
const { validateJWT } = require('../auth/jwtFunctions');

const { loginValidation } = require('../middlewares/login.middleware');
const { 
    registerValidation, adminRegisterValidation,
} = require('../middlewares/register.middleware');
const validateUser = require('../middlewares/user.middleware');

const router = Router();

router.post('/login', loginValidation, login);
router.post('/register', registerValidation, register);
router.get('/seller', validateUser, findByRole);
router.post('/admin/manage', adminRegisterValidation, validateJWT, register);
router.get('/admin/manage', getUsersController);

module.exports = router;
