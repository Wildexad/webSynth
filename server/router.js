const RouterClass = require('express').Router;

const { checkAuth } = require('./users');
const Instruments = require("./instruments.js");
const Users = require("./users.js");
const Songs = require("./songs.js");
const mainRouter = new RouterClass();

// Users
mainRouter.get('/user/list', Users.getAllUsers);
mainRouter.post('/user/register', Users.register);
mainRouter.post('/user/login', Users.login);
mainRouter.post('/user/refresh-token', Users.refreshToken);
mainRouter.get('/user/logout', checkAuth, Users.logout);
mainRouter.get('/user/info', checkAuth, Users.getUserById);

// Instruments
mainRouter.get('/instruments', checkAuth, Instruments.List);
mainRouter.post('/instruments', checkAuth, Instruments.Add);
mainRouter.delete('/instruments', checkAuth, Instruments.Delete);
mainRouter.put('/instruments', checkAuth, Instruments.Update);

// Songs
mainRouter.get('/songs', checkAuth, Songs.List);
mainRouter.post('/songs', checkAuth, Songs.Add);
mainRouter.delete('/songs', checkAuth, Songs.Delete);
mainRouter.put('/songs', checkAuth, Songs.Update);

module.exports.mainRouter = mainRouter