    $(function(){
        $('#mainPic1').show();
		$('#mainPic2').hide();
	 	console.log('1');

		var mychart1 = echarts.init(document.getElementById('mainPic1'));
		
		//指定图标的配置项和数据
		var posList = [
    		'left', 'right', 'top', 'bottom',
    		'inside',
    		'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
    		'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
		];

		




	var labelOption = {
    	normal: {
        	show: true,
            position: 'insideBottom',
            distance:15,
            align:'left',
            verticalAlign: 'middle',
            rotate: 90,
        	formatter: '{c}  {name|{a}}',
        	fontSize: 16,
        	rich: {
            	name: {
                	textBorderColor: '#fff'
            	}
        	}
    	}
	};

	option = {
    	color: ['#003366', '#006699', '#4cabce', '#e5323e'],
    	tooltip: {
        	trigger: 'axis',
        	axisPointer: {
            	type: 'shadow'
        	}
    	},
    	legend: {
        	data: ['讲稿评分', '教案评分', '中期教学评分', '专家听课评分', '学生评教评分', '试卷出题检查评分','试卷评阅检查评分', '试卷分析报告评分', '综合评分'] 
    	},
    	toolbox: {
        	show: true,
        	orient: 'vertical',
        	left: 'right',
        	top: 'center',
        	feature: {
            	mark: {show: true},
            	dataView: {show: true, readOnly: false},
            	magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
            	restore: {show: true},
            	saveAsImage: {show: true}
        	}
    	},
    	calculable: true,
    	xAxis: [
        	{
            	type: 'category',
            	axisTick: {show: false},
            	data: []
        	}
    	],
    	yAxis: [
        	{
            	type: 'value'
        	}
    	],
    	series: [
        	{
            	name: '讲稿评分',
            	type: 'bar',
            	barGap: 0,
            	label: labelOption,
            	data: []
        	},
        	{
            	name: '教案评分',
            	type: 'bar',
            	label: labelOption,
            	data: []
        	},
        	{
            	name: '中期教学评分',
            	type: 'bar',
            	label: labelOption,
            	data: []
        	},
        	{
            	name: '专家听课评分',
            	type: 'bar',
            	label: labelOption,
            	data: []
        	},
        	{
            	name: '学生评教评分',
            	type: 'bar',
            	label: labelOption,
            	data: []
        	},
        	{
            	name: '试卷出题检查评分',
            	type: 'bar',
            	label: labelOption,
            	data: []
        	},
        	{
            	name: '试卷评阅检查评分',
            	type: 'bar',
            	label: labelOption,
            	data: []
        	},
        	{
            	name: '试卷分析报告评分',
            	type: 'bar',
            	label: labelOption,
            	data: []
        	},
        	{
            	name: '综合评分',
            	type: 'bar',
            	label: labelOption,
            	data: []
        	}]
	};
	mychart1.setOption(option);
	mychart1.setOption({
		//xAxis: {data: obj.name},
        xAxis: {
            data:['1','2','3','4']
        },
		series: [
        {
            	name: '讲稿评分',
            	type: 'bar',
            	barGap: 0,
            	label: labelOption,
            	data: [50,60,70,80]
        	},
        	{
            	name: '教案评分',
            	type: 'bar',
            	label: labelOption,
            	data: [50,60,70,80]
        	},
        	{
            	name: '中期教学评分',
            	type: 'bar',
            	label: labelOption,
            	data: [50,60,70,80]
        	},
        	{
            	name: '专家听课评分',
            	type: 'bar',
            	label: labelOption,
            	data: [50,60,70,80]
        	},
        	{
            	name: '学生评教评分',
            	type: 'bar',
            	label: labelOption,
            	data: [50,60,70,80]
        	},
        	{
            	name: '试卷出题检查评分',
            	type: 'bar',
            	label: labelOption,
            	data: [50,60,70,80]
        	},
        	{
            	name: '试卷评阅检查评分',
            	type: 'bar',
            	label: labelOption,
            	data: [50,60,70,80]
        	},
        	{
            	name: '试卷分析报告评分',
            	type: 'bar',
            	label: labelOption,
            	data: [50,60,70,80]
        	},
        	{
            	name: '综合评分',
            	type: 'bar',
            	label: labelOption,
            	data: [50,60,70,80]
        	}]
	});
})