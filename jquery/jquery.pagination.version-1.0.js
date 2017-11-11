/**
 * @author 刘建青
 * @date 2016-11-25
 * @version 1.0
 * jq分页插件
 * @param 
 * @param rows 当前页面要显示的记录条数
 * @param total 总记录条数
 * @param currentpage 当前页码
 */
var currentpage=1;
var pagetoolbar=undefined;
(function($)
{
	$.fn.extend(
	{
		/**
		 *  @author 刘建青
		 *@date 2016-11-25
		 * @version 1.0
		 * @param {Object} rows
		 * @param {Object} total
		 * @param {Object} currentpage
		 */
		pagination:function(setting)
		{
			//setting={rows:rows,total:total,currentpage:currentpage,pageSize:pageSize};
			var defaults = {rows:[],total:0,currentpage:1,pagesize:10};
			var options = $.extend({},defaults, setting);//将一个空对象做为第一个参数,
			//这样做的好处是所有值被合并到这个空对象上，保护了插件里面的默认值。
			dealmanypages(options,this)
		}
	});
})(jQuery);//自定义方法扩展
/**将undefined或null转换成任何你要替换的字符;type为你要替换的字符,不写则返回空字符串*/
function undefinedHandle(data,type)
{
	if (data != null && typeof(data) != undefined&&data!="undefined"&&data!='undefined')
		return data;
	if(type!=null)
		return type;
	else
		return "";
}
/**
 * 去除字符串右边连续的同一字符
 */
String.prototype.rtrimstr=function(symbol)
{
	var reg=eval('/'+symbol +'*$/gi');
	return this.replace(reg,"");
}
/**
 * 去除字符串左边连续的同一字符
 */
