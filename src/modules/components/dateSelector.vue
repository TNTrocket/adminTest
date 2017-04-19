<template>
    <div class="date-select">
        <calendar :calendar-value.sync="startDate" format="YYYY-MM-DD"></calendar>
        <span>-</span>
        <calendar :calendar-value.sync="endDate" format="YYYY-MM-DD"></calendar>
    </div>
</template>

<style lang="less">
    .date-select{
        display: inline-block;
    }
</style>

<script lang="babel">
    import moment from 'moment'

    export default{
        props: {
            startDate: {
                type: String
            },
            endDate: {
                type: String
            }
        },
        watch: {
            startDate() {
                alert("ddd");
//                this.adjustStartEnd(true)
//                this.$dispatch('dateChange')
            },
            endDate() {
                alert("ddd");
            }
        },
        methods: {
            adjustStartEnd(isStartChange) {
                if (moment(this.endDate, 'YYYY-MM-DD').diff(moment(this.startDate, 'YYYY-MM-DD'), 'days') < 0) {
                    this.endDate = isStartChange ? this.startDate : this.endDate
                    this.startDate = isStartChange ? this.endDate : this.startDate
                }
            }
        },
        components: {
            'calendar': require('./date.vue')
        }
    }
</script>