<template>
    <div class="active-user">
        <partial name="date-selector"></partial>
        <div class="panel-dropdown">
            <div class="dropdown dropdownBtn">
                <button id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span id="productType" :text="productType">{{productType}}</span>
                    <span class="caret"></span>
                </button>
                <ul class="dropdown-menu" aria-labelledby="dLabel">
                    <li v-for="list in categoriesName" @click="productType=list.name">{{list.name}}</li>
                </ul>
            </div>

            <div class="dropdown dropdownBtn">
                <button id="aLabel" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span   :text="productName.val">{{productName.val}}</span>
                    <span class="caret"></span>
                </button>
                <ul class="dropdown-menu" aria-labelledby="aLabel">
                    <li v-for="(key,val)  in productListName" @click="productName={val:val,key:key,type:productType}">{{val}}</li>
                </ul>
            </div>
        </div>
        <div class="panel panel-info">
            <div class="panel-heading">
                <span>活跃用户趋势</span>
                <span class="tips" mtitle="活跃用户：WEB端和PC端，当日有过登录的用户记为活跃用户；对于移动端，当日有启动应用至少一次的用户记为活跃用户">?</span>
            </div>
            <div class="panel-body">
                <div id="userActiveChart" style="width: 100%; height: 320px;"></div>
            </div>
        </div>

        <table-component :table.sync="tables[0]">
            <template slot="heading">
                <span>活跃用户明细</span>
            </template>
            <template slot="table">
                <table class="table table-striped">
                    <thead>
                    <tr>
                        <th>日期</th>
                        <th>{{productName.val}}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in tables[0].renderData | pageFilter" v-if="productName">
                        <th scope="row">{{item.date}}</th>
                        <td>{{item[productName.key]}}</td>
                    </tr>
                    </tbody>
                </table>
            </template>
        </table-component>
        <modal :title="currentModal" :width="550">
            <div class="modal-body form-body">
                <div class="update-mod" v-if="currentModal=='新增运营事件' || currentModal=='更新运营事件'">
                    <span class="tag">日期</span>
                    <span class="calendar">
                        <calendar-component :date.sync="date" format="YYYY-MM-DD" :class-names="{'input':'form-control'}"></calendar-component>
                    </span>
                    <span class="tag">事件</span>
                    <textarea class="form-control" rows="6" v-model="operationContent"></textarea>
                    <div class="bottom-tool">
                        <button class="btn btn-primary" @click="saveOperation(currentId)">保存</button>
                    </div>
                </div>
                <div class="update-mod" v-if="currentModal=='查看详细'">
                    <div style="padding: 0">
                        <p>事件({{modalData.event_date}}):</p>
                        <pre style="white-space: pre-wrap">{{modalData.content}}</pre>
                    </div>
                </div>
            </div>
        </modal>
    </div>
</template>

