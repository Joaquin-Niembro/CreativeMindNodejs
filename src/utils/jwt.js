const jwt = require('jsonwebtoken');
function jwtGenerator(id) {
	const payload = {
		user: id,
	};
	return jwt.sign(payload, 'secret', {
		expiresIn: '1hr',
	});
}

module.exports = jwtGenerator;
