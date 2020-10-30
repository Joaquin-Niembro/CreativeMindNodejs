const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const Authorization = require('../middlewares/Authorization');
const {
	createProfile,
	updateProfile,
	deleteProfile,
} = require('../controllers/ProfileController');

router.post(
	'/',
	[
		Authorization,
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
		Authorization,
		body('userid').isNumeric(),
		body('gender').isString().isLength({ min: 3, max: 10 }),
		body('country').isString().isLength({ min: 3 }),
		body('language').isString().isLength({ min: 3 }),
	],
	updateProfile
);
router.delete('/:id', [Authorization], deleteProfile);
module.exports = router;
