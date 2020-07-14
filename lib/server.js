"use strict";

const express = require("express");
const get = require("./get");
const format = require("./format");
const chalk = require("chalk");
const getUA = (v) => {
  const headers = v.headers;
  return (
    headers["user-agent"] || headers["User-Agent"] || headers["User-agent"]
  );
};
const logRequest = (req) => {
  const ua = getUA(req);
  console.log(
    chalk.cyan.bold(req.connection.remoteAddress) +
      " " +
      chalk.yellow.bold(req.method) +
      " " +
      chalk.magenta.bold(req.url) +
      " " +
      chalk.bold(ua)
  );
};

const logMiddleware = (req, res, next) => {
  logRequest(req);
  next();
};

const createServer = ({ username, password }) => {
  const app = express();
  app.use(logMiddleware);
  app.get("/playlist", async (req, res) => {
    const playlist = await get.getPlaylist(username, password);
    res.end(format.formatPlaylist(playlist));
  });
  app.get("/guide", async (req, res) => {
    const guide = await get.getEPG(username, password);
    console.log(guide);
    res.end(guide);
  });
  return (...args) =>
    new Promise((resolve, reject) =>
      app.listen(...args.concat((err) => (err ? reject(err) : resolve())))
    );
};

module.exports = createServer;
