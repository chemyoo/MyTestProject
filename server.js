var http = require('http')
http.createServer(function(req,res){
	abc(res);
}).listen(3000,'127.0.0.1');
console.log('服务器已启动，时间：'+ (new Date()) + 'running at http://127.0.0.1');

var abc = function(res)
{
	var fs = require('fs')
	fs.readFile('D:/天天记事/Licence.txt','utf-8',function(error,data){
		if(error)
			throw error
		res.writeHead(200,{'Content-type':'text/plain'});
		console.log("文件读取成功"+data);
		res.write(data);
		res.end('Hello World SPL');
	});
}
