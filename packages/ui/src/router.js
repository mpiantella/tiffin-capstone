import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

// function requireAuth(to, from, next) {

// 	if (!auth.auth.isUserSignedIn()) {
// 		UserInfoStore.setLoggedIn(false);
// 		next({
// 			path: '/login',
// 			query: {
// 				redirect: to.fullPath
// 			}
// 		});
// 	} else {
// 		UserInfoApi.getUserInfo().then(res => {
// 			// connect this back to the Vue store
// 			UserInfoStore.setLoggedIn(true);
// 			UserInfoStore.setCognitoInfo(res);
// 			next();
// 		});
// 	}
// }

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [{
			path: '/',
			name: 'home',
			component: Home,
			// beforeEnter: requireAuth
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
		// {
		// 	path: '/logout',
		// 	component: LogoutSuccess,
		// 	beforeEnter(to, from, next) {
		// 		auth.logout();
		// 		next();
		// 	}
		// },
		{
			path: '/error',
			component: () => import('./components/Authentication/LogoutSuccess.vue')
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