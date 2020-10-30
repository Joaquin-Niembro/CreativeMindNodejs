const express = require('express');
const router = express.Router();
const {
	getPosts,
	getOnePost,
	createPost,
	updatePost,
	deletePost,
	getComments,
} = require('../controllers/PostController');
const { body } = require('express-validator');

router.get('/', getPosts);
router.get('/comments', getComments);
router.get('/:id', getOnePost);
router.post(
	'/',
	[
		body('userid').isNumeric(),
		body('title').isString().isLength({ min: 5, max: 60 }),
		body('content').isString().isLength({ min: 10 }),
	],
	createPost
);
router.put(
	'/:id',
	[
		body('userid').isNumeric(),
		body('title').isString().isLength({ min: 5, max: 60 }),
		body('content').isString().isLength({ min: 10 }),
	],
	updatePost
);
router.delete('/:id', deletePost);
module.exports = router;
