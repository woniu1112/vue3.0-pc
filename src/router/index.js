import { createRouter, createWebHistory } from 'vue-router'
import { routesList } from './routes'
const routes = routesList
const routers = createRouter({
    history: createWebHistory(),
    routes
})
// 路由拦截
routers.beforeEach((to, from, next) => {
    next()
})

export default routers
