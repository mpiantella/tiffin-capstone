import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from './store';

Vue.use(Router)

// add some logic to check if user is logged in
const router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [{
			path: '/',
			name: 'home',
			component: Home
		},
		{
			path: '/auth',
			name: 'Authenticator',
			component: () => import('./components/Authentication/Auth.vue')
		},
		{
			path: '/about',
			name: 'about',
			component: () => import('./views/About.vue')
		},
		{
			path: '/profile',
			name: 'profile',
			meta: {
				requiresAuth: true
			},
			component: () => import('./components/User/Profile.vue'),
		},
		{
			path: '/profileupdate',
			name: 'profileupdate',
			meta: {
				requiresAuth: true
			},
			component: () => import('./components/User/Update.vue'),
		},
		// clean up. See User Profile. Manage Level UP (TODO list and manage. To add, go to level up) . Apply for Jobs.
		{
			// do I add this and then on no id use main or what?
			path: '/jobseeker',
			name: 'jobseeker',
			component: () => import('./components/JobSeeker/Main.vue'),
			meta: {
				requiresAuth: true
			},
			children: [{
				path: 'update',
				name: 'jobseekerupdate',
				component: () => import('./components/User/Update.vue') // This adds the address and other
			}]
		},
		// ,
		// {
		// 	path: '/jobseeker/:id',
		// 	//name: 'jobseeker',
		// 	component: () => import('./components/JobSeeker/Dashboard.vue'),
		// 	children: [{
		// 			path: 'update',
		// 			name: 'jobupdate',
		// 			component: () => import('./components/JobCreator/Update.vue')
		// 		},
		// 		// read the list of todos
		// 		// {
		// 		// 	path: 'apply',
		// 		// 	name: 'apply',
		// 		// 	component: () => import('./components/JobSeeker/JobApplication.vue')
		// 		// }
		// 	]
		// },
		{
			path: "/jobseekers", // this will need to convert in a user id page other something
			name: "jobseekers", // protect jobseeker page by aith check
			meta: {
				requiresAuth: true
			},
			component: () => import('./components/JobSeeker/Main.vue')
		},
		{
			path: '/userlevelup',
			name: 'userlevelup',
			meta: {
				requiresAuth: true
			},
			component: () => import('./components/JobSeeker/LevelUp.vue')
			// quick viw that shows the user's todos
			// leads to a list of todos which are activities, which can be added or removed to a list
			// this is part of the user object
		},
		// activity
		{
			path: '/contents',
			name: 'contents',
			component: () => import('./components/ContentCreator/Main.vue')
		},
		{
			path: '/contentcreate',
			meta: {
				requiresAuth: true
			},
			component: () => import('./components/ContentCreator/Create.vue')
		},
		{
			path: '/content/:id',
			name: 'contentdashboard',
			component: () => import('./components/ContentCreator/Dashboard.vue'),
			meta: {
				requiresAuth: true
			},
			children: [{
				path: 'update',
				// this needs to be done
				component: () => import('./components/ContentCreator/Update.vue')
			}]
		},
		// job entity 
		{
			path: "/jobcreator", // this will display jobs with graphql filter
			name: "jobcreator",
			meta: {
				requiresAuth: true
			},
			props: true,
			component: () => import('./components/JobCreator/Main.vue'),
		},
		{
			path: '/jobcreate',
			name: 'jobcreate',
			meta: {
				requiresAuth: true
			},
			component: () => import('./components/JobCreator/Create.vue')
		},
		{
			path: '/job/:id',
			name: 'jobview',
			meta: {
				requiresAuth: true
			},
			component: () => import('./components/JobCreator/View.vue'),
			children: [{
				// reuse the create page
				path: 'update',
				name: 'jobupdate',
				component: () => import('./components/JobCreator/Update.vue')
			}]
		},
	]
});

router.beforeResolve((to, from, next) => {
	store.dispatch("fetchUser").finally(() => next());
})
export default router