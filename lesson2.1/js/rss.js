function print(url_img, title, description){
	$("#rss-content").append('<div class="feed">' +
			'<div class="image"><img src="' + url_img +
			'" width = "100%"/></div>' + '<div class="title">' +
			title + '</div>' + '<div class="description">' +
			description + '</div>' + '</div>');
	}
	
function getFeed() {
	db = openDatabase("RSSdb", "0.1", "3DNews RSS", 100);
	db.transaction(function (tx) {
		tx.executeSql("CREATE TABLE IF NOT EXISTS RSdb (id INTEGER PRIMARY KEY AUTOINCREMENT, url_img TEXT, title TEXT, description TEXT);",[],null,null)
	});
	
	function readDB(){
		db.transaction(function(tx) {
			tx.executeSql("SELECT * FROM RSdb", [], function(tx, result) {
			for(var i = 0; i < result.rows.length; i++) {
				var a = result.row.item(i); 
				print(a['url_img'], a['title'], a['description']);
			}}, null)}); 
	}
	
	var FEED_URL = "http://www.3dnews.ru/news/rss/";
	$(document).ready(function() {
		$.ajax({
			type : "GET",
			url : FEED_URL,
			dataType : "xml",
			error: readDB,
			success : xmlParser
		});
	});
	
	function xmlParser(xml) {
		var i = 0;
		var arr = [];
		$(xml).find("item").each(
				function() {
					var url_img = $(this).find("enclosure").attr("url");
					var title = $(this).find("title").text();
					var description = $(this).find("description").text();
					print(url_img, title, description);
					db.transaction(function(tx) {
						tx.executeSql("INSERT INTO RSdb (url_img, title, description) values(?, ?, ?)", [url_img, title, description], null, function(){console.log("Creation error")});
					});
				});
	}
}
