/**
 * 自动预警和人工上报
 * @author chemyoo
 * @date 2016-11-25
 * @version 1.0
 */
(function($)
{
	var count=0;
	var extend=$.fn.extend(
		{
			dataList:function(setting)
			{
				data=[{CD: 1,DUTY_CONTENT: "展开救援指导工作",FLOOD_CD: "F1",NM: "内涝应急抢险领导小组"},
				{CD: 2,DUTY_CONTENT: "展开救援指导工作",FLOOD_CD: "F2",NM: "内涝应急抢险领导小组"},
				{CD: 3,DUTY_CONTENT: "展开救援指导工作",FLOOD_CD: "F3",NM: "内涝应急抢险领导小组"},
				{CD: 4,DUTY_CONTENT: "展开救援指导工作",FLOOD_CD: "F4",NM: "内涝应急抢险领导小组"},
				{CD: 5,DUTY_CONTENT: "展开救援指导工作",FLOOD_CD: "F5",NM: "内涝应急抢险领导小组"},
				{CD: 6,DUTY_CONTENT: "展开救援指导工作",FLOOD_CD: "F6",NM: "内涝应急抢险领导小组"},
				{CD: 7,DUTY_CONTENT: "展开救援指导工作",FLOOD_CD: "F7",NM: "内涝应急抢险领导小组"}];
				var defaults = {url:'',data:data};
				var options = $.extend({},defaults, setting);//将一个空对象做为第一个参数,
				//这样做的好处是所有值被合并到这个空对象上，保护了插件里面的默认值。
				//alert(time);
				extend.clearTime(options,this);
			},
			clearTime:function(options,that)
			{
				//alert("清除定时器:"+time);
				var s="";
				var n=0;
				$.each(options.data,function(index) 
				{
//					var that=this;
//					for(var key in that)
//					{
//					    s+="key="+key+",value="+that[key]+"; ";
//					}
					$.each(this,function(index,value) 
					{
						s+="key="+index+",value="+value+"; ";
					});
					s+="\r\n"
					n=index+1;
				});
				console.log(s+"\r\n"+n+"\r\n数据长度："+options.data.length);
				console.log($(that));
			},
			countTimes:function()
			{
				if(this.get(0).tagName.toLowerCase()!='table')
					return;
				$.each(this,function(index,value) 
				{
					var time=$(value).prop("timers");
					clearInterval($(value).prop("timers"));
					$("a").css("cursor","pointer");$("aa").css("cursor","pointer");
					time=setInterval(function(){count++;$(value).next().html("函数执行次数:"+count);},1000);
					$(value).prop("timer",true);$(value).prop("timers",time);
				});
			},
			clearCount:function()
			{
//				var domObj;
//				try
//				{
//					domObj=dom.get(0);
//				}
//				catch(e)
//				{
//					domObj=document.getElementById(dom)||$(dom).get(0);
//				}
//				if(this.get(0).tagName.toLowerCase()=='table'&&$(domObj).is(this)&&this.prop("timer"))
//				{
					//var str=time;
					clearInterval(this.prop("timers"));
					//str+="\n"+count;
//				}
				//alert(str+"\n"+time);
			}
		});
})(jQuery);//自定义方法扩展