$(document).ready(function ()
{	
	//点击课程学期下拉菜单查询并显示所有学期
    $("#courseTerms").click(function()
    {

        $(this).next().find("li").remove();
        $.ajax({
	        url:"/course/public/IgetTerm",
	        type:"GET",
	        dataType:"json",
	        success:function(data)
	        {
	            if(data.success)
	            {
	                $.each(data.term,function(index,item)
	                {
	                  $("#courseTermc").append("<li><a href='#'>"+item+"</a></li>")
	                }
	                )
	            }
	            else
	            {
	                alert(data.msg);
	            }           
	        }
        })
    })
    
//    	by wuchunlin
    
    
    //模拟一段JSON数据，实际要从数据库中读取 

    
    
    	 $("#echart2").click(function(){
    		 
    		 $('#TableAndPic2').show();
    		 $('#TableAndPic1').hide();
    		 $('#TableAndPic3').hide();
    		 $('#TableAndPic4').hide();
    		 $("#gradeType span").text("课程成绩分析");
    		 console.log('111334');

    		 var myChart = echarts.init(document.getElementById('main2'));
    		
    	        // 指定图表的配置项和数据
    	        var option = {
    	                color: ['#3398DB'],


    	                toolbox: {
    	                  show: true,

    	                },
    	                calculable: true,
    	                xAxis: [
    	                  {
    	                    type: 'category',
    	                    boundaryGap: false,
    	                    data: ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90','100']
    	                  }
    	                ],
    	                yAxis: [
    	                  {
    	                    name: '分数段人数',
    	                    type: 'value'
    	                  }
    	                ],
    	                series: [

    	                  {
    	                    name: '预购',
    	                    type: 'line',
    	                    smooth: true,
    	                    itemStyle: { normal: { areaStyle: { type: 'default' } } },
    	                    data: [0,0,0,0,0,0,0,0,0,0,0],
    	                  }
    	                ]
    	        		

    	        };
    	        
    	   
    	        

    	        // 使用刚指定的配置项和数据显示图表。
    	        myChart.setOption(option);
    	        var one
    	        function fetchData(cb) {

    	        	console.log("准备进入jajax")
    	            $.ajax({
    	    	        url:"/course/Finalpaper/IGetCourseGradeDetailList",
    	    	        type:"GET",
    	    	        dataType:"json",
    	    	        data:{
    	                	term:$("#courseTerms span").text(),
    	                    courseclassId:$("#courseClassdrop span").text()
    	    	        },
    	    	        success:function(data)
    	    	        {

    	    	        	   
    	    	            	console.log(data),
    	    	            	console.log(data.one),
    	    	            	console.log("ajax进入成功"),
    	    	            	console.log($("#courseClassdrop span").text())
      var result = data.courseGradeDetailList;

      console.log(result);
      console.log(data);
      var q = result.length;
      var cmname = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      var cmdegree = new Array(20);
      for (var i in cmname) {
          cmname[i] = 0;

        }
        cmname[0] = 0,
          console.log(cmname);
        for (var i in result) {
            console.log(result[i].coursegradescore / 10);
            Math.floor(result[i].coursegradescore / 10);
            cmname[Math.floor(result[i].coursegradescore / 10)]++;


          }
          cmname[0] = 0,
            console.log(cmname);
          
          
        
        
      
      
    	    
    	        	            myChart.setOption({
    	        	                color: ['#9287e7'],


    	        	                toolbox: {
    	        	                  show: true,

    	        	                },
//    	        	                grid: {
//      	        	                  
//      	        	                  top: '3%',
//      	        	                  
//      	        	                },
    	        	                calculable: true,
    	        	                xAxis: [
    	        	                  {
    	        	                    type: 'category',
    	        	                    name: '分数段',
    	        	                    boundaryGap: false,
    	        	                    data: ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100']
    	        	                  }
    	        	                ],
    	        	                yAxis: [
    	        	                  {
    	        	                    name: '分数段人数',
    	        	                    type: 'value'
    	        	                  }
    	        	                ],
    	        	                series: [

    	        	                  {
    	        	                    name: '预购',
    	        	                    type: 'line',
    	        	                    smooth: true,
    	        	                    itemStyle: { normal: { areaStyle: { type: 'default' } } },
    	        	                    data: cmname
    	        	                  }
    	        	                ]
    	        	            	
    	        	            	
    	        	            });
    	    	            	
    	    	            	//开始插入表格数据*******************
    	        	            var result = data.courseGradeDetailList;

    	        	            console.log(result.length);
    	        	            var q = result.length;
    	        	            var cmname = new Array(0, 0, 0, 0, 0);
    	        	            var cmrate = new Array(0, 0, 0, 0, 0);
    	        	            
    	        	            for (var i in result) {

    	        	                if (result[i].coursegradescore >= 90) {
    	        	                  cmname[0]++;
    	        	                }
    	        	                if (result[i].coursegradescore < 90 && result[i].coursegradescore >= 80) {
    	        	                  cmname[1]++;
    	        	                }
    	        	                if (result[i].coursegradescore < 80 && result[i].coursegradescore >= 70) {
    	        	                  cmname[2]++;
    	        	                }
    	        	                if (result[i].coursegradescore < 70 && result[i].coursegradescore >= 60) {
    	        	                  cmname[3]++;
    	        	                }
    	        	                if (result[i].coursegradescore < 60) {
    	        	                  cmname[4]++;
    	        	                }

    	        	              }
    	        	            cmrate[0] = (cmname[0] / result.length * 100).toFixed(2)
    	        	            cmrate[1] = (cmname[1] / result.length * 100).toFixed(2)
    	        	            cmrate[2] = (cmname[2] / result.length * 100).toFixed(2)
    	        	            cmrate[3] = (cmname[3] / result.length * 100).toFixed(2)
    	        	            cmrate[4] = (cmname[4] / result.length * 100).toFixed(2)

    	        	            var listData = [
    	        	              { "code": "90-100", "text": cmname[0], "name": cmrate[0] },
    	        	              { "code": "80-89", "text": cmname[1], "name": cmrate[1] },
    	        	              { "code": "70-79", "text": cmname[2], "name": cmrate[2] },
    	        	              { "code": "60-69", "text": cmname[3], "name": cmrate[3] },
    	        	              { "code": "0-59", "text": cmname[4], "name": cmrate[4] },
    	        	            ]
    	        	            
    	        	            
    	        	            
    	        	            
    	        	            
    	        	            
    	        	            
    	    	            	var per = listData
    	    	            	console.log(per)
    	    	            	console.log('come in');
    	    	    		      var tbody = document.getElementById('table2'); 
    	    	    		      console.log('come in123');
    	    	    		      $("#table2").html("");
    	    	    		      
    	    	    		      for(var i = 0;i < per.length; i++){ //遍历一下json数据 
    	    	    		        var trow = getDataRow(per[i]); //定义一个方法,返回tr数据 
    	    	    		        tbody.appendChild(trow); 
    	    	    		       } 
    	    	    		       
    	    	    		    function getDataRow(h){ 
    	    	    		      var row = document.createElement('tr'); //创建行 
    	    	    		      var idCell = document.createElement('td'); //创建第一列id 
    	    	    		      idCell.innerHTML = h.code; //填充数据 
    	    	    		      row.appendChild(idCell); //加入行 ，下面类似 
    	    	    		      var nameCell = document.createElement('td');//创建第二列name 
    	    	    		      nameCell.innerHTML = h.text; 
    	    	    		      row.appendChild(nameCell); 
    	    	    		      var jobCell = document.createElement('td');//创建第三列job 
    	    	    		      jobCell.innerHTML = h.name+'%'; 
    	    	    		      row.appendChild(jobCell); 
    	    	    		      //到这里，json中的数据已经添加到表格中，下面为每行末尾添加删除按钮 
    	    	    		       
    	    	    		      return row; //返回tr数据   
    	    	    		      }   
    	    	            	
    	    	            	
    	    	            	
    	    	        }
    	            })	
    	        	
    	        	
    	        	
    	        }
    	        
    	        
    	        fetchData(function (data) {

    	        });

    })
    
        	 
    	 $("#echart3").click(function(){
    		 
    		 $('#TableAndPic3').show();
    		 $('#TableAndPic2').hide();
    		 $('#TableAndPic1').hide();
    		 $("#gradeType span").text("毕业指标分析");
    		 $('#TableAndPic4').hide();
    		 console.log('111334');

    		 var myChart = echarts.init(document.getElementById('main3'));
    		
    	        // 指定图表的配置项和数据
    	        var option = {
    	                
    	        		

    	        };

    	        // 使用刚指定的配置项和数据显示图表。
    	        myChart.setOption(option);
    	        var one
    	        function fetchData(cb) {

    	        	console.log("准备进入jajax")
    	            $.ajax({
    	    	        url:"/course/studyEvaluate/TeacherGetEvaluate",
    	    	        type:"GET",
    	    	        dataType:"json",
    	    	        data:{
    	                	term:$("#courseTerms span").text(),
    	                	courseClassID:$("#courseClassdrop span").text()
    	    	        },
    	    	        success:function(data)
    	    	        {

    	    	        	   
    	    	            	
    	    	            	console.log(data.cgrreachList),
    	    	            	console.log("ajax进入成功"),
    	    	            	console.log($("#courseClassdrop span").text())
    	    	            	      var result = data.cgrreachList
								      var param = new Array(result.length)
								      var param2 = new Array(result.length);
    	    	                for (var i in result) {
    	    	                    
    	    	                    param2[i] = result[result.length-1-i].cgrrRatio*100
    	    	                    param[i] = result[result.length-1-i].cgrrName



    	    	                  }
      
    	    
    	        	            myChart.setOption({
    	        	                color: ['#3398DB'],
    	        	                tooltip: {
    	        	                  trigger: 'axis',
    	        	                  axisPointer: {            // 坐标轴指示器，坐标轴触发有效
    	        	                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
    	        	                  }
    	        	                },
//    	        	                grid: {
//    	        	                  left: '3%',
//    	        	                  right: '12%',
//    	        	                  bottom: '3%',
//    	        	                  top:'10%',
//    	        	                  containLabel: true
//    	        	                },
    	        	                yAxis: [
    	        	                  {
    	        	                    type: 'category',
    	        	                    name: '毕业指标编号',
    	        	                    axisLabel: {
    	        	                      fontSize: 12,
    	        	                      //interval: 0,
    	        	                      //showMaxLabel:true
    	        	                    },

    	        	                    data: param,

    	        	                  },
    	        	                ],


    	        	                xAxis: [
    	        	                  {
    	        	                    name: '达成度',
    	        	                    type: 'value',


    	        	                    axisLabel: {
    	        	                      formatter: '{value}%'
    	        	                    },

    	        	                  }
    	        	                ],
    	        	                series: [
    	        	                  {
    	        	                    name: '',
    	        	                    type: 'bar',
    	        	                    barWidth: '50%',
    	        	                    data: param2
    	        	                  }
    	        	                ]
    	        	            });
    	        	            
    	        	            
    	        	            $.ajax({
    	        	    	        url:"/course/studyEvaluate/TeacherGetGR",
    	        	    	        type:"GET",
    	        	    	        dataType:"json",
    	        	    	        data:{
    	        	                	term:$("#courseTerms span").text(),
    	        	                	courseClassID:($("#courseClassdrop span").text()).substring(0, 8)
    	        	    	        },
    	        	    	        success:function(data2)
    	        	    	        {
    	        	    	        	console.log(data2)
    	        	    	        	var q = data2.success;
    	        	    	        	var t = q.length
    	    	        	            var grname = new Array(t);
    	    	        	            var grcontent = new Array(t);
    	    	        	            console.log(q)
    	    	        	            console.log(t)
    	    	        	           for(var i  in q){
    	    	        	        	   grname[i] = q[i].gr_name
    	    	        	        	   grcontent[i] = q[i].gr_content   	    	       	        	   
    	    	        	           }
    	    	        	            console.log(grname)
    	    	        	            console.log(grcontent)
    	    	        	            
    	    	        	        	//开始插入表格数据*******************
    	    	    	            	var per = data.cgrreachList
    	    	    	            	console.log(per)
    	    	    	            	console.log('come in');
    	    	    	    		      var tbody = document.getElementById('table3'); 
    	    	    	    		      console.log('come in123');
    	    	    	    		      $("#table3").html("");
    	    	    	    		      
    	    	    	    		      for(var i = 0;i < per.length; i++){ //遍历一下json数据 
    	    	    	    		        var trow = getDataRow(per[i]); //定义一个方法,返回tr数据 
    	    	    	    		        tbody.appendChild(trow); 
    	    	    	    		       } 
    	    	    	    		       
    	    	    	    		    function getDataRow(h){ 
    	    	    	    		      var row = document.createElement('tr'); //创建行 
    	    	    	    		      var idCell = document.createElement('td'); //创建第一列id 
    	    	    	    		      idCell.innerHTML = h.cgrrName; //填充数据 
    	    	    	    		      row.appendChild(idCell); //加入行 ，下面类似 
    	    	    	    		      
    	    	    	    		      var jobCell = document.createElement('td');//创建第三列job 
    	    	    	    		     
    	    	    	    		      for (var i=0; i<t ; i++)
    	    	    	    		      {
    	    	    	    		    	  console.log(i)
    	    	    	    		          console.log(grname[i])
    	    	    	    		          if(grname[i] == h.cgrrName ){
    	    	    	    		        	  console.log("判等成功")
    	    	    	    		        	  jobCell.innerHTML = grcontent[i]; 
    	    	    	    		          }
    	    	    	    		      }
    	    	    	    		      
    	    	    	    		      row.appendChild(jobCell); 
    	    	    	    		      
    	    	    	    		      
    	    	    	    		      var nameCell = document.createElement('td');//创建第二列name 
    	    	    	    		      nameCell.innerHTML = (h.cgrrRatio*100).toFixed(2)+"%"; 
    	    	    	    		      row.appendChild(nameCell); 
    	    	    	    		       
    	    	    	    		     
    	    	    	    		      //到这里，json中的数据已经添加到表格中，下面为每行末尾添加删除按钮 
    	    	    	    		       
    	    	    	    		      return row; //返回tr数据   
    	    	    	    		      } 
    	    	    	    		    
    	    	        	            
    	    	        	            
    	    	        	            
    	    	        	            
    	        	    	        	
    	        	    	        	
    	        	    	        }
    	        	            })
    	    	            	
    	    	              
    	    	            	
    	    	            	
    	    	            	
    	    	        }
    	            })	
    	        	
    	        	
    	        	
    	        }
    	        
    	        
    	        fetchData(function (data) {

    	        });

    })
    
    
    
    
    //&&&&&&&&&&&&&&&&&&&&
    
        	 
    	 $("#echart4").click(function(){
    		 
    		 $('#TableAndPic4').show();
    		 $('#TableAndPic2').hide();
    		 $('#TableAndPic3').hide();
    		 $('#TableAndPic1').hide();
    		 $("#gradeType span").text("学习成果分析");
    		 console.log('111334');

    		 var myChart = echarts.init(document.getElementById('main4'));
    		
    	        // 指定图表的配置项和数据
    	        var option = {
    	                title: {
    	                    text: '学习成果达成度分析'
    	                },
    	        	    radar: {
    	        	        // shape: 'circle',
    	        	        name: {
    	        	          textStyle: {
    	        	            color: '#fff',
    	        	            backgroundColor: '#999',
    	        	            borderRadius: 3,
    	        	            padding: [3, 5]
    	        	          }
    	        	        },
    	        	        indicator: [
    	        	          { name: 'CO1', max: 100 },
    	        	          { name: 'CO2', max: 100 },
    	        	          { name: 'CO3', max: 100 },
    	        	          { name: 'CO4', max: 100 },
    	        	          { name: 'CO5', max: 100 },
    	        	          { name: 'CO6', max: 100 }
    	        	        ]
    	        	      },
    	        	      series: [{

    	        	        type: 'radar',
    	        	        // areaStyle: {normal: {}},
    	        	        data: [
    	        	          {
    	        	            value: [110, 80, 70, 76, 78, 85],

    	        	          },

    	        	        ]
    	        	      }]
    	        		

    	        };

    	        // 使用刚指定的配置项和数据显示图表。
    	        myChart.setOption(option);
    	        var one
    	        function fetchData(cb) {

    	        	console.log("准备进入jajax")
    	            $.ajax({
    	    	        url:"/course/studyEvaluate/TeacherGetEvaluate",
    	    	        type:"GET",
    	    	        dataType:"json",
    	    	        data:{
    	                	term:$("#courseTerms span").text(),
    	                	courseClassID:$("#courseClassdrop span").text()
    	    	        },
    	    	        success:function(data)
    	    	        {

    	    	        	   
    	    	            	
    	    	            	console.log(data.ccoreachList),
    	    	            	console.log("ajax进入成功"),
    	    	            	console.log($("#courseClassdrop span").text())
    	    	            	      var result = data.classComesReachList
								      var param = []
								      var param2 = new Array(result.length);
								      for (var i in result) {
								        param.push({
								          "name": result[i].scomesrCode, "max": 1
								        })
								        param2[i] = result[i].scomerRatio
								      
								
								
								
								      }
      
    	    
    	        	            myChart.setOption({
    	        	                title: {
    	        	                    text: '学习成果达成度分析'
    	        	                },
    	        	        	    radar: {
    	        	        	        // shape: 'circle',
    	        	        	        name: {
    	        	        	          textStyle: {
    	        	        	            color: '#fff',
    	        	        	            backgroundColor: '#999',
    	        	        	            borderRadius: 3,
    	        	        	            padding: [3, 5]
    	        	        	          }
    	        	        	        },
    	        	        	        indicator: param
    	        	        	      },
    	        	        	      series: [{

    	        	        	        type: 'radar',
    	        	        	        // areaStyle: {normal: {}},
    	        	        	        data: [
    	        	        	          {
    	        	        	            value: param2,

    	        	        	          },

    	        	        	        ]
    	        	        	      }]
    	        	            });
    	    	            	
    	    	            	//开始插入表格数据*******************
    	    	            	var per = data.classComesReachList
    	    	            	console.log(per)
    	    	            	console.log('come in');
    	    	    		      var tbody = document.getElementById('table4'); 
    	    	    		      console.log('come in123');
    	    	    		      $("#table4").html("");
    	    	    		      
    	    	    		      for(var i = 0;i < per.length; i++){ //遍历一下json数据 
    	    	    		        var trow = getDataRow(per[i]); //定义一个方法,返回tr数据 
    	    	    		        tbody.appendChild(trow); 
    	    	    		       } 
    	    	    		       
    	    	    		    function getDataRow(h){ 
    	    	    		      var row = document.createElement('tr'); //创建行 
    	    	    		      var idCell = document.createElement('td'); //创建第一列id 
    	    	    		      idCell.innerHTML = h.scomesrCode; //填充数据 
    	    	    		      row.appendChild(idCell); //加入行 ，下面类似 
    	    	    		      var jobCell = document.createElement('td');//创建第三列job 
    	    	    		      jobCell.innerHTML = h.scomesrName; 
    	    	    		      row.appendChild(jobCell); 
    	    	    		      
    	    	    		      var nameCell = document.createElement('td');//创建第二列name 
    	    	    		      nameCell.innerHTML = (h.scomerRatio*100).toFixed(2)+"%"; 
    	    	    		      row.appendChild(nameCell); 
    	    	    		       
    	    	    		   
    	    	    		      //到这里，json中的数据已经添加到表格中，下面为每行末尾添加删除按钮 
    	    	    		       
    	    	    		      return row; //返回tr数据   
    	    	    		      }   
    	    	            	
    	    	            	
    	    	            	
    	    	        }
    	            })	
    	        	
    	        	
    	        	
    	        }
    	        
    	        
    	        fetchData(function (data) {

    	        });

    })
    
    
    
    //&&&&&&&&&&&&&7
    	 
    	 $("#e").click(function(){
    		 
    		 $('#TableAndPic1').show();
    		 $('#TableAndPic2').hide();
    		 $('#TableAndPic3').hide();
    		 $('#TableAndPic4').hide();
    		 $("#gradeType span").text("课程目标达成度分析");
    		 console.log('111334');

    		 var myChart = echarts.init(document.getElementById('main'));
    		 var myChart2 = echarts.init(document.getElementById('mainall'));
    	        // 指定图表的配置项和数据
    	        var option = {
    	                title: {
    	                    text: '课程目标达成度分析'
    	                },
    	        	    radar: {
    	        	        // shape: 'circle',
    	        	        name: {
    	        	          textStyle: {
    	        	            color: '#fff',
    	        	            backgroundColor: '#999',
    	        	            borderRadius: 3,
    	        	            padding: [3, 5]
    	        	          }
    	        	        },
    	        	        indicator: [
    	        	          { name: '-', max: 10 },
    	        	          { name: '-', max: 10 },
    	        	          { name: '-', max: 10 },
    	        	          { name: '-', max: 10 },
    	        	          { name: '-', max: 10 },
    	        	          { name: '-', max: 10 }
    	        	        ]
    	        	      },
    	        	      series: [{

    	        	        type: 'radar',
    	        	        // areaStyle: {normal: {}},
    	        	        data: [
    	        	          {
    	        	            value: [0, 0, 0, 0, 0, 0],

    	        	          },

    	        	        ]
    	        	      }]
    	        		

    	        };
    	        
    	        var  option2 = {
    	        	    xAxis: {},
    	        	    yAxis: {},
    	        	    series: [{
    	        	        symbolSize: 20,
    	        	        data: [
    	        	            [10.0, 8.04],
    	        	            [8.0, 6.95],
    	        	            [13.0, 7.58],
    	        	            [9.0, 8.81],
    	        	            [11.0, 8.33],
    	        	            [14.0, 9.96],
    	        	            [6.0, 7.24],
    	        	            [4.0, 4.26],
    	        	            [12.0, 10.84],
    	        	            [7.0, 4.82],
    	        	            [5.0, 5.68]
    	        	        ],
    	        	        type: 'scatter'
    	        	    }]
    	        	};
    	        

    	        // 使用刚指定的配置项和数据显示图表。
    	        myChart.setOption(option);
    	        myChart2.setOption(option2);
    	        var one
    	        function fetchData(cb) {
    	        	//散点图画图
    	        	$.ajax(
	    	        	    {
	    	        	        url:"/course/IClassTarget",
	    	        	        type:"GET",
	    	        	        dataType:"json",
	    	        	        data:{
	    	        	        	term:$("#courseTerms span").text(),
	        	                	courseID:$("#courseClassdrop span").text()
	    	        	        },
	    	        	        success:function(data)
	    	        	        {
	    	        	        	myChart2.setOption(option2,true)
	    	        	        	console.log(data)
	    	        	        	   myChart2.setOption({
	    	        	        		   title: {
	       	        	                    text: '课程总体目标达成度学生分布'
	       	        	                },
	       	        	                
	       	        	             tooltip: {
	       	        	              trigger: 'item',
	       	        	          
	       	        	           formatter : function (params) {
	       	        	           
	       	        	                return params.seriesName + '<br/>'
	       	        	                +"总达成度:"+ params.value[1] + '% '
	       	        	                
	       	        	            
	       	        	            
	       	        	        },
	       	        	          },
	       	        	             xAxis: {name: '学生个体',},
	       	        	          yAxis: {name: '总达成度(%)',},
	       	    	        	    
	       	    	        	    
	       	    	        	    
//	       	    	        	 series: [
//	       	    	        		 {
//	       	    	        		 name:'test student',
//	        	                     symbolSize: 10,
//	        	                     data: data.two,
//	        	                     type: 'scatter'
//	        	                   },
//	        	                   {
//		       	    	                data: [[0, 60], [data.two.length, 60]],
//		       	    	                type: 'line'
//		       	    	            }
//	       	    	        	 ],
	       	    	        	series:data.four,
	       	    	        	 

	       	        	               
	       	        	                
	       	        	               
	       	        	            	
	       	        	            	
	       	        	            });
	    	        	        	   
	    	        	          
	    	        	        }
	    	        	})
    	        	
    	        	//散点图结束

    	        	console.log("准备进入jajax")
    	            $.ajax({
    	    	        url:"/course/studyEvaluate/TeacherGetEvaluateT",
    	    	        type:"GET",
    	    	        dataType:"json",
    	    	        data:{
    	                	term:$("#courseTerms span").text(),
    	                	courseClassID:$("#courseClassdrop span").text()
    	    	        },
    	    	        success:function(data)
    	    	        {  
    	    	        	var tid = $("#courseClassdrop span").text().substring(0, 8)
    	    	        	console.log("lalalalalallalala")
    	    	        	console.log(data)
    	    	        	
    	    	        	
    	    	        	$.ajax(
    	    	        	    {
    	    	        	        url:"/course/object/IcourseObjectDto",
    	    	        	        type:"GET",
    	    	        	        dataType:"json",
    	    	        	        data:{
    	    	        	            courseTid:tid,
    	    	        	        },
    	    	        	        success:function(data2)
    	    	        	        {
    	    	        	            if(data.success && data2.CourseObject.length > 0 )
    	    	        	            {
    	    	        	            	
    	    	        	            	var i = data2.CourseObject;
    	    	        	            	var q = i.length;
    	    	        	                console.log("COCOCO目标"+tid)
    	    	        	                console.log("lalalalalallalala"+i.length)
    	    	        	                var coName = new Array(q);
    	    	        	                var coContent = new Array(q);
    	    	        	                for (var t in i) {
    	    	        	                	coName[t] = i[t].obName
    	    	        	                	coContent[t] = i[t].obContent
    									     
    									      }
    	    	        	                console.log(coName)
    	    	        	                 console.log(coContent)
    	    	        	                 
    	    	        	                 
    	    	        	                 var per = data.ccoreachList
    	    	    	    	            	console.log(per)
    	    	    	    	            	console.log(data)
    	    	    	    	            	console.log('come in');
    	    	    	    	    		      var tbody = document.getElementById('table1'); 
    	    	    	    	    		      console.log('come in123');
    	    	    	    	    		      $("#table1").html("");
    	    	    	    	    		      
    	    	    	    	    		      for(var i = 0;i <= per.length; i++){ //遍历一下json数据
    	    	    	    	    		    	  if( i == per.length){
    	    	    	    	    		    		  var row = document.createElement('tr'); //创建行 
    	    	    	    	    	    		      var idCell = document.createElement('td'); //创建第一列id 
    	    	    	    	    	    		      idCell.innerHTML = '总体CO'; //填充数据	    	    	    	    		      
    	    	    	    	    	    		      row.appendChild(idCell); //加入行 ，下面类似 
    	    	    	    	    	    		      console.log("插入row成功")
    	    	    	    	    	    		     
    	    	    	    	    	    		      var jobCell = document.createElement('td');//创建第三列job 
    	    	    	    	    	    		      jobCell.innerHTML = "课程总体达成度"; 
    	    	    	    	    	    		      row.appendChild(jobCell); 
    	    	    	    	    	    		      console.log("插入row成功")
    	    	    	    	    	    		      //到这里，json中的数据已经添加到表格中，下面为每行末尾添加删除按钮 
    	    	    	    	    	    		      var nameCell = document.createElement('td');//创建第二列name 
    	    	    	    	    	    		      nameCell.innerHTML = (data.totalCcoreach*100).toFixed(2)+"%"; 
    	    	    	    	    	    		      row.appendChild(nameCell); 
    	    	    	    	    	    		      console.log("插入row成功"+(data.totalCcoreach.toFixed(4))*100)
    	    	    	    	    	    		      tbody.appendChild(row);  
    	    	    	    	    	    		      console.log("插入row成功")
    	    	    	    	    		    	  }else{
    	    	    	    	    		    		  var trow = getDataRow(per[i]); //定义一个方法,返回tr数据 
    	    	    	    	    	    		        tbody.appendChild(trow); 
    	    	    	    	    		    	  }
    	    	    	    	    		        
    	    	    	    	    		       } 
    	    	    	    	    		      
    	    	    	    	    		      
    	    	    	    	    		      
    	    	    	    	    		      
    	    	    	    	    		      
    	    	    	    	    		       
    	    	    	    	    		    function getDataRow(h){ 
    	    	    	    	    		      var row = document.createElement('tr'); //创建行 
    	    	    	    	    		      var idCell = document.createElement('td'); //创建第一列id 
    	    	    	    	    		      idCell.innerHTML = h.ccorName; //填充数据	    	    	    	    		      
    	    	    	    	    		      row.appendChild(idCell); //加入行 ，下面类似 
    	    	    	    	    		     
    	    	    	    	    		      
    	    	    	    	    		      var test = h.ccorName.substring(2, 3)
    	    	    	    	    		      var finaltest = parseInt(test)
    	    	    	    	    		      console.log(finaltest-1)
    	    	    	    	    		      
    	    	    	    	    		      
    	    	    	    	    		       
    	    	    	    	    		      var jobCell = document.createElement('td');//创建第三列job 
    	    	    	    	    		      jobCell.innerHTML = coContent[finaltest-1]; 
    	    	    	    	    		      row.appendChild(jobCell); 
    	    	    	    	    		      //到这里，json中的数据已经添加到表格中，下面为每行末尾添加删除按钮 
    	    	    	    	    		      var nameCell = document.createElement('td');//创建第二列name 
    	    	    	    	    		      nameCell.innerHTML = (h.ccorRatio*100).toFixed(2)+"%"; 
    	    	    	    	    		      row.appendChild(nameCell); 
    	    	    	    	    		      return row; //返回tr数据   
    	    	    	    	    		      } 
    	    	    	    	    		    
    	    	    	    	    		    
    	    	    	    	    		    
    	    	    	    	    		    
    	    	        	                 
    	    	        	                 
    	    	        	                 
    	    	        	                 
    	    	        	                
    	    	        	                
    	    	        	             
    	    	        	            }
    	    	        	        }
    	    	        	})

    	    	        	   
    	    	            	
    	    	            	console.log(data.ccoreachList),
    	    	            	console.log("ajax进入成功"),
    	    	            	console.log($("#courseClassdrop span").text())
    	    	            	      var result = data.ccoreachList
								      var param = []
								      var param2 = new Array(result.length);
								      for (var i in result) {
								        param.push({
								          "name": result[i].ccorName, "max": 1
								        })
								        param2[i] = result[i].ccorRatio
								      
								
								
								
								      }
      
    	    
    	        	            myChart.setOption({
    	        	                title: {
    	        	                    text: '课程目标达成度分析'
    	        	                },
    	        	        	    radar: {
    	        	        	        // shape: 'circle',
    	        	        	        name: {
    	        	        	          textStyle: {
    	        	        	            color: '#fff',
    	        	        	            backgroundColor: '#999',
    	        	        	            borderRadius: 3,
    	        	        	            padding: [3, 5]
    	        	        	          }
    	        	        	        },
    	        	        	        indicator: param
    	        	        	      },
    	        	        	      series: [{

    	        	        	        type: 'radar',
    	        	        	        // areaStyle: {normal: {}},
    	        	        	        data: [
    	        	        	          {
    	        	        	            value: param2,

    	        	        	          },

    	        	        	        ]
    	        	        	      }]
    	        	            });
    	    	            	
    	    	            	//开始插入表格数据*******************
    	    	            	  
    	    	            	
    	    	            	
    	    	            	
    	    	        }
    	            })	
    	        	
    	        	
    	        	
    	        }
    	        
    	        
    	        fetchData(function (data) {

    	        });

    })
    
    
	$(document).on("click","#courseTermc li",function(){
		var terml=$(this).text();	
		$("#courseTerms span").text(terml);
		$("#courseNamedrop span").text("课程名称 ▼");		
	})
	
	 $("#courseNamedrop").click(function(){
         $(this).next().find("li").remove();
         $.ajax({
	        url:"/course/public/INameByTerm",
	        type:"GET",
	        dataType:"json",
	        data:{
	        	"term":$("#courseTerms span").text(),
	        },
	        success:function(data)
	        {
	            if(data.success)
	            {
	            	console.log("enter name")
	            	coursePlan = uniqueList(data.coursePlan);
	                $.each(coursePlan,function(index,item)
	                {
	                	 $("#courseNamedropul").append("<li id='"+item.courseTid+"'><a href='#'>"+item.courseName+"</a></li>")
	                }
	                )
	            }
	            else
	            {
	                alert(data.msg);
	            }
	        }
        })
    })
    
    $(document).on("click","#courseNamedropul li",function(){
		var namel=$(this).text();	
		$("#courseNamedrop span").text(namel);
		$("#courseClassdrop span").text("班级序号 ▼");		
	})
	
//点击课程名称下拉菜单查询并显示该老师负责的所有课程名称
    $("#courseClassdrop").click(function(){
         $(this).next().find("li").remove();
         $.ajax({
	        url:"/course/public/IclassByName",
	        type:"GET",
	        dataType:"json",
	        data:{
	             term:$("#courseTerms span").text(),
	             courseName:$("#courseNamedrop span").text(),
	        },
	        success:function(data)
	        {
	            if(data.success)
	            {
	                $.each(data.CourseClassId,function(index,item)
	                {
	                  $("#courseClassdropul").append("<li><a href='#'>"+item+"</a></li>")
	                }
	                )
	            }
	            else
	            {
	                alert(data.msg);
	            }
	        }
        })
    })
	
	$(document).on("click","#courseClassdropul li",function(){		
		var coursel=$(this).text();
		$("#courseClassdrop span").text(coursel);
		//点击课程名称后，将根据学期和课程查询学生成绩信息
		showjson();	
	})

}) 


