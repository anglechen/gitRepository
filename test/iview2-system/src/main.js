import Vue from 'vue'
import App from './App'
import router from './router'
import VueMarkdown from 'vue-markdown'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import VueQuillEditor from 'vue-quill-editor'
import IEcharts from 'vue-echarts-v3';
import axios from 'axios';
import Vuerify from 'v-vuerify-next'




Vue.use(iView)
Vue.use(VueMarkdown)
Vue.use(IEcharts)
Vue.use(Vuerify)
Vue.use(axios)

Vue.prototype.axios= axios;


Vue.config.productionTip = false

var appVue = new Vue({
    el: '#app',
    router,
    VueMarkdown,
    template: '<App/>',
    components: { App }
})
