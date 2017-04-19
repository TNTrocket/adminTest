<template>
    <div class="index-box">
        <div class="top-box">
            <div class="top-box-content panel panel-info">
                <div class="title">
                    <h4>你好！</h4>
                    <span class="sub-title">欢迎登入企邮数据管理后台</span>
                    <span class="date">{{endDateRaw | formatDate}}</span>
                </div>
                <div class="data-tab">
                    <div class="loading-cover" transition="fade" v-show="loadingData"><span>加载中...</span></div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less">
    .index-box{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
    }
    .top-box{
        width: 100%;
        min-width: 900px;
        align-self: flex-start;
    .panel-heading{
        display: none;
    }
    .top-box-content{
        padding: 30px;
    .title{
        position: relative;
    h4{
        display: inline-block;
    }
    .date{
        position: absolute;
        right: 0;
        bottom: 0;
        vertical-align: baseline;
    }
    }
    }
    .data-tab{
    ul{
        display: flex;
        justify-content: space-around;
    >li{
         display: inline-block;
         margin: 15px 40px 0;
         padding: 15px 10px;
         width: 180px;
         text-align: center;
    .data-title{
        display: block;
        margin-bottom: 15px;
        color: #858585;
    }
    .data{
        font-weight: bold;
        font-size: 22px;
    }
    }
    }
    }
    }
    .bottom-box{
        display: flex;
        width: 100%;
        min-width: 900px;
        justify-content: space-around;
    .echarts-box{
        flex: 1 1 500px;
        min-width: 500px;
        margin-right: 30px;
        display: inline-block;
    }
    .report-box{
        flex: 0 0 370px;
        display: inline-block;
        float: right;
    .report-content{
        text-align: center;
        min-height: 410px;
    span{
        display: inline-block;
        margin: 80px auto;
        width: 100px;
        color: #858585;
    }
    }
    }
    }
</style>
<script lang="babel">
    /** 首页 **/
    //    import $ from 'jquery'

    export default{
        data(){
            return {
                indexData:{},
                trueName: '',
                loadingData: false,
                loadingEchart: false
            }
        },
        filters:{
//            formatDate(date){
//                var str = date.split('-')
//                str = str[0] + '年' + str[1] + '月' + str[2] + '日'
//                return str
//            }
        },
        methods:{

        }
    }
</script>