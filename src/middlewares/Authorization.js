const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
	try {
		const token = req.header('token');
		if (!token) {
			return res.json({ msg: 'Unauthorized' });
		} else {
			const payload = jwt.verify(token, 'secret');
			if (!payload) return res.json({ msg: 'Unauthorized' });

			req.userid = payload.user;

			next();
		}
	} catch (err) {
		console.error(err.message);
		return res.status(403).json({ msg: 'Unauthorized' });
	}
};
