'use strict';
const url = require('url');
const path = require('path');
const formatPlaylistItem = (v, i) => '#EXTINF:-1 tvg-name="' + v['tvg-name'].replace(/\s/g, '_') + '" tvg-logo="' + v['tvg-logo'] + '" tvg-chno="' + String(Number(i === 0 ? 0 : i || v['tvg-name'].match(/(?:^\d+|.*$)/g)[0])) + '" group-title="' + v['group-title'] + '",' + v['tvg-name'] + '\n' + v.url;

const formatPlaylist = (playlist) => {
  return '#EXTM3U\n' + playlist.map((v, i) => formatPlaylistItem(v, i)).join('\n');
};

Object.assign(module.exports, {
  formatPlaylistItem,
	formatPlaylist
});
