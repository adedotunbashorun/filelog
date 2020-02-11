
const express = require('express');
const router = express.Router();
const AuthController = require("./controllers/AuthController");
const UserController = require("./controllers/UserController");
const { checkJwt, isValidUser } = require("./middleware/auth");

router.post('/register', (req, res, next) => {
    AuthController.registerUser(req, res, next);
});

router.get('/activate/user/:id', (req, res, next) => {
    AuthController.activateUser(req, res, next);
});

router.post('/login', (req, res, next) => {
    AuthController.authenticateUser(req, res, next);
});

router.get('/users',[checkJwt], (req, res, next) => {
    UserController.index(req, res, next);
});

module.exports = router;
