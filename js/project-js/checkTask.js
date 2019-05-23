
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
	function getChuTiResult(courseId){
		var obj={
			'courseId':courseId
		}
		var params=JSON.stringify(obj);
		$.ajax({
			type:'POST',
			url:url+"/getChuTiResult",
			dataType:'text',
			data:params,
			success:function(data){
				var getObj=JSON.parse(data);
				
				showChuTiResult(getObj);
			}
		})
	}
	function showChuTiResult(resultObj){
		var main=document.getElementById('main');
		 main.innerHTML="";
		 if (resultObj.errId=="0"){
		 		main.innerHTML="<div>该课程暂无评价数据</div>";
		 	}else{
		 		var table=document.createElement('div');
				table.setAttribute('class','container');
				table.setAttribute('style','width:900px');

				table.innerHTML=`<div class="row">
									<div class="col-xs-1">序号</div>
									<div class="col-xs-7">检查指标</div>
									<div class="col-xs-4">评级</div>
								</div>`;
				var question=new Array('是否有AB卷、AB卷标准答案及评分标准、试卷审题说明、试卷批阅签字表、试卷分析报告、课程成绩构成申请表及审批程序','是否使用标准模板','文字、插图是否工整、清楚','题间是否留有合适的答题空位','A、B卷的雷同率是否小于30%','近三年试卷雷同率是否小于25%','试题考查的内容是否紧扣课程教学大纲','试题是否存在学术性错误','试题量是否适中','难易程度是否适中')
				for (i=0;i<10;i++){
					table.innerHTML+=`<div class="row">
										<div class="col-xs-1">${i+1}</div>
										<div class="col-xs-7">${question[i]}</div>
										<div class="col-xs-4">${resultObj.answer[i]}</div>
									</div>`;
				}
				table.innerHTML+=`<div class="row" >
									<div class="col-xs-3"style="height:100px">意见与建议</div>
									<div class="col-xs-9"style="height:100px">${resultObj.advice}</div>
							</div>`
				table.innerHTML+=`<div class="row">
									<div class="col-xs-12"style="text-align:left">分数：${resultObj.score}</div>
									</div>`
				table.innerHTML+=`<div style="height:20px"></div>`
				resultObj.problem.forEach((item,index)=>{
					table.innerHTML+=`<div class="row" >
										<div class="col-xs-12"style="text-align:left">${item.questionNo}.${question[item.questionNo-1]}</div>
										</div>`
					table.innerHTML+=`<div class="row">
										<div class="col-xs-12" style="text-align:left;height:50px">${item.text}</div>
									  </div>`
				})
				main.appendChild(table);
		 	}
	}

	function getZhongQiResult(courseId){
		var obj={
			'courseId':courseId
		}
		var params=JSON.stringify(obj);
		$.ajax({
			type:'POST',
			url:url+"/getZhongQiResult",
			dataType:'text',
			data:params,
			success:function(data){
				var getObj=JSON.parse(data);
				
				showZhongQiResult(getObj);
			}
		})
	}
	function showZhongQiResult(resultObj){
		var main=document.getElementById('main');
		main.innerHTML="";
		if (resultObj.result==null){
			main.innerHTML="<div>该课程暂无评价数据</div>";
		}else{
			var table=document.createElement('table');
			table.setAttribute('class','tablelist');
			table.innerHTML=`<tr>
								<td width="100px">答疑次数：</td>
								<td>${resultObj.result.dayiAnswer}</td>
							</tr>
							<tr>
								<td width="100px">作业布置次数：</td>
								<td>${resultObj.result.buzhiAnswer}</td>
							</tr>
							<tr>
								<td width="100px">作业批改次数：</td>
								<td>${resultObj.result.pigaiAnswer}</td>
							</tr>
							<tr>
								<td width="100px">出勤率</td>
								<td>${resultObj.result.chuqinAnswer}</td>
							</tr>
							<tr>
								<td width="100px">分数</td>
								<td>${resultObj.score}</td>
							</tr>

							`
			main.appendChild(table);

		}	
	}
	function getJiaoAnResult(courseId){
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
				var getObj=JSON.parse(data);
				
				showJiaoAnResult(getObj);
			}
		})
	}

	function showJiaoAnResult(resultObj){
		var main=document.getElementById('main');
		main.innerHTML="";

		if (resultObj.result==null){
			main.innerHTML="<div>该课程暂无评价数据</div>";
		}else{
			var table=document.createElement('div');
			table.setAttribute('class','container');
			table.setAttribute('style','width:900px');
			table.innerHTML+=`<div class="row">
								<div class="col-xs-2">教师姓名</div>
								<div class="col-xs-2">${resultObj.teacherName}</div>
								<div class="col-xs-2">职称</div>
								<div class="col-xs-2">${resultObj.zhiCheng}</div>
								<div class="col-xs-2">所在学院</div>
								<div class="col-xs-2">${resultObj.xueYuan}</div>
								</div>
								`
			table.innerHTML+=`<div class="row">
								<div class="col-xs-2">课程名称</div>
								<div class="col-xs-4">${resultObj.courseName}</div>
								<div class="col-xs-2">课程类别</div>
								<div class="col-xs-2">${resultObj.result.fenLei}</div>
								<div class="col-xs-1">学时</div>
								<div class="col-xs-1">${resultObj.result.time}</div>								
			`
			var xinkeStr;
			if (resultObj.result.xinkeAnswer=="A"){
				xinkeStr="是";
			}else{
				xinkeStr="否";
			}
			table.innerHTML+=`<div class="row">
									<div class="col-xs-4">是否新开课</div>
									<div class="col-xs-8">${xinkeStr}</div>
							</div>`
			var jiaoStr1="( )",jiaoStr2="( )",jiaoStr3="( )";
			switch(resultObj.result.jiaoanAnswer)
			{
				case"A":
				jiaoStr1="(√)";
				break;
				case"B":
				jiaoStr2="(√)";
				break;
				case"C":
				jiaoStr3="(√)";
			}
			table.innerHTML+=`<div class="row">
									<div class="col-xs-3">教案完成情况</div>
									<div class="col-xs-3">全部完成${jiaoStr1}</div>
									<div class="col-xs-3">已完成1/2及以上${jiaoStr2}</div>
									<div class="col-xs-3">完成1/2以下${jiaoStr3}</div>
							</div>`
			table.innerHTML+=`<div class="row">
									<div class="col-xs-2">序号</div>
									<div class="col-xs-4">问题描述</div>
									<div class="col-xs-2" style="white-space:pre"> </div>
									<div class="col-xs-4">教案完成情况</div>
						</div>`
			var question=new Array('课程及教师信息填写完整','多位教师承担同一门课程教案是否雷同','教学内容及要求','教学重点、难点','重点、难点的解决办法（教学设计）','作业','参考资料','提前撰写教学后记');
			var answer=new Array(resultObj.result.no1Answer,resultObj.result.no2Answer,resultObj.result.no3Answer,resultObj.result.no4Answer,resultObj.result.no5Answer,resultObj.result.no6Answer,resultObj.result.no7Answer,resultObj.result.no8Answer);
			var text=new Array(resultObj.result.no1Text,resultObj.result.no2Text,resultObj.result.no3Text,resultObj.result.no4Text,resultObj.result.no5Text,resultObj.result.no6Text,resultObj.result.no7Text,resultObj.result.no8Text);
			
			for (let i=0;i<8;i++){
				table.innerHTML+=`<div class="row">
									<div class="col-xs-2">${i+1}</div>
									<div class="col-xs-4">${question[i]}</div>
									<div class="col-xs-2">${answer[i]} </div>
									<div class="col-xs-4">${text[i]}</div>
						</div>`
			}
			var zongStr1="( )",zongStr2="( )",zongStr3="( )";
			switch(resultObj.result.zongtiAnswer)
			{
				case"A":
				zongStr1="(√)";
				break;
				case"B":
				zongStr2="(√)";
				break;
				case"C":
				zongStr3="(√)";
			}
			table.innerHTML+=`<div class="row">
									<div class="col-xs-3">课程总体质量</div>
									<div class="col-xs-3">好${zongStr1}</div>
									<div class="col-xs-3">较好${zongStr2}</div>
									<div class="col-xs-3">较差${zongStr3}</div>
							 </div>`
			table.innerHTML+=`<div class="row">
									<div class="col-xs-2">分数：${resultObj.score}</div>
								</div>`
			main.appendChild(table);
		}
	}
	function getJiangGaoResult(courseId){
		var obj={
			'courseId':courseId
		}
		var params=JSON.stringify(obj);
		$.ajax({
			type:'POST',
			url:url+"/getJiangGaoResult",
			dataType:'text',
			data:params,
			success:function(data){
				var getObj=JSON.parse(data);
				showJiangGaoResult(getObj);
			}
		})
	}
	function showJiangGaoResult(resultObj){
		var main=document.getElementById('main');
		main.innerHTML="";
		if (resultObj.result==null){
			main.innerHTML="<div>该课程暂无评价数据</div>";
		}else{
			var table=document.createElement('table');
			table.setAttribute('class','tablelist');
			var thead=document.createElement('thead');
			thead.innerHTML=`<tr>
							<th>序号</th>
							<th>问题描述</th>
							<th>评价</th>
							<th>备注</th>
							 </tr>
							`;
			table.appendChild(thead);
			var question=new Array('讲稿内容完成程度（≥1/3）','讲稿教学内容与教学大纲的相关性','讲稿制作水平');
			var answer=new Array(resultObj.result.no1Answer,resultObj.result.no2Answer,resultObj.result.no3Answer);
			var text=new Array(resultObj.result.no1Text,resultObj.result.no2Text,resultObj.result.no3Text);
			
			for (let i=0;i<3;i++){
				let tr=document.createElement('tr');
				tr.innerHTML=``;
				tr.innerHTML+=`<td>${i+1}</td>`;
				tr.innerHTML+=`<td>${question[i]}</td>`;
				tr.innerHTML+=`<td>${answer[i]}</td>`;
				tr.innerHTML+=`<td>${text[i]}</td>`;
				table.appendChild(tr);
			}
			let tr=document.createElement('tr');
			tr.setAttribute('width','100%');	
			tr.innerHTML=`评价：${resultObj.score}`;

			
			table.appendChild(tr);
			main.appendChild(table);
	}
	}
	
	
	})