'use strict';

const axios = require('axios');
const querystring = require('query-string');
const url = require('url');
const htmlparser2 = require('htmlparser2');
const chunk = require('lodash/chunk');

const getPlaylist = async (username, password) => {
  const response = await axios.get(url.format({
    protocol: 'http:',
    hostname: 'its.streamsforus.net',
    port: 8000,
    pathname: '/get.php'
	}) + '?' + querystring.stringify({ username: username, password: password, type: 'm3u_plus', output: 'ts' }))
   const chunked = chunk(response.data.split(/(?:\r)*\n/).filter(Boolean).slice(1), 2);
	 const entries = chunked.map(([ attributes, url ]) => {
		 const commasplit = attributes.split(',');
		 const [ prop ] = commasplit.splice(commasplit.length - 1, 1);
		 const [ xml ] = htmlparser2.parseDOM('<a ' + commasplit.join(',') + '>');
		 return Object.assign({
       prop,
			 url,
		 }, xml.attribs);
	 });
	return entries;
};
const ln = (v) => ((console.log(v)), v);

const getEPG = async (username, password) => {
  const response = await axios.get(ln(url.format({
    protocol: 'http:',
    hostname: 'its.streamsforus.net',
    port: 8000,
    pathname: '/xmltv.php'
	}) + '?' + querystring.stringify({ username: username, password: password  })));
  return response.data;
};

Object.assign(module.exports, {
  getPlaylist,
	getEPG
});
