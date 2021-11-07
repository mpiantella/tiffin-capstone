import Vue from 'vue';
import Vuelidate from 'vuelidate'
import './plugins/vuetify';
import vuetify from './plugins/vuetify';
import AWSAppSyncClient from 'aws-appsync';
import VueApollo from 'vue-apollo';
import '@aws-amplify/ui-vue';
import Amplify from 'aws-amplify';

import App from './App.vue';
import router from './router';
import awsconfig from "./aws-exports";
import appSyncConfig from './AppSync';

Amplify.configure(awsconfig);

const config = {
	url: appSyncConfig.graphqlEndpoint,
	region: appSyncConfig.region,
	auth: {
		type: appSyncConfig.authenticationType,
		apiKey: appSyncConfig.apiKey,
	}
};
const options = {
	defaultOptions: {
		watchQuery: {
			fetchPolicy: 'cache-and-network',
		}
	}
};

const client = new AWSAppSyncClient(config, options)
const appsyncProvider = new VueApollo({
	defaultClient: client
})

Vue.config.productionTip = false
Vue.use(VueApollo)
Vue.use(Vuelidate)

new Vue({
	vuetify,
	router,
	provide: appsyncProvider.apolloProvider(),
	render: h => h(App)
}).$mount('#app')