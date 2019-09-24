$(document).on("click", "#weblist>li>.itembox", function() {
	// 功能：在点击网站标签时实现跳转至相应的站点
	var tagNode = $(this).parent("li[data-tag]");
	var domainName = tagNode.data("tag");
	var method = tagNode.data("method");
	$(window).attr("location", method + "://" + domainName);
	console.log(domainName);
});
