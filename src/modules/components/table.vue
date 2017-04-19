<template>
    <div class="panel panel-info">
        <div class="panel-heading">
            <slot name="heading"></slot>
            <div class="tab-btns" v-if="!noAmountSelector">
                <a v-for="level in rowAmounts" @click="table.rowPerPage = level"
                   href="javascript:" :class="{'active': table.rowPerPage === level}">{{level}}</a>
            </div>
        </div>
        <slot name="tools"></slot>
        <div class="panel-body table-body">
            <slot name="table"></slot>
            <div class="loading-cover" transition="fade" v-show="table.loading"><span>加载中...</span></div>
        </div>
    </div>
    <div class="page-btns" v-if="totalPage > 1">
        <button class="pre btn" href="javascript:"
                @click="table.currentPage -= 1"
                :disabled="table.currentPage <= 1">上一页
        </button>
        <span>{{table.currentPage}}/{{totalPage}}</span>
        <button class="next btn" href="javascript:"
                @click="table.currentPage += 1"
                :disabled="table.currentPage >= totalPage">下一页
        </button>
    </div>
</template>

<script lang="babel">

    /** 模态框 **/
    export default {
        props: {
            noAmountSelector: {
                type: Boolean,
                default: false
            },
            table: {
                type: Object,
                default: () => {
                    return {
                        loading: false,
                        renderData: [],
                        currentPage: 1,
                        rowPerPage: 30,
                        totalRow: 1
                    }
                }
            },
            tid: { // table id
                type: Number,
                default: 0
            },
            getData: {
                type: Function,
                default: () => {
                }
            }
        },
        data () {
            return {
                rowAmounts: [30, 50, 100, 500]
            }
        },
        computed: {
            totalPage() {
                let rows = this.table.totalRow,
                        rowPerPage = this.table.rowPerPage
                return Math.floor(rows / rowPerPage) + Number((rows % rowPerPage) > 0 && (rows > rowPerPage))
            }
        },
        watch: {
            'table.rowPerPage'() {
                this.table.currentPage = 1
                this.getData()
            },
            'table.currentPage'() {
                this.getData()
            }
        }
    }
</script>

<style lang="less">
    .table-body {
        position: relative;
        padding: 0 0 20px 0;
        min-height: 80px;
    .table-striped {
        background-color: #f9f9f9;
    > tbody > tr:nth-of-type(odd) {
          background-color: #ffffff;
      }
    }
    .table {
        margin-bottom: 0;
    thead > tr > th {
        border-bottom: none;
        background-color: #f9f9f9;
    }
    > tbody > tr {
    td, th {
        border-top: none;
        max-width: 120px;
        word-wrap: break-word;
    }
    th {
        font-weight: normal;
    }
    }
    }
    }
</style>