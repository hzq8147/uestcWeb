const url="http://101.132.37.10:8080/uestcTMP";
$(document).ready(function(){
	if (!window.localstorage){
			var storage=window.localStorage;
			var user=JSON.parse(storage.getItem("user"));
			console.log(user.name);
			$("#name").text('欢迎您！'+user.name+'老师');
			}
		})
	
		


$(function(){
	$("#loginOut").click(function(){
		if (!window.localStorage){
		}else
		{
			var storage=window.localStorage;
			storage.removeItem("user");
		}
	})
})