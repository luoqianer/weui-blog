$(document).ready(function() {
	// console.log("加载 HTML 子页")
	// $('#home').load('page1_home.html');
});

$(function() {
	$('.weui-tabbar__item').on('click', function() {
		$(this).addClass('weui-bar__item_on').siblings('.weui-bar__item_on').removeClass('weui-bar__item_on');
	});
});

var ajax_cnt = 0;
var xhr;

function get_text(text_url, text_handle) {
	console.log("AJAX=" + ajax_cnt);
	ajax_cnt++;
	
	if (window.XMLHttpRequest) {
		//  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
		xhr = new XMLHttpRequest();
	} else {
		// IE6, IE5 浏览器执行代码
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}

	xhr.open("GET", "./" + text_url, true);		//此处谨用相对路径发起请求
	// xhr.responseType = 'arraybuffer';	//设置发起请求后接收回来的数据类型
	xhr.send("xhr.send()");
	
	xhr.onreadystatechange = text_handle;
}

$(function() {
	//分类栏目折叠
	$('.js_category').on('click', function() {
		var $this = $(this),
			$inner = $this.next('.js_categoryInner'), //同级下一个
			$page = $this.parents('.page'),
			$parent = $(this).parent('li');
		var innerH = $inner.data('height');

		if (!innerH) {
			$inner.css('height', 'auto');
			innerH = $inner.height();
			$inner.removeAttr('style');
			$inner.data('height', innerH);
		}

		if ($parent.hasClass('js_show')) {
			$parent.removeClass('js_show');
		} else {
			$parent.siblings().removeClass('js_show');

			$parent.addClass('js_show');
			if (this.offsetTop + this.offsetHeight + innerH > $page.scrollTop() + winH) {
				var scrollTop = this.offsetTop + this.offsetHeight + innerH - winH + categorySpace;

				if (scrollTop > this.offsetTop) {
					scrollTop = this.offsetTop - categorySpace;
				}

				$page.scrollTop(scrollTop);
			}
		}

		var winH = $(window).height();
		var $foot = $('body').find('.page__ft');
		if ($foot.length < 1) return;

		if ($foot.position().top + $foot.height() < winH) {
			$foot.addClass('j_bottom');
		} else {
			$foot.removeClass('j_bottom');
		}
	});

	// 文章跳转
	$('.js_item').on('click', function() {
		var $this = $(this);
		var category = $this.parents().parents().parents().prev()[0].innerText; //根据标签嵌套层级，找到多个父级再找同级的前一个元素，即可拿到分类名
		console.log("category= " + category);
		var text_div = $this.children().children();
		var text_id = text_div[0].innerText;
		var text_name = text_div[1].innerText;
		console.log("id= " + text_id);
		console.log("name= " + text_name);

		var $content = $('.weui-tab__content');
		$content.siblings().removeAttr('style'); //根据class获取tab各个content元素，移除style进行隐藏
		
		var text_url = get_texturl(text_id);
		console.log("查询到的URL=", text_url);
		
		get_text(text_url, function() {
		console.log(xhr.readyState + ';' + xhr.status);
		if (xhr.readyState == 4 && xhr.status == 200) {
			// console.log(xhr.response);
			
			if(0)
			{
				// var dataView = new DataView(xhr.response);
				// var decoder = new TextDecoder("gbk");
				// var decodedString = decoder.decode(dataView);
				// console.log(decodedString);
				document.getElementById('text').innerHTML = marked(decodedString);
			}
			else
			{
				document.getElementById('text').innerHTML = "";
				document.getElementById('text').innerHTML = marked(xhr.response);
			}
			
		}
	});
		$('#text').attr('style', "display: block;"); //根据id获取文章显示的content元素，添加style进行显示
	});
});


weui.tab('#tab', {
	defaultIndex: 0,
	onChange: function(index) {
		// console.log(index);
	}
});
