
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
			"no1Answer":$('input[name="fenXiQ1"]:checked').val(),
			"no2Answer":$('input[name="fenXiQ2"]:checked').val(),
			"no3Answer":$('input[name="fenXiQ3"]:checked').val(),
			"no4Answer":$('input[name="fenXiQ4"]:checked').val(),
			"no5Answer":$('input[name="fenXiQ5"]:checked').val(),
			"advice":$('#fenXiAdvice').val(),
			"score":$('#fenXiScore').val()
		}
		var printrej=JSON.stringify(rej);
		//打印rej对象
		console.log(printrej);
		if($('input[name="fenXiQ1"]:checked').val()!=="" && $('input[name="fenXiQ2"]:checked').val()!=="" && $('input[name="fenXiQ3"]:checked').val()!=="" && $('input[name="fenXiQ4"]:checked').val()!=="" && $('input[name="fenXiQ5"]:checked').val()!=="" && $("#fenXiAdvice").val()!=="" && $("#fenXiScore").val()!=="")
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
			"no1Answer":$('input[name="pingYueQ1"]:checked').val(),
			"no2Answer":$('input[name="pingYueQ2"]:checked').val(),
			"no3Answer":$('input[name="pingYueQ3"]:checked').val(),
			"no4Answer":$('input[name="pingYueQ4"]:checked').val(),
			"no5Answer":$('input[name="pingYueQ5"]:checked').val(),
			"advice":$('#pingYueAdvice').val(),
			"score":$('#pingYueScore').val()
		}
		var printrej=JSON.stringify(rej);
		//打印rej对象
		console.log(printrej);
		if($('input[name="pingYueQ1"]:checked').val()!=="" && $('input[name="pingYueQ2"]:checked').val()!=="" && $('input[name="pingYueQ3"]:checked').val()!=="" && $('input[name="pingYueQ4"]:checked').val()!=="" && $('input[name="pingYueQ5"]:checked').val()!=="" && $("#pingYueAdvice").val()!=="" && $("#pingYueScore").val()!=="")
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
			"no1Answer":$('input[name="chuTiQ1"]:checked').val(),
			"no2Answer":$('input[name="chuTiQ2"]:checked').val(),
			"no3Answer":$('input[name="chuTiQ3"]:checked').val(),
			"no4Answer":$('input[name="chuTiQ4"]:checked').val(),
			"no5Answer":$('input[name="chuTiQ5"]:checked').val(),
			"no6Answer":$('input[name="chuTiQ6"]:checked').val(),
			"no7Answer":$('input[name="chuTiQ7"]:checked').val(),
			"no8Answer":$('input[name="chuTiQ8"]:checked').val(),
			"no9Answer":$('input[name="chuTiQ9"]:checked').val(),
			"no10Answer":$('input[name="chuTiQ10"]:checked').val(),
			"advice":$('#chuTiAdvice').val(),
			"score":$('#chuTiScore').val()
		}
		var printrej=JSON.stringify(rej);
		//打印rej对象
		console.log(printrej);
		if($('input[name="chuTiQ1"]:checked').val()!=="" && $('input[name="chuTiQ2"]:checked').val()!=="" && $('input[name="chuTiQ3"]:checked').val()!=="" && $('input[name="chuTiQ4"]:checked').val()!=="" && $('input[name="chuTiQ5"]:checked').val()!=="" && $('input[name="chuTiQ6"]:checked').val()!=="" && $('input[name="chuTiQ7"]:checked').val()!=="" && $('input[name="chuTiQ8"]:checked').val()!=="" && $('input[name="chuTiQ9"]:checked').val()!=="" && $('input[name="chuTiQ10"]:checked').val()!=="" && $("#chuTiAdvice").val()!=="" && $("#chuTiScore").val()!=="")
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
			"dayiAnswer":$('#zhongQiQ1').val(),
			"buzhiAnswer":$('#zhongQiQ2').val(),
			"pigaiAnswer":$('#zhongQiQ3').val(),
			"chuqinAnswer":$('#zhongQiQ4').val(),
			"score":$('#zhongQiScore').val()
		}
		var printrej=JSON.stringify(rej);
		//打印rej对象
		console.log(printrej);
		if($("#zhongQiQ1").val()!=="" && $("#zhongQiQ2").val()!=="" && $("#zhongQiQ3").val()!=="" && $("#zhongQiQ4").val()!=="" && $("#zhongQiScore").val()!=="")
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
			"xinkeAnswer": $('input[name="openClass"]:checked').val(),
			"jiaoanAnswer":$('input[name="completT"]:checked').val(),
			"no1Answer":$('input[name="jiaoAnQ1"]:checked').val(),
			"no1Text":$('#express1').val(),
			"no2Answer":$('input[name="jiaoAnQ2"]:checked').val(),
			"no2Text":$('#express2').val(),
			"no3Answer":$('input[name="jiaoAnQ3"]:checked').val(),
			"no3Text":$('#express3').val(),
			"no4Answer":$('input[name="jiaoAnQ4"]:checked').val(),
			"no4Text":$('#express4').val(),
			"no5Answer":$('input[name="jiaoAnQ5"]:checked').val(),
			"no5Text":$('#express5').val(),
			"no6Answer":$('input[name="jiaoAnQ6"]:checked').val(),
			"no6Text":$('#express6').val(),
			"no7Answer":$('input[name="jiaoAnQ7"]:checked').val(),
			"no7Text":$('#express7').val(),
			"no8Answer":$('input[name="jiaoAnQ8"]:checked').val(),
			"no8Text":$('#express8').val(),
			"zongtiAnswer":$('input[name="jiaoAnQ9"]:checked').val(),
			"score":$('#jiaoAnScore').val()
		}
		var printrej=JSON.stringify(rej);
		//打印rej对象
		console.log(printrej);
		if($('input[name="openClass"]:checked').val()!=="" && $('input[name="completT"]:checked').val()!=="" && $('input[name="jiaoAnQ1"]:checked').val()!=="" && $('input[name="jiaoAnQ2"]:checked').val()!=="" && $('input[name="jiaoAnQ3"]:checked').val()!=="" && $('input[name="jiaoAnQ4"]:checked').val()!=="" &&$('input[name="jiaoAnQ5"]:checked').val()!=="" && $('input[name="jiaoAnQ6"]:checked').val()!=="" && $('input[name="jiaoAnQ7"]:checked').val()!=="" && $('input[name="jiaoAnQ8"]:checked').val()!=="" && $('input[name="jiaoAnQ9"]:checked').val()!=="" && $("#jiaoAnScore").val()!=="")
	         {

	              $.ajax({
					type:'POST',
					url:url+"/postJiaoAnResult",
					dataType:"text",
					data:JSON.stringify(rej),

					success:function(data){
						console.log(data);
						var obj=JSON.parse(data);
						console.log(obj);
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
			"no1Answer":$('input[name="jiangGaoQ1"]:checked').val(),
			"no1Text":$('#text1').val(),
			"no2Answer":$('input[name="jiangGaoQ2"]:checked').val(),
			"no2Text":$('#text2').val(),
			"no3Answer":$('input[name="jiangGaoQ3"]:checked').val(),
			"no3Text":$('#text3').val(),
			"score":$('#jiangGaoScore').val()
		}
		var printrej=JSON.stringify(rej);
		//打印rej对象
		console.log(printrej);
		if($('input[name="jiangGaoQ1"]:checked').val()!=="" && $('input[name="jiangGaoQ2"]:checked').val()!=="" && $('input[name="jiangGaoQ3"]:checked').val()!=="" && $('#jiangGaoScore').val()!=="")
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