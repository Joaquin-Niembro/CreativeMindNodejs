const express = require('express');
const router = express.Router();
const Authorization = require('../middlewares/Authorization');
const {
	getUsers,
	getOneUser,
	updateUser,
	createUser,
	deleteUser,
} = require('../controllers/UserController');
const { body } = require('express-validator');
///all
router.get('/', [Authorization], getUsers);
///get one
router.get('/:id', [Authorization], getOneUser);
router.post(
	'/',
	[
		Authorization,
		body('name')
			.isString()
			.withMessage('Name must be string')
			.isLength({ min: 3 }),
		body('lastname')
			.isString()
			.withMessage('Lastname must be string')
			.isLength({ min: 3 }),
		body('email').isEmail().withMessage('invalid E-Mail format'),
		body('password').isString().isLength({ min: 3, max: 15 }),
	],
	createUser
);
router.put(
	'/:id',
	[
		Authorization,
		body('name')
			.isString()
			.withMessage('Name must be string')
			.isLength({ min: 3 }),
		body('lastname')
			.isString()
			.withMessage('Lastname must be string')
			.isLength({ min: 3 }),
		body('email').isEmail().withMessage('invalid E-Mail format'),
		body('password').isString().isLength({ min: 3, max: 15 }),
	],
	updateUser
);
router.delete('/:id', [Authorization], deleteUser);
module.exports = router;
