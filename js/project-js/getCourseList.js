
const url="http://101.132.37.10:8080/uestcTMP";
$(function(){
	
	var userId = getUserId();
	var courseList;
	getCourse(userId);
	
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
				showCourse();
				}
		})
		
	}
	function showTerm(){
		//初始化显示学期下拉菜单内容
		var termSel=document.getElementById('term_select');
		console.log(termSel);
		var term=new Array();

		courseList.forEach((item,index) =>{
			var tmp="1";
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

		if (term.length>0 && courseName.length>0){
			//选中某课程
			mainControl(featureSel);
		}
	}
	$("#course_select").change(function(){
		anyChange();
	})
	$("#feature_select").change(function(){
		anyChange();
	})
	function mainControl(featureSel){
		switch(featureSel){
			case'-1':
			break;
			case'0':
			showOneCourse();
			break;
		}
	}
	function showOneCourse(){
		var term=$('#term_select').val();
		var courseName=$('#course_select').val();
		
		var main=document.getElementById('main');
		main.innerHTML='';
		var table=document.createElement('table');
		table.setAttribute('class','tablelist');

		var thead=document.createElement('thead');
		thead.innerHTML=`<tr>
						<th>课程名称</th>
						<th>学期</th>
						<th>讲稿评分</th>
						<th>教案评分</th>
						<th>中期教学评分</th>
						<th>专家听课评分</th>
						<th>学生评教评分</th>
						<th>试卷出题检查评分</th>
						<th>试卷评阅检查评分</th>
						<th>试卷分析报告评分</th>
						<th>综合评分</th>
						</tr>
						`
		table.appendChild(thead);
		courseList.forEach((item,index)=>{
			if (item.term==term && item.name==courseName){
				let tr=document.createElement('tr');
				tr.innerHTML="";
				tr.innerHTML+=`<td>${item.name}</td>`;

				//tr.innerHTML+="<td>"+item.name+"</td>";
				tr.innerHTML+=`<td>${item.term}</td>`;
				tr.innerHTML+=`<td>${item.jiangGaoScore}</td>`;
				tr.innerHTML+=`<td>${item.jiaoAnScore}</td>`;
				tr.innerHTML+=`<td>${item.zhongQiScore}</td>`;
				tr.innerHTML+=`<td>${item.tingKeScore}</td>`;
				tr.innerHTML+=`<td>${item.pingJiaoScore}</td>`;
				tr.innerHTML+=`<td>${item.chuTiScore}</td>`;
				tr.innerHTML+=`<td>${item.pingYueScore}</td>`;
				tr.innerHTML+=`<td>${item.baoGaoScore}</td>`;
				tr.innerHTML+=`<td>${item.totalScore}</td>`;
				table.appendChild(tr);
			}
		})

		main.appendChild(table);

	};
	function showCourse(){
		var main=document.getElementById('main');
		var table=document.createElement('table');
		table.setAttribute('class','tablelist');

		var thead=document.createElement('thead');
		thead.innerHTML=`<tr>
						<th>课程名称</th>
						<th>学期</th>
						<th>讲稿评分</th>
						<th>教案评分</th>
						<th>中期教学评分</th>
						<th>专家听课评分</th>
						<th>学生评教评分</th>
						<th>试卷出题检查评分</th>
						<th>试卷评阅检查评分</th>
						<th>试卷分析报告评分</th>
						<th>综合评分</th>
						</tr>
						`
		table.appendChild(thead);
		courseList.forEach((item,index) =>{
			let tr=document.createElement('tr');
			tr.innerHTML="";
			tr.innerHTML+=`<td>${item.name}</td>`;

			//tr.innerHTML+="<td>"+item.name+"</td>";
			tr.innerHTML+=`<td>${item.term}</td>`;
			tr.innerHTML+=`<td>${item.jiangGaoScore}</td>`;
			tr.innerHTML+=`<td>${item.jiaoAnScore}</td>`;
			tr.innerHTML+=`<td>${item.zhongQiScore}</td>`;
			tr.innerHTML+=`<td>${item.tingKeScore}</td>`;
			tr.innerHTML+=`<td>${item.pingJiaoScore}</td>`;
			tr.innerHTML+=`<td>${item.chuTiScore}</td>`;
			tr.innerHTML+=`<td>${item.pingYueScore}</td>`;
			tr.innerHTML+=`<td>${item.baoGaoScore}</td>`;
			tr.innerHTML+=`<td>${item.totalScore}</td>`;
			table.appendChild(tr);
		})
		main.appendChild(table);
		
	}
})
	