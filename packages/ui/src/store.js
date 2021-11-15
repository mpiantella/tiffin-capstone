import Vue from 'vue'
import Vuex from 'vuex'
import {
  Auth
} from "aws-amplify";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    isUserAuthenticated: false
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setIsUserAuthenticated(state, flag) {
      state.isUserAuthenticated = flag;
    }
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    getIsUserAuthenticated(state) {
      return state.isUserAuthenticated;
    }
  },
  actions: {
    fetchUser({
      commit
    }) {
      return Auth.currentAuthenticatedUser()
        .then((data) => {
          let user = null;
          if (data && data.username) {
            user = {
              // add cognitoid
              username: data.username,
              phone: data.attributes.phone_number,
              email: data.attributes.email,
            };
          }
          commit('setUser', user);
          commit('setIsUserAuthenticated', true);

          return user;
        })
        .catch((e) => {
          store.commit("setUser", null);
          return null;
        });
    }
  }
});