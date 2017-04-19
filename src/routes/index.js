// import appService from '../modules/services/appService'
import {getModules} from './category'

export function configRouter(router) {
    router.redirect({
        '/': '/login'
    })

    router.map({
        '/login': {
            component: require('../modules/login.vue')
        },
        '/main': {
            component: require('../modules/app.vue'),
            subRoutes: (() => {
                let subR = {}
                getModules().forEach(item => {
                    let id = '/' + item.split('/').pop()
                    subR[id] = {
                        component: require('../modules/' + item + '.vue')
                    }
                })
                subR["/index"]={
                    component: require('../modules/' + 'welcome.vue')
                }
                return subR
            })()
        }

        // '*': {
        //     component: require('../modules/not-found.vue')
        // }
    })

    // router.beforeEach(transition => {
    //     if (transition.to.path === '/forbidden') {
    //         router.app.authenticating = true
    //         setTimeout(() => {
    //             router.app.authenticating = false
    //             transition.abort()
    //         }, 3000)
    //     } else if (!appService.getSid() && transition.to.path !== '/login') {
    //         router.go('/login')
    //     } else {
    //         transition.next()
    //     }
    // })
}
