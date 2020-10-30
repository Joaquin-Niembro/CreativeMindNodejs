const { DataTypes } = require('sequelize');
const sequelize = require('../../database/database');
const Profile = require('./Profile');
const Post = require('./Post');
const Comment = require('./Comment');
const User = sequelize.define(
	'user',
	{
		id: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.TEXT,
		},
		lastname: {
			type: DataTypes.TEXT,
		},
		email: {
			type: DataTypes.TEXT,
			unique: true,
		},
		password: {
			type: DataTypes.TEXT,
		},
	},
	{
		timestamps: false,
	}
);
User.hasOne(Profile, { foreignKey: 'userid', sourceKey: 'id' });
Profile.belongsTo(User, { foreignKey: 'userid', sourceKey: 'id' });
User.hasMany(Post, { foreignKey: 'userid', sourceKey: 'id' });
Post.belongsTo(User, { foreignKey: 'userid', sourceKey: 'id' });
User.hasMany(Comment, { foreignKey: 'userid', sourceKey: 'id' });
Comment.belongsTo(User, { foreignKey: 'userid', sourceKey: 'id' });
module.exports = User;
