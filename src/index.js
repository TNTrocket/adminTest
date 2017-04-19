import Vue from 'vue'
import VueRouter from 'vue-router'
import VueValidator from 'vue-validator'
import {configRouter} from './routes'

let buildVersion = 'BUILDVERSION_PLACEHOLDER'
console.log('Build on ' + buildVersion)

Vue.config.debug = true

Vue.use(VueRouter)
Vue.use(VueValidator)

const router = new VueRouter({
    saveScrollPosition: true
})

configRouter(router)
window.router = router

router.start(Vue.extend({}), '#root')
