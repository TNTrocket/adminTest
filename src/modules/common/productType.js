let productType=[{
    legend: {
        data: ['全平台', 'Web', 'PC', 'Android', 'iOS']
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data: data.map(obj => obj.date)
        }
    ],
    series: [
        {
            name: '全平台',
            type: 'line',
            data: data.map(obj => obj.all)
        },
        {
            name: 'Web',
            type: 'line',
            data: data.map(obj => obj.web)
        },
        {
            name: 'PC',
            type: 'line',
            data: data.map(obj => obj.pc)
        },
        {
            name: 'Android',
            type: 'line',
            data: data.map(obj => obj.android)
        },
        {
            name: 'iOS',
            type: 'line',
            data: data.map(obj => obj.ios)
        }
    ]
},]
