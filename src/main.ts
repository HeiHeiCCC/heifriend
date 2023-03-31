import { createApp } from 'vue'
import App from './App.vue'
import * as VueRouter from 'vue-router'
import {Button, Icon, NavBar, Search, Tabbar, TabbarItem, Toast} from 'vant';
import routes from "./config/route";


const app = createApp(App);

app.use(Button);
app.use(NavBar);
app.use(Icon)
app.use(Tabbar);
app.use(TabbarItem);
app.use(Search);
app.use(Toast);

const router = VueRouter.createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})
app.use(router)

app.mount('#app')




