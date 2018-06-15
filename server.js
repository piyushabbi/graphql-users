const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const config = require('./config');

const app = express();

const port = config.port || 4000;

app.listen(port, () => {
	console.log(`Server Running on Port ${port}.`);
});