<script lang="babel">
    /** 活跃用户 **/
    import echarts from 'echarts'
    import callApi from '../../services/xhr'
    import base from '../common/pageBase'
    import $ from  "jquery"
    import bootbox from 'bootbox'
    import moment from 'moment'
    import  {echartsConfig} from './../common/echartsConfig'

    export default {
        mixins: [base],
        data(){
            return {
                productType: "产品类型",
                productName:"",
                productList: {enterprise: "企邮类", appreciation: "增值类", client: "客户端"},
                productListName:{},
                currentModal:"",
                date: moment().format('YYYY-MM-DD'),
                operationContent: '',
                currentDate: '',
                operationList: [],
                modalData: [],
                categoriesName:[]
            }
        },
        watch: {
            countType() { this.getData(this.productType) },
            productType(val,oval){},
            productName(val,oval){
                this.getData(val);
            }
        },
        computed:{
            productListName(){
                return  {...this.echartsList[this.productType]}
            }
        },
        created(){
            this.echartsList={};
            this.echartsArrList={};
        },
        ready(){
            callApi({
                url: "categories"
            }).then(data =>{
                for(let v of data.categories) {
                this.echartsList[v.name] = {};
                this.echartsArrList[v.name] = [];
                for (let k of v.products) {
                    this.echartsList[v.name][k.productId] = k.productName;
                    this.echartsArrList[v.name].push(k.productName);
                }
            }
            this.categoriesName = data.categories.map(item => {
                        return {name: item.name, id: item.id}
                    });

            },res=>{
                bootbox.alert("请求失败")
            })
        },
        components:{
            "modal":require("../components/modal.vue"),
            'calendar-component': require('vue-calendar')
        },
        methods: {
            getData(obj) {
                obj=obj || {};
                let dataOrderByDate = {};
                let renderData=[];
                let renderChartData=[];
                callApi({
                    url:"userNumDelta",
                    data:JSON.stringify({
                         startDate: this.startDate,
                        endDate: this.endDate,
                        productIds:[obj.key]
                    })
                }).then(currentData=>{
                        for (let v of  Object.keys(currentData.activeUserNum)) {
                            for (let k of currentData.activeUserNum[v]) {
                                let date = k.date;
                                if (dataOrderByDate[date] == null) {
                                    dataOrderByDate[date] = {};
                                }
                                dataOrderByDate[date][v] = k.num;
                            }
                        }

                        this.tables[0].loading = true
                        for (let a in dataOrderByDate) {
                            renderData.push({
                                date: a,
                                [obj.key]: dataOrderByDate[a][obj.key] || 0,
                            })
                        }
                        renderChartData = Object.keys(dataOrderByDate).map(date=> {
                            return {
                                date,
                                ...dataOrderByDate[date]
                            }
                        })
                },res=>{
                    bootbox.alert("请求失败")
                })

                this.tables[0].loading = false
                this.tables[0].renderData = renderData
                this.tables[0].totalRow = renderData.length
                this.renderChart(renderChartData.slice(0).reverse(),obj)
            },
            renderChart(data,obj) {
                let productTypeList=[];
                    productTypeList.push({
                        name: obj.val,
                        type: 'line',
                        data: data.map(item => item[obj.key])
                    })
                let option = {
                    ...echartsConfig,
                    legend: {
                        data: [obj.val]
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: data.map(obj => obj.date)
                        }
                    ],
                    series: [...productTypeList]
                }
                let mychart = echarts.init(document.getElementById('userActiveChart'))
                mychart.setOption(option)
            }
        }
    }
</script>
<style lang="less">
    #productType{
        font-size: 16px;
    }
    .panel-dropdown{
        display: inline-block;
    .dropdownBtn{
        background-color: #ffffff;
        border-radius: 2px;
        display: inline-block;
        border: 1px solid #dedede;
        margin-left: 50px;
    &:hover{
         background-color: #ebebeb;
     }
    #dLabel{
        background-color: transparent;
        width: 100px;
        height: 40px;
    }
    #aLabel{
        background-color: transparent;
        width: 110px;
        height: 40px;
        .caret{

        }
    }
    }
    .dropdown-menu{
        top: 42px;
        padding: 0;
        min-width: 0;
        left: 0;
        width: 100%;
    li{
        text-align: center;
        font-size: 16px;
        padding: 5px 15px;
        cursor: pointer;
    &:hover{
         background-color: #ebebeb;
         color: #000;
     }
    }
    }
    }
    .active-user{
    .tools{
        padding: 5px 20px;
    }
    .modal-body{
    .update-mod{
    .tag{
        float: left;
        padding-right: 15px;
        text-align: right;
        width: 60px !important;
    }
    textarea{
        width: 450px;
    }
    .bottom-tool{
        padding: 0;
        margin-top: 20px;
        text-align: center;
    }
    .calendar{
        display: flex;
        position: relative;
        margin-bottom: 3px;
    >input{
         cursor: pointer;
         padding: 5px;
         font-size: 14px;
         color: #333333;
         width: 100px;
         text-align: center;
         border-radius: 4px;
     }
    .panel{
        position: absolute;
        top: 0;
        left: 105px;
        z-index: 1000;
        width: 100%;
        background-color: #f2f2f2;
        box-shadow: 0 0 10px #858585;
        border: none;
        font-size: 12px;
    .bar{
        font-size: 14px;
        background-color: #404040;
        height: 30px;
        line-height: 30px;
        color: #ffffff;
        font-weight: bold;
    >span{
         cursor: pointer;
         padding: 0 5px;
         height: 100%;
         display: inline-block;
         user-select: none;
    &:hover{
         background-color: #ffee38 !important;
         color: #333333;
     }
    &:first-child{
         float: left;
     }
    &:last-child{
         float: right;
     }
    }
    }
    .box{
        margin: 0;
    &:hover:not([unhover]),&.active{
                                background-color: #ffee38 !important;
                                color: #333333;
                            }
    }
    .day{
        padding: 5px 0;
        color: #333333;
    &:not([unhover]){
         background-color: #fafafa;
         color: #858585;
     }
    }
    .month{
        padding: 10px 0;
    }
    .year{
        font-size: 14px;
        line-height: 30px;
    }
    }
    }
    }
    }
    }
</style>
