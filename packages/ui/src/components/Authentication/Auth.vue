<template>
  <v-container class="pt-10">
    <v-row>
      <v-col>
        <h1>Authentication</h1>
        <div>
          <div v-if="authState !== 'signedin'">Please sign in.</div>
          <amplify-authenticator>
            <div v-if="authState === 'signedin' && user">
              <div>Hello, {{ user.username }}</div>
            </div>
            <amplify-sign-out></amplify-sign-out>
          </amplify-authenticator>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { onAuthUIStateChange } from "@aws-amplify/ui-components";
import AmplifyStore from "../../store";

export default {
  name: "AuthStateApp",
  created() {
    this.unsubscribeAuth = onAuthUIStateChange((authState, authData) => {
      console.log(authState);
      this.authState = authState;
      this.user = authData;
      AmplifyStore.commit("setUser", authData);
    });
  },
  data() {
    return {
      user: undefined,
      authState: undefined,
      unsubscribeAuth: undefined,
    };
  },
  beforeDestroy() {
    this.unsubscribeAuth();
  },
};
</script>

<style>
:root {
  --amplify-primary-color: #f44336;
  --amplify-primary-tint: #2196f3;
  --amplify-primary-shade: #f44336;
  --amplify-background-color: #fff;
}
</style>
