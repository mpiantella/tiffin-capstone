import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from './store';

Vue.use(Router)
const ifAuthenticated = (to, from, next) => {
	console.log("top", store.state.isUserAuth)
	// if (store.state.isUserAuth) {
	// 	next();
	// } else {
	// 	next('/auth');
	// }
	next();
}
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
			path: '/contents',
			name: 'contents',
			component: () => import('./components/ContentCreator/Main.vue')
		},
		{
			path: '/jobs',
			name: 'jobs',
			component: () => import('./views/Jobs.vue')
		}, // 
		{
			path: '/profile:id',
			name: 'profile',
			beforeEnter: ifAuthenticated,
			component: () => import('./components/User/Profile.vue'),
		},
		// now is where we start cleaning up
		{
			path: '/profileupdate',
			name: 'profileupdate',
			beforeEnter: ifAuthenticated,
			component: () => import('./components/User/Update.vue'),
		},
		// clean up. See User Profile. Manage Level UP (TODO list and manage. To add, go to level up) . Apply for Jobs.
		{
			// do I add this and then on no id use main or what?
			path: '/jobseeker', // take the user to Profile.main
			name: 'jobseeker',
			component: () => import('./components/JobSeeker/Main.vue'),
			beforeEnter: ifAuthenticated,
			children: [{
				path: 'update', //user:id
				name: 'jobseekerupdate', //Profile/Update.vue
				component: () => import('./components/User/Update.vue') // This adds the address and other
			}]
		},
		{
			path: "/jobseekers", // this will need to convert in a user id page other something
			name: "jobseekers", // protect jobseeker page by aith check
			beforeEnter: ifAuthenticated,
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
			beforeEnter: ifAuthenticated,
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
			beforeEnter: ifAuthenticated,
			component: () => import('./components/JobCreator/Create.vue')
		},
		{
			path: '/job/:id',
			name: 'jobview',
			beforeEnter: ifAuthenticated,
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
	// only execute if user is not set in the store
	console.log("store.state.isUserAuth", store.state.isUserAuth)
	if (!store.state.isUserAuth) {
		store.dispatch("fetchUser").finally(() => next());
	} else {
		next();
	}
})


export default router