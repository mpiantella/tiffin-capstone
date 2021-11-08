import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

// add some logic to check if user is logged in
export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [{
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
			component: () => import('./components/JobSeeker/Main.vue'),
			children: [{
				path: 'jslevelup',
				component: () => import('./components/JobSeeker/LevelUp.vue')
			}]
		},
		{
			path: '/contents',
			name: 'contents',
			component: () => import('./components/ContentCreator/Main.vue')
		},
		{
			path: '/contentcreate',
			// props: true,
			component: () => import('./components/ContentCreator/Create.vue')
		},
		{
			path: '/content/:id',
			name: 'contentdashboard',
			component: () => import('./components/ContentCreator/Dashboard.vue'),
			children: [{
				path: 'update',
				component: () => import('./components/ContentCreator/Update.vue')
			}]
		},
		{
			path: "/jobcreator",
			name: "jobcreator",
			component: () => import('./components/JobCreator/Main.vue'),
		},
		{
			path: '/jobcreate',
			name: 'jobcreate',
			component: () => import('./components/JobCreator/Create.vue')
		},
		{
			path: '/job/:id',
			name: 'jobview',
			component: () => import('./components/JobCreator/Dashboard.vue'),
			children: [{
				path: 'update',
				name: 'jobupdate',
				component: () => import('./components/JobCreator/Update.vue')
			}]
		},

	]
})