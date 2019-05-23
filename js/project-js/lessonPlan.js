const url="http://127.0.0.1:8080/uestcTMP";
$(function(){
	
	var fileurl=url+'/uploadLessonPlan';
	var userId = getUserId();
	var courseList;
	var courseId;
	var term;
	var courseName;
	getCourse(userId);
	
	$('#submits').click(function(){
		var fileObj=document.getElementById('fileField').files[0];
		var fileController=fileurl;

		var form=new FormData();
		form.append("courseId",courseId);
		form.append('file',fileObj);
		$.ajax({
			url:fileurl,
			type:"POST",
			data:form,
			contentType:false,
			processData:false,
			success:function(data){
				alert('上传成功');
				anyChange();
			}
		})

	})
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
			

				//显示课程列表
				showTerm();
				}
		})
		
	}
	function anyChange(){
		var table=document.getElementById('fileTable');
		table.innerHTML="";
			table.innerHTML+=``
		//两个下拉菜单任意change都会触发
		term=$('#term_select').val();
		courseName=$('#course_select').val();
		courseList.forEach((item,index)=>{
			if (item.term==term && item.name==courseName){
				courseId=item.courseId;
			}
		})
		if (term.length>0 && courseName.length>0){
			//选中某课程,更改文件列表
			mainControl();
		}
	}
	function mainControl(){

		//获取文件列表
		var obj={
			'courseId':courseId,
		}
		var params=JSON.stringify(obj);
		$.ajax({
			type:'POST',
			url:url+"/getLessonPlanFileInf",
			dataType:"text",
			data:params,
			success:function(data){
				var fileInf=JSON.parse(data);
				showFile(fileInf);
			}
		})

	}
	function showFile(fileInf){
		var table=document.getElementById('fileTable');
		
	
		if (fileInf.errId==1){
			table.innerHTML=`
			<tr>
			<td>1</td>
			<td>${term}</td>
			<td>${courseName}</td>
			<td>${fileInf.files.name}</td>
			<td>${fileInf.files.size}字节</td>
			<td>${fileInf.files.date}</td>
			<td><a href="${url}/uploadLessonPlan/${fileInf.files.fileName}" download="${fileInf.files.name}">下载</a></td>
			</tr>
		`
		}
		
	}
	$("#course_select").change(function(){
		anyChange();
	})
	$("#feature_select").change(function(){
		anyChange();
	})
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
		anyChange();
	}
	})