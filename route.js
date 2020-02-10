
const express = require('express');
const router = express.Router();
const AuthController = require("./controllers/AuthController");
const UserController = require("./controllers/UserController");
const { checkJwt } = require("./middleware/auth");

router.post('/register', async(req, res, next) => {
    await AuthController.registerUser(req, res, next);
});

router.get('/activate/user/:id', async(req, res, next) => {
    await AuthController.activateUser(req, res, next);
});

router.post('/login', async(req, res, next) => {
    await AuthController.authenticateUser(req, res, next);
});

router.get('/users',[checkJwt], async(req, res, next) => {
    await UserController.index(req, res, next);
});

module.exports = router;