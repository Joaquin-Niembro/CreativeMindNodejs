const { DataTypes } = require('sequelize');
const sequelize = require('../../database/database');

const Comment = sequelize.define(
	'comment',
	{
		id: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			autoIncrement: true,
		},
		postid: {
			type: DataTypes.BIGINT,
		},
		userid: {
			type: DataTypes.BIGINT,
		},
		content: {
			type: DataTypes.TEXT,
		},
	},
	{
		timestamps: false,
	}
);
module.exports = Comment;
