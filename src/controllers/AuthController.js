const User = require('../models/User');
const jwtGenerator = require('../utils/jwt');
const { hashCompare } = require('../utils/bcrypt');
const { validationResult } = require('express-validator');
const signin = async (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { email, password } = req.body;
		const user = await User.findOne({
			where: {
				email,
			},
		});
		if (!user) {
			return res.json({ msg: 'user or password is invalid' });
		} else {
			const hash = user.password;
			const compare = await hashCompare(password, hash);
			if (!compare) {
				return res.json({ message: 'user or password is invalid' });
			} else {
				const token = await jwtGenerator(user.id);
				res.json({ token });
			}
		}
	} catch (err) {
		res.status(500).json({ msg: 'server error' });
	}
};
const isVerified = (req, res) => {
	try {
		res.json(true)
	} catch (err) {
		res.status(500).json({ msg: 'server error' });
	}
};
module.exports = {
	signin,
	isVerified,
};
