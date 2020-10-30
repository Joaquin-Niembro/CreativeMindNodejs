const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const Authorization = require('../middlewares/Authorization');
const {
	createComment,
	updateComment,
	deleteComment,
} = require('../controllers/CommentController');
router.post(
	'/',
	[
		Authorization,
		body('postid').isNumeric(),
		body('userid').isNumeric(),
		body('content').isString().isLength({ min: 10 }),
	],
	createComment
);
router.put(
	'/:id',
	[Authorization, body('content').isString().isLength({ min: 10 })],
	updateComment
);
router.delete('/:id', deleteComment);
module.exports = router;
