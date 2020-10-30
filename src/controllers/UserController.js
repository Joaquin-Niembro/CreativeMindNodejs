const User = require('../models/User');
const { validationResult } = require('express-validator');
const { hashPassword } = require('../utils/bcrypt');
const Profile = require('../models/Profile');
const getUsers = async (req, res) => {
	try {
		const users = await User.findAll({
			include: [
				{
					model: Profile,
				},
			],
		});
		res.json({ users });
	} catch (err) {
		res.status(500).json({ msg: 'server error' });
	}
};

const getOneUser = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findOne({
			where: {
				id,
			},
			include: [
				{
					model: Profile,
				},
			],
		});
		if (!user) {
			res.json({ msg: 'User not found' });
		} else {
			res.json({ user });
		}
	} catch (err) {
		res.status(500).json({ msg: 'server error' });
	}
};
const createUser = async (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { name, lastname, email, password } = req.body;
		const hashedPassword = await hashPassword(password);
		const alreadyExists = await User.findOne({
			where: {
				email,
			},
		});
		if (alreadyExists) {
			return res.json({ msg: 'user already exists' });
		} else {
			const user = await User.create(
				{
					name,
					lastname,
					email,
					password: hashedPassword,
				},
				{
					fields: ['name', 'lastname', 'email', 'password'],
				}
			);
			res.json({ user });
		}
	} catch (err) {
		res.status(500).json({ msg: 'server error' });
	}
};
const updateUser = async (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { name, lastname, email, password } = req.body;
		const { id } = req.params;
		const hashedPassword = await hashPassword(password);
		const alreadyExists = await User.findOne({
			where: {
				id,
			},
		});
		if (!alreadyExists) {
			return res.json({ msg: 'user does not exist' });
		} else {
			const user = await User.update(
				{
					name,
					lastname,
					email,
					password: hashedPassword,
				},
				{
					where: {
						id,
					},
				}
			);
			res.json({ 'updated user id: ': user });
		}
	} catch (err) {
		res.status(500).json({ msg: 'server error' });
	}
};
const deleteUser = async (req, res) => {
	try {
		const { id } = req.params;
		const userDeleted = await User.destroy({
			where: {
				id,
			},
		});
		if (!userDeleted) {
			res.json({ msg: 'user does not exist' });
		} else {
			res.json({ 'user deleted': userDeleted });
		}
	} catch (err) {
		res.status(500).json({ msg: 'server error' });
	}
};
module.exports = {
	getUsers,
	getOneUser,
	createUser,
	updateUser,
	deleteUser,
};
