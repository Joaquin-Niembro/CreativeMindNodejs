const Comment = require('../models/Comment');
const Post = require('../models/Post');
const User = require('../models/User');
const { validationResult } = require('express-validator');
const createComment = async (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { postid, userid, content } = req.body;
		const postExists = await Post.findOne({
			where: {
				id: postid,
			},
		});
		const userExists = await User.findOne({
			where: {
				id: userid,
			},
		});
		if (!postExists || !userExists) {
			return res.json({ msg: 'post or user not found' });
		} else {
			const comment = await Comment.create(
				{
					postid,
					userid,
					content,
				},
				{
					fields: ['postid', 'userid', 'content'],
				}
			);
			res.json({ comment });
		}
	} catch (err) {
		res.status(500).json({ msg: 'server error' });
	}
};
const updateComment = async (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { content } = req.body;
		const { id } = req.params;

		const comment = await Comment.update(
			{
				content,
			},
			{
				where: {
					id,
				},
			}
		);
		res.json({ msg: 'comment updated' });
	} catch (err) {
		res.status(500).json({ msg: 'server error' });
	}
};
const deleteComment = async (req, res) => {
	try {
		const { id } = req.params;
		await Comment.destroy({
			where: {
				id,
			},
		});
		res.json({ msg: 'comment deleted' });
	} catch (err) {
		res.status(500).json({ msg: 'server error' });
	}
};
module.exports = { createComment, updateComment, deleteComment };
