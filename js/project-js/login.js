
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

	//注册
	function register(){
		//获取身份
		var identity="";
		var tmp=0;
		$("input:checkbox[name='loginRole']:checked").each(function(index,element){
			tmp++;
			identity+=$(element).val()+",";
		})
		identity=identity.substr(0,identity.length-1);
		if (tmp<1){
			alert("请选择注册身份");
		}else{
				var rej={
					"username":$('#regi-teacherId').val(),
					"name":$('#regi-teacherName').val(),
					"password":$('#regi-password').val(),
					// "email":$('#regi-email').val(),
					"identity":identity,
					"xueYuan":$('#regi-xueYuan').val(),
					"zhiCheng":$('#regi-zhiCheng').val()
				}
				var printrej=JSON.stringify(rej);
				//打印rej对象
				console.log(printrej);
				if($("#regi-teacherId").val()!=="" && $("#regi-password").val()!=="")
			         {
			              $.ajax({
							type:'POST',
							url:url+"/register",
							dataType:"text",
							data:JSON.stringify(rej),
							success:function(data){
								console.log(data);
								var obj=JSON.parse(data);
								if (obj.errId=="1"){
									alert("注册信息提交成功！请等待审核");
								}else{
							 		alert("该工号已经注册");
								}  	
								},
							error:function(xhr,errottext,errorstatus){
								alert(xhr.status+" "+xhr.statusText);
							}
			          		})
			          }
				else{
				 	alert("请填写用户账号和密码！");
				}
		}
	}

	//忘记密码




	
	//登录
	$("#loginBtn").click(function(){
		login();
	});
	//注册
	$('#register-sure').click(function(){
		register();
	});
	//忘记密码
	$('forget-sure').click(function(){
		forgetPwd();
	});
})