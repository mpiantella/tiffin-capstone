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
			path: '/contents',
			name: 'contents',
			component: () => import('./components/Content/Main.vue')
		},
		{
			path: '/jobs',
			name: 'jobs',
			component: () => import('./views/Jobs.vue')
		},
		// Authenticated actions per: User, Job or Activity
		{
			path: '/profile',
			name: 'profile',
			component: () => import('./components/User/Profile.vue'),
			beforeEnter: ifAuthenticated,
		},
		{
			path: '/user:id',
			name: 'userdashboard', // we do only read and updates => ideally after we register the user comes here with an id
			component: () => import('./components/Dashboard.vue'),
			beforeEnter: ifAuthenticated,
			children: [{
					path: 'details',
					name: 'userdetails',
					props: true,
					component: () => import('./components/Content/Details.vue'), // single item
					beforeEnter: ifAuthenticated
				},
				{
					path: 'udpate',
					name: 'userupdate',
					props: true,
					component: () => import('./components/Content/Update.vue'), // single item
					beforeEnter: ifAuthenticated
				}
			]
		},
		{
			path: '/levelup',
			name: 'level',
			component: () => import('./components/User/LevelUp.vue'),
			beforeEnter: ifAuthenticated,
			// quick viw that shows the user's todos
			// leads to a list of todos which are activities, which can be added or removed to a list
			// this is part of the user object
		},
		// activity
		{
			path: '/contentcreate',
			name: 'contentcreate',
			component: () => import('./components/Content/Create.vue'),
			beforeEnter: ifAuthenticated,
		},
		{
			path: '/content/:id',
			name: 'contentdashboard', // edit and delete here. maybe create can merge
			component: () => import('./components/Dashboard.vue'), //list of items
			beforeEnter: ifAuthenticated,
			children: [{
					path: 'details',
					name: 'contentdetails',
					props: true,
					component: () => import('./components/Content/Details.vue'), // single item
					beforeEnter: ifAuthenticated
				},
				{
					path: 'udpate',
					name: 'contentupdate',
					props: true,
					component: () => import('./components/Content/Update.vue'), // single item
					beforeEnter: ifAuthenticated
				}
			]
		},
		{
			path: '/jobcreate',
			name: 'jobcreate',
			component: () => import('./components/Job/Create.vue'),
			beforeEnter: ifAuthenticated,
		},
		{
			path: '/job/:id',
			name: 'jobdashboard', // edit and delete here. maybe create can merge
			component: () => import('./components/Dashboard.vue'),
			beforeEnter: ifAuthenticated,
			children: [
				//
				{
					// Users can apply for jobs here
					path: 'details',
					name: 'jobdetails',
					component: () => import('./components/Job/Details.vue'),
				},
				{
					// Users can apply for jobs here
					path: 'apply',
					name: 'jobapply',
					component: () => import('./components/Job/Apply.vue')
				}
			]
		},
	]
});

router.beforeResolve((to, from, next) => {
	//TODO: still not working
	// only execute if user is not set in the store
	console.log("to route", to)
	console.log("beforeResolve=>store.state.isUserAuth", router.app.$store.getters.getIsUserAuthenticated)
	if (!store.state.isUserAuth) {
		store.dispatch("fetchUser").finally(() => next());
	} else {
		next();
	}
})

function ifAuthenticated(to, from, next) {
	//TODO: still not working
	console.log("router.ifAuthenticated.isUserAuth", store.state.isUserAuth)
	if (true) { //store.state.isUserAuth
		next();
	} else {
		next('/auth');
	}
	next();
}

export default router