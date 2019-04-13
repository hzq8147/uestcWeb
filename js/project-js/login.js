
const url="http://101.132.37.10:8080/uestcTMP";
$(function(){
	function login(){

	//登录
	var username=document.getElementById("loginUser").value;
	var password=document.getElementById("loginPwd").value;
	
	var identity;
	
	identity = $("input[name='identity']:checked").val();

	
	console.log("username:"+username);
	console.log("password:"+password);
	console.log("identity:"+identity);
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
			"password":password,
			"identity":identity
		};
		var params=JSON.stringify(userObj);
		console.log(params);
		$.ajax({
			type:'POST',
			url:actionUrl,
			dataType:"text",
			data:params,
			success:function(data){
				var getObj = JSON.parse(data);
				if (getObj.errId=="0")
				{
					alert('用户名或密码错误');
					
				}
				else if(getObj.errId=="-1"){
					alert('身份不正确');
				}
				else{
					//console.log(user);
					var userJson=JSON.stringify(getObj.user);
					console.log(userJson);
					//存储登陆成功的user的Json 字符串
					saveLogin(userJson);
					//跳转主页登陆成功
					window.location.href="index.html";
					
				}

			},
			error:function(xhr,errottext,errorstatus){
				alert(xhr.status+" "+xhr.statusText);
			}
		})
	}
	}	
	function saveLogin(userJson){
		var storage=window.localStorage;
		//userJson键值数组赋给user
		storage.setItem("user",userJson);
		console.log(userJson); 
			 
	}
	$("#loginBtn").click(function(){
		login();
	});
})