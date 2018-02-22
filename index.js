#!/bin/node

const { start } = require('./lib/httpServer')

const userDetailsController = (req, res) => {
	res({
		code: 200,
		heads: ['Content-Type: text/html'],
		body: `<style>h1{font-family: sans-serif;color: gray;width: 100%;line-height: 100vh;text-align: center;} strong{font-weight: bold; color: black;}</style><h1>User Details with <strong> id: ${req.match[1]}</strong></h1>`
	});
}

const defaultController = (req, res) => {
	res({
		code: 200,
		heads: ['Content-Type: text/html'],
		body: `<style>h1{font-family: sans-serif;color: gray;width: 100%;line-height: 100vh;text-align: center;} strong{font-weight: bold; color: black;}</style><h1>Home Page</strong></h1>`
	});
}

const controller = (req, res) => {
	const router = {
		'/users/([0-9]+)': userDetailsController,
		'/': defaultController,
	};
	const routeRegEx = Object.keys(router).find(x => req.uri.match(x));
	req.match = req.uri.match(routeRegEx);
	if (routeRegEx) {
		router[routeRegEx](req, res);
	}
}

start(4000, controller, () => console.log('started'));
