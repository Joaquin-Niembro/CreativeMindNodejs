const bcrypt = require('bcryptjs');

const hashPassword = async (password) => {
	const salt = await bcrypt.genSalt(10);
	const hashed = await bcrypt.hash(password, salt);
	return hashed;
};
const hashCompare = async (passwrod, hash) =>{
    return await bcrypt.compare(passwrod, hash);
}
module.exports = {hashPassword, hashCompare};