const url="http://101.132.37.10:8080/uestcTMP";

$(function(){
	
	//var userId = getUserId();
	getCourse("2");
	function getUserId(){
		//！window防止浏览器不支持导致的报错
		if (!window.localstorage){
			var storage=window.localStorage;
			var user=JSON.parse(storage.getItem("user"));
			console.log(user.id);
			return user.id;
		}
	}

	function getCourse(userId){
		var obj={
			'userId':userId
		}
		var params=JSON.stringify(obj)
		$.ajax({
			type:'POST',
			url:url+"/getCourse",
			dataType:"text",
			data:params,
			success:function(data){
				var getObj = JSON.parse(data);
				//console.log(user);
				var courseJson=JSON.stringify(getObj);
				console.log(courseJson);
				//获取数据
				
				}

			
			//error:function(xhr,errottext,errorstatus){
			//	alert(xhr.status+" "+xhr.statusText);
			//}
		})
	}
})
	