<template>
    <div id="globalModal" class="modal fade" role="dialog" aria-hidden="false" data-backdrop="static">
        <div class="modal-dialog" v-bind:style="{width: width + 'px'}">
            <div class="modal-content custom-modal">
                <div class="loading-cover" v-show="loading" transition="fade"><span>加载中...</span></div>
                <div class="modal-header">
                    <button type="button" class="bootbox-close-button close" data-dismiss="modal" aria-hidden="true">×
                    </button>
                    <h4 class="modal-title">{{title}}</h4>
                </div>
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script lang="babel">
    /** 模态框 **/
    export default {
        props: ['title', 'width', 'loading'],
        data () {
            return {}
        }
    }
</script>

<style lang="less">
    .custom-modal {
        min-height: 150px;
        position: relative;
    }
    .custom-modal .modal-body {
        padding: 12px;
    >div{
         margin-bottom: 10px;
         position: relative;
     }
    >pre{
         height: 200px;
         overflow: auto;
         white-space: pre-wrap;
         margin: 0;
         padding: 0;
         background: none;
         border-radius: 0;
         border: 0;
         font-size: 13px;
         font-family: inherit;
     }
    }
    .modal-footer{
    .error-msg{
        color: red;
        margin-right: 10px;
    }
    }
</style>