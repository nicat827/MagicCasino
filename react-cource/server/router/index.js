const userController = require('../controllers/user-controller');

const Router = require('express').Router;

const router = new Router();
const {body} = require('express-validator')
const authMiddleware = require('../middlewares/auth-middleware')

router.post('/registration',
body('email').isEmail(),
body('password').isLength({min:5, max:25}),
userController.registration);
router.post('/login', userController.login);
router.post('/sendMessage', userController.sendMessage);
router.post('/registrate', userController.registrateVk);
router.post('/logout', userController.logout);
router.post('/logout/vk', userController.logoutVk);
router.get('/activate/:link', userController.activate);
router.get('/getMessage', userController.getMessage);
router.post('/getUser/vk', userController.getUserVk);
router.get('/users', authMiddleware,  userController.getUsers);

module.exports = router;