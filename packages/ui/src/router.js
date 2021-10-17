import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home
		},
		{
			path: '/about',
			name: 'about',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import('./views/About.vue')
		},
		{
			path: '/login',
			name: 'login',
			component: () => import('./views/Login.vue')
		},
		{
			path: '/signup',
			name: 'signup',
			component: () => import('./views/Signup.vue')
		},
		{
			path: "/jobseeker",
			name: "jobseeker",
			component: () => import('./views/JobSeeker.vue')
        },
		{
			path: "/levelup",
			name: "levelup",
			component: () => import('./views/LevelUp.vue')
        },
        {
			path: "/jobcreator",
			name: "jobcreator",
			component: () => import('./views/JobCreator.vue')
        },
        {
			path: "/contentcreator",
			name: "contentcreator",
			component: () => import('./views/ContentCreator.vue')
        },
	]
})
