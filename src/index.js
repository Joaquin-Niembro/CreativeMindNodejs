const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
///initializatiions
require('../database/database');
const app = express();
const PORT = process.env.PORT || 5000;
//middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
///routes
app.use('/api', require('./routes/Auth'));
app.use('/api/users', require('./routes/User'));
app.use('/api/posts', require('./routes/Post'));
app.use('/api/profiles', require('./routes/Profile'));
app.use('/api/comments', require('./routes/Comment'));
///server
app.listen(PORT, () => {
	console.log(`server on port ${PORT}`);
});
