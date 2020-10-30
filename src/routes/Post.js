const express = require('express');
const router = express.Router();
const Authorization = require('../middlewares/Authorization');
const {
	getPosts,
	getOnePost,
	createPost,
	updatePost,
	deletePost,
	getComments,
} = require('../controllers/PostController');
const { body } = require('express-validator');

router.get('/', [Authorization], getPosts);
router.get('/comments', [Authorization], getComments);
router.get('/:id', [Authorization], getOnePost);
router.post(
	'/',
	[
		Authorization,
		body('userid').isNumeric(),
		body('title').isString().isLength({ min: 5, max: 60 }),
		body('content').isString().isLength({ min: 10 }),
	],
	createPost
);
router.put(
	'/:id',
	[
		Authorization,
		body('userid').isNumeric(),
		body('title').isString().isLength({ min: 5, max: 60 }),
		body('content').isString().isLength({ min: 10 }),
	],
	updatePost
);
router.delete('/:id', [Authorization], deletePost);
module.exports = router;
