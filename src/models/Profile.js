const { DataTypes } = require('sequelize');
const sequelize = require('../../database/database');

const Profile = sequelize.define('profile', {
	id: {
		type: DataTypes.BIGINT,
		primaryKey: true,
		autoIncrement: true,
	},
	userid: {
		type: DataTypes.BIGINT,
	},
	gender: {
		type: DataTypes.TEXT,
	},
	country: {
		type: DataTypes.TEXT,
	},
	language: {
		type: DataTypes.TEXT,
	},
}, {
    timestamps: false
});
module.exports = Profile;