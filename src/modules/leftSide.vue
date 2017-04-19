<template>
    <div class="side">
    <ul>
        <li class="title" v-link="{path: '/main/index'}" :class="{'active':currentPage=== '/main/index'}" @click="currentTab = ''" >首页</li>
        <li v-for="list in itemList"  :class="{'active': list.id === currentTab}">
         <div class="title" @click="currentTab = list.id" v-if="list.links.length!=0">{{list.title}}</div>
            <div v-else  class="title" @click="currentTab = list.id" v-link="{path: basePath+ list.id}">{{list.title}}</div>
            <ul class="alink collapse" id="{{list.id}}">
                <li v-for="link in list.links">
                    <a v-link="{path: basePath+ link.id, activeClass:'current'}">{{link.title}}</a>
                </li>
            </ul>
        </li>
    </ul>
    </div>
</template>

<script lang="babel">
    import {getCategory} from "../routes/category"
    import $ from  "jquery"
export default{
    data(){
        return{
            itemList:[],
            currentTab: '',
            basePath: '/main/'
        }
    },
    ready(){
        this.itemList = getCategory()
        this.currentTab = "text"
    },
    computed: {
        currentPage() {
            return this.$route.path
        }
    },
    watch:{
        currentTab(val, oval) {
            $('#' + oval).collapse('hide')
            $('#' + val).collapse('show')
        }
    },
    methods:{
        test(){
            alert("dd");
        }
    }
}
</script>

<style lang="less">
 .side{
     width: 150px;
     height: 100%;
     position: absolute;
     background-color: #333;
     color: #999;
     overflow-y: auto;
 .active{
     color: #ffffff;
 }
     .title{
        padding: 10px 0 10px 20px;
         font-size: 18px;
         margin-top: 10px;
         cursor: pointer;
     }
     >ul{
          padding-top: 10px;
     li{
         &:hover{
     color:#ffffff;
          }
     }
      }

 .alink {

 a {
     display: block;
     padding: 0 0 0 25px;
     line-height: 30px;
     font-size: 14px;
     cursor: pointer;
     color: #858585;
 &:before{
      content: '-';
      margin-right: 5px;
  }
 &:hover,&.current{
     color: #ffffff;
     border-right: 5px solid #ffee38;
     background-color: #44484d;
     text-decoration: none;
 }

 }
 }
 }
</style>