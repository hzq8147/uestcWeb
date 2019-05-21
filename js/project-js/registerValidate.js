const url="http://101.132.37.10:8080/uestcTMP";
/**
 * 教师登录界面--login.html--注册验证
 */
// <!-- 开启validator验证-->


$(document).ready(function () {
    $("#registerValidate").bootstrapValidator({
	    feedbackIcons: {
	            valid: 'glyphicon glyphicon-ok',
	            invalid: 'glyphicon glyphicon-remove',
	            validating: 'glyphicon glyphicon-refresh'
	        },
	    fields: {
	    	teacherId: {
	            validators: {
	                notEmpty: {
	                    message: '账号不能为空'
	                },
	                stringLength:{
	                	min:7,
	                	max:7,
	                	message:'用户名必须为7位工号'
	                },
	                regexp:{
	                	regexp:/^[0-9]{7}$/,
	                	message:'只能是7位数字'
	                },
	                threshold:7,
	                remote:{
	                	url:"/course/teacherExits",
	                	message:"用户已存在",
	                	delay:2000,
	                	type:"POST",
	                }
	            }
	        },
	        teacherName: {   	
	            validators: {
	                notEmpty: {
	                    message: '姓名不能为空'
	                }
	            }
	        },
	        password: {   	
	            validators: {
	                notEmpty: {
	                    message: '密码不能为空'
	                }
	            }
	        },
	        confirmPassword:{
	        	validators: {
	                notEmpty: {
	                    message: '请输入确认密码'
	                },
	                identical: {// 相同
                        field: 'password',
                        message: '两次密码不一致'
                    }
	            }
	        },
	        /*phone:{
	        	validators: {
	        		stringLength:{
	        			min:11,
	        			max:11,
	        			message:'请输入11位手机号'
	        		 },
	        		regexp:{
	        		regexp:/^1[3|5|7|8|9]{1}[0-9]{9}$/,
	        	 	message:'请输入正确的手机号'
	        		 }
	        	 }
	        },
	        email:{
	        	validators: {
	        	    emailAddress:{
	        	    	message:'请输入正确的邮件地址，如123@uestc.edu.cn'
	        	    }
	            }
	        },*/
	    }
    });
    
    var form = $("#registerValidate");
     $("#register-sure").click(function()
          {
            
            var bv = form.data('bootstrapValidator');
            bv.validate();
            if(bv.isValid()){
                console.log(form.serialize());
                // 表单提交的方法、比如ajax提交
    
       var rej={ 
    		   "teacherId":$('#regi-teacherId').val(),
				"teacherName":$('#regi-teacherName').val(),
				"password":$('#regi-password').val(),
				// "email":$('#regi-email').val(),
				"identity":$("input[name='logRole':checked").val()
    		   }
     
    /*
     * $.ajax({ url:"/course/Iregister", type:"POST",
     * contentType: "application/json", dataType:"JSON", data:JSON.stringify(rej),
     * success:function(data) { if(data.success) {
     * if($("#regi-teacherId").val()!==""&&$("#regi-password").val()!=="")
     * {alert("注册信息提交成功！请等待审核");} else{ alert("请填写用户账号和密码！"); } } else {
     * alert("您的信息输入有误"); } } })
     */
                
                 $.ajax({
                     url: url+'register',
                     type: 'POST',// PUT DELETE POST
                     contentType: "text", 
                     dataType:"JSON",
                     data: JSON.stringify(rej),
                     complete: function (msg) {
                         console.log('完成了');
                     },
                
                     success: function (result) {
                         console.log(result);
                         if (result) {
                        	 bv.resetForm();
                        	 $("#login").modal('hide');
                        	 $("#regi-teacherId").val(""),
                        	 $("#regi-teacherName").val(""), 
                  		   	 
                  		     $("#regi-password").val(""),
                  		     $("#confirmPassword").val("");
                  		     
                             alert(result.msg);
                         } else {
                             $("#returnMessage").hide().html('<label class="label label-danger">注册失败!</label>').show(300);
                             console.log(result);
                         }
                     }, 
                     error: function () {
                         $("#returnMessage").hide().html('<label class="label label-danger">注册失败!</label>').show(300);
                         console.log(result);
                         console.log("错误");
                     }
                 })

              
             }
         });
      });


	        
    
