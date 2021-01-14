// 分类目录格式 category[01]分类名
// 文章标题格式 [时间]文章名
/*
tree:{
	category:[
		{
			name: "目录名1",
			pname: "目录路径名1",
			texts: [
				{
					time: "文章日期",
					name: "文章名1",
					tag: ["设计", "硬件"]
				},
				{
					id: "0_1231313156",
					time: "文章日期",
					name: "文章名2",
					url: "./texts/category/name"
					tag: ["软件", "服务器"]
				}
			]
		},
		{
			name: "目录名1",
			texts: [
				{
					time: "文章日期",
					name: "文章名1",
					tag: ["设计", "硬件"]
				},
				{
					id: "1_1231313156",
					time: "文章日期",
					name: "文章名2",
					url: "./texts/category/name"
					tag: ["软件", "服务器"]
				}
			]
		},
	]
}


*/
var url = "";
var hash = "";
(function getURL(){
	
	var protocol = window.location.protocol;
	var host = window.location.host;
	var pathname = window.location.pathname;
	
	var index_slant = pathname.lastIndexOf('/');
	var index_point = pathname.lastIndexOf('.');
	
	if(index_slant < index_point)
		pathname = pathname.substring(0, index_slant+1);
		
	url = protocol + host + pathname;
})();
console.log("url = " + url);
console.log("hash = " + hash);

var appVue;

var tree = {};
tree.category = [];
// console.log(tree);

appVue = new Vue({
	el: '#app',
	data: {
		tree: {}
	}
});


(function() {
	if ('TextDecoder' in window) {
		// console.log("浏览器支持TextDecoder")
	} else {
		console.error('Your browser does not support the Encoding API.');
	}
})();



// 获取最小值到最大值之前的整数随机数
function GetRandomNum(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    return(Min + Math.round(Rand * Range));
}

function get_texturl(text_id){
	var category_str = text_id.substring(1, text_id.indexOf('_'));
	var category_idx = parseInt(category_str);
	var text_url = "";
	
	console.log("当前分组：", category_idx);
	
	if(tree.category.length > category_idx)
	{
		tree.category[category_idx].texts.forEach(text => {
			if(text.id == text_id)
			{
				console.log(text)
				text_url = text.url;
			}
		});
	}
	
	return text_url;
}

(function() {
	console.log("load tree...");

	var xmlhttp;
	if (window.XMLHttpRequest) {
		//  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
		xmlhttp = new XMLHttpRequest();
	} else {
		// IE6, IE5 浏览器执行代码
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	xmlhttp.open("GET", "./texts/tree.text", true);
	xmlhttp.responseType = 'arraybuffer';
	xmlhttp.send("xmlhttp.send()");
	
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var dataView = new DataView(this.response);
			var decoder = new TextDecoder("gbk");
			var decodedString = decoder.decode(dataView);
			var tree_str = decodedString.split("\r\n");
			var idx_category = 0;
			var idx_text = 0;
			tree_str.forEach(item => {
				if ( (item.indexOf("├") != -1) || (item.indexOf("└") != -1) ) {
					var obj_category = {};
					obj_category.name = item.substring(item.indexOf("─") + 1);
					obj_category.texts = [];
					tree.category.push(obj_category);
					idx_category++;
					idx_text = 0;
					// console.log("文件夹名：" + obj_category.name);
					
				} else if (item.indexOf("│      ") != -1) {
					var text_fname = item.substring(item.lastIndexOf(" ")+1);		//文章文件名 (时间)[标签]文章标题.md
					if(text_fname.length != 0)
					{
						// console.log("文章名：" + text_fname);
						var obj_text = {};
						obj_text.id = 'C' + (idx_category-1) + '_' +GetRandomNum(10000000, 99999999);
						// console.log("生成文章ID：");
						// console.log(obj_text.id);
						// obj_text.time = item.substring(item.indexOf("(") + 1, item.indexOf(")"));
						// obj_text.tag = item.substring(item.indexOf("["), item.indexOf("]") + 1);
						obj_text.name = text_fname;
						obj_text.url = "texts/" + tree.category[idx_category - 1].name + "/" + text_fname;
						// obj_text.url = encodeURI(obj_text.url);
						// console.log("obj_text.url= ");
						// console.log(obj_text.url);
						tree.category[idx_category - 1].texts.push(obj_text);
						idx_text++;
					}
					
				}
			})
			appVue.$data.tree = tree;
			console.log(tree)

			console.log("load tree OK!");
		}
	}
})();
