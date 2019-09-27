/*
 * 站点列表显示控制器
 */
function ListSearchCtroler(listNode) {
	// 站点模糊搜索控制器
	// @Input: 站点列表的jQuery对象
	this.listNode = listNode;
	this.rawList = [];	// 这个表就是初始化时记录的原始数据表
	this.mode = true;	// 指示当前状态是否为“原始”状态
	this.keywords = [];	// 关键词列表
	this.weight = [];	// 权重表

	this.scanNode = function() {
		// 功能：扫描站点列表中的所有项，并解析其中的数据
		var rawList = [];
		$.each(listNode.children('li'), function(index, itemNode) {
			rawList[index] = nodeAnalysiser($(itemNode));
		});
		this.rawList = rawList;
	}

	this.search = function(keyWords) {
		// 功能：实现模糊查找
		this.keywords = keyWords;
		if(keyWords.length === 0) {
			if(this.mode === true) {
				return;	// 关键词为空：原始状态->原始状态，不需要操作
			}
			this.rendRawList();	// 渲染原始列表
			this.mode = true;
			return;
		} else {
			// 执行模糊查找
			this.weight = [];
			var curWeight;
			for(var index = 0; index < this.rawList.length; index++) {
				// 计算权重表（将key存储为字符串型以避免排序时对应关系被修改）
				curWeight = weightCalculator(this.rawList[index], this.keywords);
				this.weight[index] = {index, curWeight};
			}
			this.weight = this.weight.sort(function(a, b) {
				// 降序排序
				return b.curWeight - a.curWeight;
			});
			this.rendSearchList();
			this.mode = false;
		}
	}

	this.rendRawList = function() {
		// 功能：渲染原始列表
		this.listNode.html("");
		for(var index = 0; index < this.rawList.length; index++) {
			this.listNode.append($("#template").html());
			nodeRender(this.listNode.children("li:last-child"), this.rawList[index]);
		}
		$("#nodata").css("display", "none");
	}

	this.rendSearchList = function(isHighLight = true) {
		// 功能：根据ID列表按顺序渲染搜索结果
		this.listNode.html("");
		var curNode, titleNode, addressNode, viewNode;
		for(var index = 0; index < this.weight.length; index++) {
			if(this.weight[index].curWeight === 0) {
				break;	// 忽略所有权重为0的项
			}
			this.listNode.append($("#template").html());
			curNode = this.listNode.children("li:last-child");
			nodeRender(curNode, this.rawList[this.weight[index].index]);
			if(isHighLight) {
				// 高亮显示关键词
				titleNode = curNode.children(".itembox").children(".titlebox").children("h3");
				addressNode = titleNode.next();
				viewNode = curNode.children(".itembox").children("p");
				titleNode.html(keyWordsHighLighter(titleNode.html(), this.keywords));
				addressNode.html(keyWordsHighLighter(addressNode.html(), this.keywords));
				viewNode.html(keyWordsHighLighter(viewNode.html(), this.keywords));
			}
		}
		$("#nodata").html("找到相关结果共 <span class='text-danger'>" + index + "</span> 条");
		$("#nodata").css("display", "block");
	}

	function keyWordsHighLighter(curString, keyWords) {
		// 功能：定义长须如何高亮显示关键词
		for(var index = 0; index < keyWords.length; index++) {
			curString = curString.replace(new RegExp(keyWords[index],"g"), "<span class='text-danger'>" + keyWords[index] + "</span>");
		}
		return curString;
	}

	function weightCalculator(curInfo, keyWords) {
		// 功能：定义如何根据单条数据和全部关键词计算数据所占的权重值
		var weight = 0;
		for(var index = 0; index < keyWords.length; index++) {
			weight += (curInfo['title'].split(keyWords[index]).length - 1) * 3;
			weight += (curInfo['view'].split(keyWords[index]).length - 1) * 2;
			weight += (curInfo['tag'].split(keyWords[index]).length - 1) * 1;
			if(curInfo['method'] === keyWords[index]) {
				weight++;
			}
		}
		return weight;
	}

	function nodeAnalysiser(itemNode) {
		// 功能：定义如何获取指定itemNode中的信息
		var curInfo = [];
		curInfo['tag'] = itemNode.data('tag');
		curInfo['method'] = itemNode.data('method');
		itemNode = itemNode.children('div[class=itembox]');
		curInfo['image'] = itemNode.children('.imgbox').attr('style');
		curInfo['title'] = itemNode.children('.titlebox').children('h3[title]').html();
		curInfo['view'] = itemNode.children('p').html();
		return curInfo;
	}

	function nodeRender(newNode, curInfo) {
		// 功能：定义如何将指定的信息渲染到指定的itemNode中
		newNode.attr('data-tag', curInfo['tag']);
		newNode.attr('data-method', curInfo['method']);
		var box = newNode.children('div[class=itembox]');
		box.children('.imgbox').attr('style', curInfo['image']);
		box.children('.titlebox').children('h3').attr('title', curInfo['title']);
		box.children('.titlebox').children('h3').html(curInfo['title']);
		box.children('.titlebox').children('h5').html(curInfo['tag']);
		box.children('p').attr('title', curInfo['view']);
		box.children('p').html(curInfo['view']);
	}
}
var searchCtrl = new ListSearchCtroler($("#weblist"));

/*
 * 下面为控制器绑定事件
 */
$(document).ready(function() {
	// 用于在文档结构加兹安完成后对站点列表进行扫描
	searchCtrl.scanNode();
});

$(document).on("click", "#search-btn", function() {
	// 功能：当用户点击“搜索”按钮时执行模糊查找命令
	startSearch();
});

$(document).on("keydown", "#search-ipt", function(e) {
	// 功能：当用户在搜索栏中按下按回车键时执行模糊查找命令
	if(e.keyCode === 13) startSearch();
});

function startSearch() {
	// 功能：启动模糊查找
	var rawWords = $("#search-ipt").val().split(" ");
	var keyWords = [];
	for(var i = 0; i < rawWords.length; i++) {
		if(rawWords[i] !== "" && $.inArray(rawWords[i], keyWords) === -1) {
			keyWords.push(rawWords[i]);	// 去除空的和重复的关键词
		}
	}
	searchCtrl.search(keyWords);			// 开始模糊搜索算法
}
