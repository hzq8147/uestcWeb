

$(function(){
	if (!window.localstorage){
		
	}else{
		var storage=window.localStorage;
		var json=storage.getItem("user");
		var user=JSON.parse(json);
		console.log(user.name);
	}
})