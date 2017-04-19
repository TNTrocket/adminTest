/** 表单页面mixin **/

import moment from 'moment'
import chunk from 'lodash/chunk'

var rowPerPage = 30
export default {
    partials: {
        'date-selector': '<date-selector-component :start-date.sync="startDate" :end-date.sync="endDateRaw"></date-selector-component>'
    },
    data() {
        return {
            tables: [{
                loading: false,
                renderData: [],  //表格数据
                currentPage: 1,   //当前页码
                rowPerPage: rowPerPage,   //每页的行数
                totalRow: 1  //总结果条数
            }],
            startDate: moment().subtract(2, 'months').format('YYYY-MM-DD'),
            endDateRaw: moment().format('YYYY-MM-DD'),
            countType: 'day'
        }
    },
    ready() {
        this.getData()
    },
    computed: {
        endDate() {
            return moment(this.endDateRaw, 'YYYY-MM-DD').add(1, 'd').format('YYYY-MM-DD')
        }
    },
    events: {
        dateChange() {
            this.tables.forEach(item => { item.currentPage = 1 })
            this.getData()
            return true
        }
    },
    filters: {
        pageFilter(data, tid = 0){
            console.log(data);
             // return  data
            return chunk(data, this.tables[tid].rowPerPage)[this.tables[tid].currentPage - 1]
        }
    },
    methods: {
        getData() {},
        addMoreTable(num = 1) {
            for (let i = 0; i < num; i++) {
                let t = {
                    loading: false,
                    renderData: [],
                    currentPage: 1,
                    rowPerPage: rowPerPage,
                    totalRow: 1
                }
                this.tables.push(t)
            }
        }
    },
    components: {
        'date-selector-component': require('../components/dateSelector.vue'),
        'table-component': require('../components/table.vue')
    }
}


