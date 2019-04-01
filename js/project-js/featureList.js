const url="http://localhost:8080/uestcTMP";
$(function(){
	var identity=getIdentity();
	getList(identity);

	function getList (identity) {
		var params={
			'indentity':identity
		}
		$.ajax({
			type:'POST',
			url:url+"/getFeatureList",
			dataType:'text',
			data:params,
			success:function(data){
				console.log(data);
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

			let menuLevelOne = document.createElement('div')
			menuLevelOne.innerHTML = `> ${item.name}`
			menuLevelOne.setAttribute('menuIndex', index)
			menuLevelOne.setAttribute('name', 'menuLevelOne')
			menuLevelOne.className = 'menuLevelOne'
			menuObj.appendChild(menuLevelOne)
			menuLevelOne.addEventListener('click', function(){
				clearMenuLevelTwo()
				dispalyMenuLevelTwo(index)
			})

			let menuLevelTwo = []
			item.menuList.forEach((levelTwoItem,levelTwoIndex) => {
				let menuLevelTwo = document.createElement('div')
				menuLevelTwo.innerHTML = `<a href="${levelTwoItem.url}" target="mainFrame" class="menuTwo">${levelTwoItem.name}</a>`
				menuLevelTwo.setAttribute('menuIndex', index)
				menuLevelTwo.setAttribute('levelTwoIndex', levelTwoIndex)
				menuLevelTwo.setAttribute('name', 'menuLevelTwo')
				menuLevelTwo.className = 'menuLevelTwo'
				menuObj.appendChild(menuLevelTwo)

			})
		})
		dispalyMenuLevelTwo(0)
	}
	function getIdentity(){
		if (!window.localstorage){
			
		}else{
			var storage=window.localStorage;
			var user=JSON.parse(storage.getItem("user"));
			return user.identity;
			d
		}
	}
	
})