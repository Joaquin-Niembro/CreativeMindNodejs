const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');
const { validationResult } = require('express-validator');
const getPosts = async (req, res) => {
	try {
		const posts = await Post.findAll({
			include: [
				{
					model: User,
				},
				{
					model: Comment,
				},
			],
		});

		res.json({ posts });
	} catch (err) {
		res.status(500).json({ msg: 'server error' });
	}
};
const getOnePost = async (req, res) => {
	try {
		const { id } = req.params;
		const post = await Post.findOne({
			where: {
				id,
			},
			include: [
				{
					model: User,
				},
				{
					model: Comment,
				},
			],
		});
		if (!post) {
			return res.json({ msg: 'post not found' });
		} else {
			res.json({ post });
		}
	} catch (err) {
		res.status(500).json({ msg: 'server error' });
	}
};
const createPost = async (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { userid, title, content } = req.body;
		const userExists = await User.findOne({
			where: {
				id: userid,
			},
		});
		if (!userExists) {
			return res.json({ msg: 'user does not exist' });
		} else {
			const post = await Post.create(
				{
					userid,
					title,
					content,
				},
				{
					fields: ['userid', 'title', 'content'],
				}
			);
			res.json({ msg: 'post created', post });
		}
	} catch (err) {
		res.status(500).json({ msg: 'server error' });
	}
};
const updatePost = async (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { userid, title, content } = req.body;
		const { id } = req.params;
		const userExists = await User.findOne({
			where: {
				id: userid,
			},
		});
		if (!userExists) {
			return res.json({ msg: 'user does not exist' });
		} else {
			await Post.update(
				{
					userid,
					title,
					content,
				},
				{
					where: {
						id,
					},
				}
			);
			res.json({ msg: 'post updated' });
		}
	} catch (err) {
		res.status(500).json({ msg: 'server error' });
	}
};
const deletePost = async (req, res) => {
	try {
		const { id } = req.params;
		await Post.destroy({
			where: {
				id,
			},
		});
		res.json({ msg: 'post have been deleted' });
	} catch (err) {
		res.status(500).json({ msg: 'server error' });
	}
};
const getComments = async (req, res) => {
	try {
		const postComments = await Post.findAll({
			include: [
				{
					model: Comment,
				},
			],
		});
		res.json({ postComments });
	} catch (err) {
		res.status(500).json({ msg: 'server error' });
	}
};
module.exports = {
	getPosts,
	getOnePost,
	createPost,
	updatePost,
	deletePost,
	getComments,
};
