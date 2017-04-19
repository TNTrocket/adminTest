<template>
    <div class="productControl">
    <div class="panel panel-info">
        <div class="panel-heading">产品管理</div>
        <div class="panel-body" style="display: flex">
            <div class="categoryList">
                <div class="categoryBtn">
                    <span @click="addCategory">新增</span>
                    <span @click="editCategory">编辑</span>
                    <span @click="deleteCategory">删除</span>
                </div>
                <div class="categoryListDetail">
                    <ul>
                        <li v-for="list in categoryList" :class="{'active':currtType === list.name}" @click="currtType=list.name">{{list.name}}</li>
                    </ul>
                </div>
            </div>
            <div class="categoryProduct">
                <div class="categoryProductBtn">
                    <span>新增</span>
                </div>
                <div class="categoryTable">
                  <table class="table table-striped">
                      <thead>
                       <tr>
                           <th>编号</th>
                           <th>产品名</th>
                           <th>描述</th>
                           <th>操作</th>
                       </tr>
                      </thead>
                      <tbody v-if="productList.length!=0">
                      <tr v-for="item in productList">
                          <th scope="row">{{$index + 1}}</th>
                          <td>{{item.productName}}</td>
                          <td>{{item.text}}</td>
                          <td>
                              <a href="javascript:" @click="">编辑</a> |
                              <a href="javascript:" @click="" style="color:red;">删除</a>
                          </td>
                      </tr>
                      </tbody>
                  </table>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>
<modal :title="currentModal" :width="550">

</modal>
<script lang="babel">
    import $ from  "jquery"
    import bootbox from 'bootbox'
    import flatten from 'lodash/flatten'
    import callApi from '../../services/xhr'

    export  default{
        data(){
            return{
                currtType:"",
                productList:[],
                categoryList:[]
            }

        },
        watch:{
            currtType(val,oval){
                let list=flatten(this.categoryList.map(item=>{
                    if(item.name=== val){
                        return  item.products;
                    }
                }).filter(items=>items!=undefined));
                this.productList=list
            }
        },
        methods:{
            addCategory(){
                bootbox.alert("addCategory")
            },
            editCategory(){
                bootbox.alert("editCategory")
            },
            deleteCategory(){
                bootbox.confirm("确定删除？",function (res) {
                    if(res){
                     alert("ok")
                    }else{
                        alert("canle")
                    }
                })
            }
        },
        ready(){
            this.currtType="enterprise";
            callApi({
                url:"categories",
            }).then(data=>{
                this.categoryList=data.categories;
            },res=>{
                bootbox.alert("请求失败")
            })
//       setTimeout(()=>{console.log(this.productList)},2000)
        },
        components:{
            "modal":require("../components/modal.vue"),
        }
    }


</script>
<style lang="less">
    .productControl {
    .table > thead > tr > th{
        padding: 16px;
        border-bottom: 1px solid #ddd;
    }
    .panel{
        border: 0;
    }
    .panel-body{
        border-bottom:1px solid #ddd ;
        border-right:1px solid #ddd ;
        border-left:1px solid #ddd ;
        padding: 0;
        min-height: 800px;
    }
    .categoryList {
        padding: 0 0 15px 0;
        border-right:1px solid #ddd ;
        flex: 1;
    .categoryBtn {
        border-bottom:1px solid #ddd ;
        padding:10px 0;

    >span {
        border-radius: 5px;
        display: inline-block;
        padding: 5px 10px;
        background-color: #333;
        color: #ffffff;
        cursor: pointer;
        margin-left: 10px;

    &:hover {
        background-color: #000;
    }

    }
    }
    .categoryListDetail{
        .active{
            background-color: #aaa;
            color: #000;
        }
        ul {
            li{
                padding: 15px 0 15px 10px ;
                font-size: 16px;
                cursor: pointer;
                border-bottom:1px solid #ddd ;
                &:hover{
                   background-color: #aaa;
                   color: #000;
                 }
            }
        }
    }
    }

    .categoryProduct {
        flex: 2;
        .categoryProductBtn{
            border-bottom:1px solid #ddd ;
            padding:10px 0;
            >span{
                 border-radius: 5px;
                 display: inline-block;
                 padding: 5px 10px;
                 background-color: #333;
                 color: #ffffff;
                 cursor: pointer;
                 margin-left: 10px;
               &:hover {
                  background-color: #000;
                  }
             }

        }
    .table-striped > tbody {
    > tr {
          border-bottom: 1px solid #ddd;
          padding: 16px;
    >th{
         padding: 16px;
     }
    >td{
         padding: 16px;
         background:transparent;
     }
    &:hover {
        td,th{
            background-color: #F0F8FF;
        }
     }
    }
    }
    .table-striped > tbody > tr:nth-of-type(odd){
        background-color: transparent;
    }
    }

    }
</style>
