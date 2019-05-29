
const url="http://101.132.37.10:8080/uestcTMP";
$(function(){
	
	var userId = getUserId();
	var courseList;
	getCourse(2);
	
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
				courseList= JSON.parse(data);
				
				var courseJson=JSON.stringify(courseList);
				console.log(courseJson);

				//显示课程列表
				showTerm();
				}
		})
		
	}
	function showTerm(){
		//初始化显示学期下拉菜单内容
		var termSel=document.getElementById('term_select');
		var term=new Array();//array初始长度为0

		courseList.forEach((item,index) =>{
			let tmp="1";
			//第一次没有走循环，因为length为1
			//term.length是属性

			//查重
			for (let i=0;i<term.length;i++){
				if (term[i]==item.term) 
					tmp="0";
			}
			if (tmp=="1"){
				term[term.length]=item.term;

				let option=document.createElement('option');
				option.innerHTML=`${item.term}`;
				option.setAttribute('value',item.term);
				termSel.appendChild(option);
			}
			

		})
		var selected=$('#term_select').val();
		changeCourse(selected);
	}
	$("#term_select").change(function(){
		//term 下拉变更
		var selected=$('#term_select').val();
		changeCourse(selected);

		anyChange();
	})
	function changeCourse(selected){
		//选课下拉菜单变更时
		var courseSel=document.getElementById('course_select');
		courseSel.innerHTML="";

		courseList.forEach((item,index)=>{
			if (item.term==selected){
				let option =document.createElement('option');
				option.innerHTML=`${item.name}`;
				option.setAttribute('value',item.name);
				courseSel.appendChild(option);
			}
		})
		
	}
	function anyChange(){
		//三个下拉菜单任意change都会触发
		var term=$('#term_select').val();
		var courseName=$('#course_select').val();
		var featureSel=$('#feature_select').val();
		console.log(featureSel);
		var courseId;
		courseList.forEach((item,index)=>{
			if (item.term==term && item.name==courseName){
				courseId=item.courseId;
				console.log(courseId);
			}
		})
		if (term.length>0 && courseName.length>0){
			//选中某课程
			mainControl(courseId,featureSel);
		}
	}
	$("#course_select").change(function(){
		anyChange();
	})
	$("#feature_select").change(function(){
		anyChange();
	})
	function mainControl(courseId,featureSel){
		
		switch(featureSel){
			case'0':
			showNothing();
			break;
			case'1':
			showJiaoAnPaper(courseId);
			break;
			case'2':
			showJiangGaoPaper(courseId);
			break;
			case'3':
			showZhongQiPaper(courseId);
			break;
			case'4':
			showChuTiPaper(courseId);
			break;
			case'5':
			showPingYuePaper(courseId);
			break;
			case'6':
			showFenXiPaper(courseId);
			break;
		}
	}
	function showNothing(){
		$('#Nothing').show();
		$('#jiaoAn').hide();
		$('#jiangGao').hide();
		$('#zhongQi').hide();
		$('#chuTi').hide();
		$('#pingYue').hide();
		$('#fenXi').hide();
	}
	
	function showFenXiPaper(courseId){
		$('#fenXi').show();
		$('#jiaoAn').hide();
		$('#jiangGao').hide();
		$('#zhongQi').hide();
		$('#chuTi').hide();
		$('#pingYue').hide();
		$('#Nothing').hide();

		$('#fenXiSubmit').click(function(){
			submitFenXiIndex(courseId);
		})
		
	}
	function submitFenXiIndex(courseId){
		console.log(courseId);
		var rej = {
			"courseId":courseId,
			"no1Answer":$('#fenXiQ1').val(),
			"no2Answer":$('#fenXiQ2').val(),
			"no3Answer":$('#fenXiQ3').val(),
			"no4Answer":$('#fenXiQ4').val(),
			"no5Answer":$('#fenXiQ5').val(),
			"advice":$('#fenXiAdvice').val(),
			"score":$('#fenXiScore').val()
		}
		var printrej=JSON.stringify(rej);
		//打印rej对象
		console.log(printrej);
		if($("#fenXiQ1").val()!=="" && $("#fenXiQ2").val()!=="" && $("#fenXiQ3").val()!=="" && $("#fenXiQ4").val()!=="" && $("#fenXiQ5").val()!=="" && $("#fenXiAdvice").val()!=="" && $("#fenXiScore").val()!=="")
	         {
	              $.ajax({
					type:'POST',
					url:url+"/postfenxiResult",
					dataType:"text",
					data:JSON.stringify(rej),
					success:function(data){
						console.log(data);
						var obj=JSON.parse(data);
						alert("问卷提交成功！")
						 	
						},
					error:function(xhr,errottext,errorstatus){
						alert(xhr.status+" "+xhr.statusText);
					}
	          		})
	          }
		else{
		 	alert("请填写完整！");
		}

	}
	
	function showPingYuePaper(courseId){
		$('#pingYue').show();
		$('#jiaoAn').hide();
		$('#jiangGao').hide();
		$('#zhongQi').hide();
		$('#chuTi').hide();
		$('#fenXi').hide();
		$('#Nothing').hide();

		$('#pingYueSubmit').click(function(){
			submitPingYueIndex(courseId);
		})
	}
	function submitPingYueIndex(courseId){
		console.log(courseId);
		var rej = {
			"courseId":courseId,
			"no1Answer":$('#pingYueQ1').val(),
			"no2Answer":$('#pingYueQ2').val(),
			"no3Answer":$('#pingYueQ3').val(),
			"no4Answer":$('#pingYueQ4').val(),
			"no5Answer":$('#pingYueQ5').val(),
			"advice":$('#pingYueAdvice').val(),
			"score":$('#pingYueScore').val()
		}
		var printrej=JSON.stringify(rej);
		//打印rej对象
		console.log(printrej);
		if($("#pingYueQ1").val()!=="" && $("#pingYueQ2").val()!=="" && $("#pingYueQ3").val()!=="" && $("#pingYueQ4").val()!=="" && $("#pingYueQ5").val()!=="" && $("#pingYueAdvice").val()!=="" && $("#pingYueScore").val()!=="")
	         {
	              $.ajax({
					type:'POST',
					url:url+"/postpingyueResult",
					dataType:"text",
					data:JSON.stringify(rej),
					success:function(data){
						console.log(data);
						var obj=JSON.parse(data);
						alert("问卷提交成功！")
						 	
						},
					error:function(xhr,errottext,errorstatus){
						alert(xhr.status+" "+xhr.statusText);
					}
	          		})
	          }
		else{
		 	alert("请填写完整！");
		}

	}
	
	function showChuTiPaper(courseId){
		$('#pingYue').hide();
		$('#jiaoAn').hide();
		$('#jiangGao').hide();
		$('#zhongQi').hide();
		$('#chuTi').show();
		$('#fenXi').hide();
		$('#Nothing').hide();
		 	
		$('#chuTiSubmit').click(function(){
			submitChuTiIndex(courseId);
		})
	}
	function submitChuTiIndex(courseId){
		console.log(courseId);
		var rej = {
			"courseId":courseId,
			"no1Answer":$('#chuTiQ1').val(),
			"no2Answer":$('#chuTiQ2').val(),
			"no3Answer":$('#chuTiQ3').val(),
			"no4Answer":$('#chuTiQ4').val(),
			"no5Answer":$('#chuTiQ5').val(),
			"no6Answer":$('#chuTiQ5').val(),
			"no7Answer":$('#chuTiQ5').val(),
			"no8Answer":$('#chuTiQ5').val(),
			"no9Answer":$('#chuTiQ5').val(),
			"no10Answer":$('#chuTiQ5').val(),
			"advice":$('#chuTiAdvice').val(),
			"score":$('#chuTiScore').val()
		}
		var printrej=JSON.stringify(rej);
		//打印rej对象
		console.log(printrej);
		if($("#chuTiQ1").val()!=="" && $("#chuTiQ2").val()!=="" && $("#chuTiQ3").val()!=="" && $("#chuTiQ4").val()!=="" && $("#chuTiQ5").val()!=="" && $("#chuTiQ6").val()!=="" && $("#chuTiQ7").val()!=="" && $("#chuTiQ8").val()!=="" && $("#chuTiQ9").val()!=="" && $("#chuTiQ10").val()!=="" && $("#chuTiAdvice").val()!=="" && $("#chuTiScore").val()!=="")
	         {
	              $.ajax({
					type:'POST',
					url:url+"/postchutiResult",
					dataType:"text",
					data:JSON.stringify(rej),
					success:function(data){
						console.log(data);
						var obj=JSON.parse(data);
						alert("问卷提交成功！")
						 	
						},
					error:function(xhr,errottext,errorstatus){
						alert(xhr.status+" "+xhr.statusText);
					}
	          		})
	          }
		else{
		 	alert("请填写完整！");
		}

	}

	function showZhongQiPaper(courseId){
		$('#pingYue').hide();
		$('#jiaoAn').hide();
		$('#jiangGao').hide();
		$('#zhongQi').show();
		$('#chuTi').hide();
		$('#fenXi').hide();
		$('#Nothing').hide();

		$('#zhongQiSubmit').click(function(){
			submitZhongQiIndex(courseId);
		})
	}
	function submitZhongQiIndex(courseId){
		console.log(courseId);
		var rej = {
			"courseId":courseId,
			"dayiAnswer":$('#chuTiQ1').val(),
			"buzhiAnswer":$('#chuTiQ2').val(),
			"pigaiAnswer":$('#chuTiQ3').val(),
			"chuqiAnswer":$('#chuTiQ4').val(),
			"score":$('#chuTiScore').val()
		}
		var printrej=JSON.stringify(rej);
		//打印rej对象
		console.log(printrej);
		if($("#chuTiQ1").val()!=="" && $("#chuTiQ2").val()!=="" && $("#chuTiQ3").val()!=="" && $("#chuTiQ4").val()!=="" && $("#chuTiQ5").val()!=="" && $("#chuTiQ6").val()!=="" && $("#chuTiQ7").val()!=="" && $("#chuTiQ8").val()!=="" && $("#chuTiQ9").val()!=="" && $("#chuTiQ10").val()!=="" && $("#chuTiAdvice").val()!=="" && $("#chuTiScore").val()!=="")
	         {
	              $.ajax({
					type:'POST',
					url:url+"/postZhongQiResult",
					dataType:"text",
					data:JSON.stringify(rej),
					success:function(data){
						console.log(data);
						var obj=JSON.parse(data);
						alert("问卷提交成功！")
						 	
						},
					error:function(xhr,errottext,errorstatus){
						alert(xhr.status+" "+xhr.statusText);
					}
	          		})
	          }
		else{
		 	alert("请填写完整！");
		}
	}
	

	function showJiaoAnPaper(courseId){
		$('#pingYue').hide();
		$('#jiaoAn').show();
		$('#jiangGao').hide();
		$('#zhongQi').hide();
		$('#chuTi').hide();
		$('#fenXi').hide();
		$('#Nothing').hide();

		var obj={
			'courseId':courseId
		}
		var params=JSON.stringify(obj);
		$.ajax({
			type:'POST',
			url:url+"/getJiaoAnResult",
			dataType:'text',
			data:params,
			success:function(data){
				var infoObj=JSON.parse(data);
				console.log(infoObj);
				console.log(infoObj.teacherName);
				// document.getElementById("teacherName").value = infoObj.teacherName;
				// console.log(infoObj.zhiCheng);
				// document.getElementById("zhiCheng").value = infoObj.zhiCheng;
				// document.getElementById("xueYuan").value = infoObj.xueYuan;
				// document.getElementById("courseName").value = infoObj.courseName;
				// document.getElementById("courseType").value = infoObj.result.fenLei;
				// document.getElementById("courseTime").value = infoObj.result.time;

				$("#teacherName").html(infoObj.teacherName);
				$("#zhiCheng").html(infoObj.zhiCheng);
				$("#xueYuan").html(infoObj.xueYuan);
				$("#courseName").html(infoObj.courseName);
				$("#courseType").html(infoObj.result.fenLei);
				$("#courseTime").html(infoObj.result.time);
			}
		})
					// showJiaoAnInfo(getObj);
		// getJiaoAnInfo(courseId);
		$('#jiaoAnSubmit').click(function(){
			submitJiaoAnIndex(courseId);
		})
	}
	// function getJiaoAnInfo(courseId){
		
	// 		}
	// 	})
	// }
	// function showJiaoAnInfo(infoObj){
		
	// }
	function submitJiaoAnIndex(courseId){
		console.log(courseId);
		var rej = {
			"courseId":courseId,
			"xinkeAnswer":$('#openClass').val(),
			"jiaoanAnswer":$('#completT').val(),
			"no1Answer":$('#jiaoAnQ1').val(),
			"no1Text":$('#express1').val(),
			"no2Answer":$('#jiaoAnQ2').val(),
			"no2Text":$('#express2').val(),
			"no3Answer":$('#jiaoAnQ3').val(),
			"no3Text":$('#express3').val(),
			"no4Answer":$('#jiaoAnQ4').val(),
			"no4Text":$('#express4').val(),
			"no5Answer":$('#jiaoAnQ5').val(),
			"no5Text":$('#express5').val(),
			"no6Answer":$('#jiaoAnQ6').val(),
			"no6Text":$('#express6').val(),
			"no7Answer":$('#jiaoAnQ7').val(),
			"no7Text":$('#express7').val(),
			"no8Answer":$('#jiaoAnQ8').val(),
			"no8Text":$('#express8').val(),
			"zongtiAnswer":$('#jiaoAnQ9').val(),
			"score":$('#jiaoAnScore').val()
		}
		var printrej=JSON.stringify(rej);
		//打印rej对象
		console.log(printrej);
		if($("#openClass").val()!=="" && $("#completT").val()!=="" && $("#jiaoAnQ1").val()!=="" && $("#express1").val()!=="" && $("#jiaoAnQ2").val()!=="" && $("#express2").val()!==""  && $("#jiaoAnQ3").val()!=="" && $("#express3").val()!=="" && $("#jiaoAnQ4").val()!=="" && $("#express4").val()!=="" && $("#jiaoAnQ5").val()!=="" && $("#express5").val()!=="" && $("#jiaoAnQ6").val()!=="" && $("#express6").val()!=="" && $("#jiaoAnQ7").val()!=="" && $("#express7").val()!=="" && $("#jiaoAnQ8").val()!=="" && $("#express8").val()!=="" && $("#jiaoAnQ9").val()!=="" && $("#jiaoAnScore").val()!=="")
	         {
	              $.ajax({
					type:'POST',
					url:url+"/postJiaoAnResult",
					dataType:"text",
					data:JSON.stringify(rej),
					success:function(data){
						console.log(data);
						var obj=JSON.parse(data);
						alert("问卷提交成功！")
						 	
						},
					error:function(xhr,errottext,errorstatus){
						alert(xhr.status+" "+xhr.statusText);
					}
	          		})
	          }
		else{
		 	alert("请填写完整！");
		}
	}
	
	function showJiangGaoPaper(courseId){
		$('#pingYue').hide();
		$('#jiaoAn').hide();
		$('#jiangGao').show();
		$('#zhongQi').hide();
		$('#chuTi').hide();
		$('#fenXi').hide();
		$('#Nothing').hide();

		$('#jiangGaoSubmit').click(function(){
			submitJiangGaoIndex(courseId);
		})
	}
	function submitJiangGaoIndex(courseId){
		console.log(courseId);
		var rej = {
			"courseId":courseId,
			"no1Answer":$('#jiangGaoQ1').val(),
			"no1Text":$('#text1').val(),
			"no2Answer":$('#jiangGaoQ2').val(),
			"no2Text":$('#text2').val(),
			"no3Answer":$('#jiangGaoQ3').val(),
			"no3Text":$('#text3').val(),
			"score":$('#jiangGaoScore').val()
		}
		var printrej=JSON.stringify(rej);
		//打印rej对象
		console.log(printrej);
		if($("#jiangGaoQ1").val()!=="" && $("#text1").val()!=="" && $("#jiangGaoQ2").val()!=="" && $("#text2").val()!=="" && $("#jiangGaoQ3").val()!=="" && $("#text3").val()!=="")
	         {
	              $.ajax({
					type:'POST',
					url:url+"/postJiangGaoResult",
					dataType:"text",
					data:JSON.stringify(rej),
					success:function(data){
						console.log(data);
						var obj=JSON.parse(data);
						alert("问卷提交成功！")
						 	
						},
					error:function(xhr,errottext,errorstatus){
						alert(xhr.status+" "+xhr.statusText);
					}
	          		})
	          }
		else{
		 	alert("请填写完整！");
		}
	}
	
	
	})