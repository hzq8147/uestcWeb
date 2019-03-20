
const url="http://localhost:8080/uestcTMP";
$(function(){
	function login(){

	//登录
	var username=document.getElementById("username").value;
	var password=document.getElementById("password").value;
	console.log("username:"+username);
	console.log("password:"+password);
	if (username=="")
	{
		alert("用户名不能为空");
	}else if(password==""){
		alert("密码不能为空");
	}else{
		//发送登录请求
		var actionUrl=url+"/login";
		var userObj={
			"username":username,
			"password":password
		};
		var params=JSON.stringify(userObj);
		console.log(params);
		$.ajax({
			type:'POST',
			url:actionUrl,
			dataType:"text",
			data:params,
			success:function(data){
				if (data=='Success')
				{
					//跳转主页登陆成功
					window.location.href="index.html"
					
				}else{
					alert('用户名或密码错误')
				}

			},
			error:function(xhr,errottext,errorstatus){
				alert(xhr.status+" "+xhr.statusText);
			}
		})
	}

	}	
	$("#loginBtn").click(function(){
		login();
	});
})