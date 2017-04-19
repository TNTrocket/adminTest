<template>
<header class="header">
    <span class="title">企邮研发中心</span>
    <span>数据管理平台</span>
</header>
    <div class="main-wrapper flex-rest-height flex-column">
        <left-side></left-side>
        <div class="right-container">
        <router-view></router-view>
        </div>
    </div>
</template>

<script lang="babel">
    require('imports?jQuery=jquery!bootstrap/js/collapse')
    require('imports?jQuery=jquery!bootstrap/js/transition')
    require('imports?jQuery=jquery!bootstrap/js/dropdown')
    require('imports?jQuery=jquery!bootstrap/js/modal')
 export  default{
    data(){
        return{

        }
    },
     events:{
         logout() {
             this.logout()
         }
     },
     methods:{
         logout() {
             this.loadingText = '退出中...'
                 router.go('/login');

         },
         clickLog(){
             let img=new Image();
             img.src="http://cim.rd.mt/lunkr/s/json?func=cim.common:clickLog&uid=test&client=pc&origin=admin"
         }
     },
     ready(){
         this.clickLog()
     },
     components:{
        "leftSide":require("./leftSide.vue")
     }
 }
</script>

<style lang="less">
 @import "../style/css/app.less";
</style>