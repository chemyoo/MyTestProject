/*!
 * Date: 2018-04-23
 * Author: jianqing.liu
 */
var XhrUtil = {
	createXhrObject : function(){
		var msxml_progid = ['MSXML2.XMLHTTP.6.0',
			'MSXML3.XMLHTTP','Microsoft.XMLHTTP',//不支持 readyState 3
			'MSXML2.XMLHTTP.3.0'//不支持 readyState 3
		];
		var XMLRequest = null;
		try{
			XMLRequest = new XMLHttpRequest();//标准方法创建
		} catch (e) {
			for(var i = 0, length = msxml_progid.length; i < length; i++){
				try{
					XMLRequest = new ActiveXObject(msxml_progid[i]);
				} catch (e) {
					//输出错误
					console.error(e);
				}
			}
			//输出错误
			console.error(e);
		} finally {
			if(XMLRequest){
				console.info("successfully to create XMLRequest!");
			}
			return XMLRequest;
		}
	}
}

