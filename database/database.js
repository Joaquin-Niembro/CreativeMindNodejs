const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('postgres://evsvabraefodrx:8432794e87681cefd8f1ff7e8a04f19aef198588945b6f70651acf1312835396@ec2-52-44-235-121.compute-1.amazonaws.com:5432/d4gt59o7kkfi5n', {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
			require: true,
			rejectUnauthorized: false 
		  }
    }
});

const connection = async () => {
	try {
		await sequelize.authenticate();
		console.log('DB CONNECTED!');
	} catch (err) {
		console.log(err);
	}
};
connection();
module.exports = sequelize;