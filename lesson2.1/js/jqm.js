function find() {
	var str = $("#sss").val();
	console.log(str);
	$("#searchresult").empty();
	var db = openDatabase("RSSdb", "0.1", "3DNews RSS", 100);
	db.transaction(function(tx){
		tx.executeSql("SELECT * FROM RSdb WHERE title LIKE '%"+str+"%';",
				[],function(tx,result){
			if (result.rows.length == 0){
				$("#searchresult").append('<li class="title">Nothing found</li><hr/>');
			}
			else
				for (var i=0; i<result.rows.length;i++){
					var a = result.rows.item(i);
					$("#searchresult").append('<li class="title">'+a['title']+'</li><hr/>');
				}
		}, null)
	})
}