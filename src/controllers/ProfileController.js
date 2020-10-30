const Profile = require('../models/Profile');
const User = require('../models/User');
const { validationResult } = require('express-validator');

const createProfile = async (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { userid, gender, country, language } = req.body;
		const userExists = await User.findOne({
			where: {
				id: userid,
			},
		});
		if (!userExists) {
			return res.json({ msg: 'user does not exist' });
		} else {
			const profile = await Profile.create(
				{
					userid,
					gender,
					country,
					language,
				},
				{
					fields: ['userid', 'gender', 'country', 'language'],
				}
			);
			res.json({ profile });
		}
	} catch (err) {
		res.status(500).json({ msg: 'server error' });
	}
};
const updateProfile = async (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { userid, gender, country, language } = req.body;
		const { id } = req.params;
		const profileExists = await Profile.findOne({
			where: {
				id,
			},
		});
		if (!profileExists) {
			return res.json({ msg: 'profile not foound' });
		} else {
			const userExists = await User.findOne({
				where: {
					id: userid,
				},
			});
			if (!userExists) {
				return res.json({ msg: 'user does not exist' });
			} else {
				await Profile.update(
					{
						userid,
						gender,
						country,
						language,
					},
					{
						where: {
							id,
						},
					}
				);
				res.json({ msg: 'profile has been updated' });
			}
		}
	} catch (err) {
		res.status(500).json({ msg: 'server error' });
	}
};
const deleteProfile = async (req, res) => {
	try {
		const { id } = req.params;
		await Profile.destroy({
			where: {
				id,
			},
		});
		res.json({ msg: 'profile deleted' });
	} catch (err) {
		res.status(500).json({ msg: 'server error' });
	}
};
module.exports = {
	createProfile,
	updateProfile,
	deleteProfile,
};