String.prototype.ltrimstr=function(symbol)
{
	var reg=eval('/^'+symbol +'*/gi');
	return this.replace(reg,"");
}
function dealmanypages(options,that)//处理多页情况
{
	var pages;//总页数
	var total=options.total;//总记录数
	var rows=options.rows;//当前页面显示记录
	//currentpage=options.currentpage;//当前页码
	var pagesize=options.pagesize;//
	total=undefinedHandle(total,rows.length);
	if(total%pagesize==0)
		pages=parseInt(total/pagesize);
	else
		pages=parseInt(total/pagesize)+1;
	pagetoolbar=pagetoolbar||$(that);
	pages=parseInt(pages)<1?1:pages;
	currentpage=currentpage>=pages?pages:currentpage;
	pagetoolbar.empty();
	switch(pages)
	{
		case 1:break;
		case 2:var html="";
				   if(currentpage>=pages)
				   {
					   html='<li><a title="上一页" href="javascript:previous()">&laquo;</a></li>';
					   html+='<li><a onclick="topage('+(currentpage-1)+')">'+(currentpage-1)+'</a></li>';
					   html+='<li class="active"><a>'+(currentpage)+'</a></li>';
					   html+='<li class="disabled"><span title="下一页">&raquo;</span></li>';
				   }
				   else
				   {
				   	   html+='<li class="disabled"><span title="上一页">&laquo;</span></li>';
					   html+='<li class="active"><a>'+(currentpage)+'</a></li>';
					   html+='<li><a onclick="topage('+(currentpage+1)+')">'+(currentpage+1)+'</a></li>';
					   html+='<li><a title="下一页" href="javascript:next()">&raquo;</a></li>';
				   }
				   pagetoolbar.append(html);break;
		case 3:var html="";
				if(currentpage>=pages)
				{
					 html='<li><a title="上一页" href="javascript:previous()">&laquo;</a></li>';
					 html+='<li><a onclick="topage('+(currentpage-2)+')">'+(currentpage-2)+'</a></li>';
					 html+='<li><a onclick="topage('+(currentpage-1)+')">'+(currentpage-1)+'</a></li>';
					 html+='<li class="active"><a>'+(currentpage)+'</a></li>';
					 html+='<li class="disabled"><span title="下一页">&raquo;</span></li>';
				}
				else if((currentpage+1>=pages))
				{
					html='<li><a title="上一页" href="javascript:previous()">&laquo;</a></li>';
					 html+='<li><a onclick="topage('+(currentpage-1)+')">'+(currentpage-1)+'</a></li>';
					 html+='<li class="active"><a>'+(currentpage)+'</a></li>';
					 html+='<li><a onclick="topage('+(currentpage+1)+')">'+(currentpage+1)+'</a></li>';
					 html+='<li><a title="下一页" href="javascript:next()">&raquo;</a></li>';
				}
				else
				{
					html+='<li class="disabled"><span title="上一页">&laquo;</span></li>';
					 html+='<li class="active"><a>'+(currentpage)+'</a></li>';
					 html+='<li><a onclick="topage('+(currentpage+1)+')">'+(currentpage+1)+'</a></li>';
					 html+='<li><a onclick="topage('+(currentpage+2)+')">'+(currentpage+2)+'</a></li>';
					 html+='<li><a title="下一页" href="javascript:next()">&raquo;</a></li>';
				}
				pagetoolbar.append(html);break;
				break;
		case 4:
			var html="";
			if(currentpage>=pages)
			{
				 html='<li><a title="上一页" href="javascript:previous()">&laquo;</a></li>';
				 html+='<li><a onclick="topage('+(currentpage-3)+')">'+(currentpage-3)+'</a></li>';
				 html+='<li><a onclick="topage('+(currentpage-2)+')">'+(currentpage-2)+'</a></li>';
				 html+='<li><a onclick="topage('+(currentpage-1)+')">'+(currentpage-1)+'</a></li>';
				 html+='<li class="active"><a>'+(currentpage)+'</a></li>';
				 html+='<li class="disabled"><span title="下一页">&raquo;</span></li>';
			}
			else if((currentpage+1>=pages))
			{
				html='<li><a title="上一页" href="javascript:previous()">&laquo;</a></li>';
				html+='<li><a onclick="topage('+(currentpage-2)+')">'+(currentpage-2)+'</a></li>';
				 html+='<li><a onclick="topage('+(currentpage-1)+')">'+(currentpage-1)+'</a></li>';
				 html+='<li class="active"><a>'+(currentpage)+'</a></li>';
				 html+='<li><a onclick="topage('+(currentpage+1)+')">'+(currentpage+1)+'</a></li>';
				 html+='<li><a title="下一页" href="javascript:next()">&raquo;</a></li>';
			}
			else if((currentpage+2>=pages))
			{
				html='<li><a title="上一页" href="javascript:previous()">&laquo;</a></li>';
				 html+='<li><a onclick="topage('+(currentpage-1)+')">'+(currentpage-1)+'</a></li>';
				 html+='<li class="active"><a>'+(currentpage)+'</a></li>';
				 html+='<li><a onclick="topage('+(currentpage+1)+')">'+(currentpage+1)+'</a></li>';
				 html+='<li><a onclick="topage('+(currentpage+2)+')">'+(currentpage+2)+'</a></li>';
				 html+='<li><a title="下一页" href="javascript:next()">&raquo;</a></li>';
			}
			else
			{
				html+='<li class="disabled"><span title="上一页">&laquo;</span></li>';
				 html+='<li class="active"><a>'+(currentpage)+'</a></li>';
				 html+='<li><a onclick="topage('+(currentpage+1)+')">'+(currentpage+1)+'</a></li>';
				 html+='<li><a onclick="topage('+(currentpage+2)+')">'+(currentpage+2)+'</a></li>';
				 html+='<li><a onclick="topage('+(currentpage+3)+')">'+(currentpage+3)+'</a></li>';
				 html+='<li><a title="下一页" href="javascript:next()">&raquo;</a></li>';
			}
			pagetoolbar.append(html);break;
		case 5:var html="";
			if(currentpage>=pages)
			{
				 html='<li><a title="上一页" href="javascript:previous()">&laquo;</a></li>';
				 html+='<li><a onclick="topage('+(currentpage-4)+')">'+(currentpage-4)+'</a></li>';
				 html+='<li><a onclick="topage('+(currentpage-3)+')">'+(currentpage-3)+'</a></li>';
				 html+='<li><a onclick="topage('+(currentpage-2)+')">'+(currentpage-2)+'</a></li>';
				 html+='<li><a onclick="topage('+(currentpage-1)+')">'+(currentpage-1)+'</a></li>';
				 html+='<li class="active"><a>'+(currentpage)+'</a></li>';
				 html+='<li class="disabled"><span title="下一页">&raquo;</span></li>';
			}
			else if((currentpage+1>=pages))
			{
				html='<li><a title="上一页" href="javascript:previous()">&laquo;</a></li>';
				html+='<li><a onclick="topage('+(currentpage-3)+')">'+(currentpage-3)+'</a></li>';
				html+='<li><a onclick="topage('+(currentpage-2)+')">'+(currentpage-2)+'</a></li>';
				 html+='<li><a onclick="topage('+(currentpage-1)+')">'+(currentpage-1)+'</a></li>';
				 html+='<li class="active"><a>'+(currentpage)+'</a></li>';
				 html+='<li><a onclick="topage('+(currentpage+1)+')">'+(currentpage+1)+'</a></li>';
				 html+='<li><a title="下一页" href="javascript:next()">&raquo;</a></li>';
			}
			else if((currentpage+2>=pages))
			{
				html='<li><a title="上一页" href="javascript:previous()">&laquo;</a></li>';
				html+='<li><a onclick="topage('+(currentpage-2)+')">'+(currentpage-2)+'</a></li>';
				 html+='<li><a onclick="topage('+(currentpage-1)+')">'+(currentpage-1)+'</a></li>';
				 html+='<li class="active"><a>'+(currentpage)+'</a></li>';
				 html+='<li><a onclick="topage('+(currentpage+1)+')">'+(currentpage+1)+'</a></li>';
				 html+='<li><a onclick="topage('+(currentpage+2)+')">'+(currentpage+2)+'</a></li>';
				 html+='<li><a title="下一页" href="javascript:next()">&raquo;</a></li>';
			}
			else if((currentpage+3>=pages))
			{
				html='<li><a title="上一页" href="javascript:previous()">&laquo;</a></li>';
				html+='<li><a onclick="topage('+(currentpage-1)+')">'+(currentpage-1)+'</a></li>';
				 html+='<li class="active"><a>'+(currentpage)+'</a></li>';
				 html+='<li><a onclick="topage('+(currentpage+1)+')">'+(currentpage+1)+'</a></li>';
				 html+='<li><a onclick="topage('+(currentpage+2)+')">'+(currentpage+2)+'</a></li>';
				 html+='<li><a onclick="topage('+(currentpage+3)+')">'+(currentpage+3)+'</a></li>';
				 html+='<li><a title="下一页" href="javascript:next()">&raquo;</a></li>';
			}
			else
			{
				html+='<li class="disabled"><span title="上一页">&laquo;</span></li>';
				html+='<li class="active"><a>'+(currentpage)+'</a></li>';
				 html+='<li><a onclick="topage('+(currentpage+1)+')">'+(currentpage+1)+'</a></li>';
				 html+='<li><a onclick="topage('+(currentpage+2)+')">'+(currentpage+2)+'</a></li>';
				 html+='<li><a onclick="topage('+(currentpage+3)+')">'+(currentpage+3)+'</a></li>';
				 html+='<li><a onclick="topage('+(currentpage+4)+')">'+(currentpage+4)+'</a></li>';
				 html+='<li><a title="下一页" href="javascript:next()">&raquo;</a></li>';
			}
			pagetoolbar.append(html);break;
		default:var html="";
			if(currentpage>=pages)
			{
				 html='<li><a title="上一页" href="javascript:previous()">&laquo;</a></li>';
				 html+='<li><a onclick="topage('+(currentpage-4)+')">'+(currentpage-4)+'</a></li>';
				 html+='<li><a onclick="topage('+(currentpage-3)+')">'+(currentpage-3)+'</a></li>';
				 html+='<li><a onclick="topage('+(currentpage-2)+')">'+(currentpage-2)+'</a></li>';
				 html+='<li><a onclick="topage('+(currentpage-1)+')">'+(currentpage-1)+'</a></li>';
				 html+='<li class="active"><a>'+(currentpage)+'</a></li>';
				 html+='<li class="disabled"><span title="下一页">&raquo;</span></li>';
			}
			else if((currentpage+1>=pages))
			{
				html='<li><a title="上一页" href="javascript:previous()">&laquo;</a></li>';
				html+='<li><a onclick="topage('+(currentpage-3)+')">'+(currentpage-3)+'</a></li>';
				html+='<li><a onclick="topage('+(currentpage-2)+')">'+(currentpage-2)+'</a></li>';
				 html+='<li><a onclick="topage('+(currentpage-1)+')">'+(currentpage-1)+'</a></li>';
				 html+='<li class="active"><a>'+(currentpage)+'</a></li>';
				 html+='<li><a onclick="topage('+(currentpage+1)+')">'+(currentpage+1)+'</a></li>';
				 html+='<li><a title="下一页" href="javascript:next()">&raquo;</a></li>';
			}
			else if((currentpage+2>=pages))
			{
				html='<li><a title="上一页" href="javascript:previous()">&laquo;</a></li>';
				html+='<li><a onclick="topage('+(currentpage-2)+')">'+(currentpage-2)+'</a></li>';
				 html+='<li><a onclick="topage('+(currentpage-1)+')">'+(currentpage-1)+'</a></li>';
				 html+='<li class="active"><a>'+(currentpage)+'</a></li>';
				 html+='<li><a onclick="topage('+(currentpage+1)+')">'+(currentpage+1)+'</a></li>';
				 html+='<li><a onclick="topage('+(currentpage+2)+')">'+(currentpage+2)+'</a></li>';
				 html+='<li><a title="下一页" href="javascript:next()">&raquo;</a></li>';
			}
			else if((currentpage==2))
			{
				html='<li><a title="上一页" href="javascript:previous()">&laquo;</a></li>';
				html+='<li><a onclick="topage('+(currentpage-1)+')">'+(currentpage-1)+'</a></li>';
				 html+='<li class="active"><a>'+(currentpage)+'</a></li>';
				 html+='<li><a onclick="topage('+(currentpage+1)+')">'+(currentpage+1)+'</a></li>';
				 html+='<li><a onclick="topage('+(currentpage+2)+')">'+(currentpage+2)+'</a></li>';
				 html+='<li><a onclick="topage('+(currentpage+3)+')">'+(currentpage+3)+'</a></li>';
				 html+='<li><a title="下一页" href="javascript:next()">&raquo;</a></li>';
			}
			else if(currentpage==1)
			{
				html+='<li class="disabled"><span title="上一页">&laquo;</span></li>';
				html+='<li class="active"><a>'+(currentpage)+'</a></li>';
				 html+='<li><a onclick="topage('+(currentpage+1)+')">'+(currentpage+1)+'</a></li>';
				 html+='<li><a onclick="topage('+(currentpage+2)+')">'+(currentpage+2)+'</a></li>';
				 html+='<li><a onclick="topage('+(currentpage+3)+')">'+(currentpage+3)+'</a></li>';
				 html+='<li><a onclick="topage('+(currentpage+4)+')">'+(currentpage+4)+'</a></li>';
				 html+='<li><a title="下一页" href="javascript:next()">&raquo;</a></li>';
			}
			else
			{
				html='<li><a title="上一页" href="javascript:previous()">&laquo;</a></li>';
				html+='<li><a onclick="topage('+(currentpage-2)+')">'+(currentpage-2)+'</a></li>';
				 html+='<li><a onclick="topage('+(currentpage-1)+')">'+(currentpage-1)+'</a></li>';
				 html+='<li class="active"><a>'+(currentpage)+'</a></li>';
				 html+='<li><a onclick="topage('+(currentpage+1)+')">'+(currentpage+1)+'</a></li>';
				 html+='<li><a onclick="topage('+(currentpage+2)+')">'+(currentpage+2)+'</a></li>';
				 html+='<li><a title="下一页" href="javascript:next()">&raquo;</a></li>';
			}
			pagetoolbar.append(html);
	}
	pagetoolbar.append("<span style='margin-left:10px;height:50px;line-height: 50px;'>共"+pages+"页</span>");
	pagetoolbar.append("<span style='margin-left:10px;height:50px;line-height: 50px;'>"+total+"条数据</span>");
	if(parseInt(pages)>5)
	{
		pagetoolbar.append("<span style='margin-left:10px;'>"+
		"第<input id='input' class='inputpage' type='text' value='"+currentpage+"'/>页</span>");
		pagetoolbar.append("<span style='margin-left:5px;height:50px;line-height: 50px;'>"+
				"<button class='btn btn-primary go' onclick='gotopage("+pages+")'>跳转</button></span>");
		//$("#input").val(currentpage);
	}
}
function topage(page)
{
	currentpage=page;
	dealmanypages(setting);
}
function gotopage(pages)
{
	var go=parseInt($("#input").val());
	if(go<=pages&&go>0)
	{
		if(go!=currentpage)
		{
			currentpage=go;
			dealmanypages(setting);
		}
	}
	else
	{
		$("#input").css("border-color","red");
		$("#input").focus();
		alert("输入页码不在页面范围内！");
	}
}
function previous()
{
	currentpage=currentpage-1;
	dealmanypages(setting);
}
function next()
{
	currentpage=currentpage+1;
	dealmanypages(setting);
}
/**
 * @param 页面显示记录条数
 * @author chemyoo
 * @returns recordStart
 */
function recordStart(pageSize)
{
	return (currentpage-1)*pageSize;
}
