const
	net = require('net'),
	response = require('node-res'),
	parser = require('http-string-parser');

const
	genReq = data => parser.parseRequest(data.toString()),
	genResString = ({ code, heads, body }) => `HTTP/1.1 ${code}\n${heads.join('\n')}\n\n${body}`,
	genRes = sock => opts => sock.end(genResString(opts)),
	genContrArgs = (data, sock) => [genReq(data), genRes(sock)],
	makeDataHandl = (contr, sock) => data => contr(...genContrArgs(data, sock)),
	makeSockHandl = contr => sock => sock.on('data', makeDataHandl(contr, sock));
	start = ( port, contr, cb ) => net.createServer(makeSockHandl(contr)).listen(port, null, cb);

module.exports = {
	start,
	genReq,
	genResString,
	genContrArgs,
	makeDataHandl,
	makeSockHandl,
};

