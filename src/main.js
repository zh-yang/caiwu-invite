import Vue from 'vue'
import Home from './Home'
import router from './router'

// Vue.config.productionTip = false

import flexible_css from './lib/flexible_css.debug'
import flexible from './lib/flexible'

new Vue({
	el: '#app',
	router,
	components: { Home },
	template: '<Home/>'
})