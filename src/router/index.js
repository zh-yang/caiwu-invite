import Vue from 'vue'
import Router from 'vue-router'

import Invite from '@/components/Invite'
import Bind from '@/components/Bind'
import Transfer from '@/components/Transfer'
import Pure from '@/components/Pure'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/mobile',
			name: 'Invite',
			component: Invite
		},
        {
            path: '/mobile/invite',
            name: 'Invite',
            component: Invite
        },
        {
            path: '/mobile/bind',
            name: 'Bind',
            component: Bind
        },
        {
            path: '/mobile/transfer',
            name: 'Transfer',
            component: Transfer
        },
        {
            path: '/mobile/pure',
            name: 'Pure',
            component: Pure
        }
	]
})