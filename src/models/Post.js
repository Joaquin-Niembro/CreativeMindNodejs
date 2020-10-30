const { DataTypes } = require('sequelize');
const sequelize = require('../../database/database');
const Comment = require('./Comment');
const Post = sequelize.define(
	'post',
	{
		id: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			autoIncrement: true,
		},
		userid: {
			type: DataTypes.BIGINT,
		},
		title: {
			type: DataTypes.TEXT,
		},
		content: {
			type: DataTypes.TEXT,
		},
	},
	{
		timestamps: false,
	}
);
Post.hasMany(Comment, { foreignKey: 'postid', sourceKey: 'id' });
Comment.belongsTo(Post, { foreignKey: 'postid', sourceKey: 'id' });
module.exports = Post;
