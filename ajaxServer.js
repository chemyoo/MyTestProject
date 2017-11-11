/**
 * @author chemyoo
 * @since 2017-05-31
 * @version 1.0
 * @see 此插件依赖于Jquery插件包，使用前请引用jquery
 */
jQuery.extend
({
	ajaxGetData:function(options,callback,completedfn)
	{
		var defaults = {url:'',data:{},async:true,traditional:false,timer:false,timeout:10*1000};
		var initParams = $.extend({},defaults, options);
		this.completed = true;
		this.timer = initParams.timer;
		this.time = null;
		clearInterval(this.time);//重新设置定时器
		function ajaxGetData(that)
		{
			if(that.completed)
			{
				that.completed = false;
				$.ajax({
					type:"post",
					url:initParams['url'],
					async:initParams.async,
					traditional:initParams.traditional,
					data:initParams.data,
					dataType:'json',
					timeout : initParams.timeout,
					success:function(data)
					{
						that.completed=true;
						typeof callback == 'function' ? callback(data) : "";
					},
					error:function (XMLHttpRequest, textStatus, errorThrown)
					{
						console.log(textStatus+"-->"+errorThrown.message);
					},
					complete:function(XMLHttpRequest, textStatus, errorThrown)
					{
						that.completed=true;
						typeof completedfn == 'function' ? completedfn(textStatus) : "";
					}
				});
			}
		}
		ajaxGetData(this);
		if(this.timer)
		{
			this.time = setInterval(ajaxGetData,initParams.timeout+1);
		}
	}
});