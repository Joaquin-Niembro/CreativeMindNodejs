const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
	createProfile,
	updateProfile,
	deleteProfile,
} = require('../controllers/ProfileController');

router.post(
	'/',
	[
		body('userid').isNumeric(),
		body('gender').isString().isLength({ min: 3, max: 10 }),
		body('country').isString().isLength({ min: 3 }),
		body('language').isString().isLength({ min: 3 }),
	],
	createProfile
);
router.put(
	'/:id',
	[
		body('userid').isNumeric(),
		body('gender').isString().isLength({ min: 3, max: 10 }),
		body('country').isString().isLength({ min: 3 }),
		body('language').isString().isLength({ min: 3 }),
	],
	updateProfile
);
router.delete('/:id', deleteProfile);
module.exports = router;
