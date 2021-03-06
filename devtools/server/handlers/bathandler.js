

var FS = require('fs');
var Path = require('path');
var Process = require('child_process');
var HttpUtility = require('../webserver/httputility');

exports.processRequest = function (context) {
	var p = Process.execFile(context.request.physicalPath, [], {cwd: Path.dirname(context.request.physicalPath)});

	context.response.contentType = 'text/html;charset=utf-8';
	context.response.bufferOutput = false;
	context.response.write('<!doctype html>\
		<html>\
		<head>\
		<title>正在执行 ');

	context.response.write(HttpUtility.htmlEncode(context.request.physicalPath));

	context.response.write('</title>\
		</head>\
		<body>');

	context.response.write('<pre>');

	p.stdout.on('data', function(data){
		context.response.write('<span style="color:#999">');
		context.response.write(data);
		context.response.write('</span>');
	});

	p.stderr.on('data',  function(data){
		context.response.write('<span style="color:red">');
		context.response.write(data);
		context.response.write('</span>');
	});

	p.on('exit', function(code){
		context.response.write('<p><strong>执行完毕!</strong></p>');
		context.response.write('<script>document.title=document.title.replace("正在执行", "执行完毕：")</script>');
		context.response.write('</pre></body></html>');

		context.response.end();
	});
	
	return true;
};
