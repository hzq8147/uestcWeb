
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
			showJiaoAnPaper();
			break;
			case'2':
			showJiangGaoPaper();
			break;
			case'3':
			showZhongQiPaper();
			break;
			case'4':
			showChuTiPaper();
			break;
			case'5':
			showPingYuePaper();
			break;
			case'6':
			showFenXiPaper();
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
	function showFenXiPaper(){
		$('#fenXi').show();
		$('#jiaoAn').hide();
		$('#jiangGao').hide();
		$('#zhongQi').hide();
		$('#chuTi').hide();
		$('#pingYue').hide();
		$('#Nothing').hide();
	}
	
	function showPingYuePaper(){
		$('#pingYue').show();
		$('#jiaoAn').hide();
		$('#jiangGao').hide();
		$('#zhongQi').hide();
		$('#chuTi').hide();
		$('#fenXi').hide();
		$('#Nothing').hide();
	}
	
	function showChuTiPaper(){
		$('#pingYue').hide();
		$('#jiaoAn').hide();
		$('#jiangGao').hide();
		$('#zhongQi').hide();
		$('#chuTi').show();
		$('#fenXi').hide();
		$('#Nothing').hide();
		 	
	}

	function showZhongQiPaper(){
		$('#pingYue').hide();
		$('#jiaoAn').hide();
		$('#jiangGao').hide();
		$('#zhongQi').show();
		$('#chuTi').hide();
		$('#fenXi').hide();
		$('#Nothing').hide();
	}
	

	function showJiaoAnPaper(){
		$('#pingYue').hide();
		$('#jiaoAn').show();
		$('#jiangGao').hide();
		$('#zhongQi').hide();
		$('#chuTi').hide();
		$('#fenXi').hide();
		$('#Nothing').hide();
	}
	
	function showJiangGaoPaper(){
		$('#pingYue').hide();
		$('#jiaoAn').hide();
		$('#jiangGao').show();
		$('#zhongQi').hide();
		$('#chuTi').hide();
		$('#fenXi').hide();
		$('#Nothing').hide();
	}
	
	
	})