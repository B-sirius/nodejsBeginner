var http = require('http');
var url = require('url');

function start(route, handle) {
	function onRequest(request, response) {
		var postData = '';
		var pathname = url.parse(request.url).pathname; //url.parse —— url解析，返回一个url对象
		console.log('Resquest for ' + pathname + ' received.');

		request.setEncoding('utf8'); //设置接受编码的格式

		request.addListener('data', function(postDataChunk) { //注册data事件监听器
			postData += postDataChunk;
			console.log("Received POST data chunk '" + postDataChunk + "'.");
		});

		request.addListener('end', function() {
			route(handle, pathname, response, postData);
		});
	}

	http.createServer(onRequest).listen(8888);
	console.log('Server has started');
}

exports.start = start; //导出模块