//定义showjson()为刷新页面获取数据的函数


function showjson()
{
    $("td").remove();
    $.ajax({
                url:"/course/Regulargrade/IRegularGradeList",
                type:"GET",
                dataType:"json",
                data:{
                	term:$("#courseTerms span").text(),
                    courseclassId:$("#courseClassdrop span").text()
                },
                success:function(data){
                    if(data.success)                       
                        rg=data.Regulargrade;
                }
            })
    $.ajax({
                url:"/course/Midtermgrade/IMidTermGradeList",
                type:"GET",
                dataType:"json",
                data:{
                	term:$("#courseTerms span").text(),
                    courseclassId:$("#courseClassdrop span").text()
                },
                success:function(data){
                    if(data.success)
                    	mg=data.Midtermgrade;
                }
            })
    $.ajax({
                url:"/course/Practicegrade/IPracticeGradeList",
                type:"GET",
                dataType:"json",
                data:{
                	term:$("#courseTerms span").text(),
                    courseclassId:$("#courseClassdrop span").text()
                },
                success:function(data){
                    if(data.success)
                    	pg=data.Practicegrade;
                }
            })
    $.ajax({
                url:"/course/Finalgrade/IFinalGradeList",
                type:"GET",
                dataType:"json",
                data:{
                	term:$("#courseTerms span").text(),
                    courseclassId:$("#courseClassdrop span").text()
                },
                success:function(data){
                    if(data.success)
                    	fg=data.finalgrade;
                }
            })
    $.ajax(
        {
            url:"/course/Coursegrade/ICourseGradeList",
            type:"GET",
            dataType:"json",
            data:{
            	term:$("#courseTerms span").text(),
                courseclassId:$("#courseClassdrop span").text()
            },
            success:function(data)
            {
                if(data.success)
                {
                    $.each(data.Coursegrade,function (index,item) {
                    	for(var i=0; i<rg.length; i++){
                    		if(item.studentId == rg[i].studentId)
                    			rgview = rg[i].reguScore;
                    	}
                    	for(var i=0; i<mg.length; i++){
                    		if(item.studentId == mg[i].studentId)
                    			mgview = mg[i].mtermScore;
                    	}
                    	for(var i=0; i<pg.length; i++){
                    		if(item.studentId == pg[i].studentId)
                    			pgview = pg[i].pragradeScore;
                    	}
                    	for(var i=0; i<fg.length; i++){
                    		if(item.studentId == fg[i].studentId)
                    			fgview = fg[i].finalgradeScore;
                    	}
                        $("tbody").append(
                            "<tr><td>" +item.studentId+ "</td><td>"
                            +item.studentName+"</td><td>"
                            +item.cgScore+"</td><td>"
                            +rgview+"</td><td>"
                            +mgview+"</td><td>"
                            +pgview+"</td><td>"
                            +fgview+"</td><td>"
                            +item.cgRank+"</td></tr>"                        
                        );

                    })
                }
            }
        })
}

function uniqueList(array){
	  var r = [];
	  for(var i = 0, l = array.length; i < l; i++) {
	    for(var j = i + 1; j < l; j++)
	     
	      if (JSON.stringify(array[i]) == JSON.stringify(array[j])) j = ++i;
	    r.push(array[i]);
	  }
	  return r;
	}



