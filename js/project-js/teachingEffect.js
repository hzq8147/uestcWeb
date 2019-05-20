// $(document).ready(function ()
// {
	
//     	 //        var one
//     	 //        function fetchData(cb) {

//     	 //        	console.log("准备进入jajax")
//     	 //            $.ajax({
//     	 //    	        url:"/course/Finalpaper/IGetCourseGradeDetailList",
//     	 //    	        type:"GET",
//     	 //    	        dataType:"json",
//     	 //    	        data:{
//     	 //                	term:$("#courseTerms span").text(),
//     	 //                    courseclassId:$("#courseClassdrop span").text()
//     	 //    	        },
//     	 //    	        success:function(data)
//     	 //    	        {

    	    	        	   
//     	 //    	            	console.log(data),
//     	 //    	            	console.log(data.one),
//     	 //    	            	console.log("ajax进入成功"),
//     	 //    	            	console.log($("#courseClassdrop span").text())
//       // var result = data.courseGradeDetailList;

//       // console.log(result);
//       // console.log(data);
//       // var q = result.length;
//       // var cmname = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
//       // var cmdegree = new Array(20);
//       // for (var i in cmname) {
//       //     cmname[i] = 0;

//       //   }
//       //   cmname[0] = 0,
//       //     console.log(cmname);
//       //   for (var i in result) {
//       //       console.log(result[i].coursegradescore / 10);
//       //       Math.floor(result[i].coursegradescore / 10);
//       //       cmname[Math.floor(result[i].coursegradescore / 10)]++;


//       //     }
//       //     cmname[0] = 0,
//       //       console.log(cmname);
          
          
    	    	            	
//     	    	   //          	//开始插入表格数据*******************
//     	        // 	            var result = data.courseGradeDetailList;

//     	        // 	            console.log(result.length);
//     	        // 	            var q = result.length;
//     	        // 	            var cmname = new Array(0, 0, 0, 0, 0);
//     	        // 	            var cmrate = new Array(0, 0, 0, 0, 0);
    	        	            
//     	        // 	            for (var i in result) {

//     	        // 	                if (result[i].coursegradescore >= 90) {
//     	        // 	                  cmname[0]++;
//     	        // 	                }
//     	        // 	                if (result[i].coursegradescore < 90 && result[i].coursegradescore >= 80) {
//     	        // 	                  cmname[1]++;
//     	        // 	                }
//     	        // 	                if (result[i].coursegradescore < 80 && result[i].coursegradescore >= 70) {
//     	        // 	                  cmname[2]++;
//     	        // 	                }
//     	        // 	                if (result[i].coursegradescore < 70 && result[i].coursegradescore >= 60) {
//     	        // 	                  cmname[3]++;
//     	        // 	                }
//     	        // 	                if (result[i].coursegradescore < 60) {
//     	        // 	                  cmname[4]++;
//     	        // 	                }

//     	        // 	              }
//     	        // 	            cmrate[0] = (cmname[0] / result.length * 100).toFixed(2)
//     	        // 	            cmrate[1] = (cmname[1] / result.length * 100).toFixed(2)
//     	        // 	            cmrate[2] = (cmname[2] / result.length * 100).toFixed(2)
//     	        // 	            cmrate[3] = (cmname[3] / result.length * 100).toFixed(2)
//     	        // 	            cmrate[4] = (cmname[4] / result.length * 100).toFixed(2)

//     	        // 	            var listData = [
//     	        // 	              { "code": "90-100", "text": cmname[0], "name": cmrate[0] },
//     	        // 	              { "code": "80-89", "text": cmname[1], "name": cmrate[1] },
//     	        // 	              { "code": "70-79", "text": cmname[2], "name": cmrate[2] },
//     	        // 	              { "code": "60-69", "text": cmname[3], "name": cmrate[3] },
//     	        // 	              { "code": "0-59", "text": cmname[4], "name": cmrate[4] },
//     	        // 	            ]
    	        	            
    	        	            
    	        	            
    	        	            
    	        	            
    	        	            
    	        	            
//     	    	   //          	var per = listData
//     	    	   //          	console.log(per)
//     	    	   //          	console.log('come in');
//     	    	   //  		      var tbody = document.getElementById('table2'); 
//     	    	   //  		      console.log('come in123');
//     	    	   //  		      $("#table2").html("");
    	    	    		      
//     	    	   //  		      for(var i = 0;i < per.length; i++){ //遍历一下json数据 
//     	    	   //  		        var trow = getDataRow(per[i]); //定义一个方法,返回tr数据 
//     	    	   //  		        tbody.appendChild(trow); 
//     	    	   //  		       } 
    	    	    		       
//     	    	   //  		    function getDataRow(h){ 
//     	    	   //  		      var row = document.createElement('tr'); //创建行 
//     	    	   //  		      var idCell = document.createElement('td'); //创建第一列id 
//     	    	   //  		      idCell.innerHTML = h.code; //填充数据 
//     	    	   //  		      row.appendChild(idCell); //加入行 ，下面类似 
//     	    	   //  		      var nameCell = document.createElement('td');//创建第二列name 
//     	    	   //  		      nameCell.innerHTML = h.text; 
//     	    	   //  		      row.appendChild(nameCell); 
//     	    	   //  		      var jobCell = document.createElement('td');//创建第三列job 
//     	    	   //  		      jobCell.innerHTML = h.name+'%'; 
//     	    	   //  		      row.appendChild(jobCell); 
//     	    	   //  		      //到这里，json中的数据已经添加到表格中，下面为每行末尾添加删除按钮 
    	    	    		       
//     	    	   //  		      return row; //返回tr数据   
//     	    	   //  		      }   
    	    	            	
    	    	            	
    	    	            	
//     	    	   //      }
//     	        //     })	
    	        	
    	        	
    	        	
//     	        // }
    	        
    	    
//     	        // fetchData(function (data) {

//     	        // });
//     	         var myChart2 = echarts.init(document.getElementById('main2'));
// 		// 指定图表的配置项和数据
// 		var option = {
//      	dataset: {
//          source: [
//              ['graduationIndex', 'degree'],
//              ['GR3.1', 0.9],
//              ['GR4.2', 0.75],
//              ['GR5.3', 0.85],
//          ]
//     },
//     		grid: {containLabel: true},
//     		xAxis: {name: '达成度'},
//     		yAxis: [{
//     			type: 'category',name: '毕业指标'
//     		}],
//     		visualMap: {
//     		   orient: 'horizontal',
//    			     left: 'center',
//         		min: 0,
//         		max: 1,
//         		text: ['High Score', 'Low Score'],
//         		// Map the score column to color
//         		dimension: 0,
//         		inRange: {
//            		 color: ['#D7DA8B', '#E15457']
//         		}
//     		},
//     		series: [
//         		{
//             		type: 'bar',
//             		encode: {
//                		 // Map the "degree" column to X axis.
//                 		x: 'degree',
//                 		// Map the "courseTarget"column to Y axis
//                 		y: 'graduationIndex'
//            		 }
//         		}
//    		 ]
// 		};
// 		  使用刚指定的配置项和数据显示图表。
//     	        myChart2.setOption(option);
//   })