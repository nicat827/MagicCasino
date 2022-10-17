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
router.post('/chat/sendMessage', userController.sendMessage);
router.post('/chat/banUser', userController.banUser);
router.post('/chat/unban', userController.unBanUser);
router.post('/registrate', userController.registrateVk);
router.post('/logout', userController.logout);
router.post('/logout/vk', userController.logoutVk);
router.post('/getUser/vk', userController.getUserVk);
router.post('/mines/start', userController.minesStart);
router.post('/mines/end', userController.minesEnd);
router.post('/mines/check', userController.minesCheck);
router.post('/mines/press', userController.minesPress);
router.post('/balance/deposit', userController.deposit);
router.post('/balance/withdraw', userController.withdraw);
router.post('/promo/create', userController.createPromo);
router.post('/changeNickname/vk', userController.changeNickname);
router.post('/promo/activate', userController.activatePromo)
router.get('/activate/:link', userController.activate);
router.post('/getBannedUsers/vk', userController.getBannedUsers);
router.post('/promo/get', userController.getPromoFromDb);
router.get('/chat/getMessage', userController.getMessage);
router.get('/users', authMiddleware,  userController.getUsers);

module.exports = router;