
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