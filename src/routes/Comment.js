const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
	createComment,
	updateComment,
	deleteComment,
} = require('../controllers/CommentController');
router.post(
	'/',
	[
		body('postid').isNumeric(),
		body('userid').isNumeric(),
		body('content').isString().isLength({ min: 10 }),
	],
	createComment
);
router.put(
	'/:id',
	[body('content').isString().isLength({ min: 10 })],
	updateComment
);
router.delete('/:id', deleteComment);
module.exports = router;
