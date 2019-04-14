
const url="http://101.132.37.10:8080/uestcTMP";
$(function(){
	
	var userId = getUserId();
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
				var getObj = JSON.parse(data);
				
				var courseJson=JSON.stringify(getObj);
				console.log(courseJson);

				//显示课程列表

				showCourse(getObj);
				}
		})
		
	}
	function showCourse(courseList){
		const table=document.getElementById('courses');
		courseList.forEach((item,index) =>{
			console.log("1");
			let tr=document.createElement('tr');
			tr.innerHTML="";
			tr.innerHTML+=`<td>${item.name}</td>`;
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
		
	}
})
	