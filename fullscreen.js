 $(".fullpdf>span").click(function(){
    	var element = document.getElementById("content");
    	if($(this).hasClass("notfull"))
    	{
    		if(element!=null)
    		{
        		requestFullScreen(element,this);
    		}
    	}
    	else
    	{
    		exitFull(this);
    	}
    	//alert(checkFull());
});
 function requestFullScreen(element,that) {
	// 判断各种浏览器，找到正确的方法
	var fullScreenEnabled  = document.fullscreenEnabled || document.mozFullScreenEnabled ||document.webkitFullscreenEnabled || document.msFullscreenEnabled; 
	/* document.FullScreenEnabled || document.webkitFullscreenEnabled || 
	document.mozFullScreenEnabled || document.msFullscreenEnabled; */
	var requestMethod = element.requestFullScreen ||  element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullscreen; 
	if (fullScreenEnabled&&requestMethod) {
	    requestMethod.call(element);
	}
	else if (typeof window.ActiveXObject !== "undefined") {
		try
		{
			var wscript = new ActiveXObject("WScript.Shell");
			 if (wscript !== null) {
	             wscript.SendKeys("{F11}");
			 }
		}
		catch(e)
		{
			Showbo.Msg.alert('全屏显示失败，如果使用的是IE浏览器(或IE内核)，启用ActiveX可能解决该问题！');
	    	return false;
		}
	}
	else
	{
		Showbo.Msg.alert('全屏显示失败，如果使用的是IE浏览器(或IE内核)，启用ActiveX可能解决该问题！');
		return false;
	}
	$(that).text("退出全屏");
	$(that).removeClass("notfull");
	pdf.frameElement.style.height="100%";
	clearInterval(fullscreenTimerId);
	fullscreenTimerId = setInterval(checkFull,150);
}

//退出全屏 判断浏览器种类
function exitFull(that) {
    // 判断各种浏览器，找到正确的方法
var exitMethod = document.exitFullscreen || //W3C
document.mozCancelFullScreen ||    //Chrome等
document.webkitExitFullscreen || //FireFox
document.msExitFullscreen; //IE11
if (exitMethod) {
    exitMethod.call(document);
}
else if (typeof window.ActiveXObject !== "undefined") {//for Internet Explorer
    var wscript = new ActiveXObject("WScript.Shell");
    if (wscript !== null) {
        wscript.SendKeys("{F11}");
    }
}
 $(that).text("全屏显示");
 $(that).addClass("notfull");
 pdf.frameElement.style.height="450px";
}
function checkFull(){
	var isFull =  document.fullscreenEnabled || window.fullScreen || document.webkitIsFullScreen 
	|| document.msFullscreenElement!=null;
	//to fix : false || undefined == undefined
if(isFull === undefined)
	isFull = false;
if(!isFull)
{
	$(".fullpdf>span").text("全屏显示");
	$(".fullpdf>span").addClass("notfull");
 	pdf.frameElement.style.height="450px";
 	clearInterval(fullscreenTimerId);
 	var ttimer = setTimeout(function(){
 		var height = pdf.frameElement.style.height;
 		if(height!='450px')
 		{
   	 		$(".fullpdf>span").text("全屏显示");
    		$(".fullpdf>span").addClass("notfull");
       	 	pdf.frameElement.style.height="450px";
   	 		}
   	 	},300);
	}
}
//第二版
function requestFullScreen(element,that) {
	// 判断各种浏览器，找到正确的方法
	var fullScreenEnabled  = document.fullscreenEnabled || document.mozFullScreenEnabled ||document.webkitFullscreenEnabled || document.msFullscreenEnabled; 
	/* document.FullScreenEnabled || document.webkitFullscreenEnabled || 
	document.mozFullScreenEnabled || document.msFullscreenEnabled; */
	var requestMethod = element.requestFullScreen ||  element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullscreen; 
	if (fullScreenEnabled&&requestMethod) {
	    requestMethod.call(element);
	}
	else if (typeof window.ActiveXObject !== "undefined") {
		try
		{
			var wscript = new ActiveXObject("WScript.Shell");
			 if (wscript !== null) {
	             wscript.SendKeys("{F11}");
			 }
		}
		catch(e)
		{
			Showbo.Msg.alert('全屏显示失败，如果使用的是IE浏览器(或IE内核)，启用ActiveX可能解决该问题！');
	    	return false;
		}
	}
	else
	{
		Showbo.Msg.alert('全屏显示失败，如果使用的是IE浏览器(或IE内核)，启用ActiveX可能解决该问题！');
		return false;
	}
	$(that).text("退出全屏");
	$(that).removeClass("notfull");
	pdf.frameElement.style.height="100%";
	$("#flowSheet").css("height","100%");
	clearInterval(fullscreenTimerId);
	fullscreenTimerId = setInterval(checkFull,150);
}

//退出全屏 判断浏览器种类
function exitFull(that) {
    // 判断各种浏览器，找到正确的方法
var exitMethod = document.exitFullscreen || //W3C
document.mozCancelFullScreen ||    //Chrome等
document.webkitExitFullscreen || //FireFox
document.msExitFullscreen; //IE11
if (exitMethod) {
    exitMethod.call(document);
}
else if (typeof window.ActiveXObject !== "undefined") {//for Internet Explorer
    var wscript = new ActiveXObject("WScript.Shell");
    if (wscript !== null) {
        wscript.SendKeys("{F11}");
    }
}
 $(that).text("全屏显示");
 $(that).addClass("notfull");
 pdf.frameElement.style.height="450px";
 $("#flowSheet").css("height","450px");
}
function checkFull(){
	var isFull =  document.fullscreenEnabled || window.fullScreen || document.webkitIsFullScreen 
	|| document.msFullscreenElement!=null;
	//to fix : false || undefined == undefined
if(isFull === undefined)
	isFull = false;
if(!isFull)
{
	$(".fullpdf>span").text("全屏显示");
	$(".fullpdf>span").addClass("notfull");
	$(".sheet>span").text("全屏显示");
	$(".sheet>span").addClass("notfull");
 	pdf.frameElement.style.height="450px";
 	$("#flowSheet").css("height","450px");
 	clearInterval(fullscreenTimerId);
 	var ttimer = setTimeout(function(){
 		var height = pdf.frameElement.style.height;
 		if(height!='450px')
 		{
   	 		$(".fullpdf>span").text("全屏显示");
    		$(".fullpdf>span").addClass("notfull");
       	 	pdf.frameElement.style.height="450px";
   	 	}
   	 	},300);
	}
}