
const url="https://rtlab.uestc.edu.cn/uestcTMP";
$(function(){	
	//导航切换
	$(".menuson li").click(function(){
		$(".menuson li.active").removeClass("active")
		$(this).addClass("active");
	});
	//下拉和相邻元素取消下拉
	$('.title').click(function(){
		var $ul = $(this).next('ul');
		$('dd').find('ul').slideUp();
		if($ul.is(':visible')){
			$(this).next('ul').slideUp();
		}else{
			$(this).next('ul').slideDown();
		}
	});
})	
$(function(){
	var identity=getIdentity();
	getList(identity);
	
	function getList (identity) {
		var params={
			'identity':identity
		}
		$.ajax({
			type:'POST',
			url:url+"/getFeatureList",
			dataType:'text',
			data:params,
			success:function(data){
				//console.log(data);
				var listData=JSON.parse(data);
				createList(listData);
			},
			error:function(xhr,errottext,errorstatus){
				alert(xhr.status+" "+xhr.statusText);
			}
		})
		// axios.get(url+"/getFeatureList")
		// .then(res => {
		// 	console.log(res.data);
		// 	//createList(res.data)
		// }, err => {
		// 	console.log(err)
		// })
	}
	function clearMenuLevelTwo () {
		let menuLevelTwoList = document.getElementsByName('menuLevelTwo')
		menuLevelTwoList.forEach(item => {
			item.style.display = 'none'
			item.style.height = '0px'
		})
	}
	function dispalyMenuLevelTwo (index) {
		let menuLevelTwoList = document.getElementsByName('menuLevelTwo')
		menuLevelTwoList.forEach(item => {
			if (item.getAttribute('menuIndex') == index) {
				item.style.display = 'block'
				item.style.height = '30px'
			}
		})
	}
	function createList (data) {
		
		data.menu.forEach((item,index) => {

			const menuObj = document.getElementById('menu')
			menuObj.className = 'menu'
			const ddone = document.createElement('dd')
			
			let menuLevelOne = document.createElement('div')
			menuLevelOne.innerHTML = `> ${item.name}`
			menuLevelOne.setAttribute('menuIndex', index)
			menuLevelOne.setAttribute('name', 'menuLevelOne')
			menuLevelOne.className = 'menuLevelOne'
			ddone.appendChild(menuLevelOne)
			
			menuLevelOne.addEventListener('click', function(){
				clearMenuLevelTwo()
				dispalyMenuLevelTwo(index)
			})

			let menuLevelTwo = []

			item.menuList.forEach((levelTwoItem,levelTwoIndex) => {
				let menuLevelTwo = document.createElement('li')
				menuLevelTwo.innerHTML = `<a href="${levelTwoItem.url}" target="mainFrame" class="menuTwo">${levelTwoItem.name}</a>`
				menuLevelTwo.setAttribute('menuIndex', index)
				menuLevelTwo.setAttribute('levelTwoIndex', levelTwoIndex)
				menuLevelTwo.setAttribute('name', 'menuLevelTwo')
				menuLevelTwo.className = 'menuson'
				
				ddone.appendChild(menuLevelTwo)
			})
			menuObj.appendChild(ddone)
		
			dispalyMenuLevelTwo(0)
		})
	}
	
	function getIdentity(){
		if (!window.localstorage){
			var storage=window.localStorage;
			var user=JSON.parse(storage.getItem("user"));
			console.log(user.identity);
			return user.identity;
		}
	}
})