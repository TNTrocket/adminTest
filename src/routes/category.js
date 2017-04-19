//全局静态变量
let category = [{
    title: '用户和使用',
    id: 'userAndUsage',
    links: [{
        title: '活跃用户',
        id: 'active'
    },
        {
        title: '新增用户',
        id: 'firstLogin'
    }]
}, {
    title: '产品管理',
    id: 'productControl',
    links: []
}, {
    title: '系统工具',
    id: 'systemTool',
    links: []
}
 ]

import flatten from 'lodash/flatten'

// 获取目录
export function getCategory() {
    return JSON.parse(JSON.stringify(category))
}

// 获取子页面模块地址
export function getModules() {
    return flatten(getCategory().map(item => {
        if(item.links.length===0){
             return item.id+'/'+item.id
        }
        return item.links.map(link => {
                return item.id + '/' + link.id

        })
    }))
}