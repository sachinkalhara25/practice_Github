const express = require('express');
const router = express.Router();

//Insert Model
const User = require('../Model/UserModel');

//Insert User Controller
const UserControllers = require('../Controllers/UserControllers');

//Get all users
router.get('/',UserControllers.getAllUsers);
router.post('/',UserControllers.addUsers);
router.get('/:id',UserControllers.getById);
router.put('/:id', UserControllers.updateUser);
router.delete('/:id', UserControllers.deleteUser);
module.exports = router;