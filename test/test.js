'use strict';

const dotenv = require('dotenv');
const path = require('path');
const { getPlaylist, getEPG } = require('../lib/get');
const { formatPlaylist } = require('../lib/format');
dotenv.config(path.join(__dirname, '..'));

describe('streamsforus', () => {
	it('get', async () => {
    const playlist = await getPlaylist(process.env.USERNAME, process.env.PASSWORD);
		console.log(formatPlaylist(playlist));
	});
});
