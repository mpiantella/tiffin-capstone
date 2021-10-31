import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import '@aws-amplify/ui-vue';
import Amplify from 'aws-amplify';
import awsconfig from "./aws-exports";

import AWSAppSyncClient from 'aws-appsync';
import VueApollo from 'vue-apollo';
import appSyncConfig from './AppSync';


Amplify.configure(awsconfig);
Vue.config.productionTip = false

const config = {
	url: appSyncConfig.graphqlEndpoint,
	region: appSyncConfig.region,
	auth: {
		type: appSyncConfig.authenticationType,
		apiKey: appSyncConfig.apiKey,
	}
}
const options = {
	defaultOptions: {
		watchQuery: {
			fetchPolicy: 'cache-and-network',
		}
	}
}

const client = new AWSAppSyncClient(config, options)
const appsyncProvider = new VueApollo({
	defaultClient: client
})

Vue.config.productionTip = false
Vue.use(VueApollo)

new Vue({
	vuetify,
	router,
	provide: appsyncProvider.provide(),
	render: h => h(App)
}).$mount('#app')