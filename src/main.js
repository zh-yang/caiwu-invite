import Vue from 'vue'
import Home from './Home'
import router from './router'

// Vue.config.productionTip = false

import '@/styles/main.scss'

new Vue({
	el: '#app',
	router,
	components: { Home },
	template: '<Home/>'
})