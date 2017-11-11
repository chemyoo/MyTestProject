
if("${config.status}".trim()=="")
{
	$(".radios").eq(0).prop("checked",true);
}
if($("#passwd").val()!="")
{
	var passwd = $("#passwd");
	passwd.prop("hasval",true);
	passwd.attr("data-container","body");
	passwd.attr("data-toggle","popover");
	passwd.attr("data-placement","top");
	passwd.attr("data-content","双击修改密码");
	var i = 0;
	passwd.unbind('click').click(function(){
		if(passwd.prop("hasval"))
		{
			passwd.removeClass("banchar");
			$("[data-toggle='popover']").popover('destroy');
			$("[data-toggle='popover']").popover('show');
		}
		else
		{
			$("[data-toggle='popover']").popover('destroy');
			passwd.prop("hasval",false);
		}
	});
	passwd.unbind('blur').blur(function(){
		if(passwd.attr("hasval"))
		{
			passwd.removeClass("banchar");
		}
		$("[data-toggle='popover']").popover('destroy');
	});
	passwd.unbind('dblclick').dblclick(function(){
		passwd.val("");
		$("[data-toggle='popover']").popover('destroy');
		passwd.addClass("banchar");
		passwd.prop("hasval",false);
	});
}
$(".persistent").unbind('click').click(function(){
	//$(parent.$("#contentFrame")[0].contentDocument.body).find("#contentFrame")[0].contentWindow.sss();太繁琐的方法
	//console.log(data);
// 	var i = parent.layer.getFrameIndex(window.name);
// 	var from = parent.layer.getChildFrame("#form1", i);
// 	from.serializeArray().map(function(x){datas[x.name]=x.value;});
// 	console.log(datas);
// 	var datass = {};
	if($("#passwd").val().replace(/^\**/gi,"")=="")
	{
		$("#passwd").removeClass("banchar");
	}
	if(!$("#form1").valid()) 
		return;
	var data = {}; 
	var stcd = $("#stcd").val();
	data.stcd = $("#stcd").val();
	data.jsonArray = JSON.stringify(parent.contentFrame.contentFrame.getData());
	$('#form1').serializeArray().map(function(x){data[x.name]=x.value;});
	//console.log(data);
	var url= "videoconfig!doSave.action";
	$.ajax(
		{
			url:url,
			data:data,
			type:'post',
			async: false,
			dataType:'json',
			//traditional: true,  
			success:function(res)
			{
				//alert(res.result);
				if(res.result==1)
				{
					parent.contentFrame.contentFrame.location.replace("videoconfig!doQuery.action");
					var i = parent.layer.getFrameIndex(window.name);
					parent.layer.close(i);
				}
				else
				{
					$("#key").remove();
					layer.alert("系统出错，保存失败！");
				}
			},
		});
});
$(".cancle").unbind('click').click(function(){
	var i = parent.layer.getFrameIndex(window.name);
	parent.layer.close(i);
});
	var timer ;
	var cancelable = false;//按下不放开的第一次按下
	var oldkeycode = null;
	var oldlength = 0;
$("#passwd").unbind('keydown').keydown(function(event){
	var keycode = event.keyCode || event.which;
	var target=event.target||event.srcElement;
	if($(target).prop("hasval"))
	{
		return false;
	}
	if(keycode != 8 && oldkeycode == keycode && cancelable)
		return false;
	else
		oldkeycode = keycode;
	cancelable = true;
}).keyup(function(event){
	//console.log(event);
	cancelable = false;
	var pass = $(this);
	var keycode = event.keyCode || event.which;
	if(keycode == 8 || $(this).prop("hasval"))
	{
		oldlength = pass.val().length;
		return false;
	}
	clearTimeout(timer);
	var reg=/^\**/gi;
	pass.attr("data-container","body");
	pass.attr("data-toggle","popover");
	pass.attr("data-placement","top");
	pass.attr("data-content",pass.val().slice(-1));
	if(pass.val().replace(reg,"")!="")
	{
		$("[data-toggle='popover']").popover('destroy');
		if(oldlength<pass.val().length)
		{
			$("[data-toggle='popover']").popover('show');
			timer = setTimeout(function(){
				$("[data-toggle='popover']").popover('destroy');
			}, 1000);
		}
		oldlength = pass.val().length;
	}
});


$(document).ready(function()
  {
  $(".showbtn").click(function(){
    if( $("#box").height() == 0)
    {
    	 $("#box").animate({height:"150px"});
    	 $(".showbtn").text("关闭视频控制");
    }
    else
    {
    	$(".showbtn").text("打开视频控制");
    	$("#box").animate({height:"0px"});
    }
  });
});
var controlAreaInit = function()
{
	  $("#box").animate({height:"0px"});
	  $(".showbtn").text("").animate({height:"0px"});
	  $(".controlarea").stop(true,true).fadeOut(2000);
}
var showcontrolArea = function()
{
	$(".showbtn").animate({height:"20px"}).text("打开视频控制");
	$(".controlarea").stop(true,true).fadeIn(1000);
}