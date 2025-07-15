const express = require('express');

const UserController = require('../../controllers/user-controller');
const { AuthMiddlewares } = require('../../middlewares/index');

const router = express.Router();

router.post('/signup', AuthMiddlewares.validateUserAuth, UserController.create);
router.post('/signin', AuthMiddlewares.validateUserAuth, UserController.signIn);

router.get('/isAuthenticated', UserController.isAuthenticated);

module.exports = router;
