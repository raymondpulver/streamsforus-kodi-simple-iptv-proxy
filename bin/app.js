'use strict';

const chalk = require('chalk');

const dotenv = require('dotenv');
const path = require('path');
const createServer = require('../lib/server');

(async () => {
	dotenv.config(path.join(__dirname, '..'));
	const { USERNAME, PASSWORD, PORT, HOST } = process.env;
	const username = USERNAME;
	const serve = createServer({
		username,
		password: PASSWORD
	});
	const port = PORT || '8080';
	const host = HOST || '0.0.0.0';
	await serve(port, host)
	console.log(chalk.cyan.bold('BOUND: ') + chalk.bold('[' + host + ':' + port + ']'));
})().catch((err) => console.error(err));
