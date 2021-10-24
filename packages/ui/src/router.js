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
			component: () => import('./views/About.vue')
		},
		{
			path: '/login',
			name: 'login',
			component: () => import('./components/Authentication/Login.vue')
		},
		{
			path: '/signup',
			name: 'signup',
			component: () => import('./components/Authentication/Signup.vue')
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
