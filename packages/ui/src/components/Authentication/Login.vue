<template>
  <v-container>
    <v-row>
      <v-col>
        <div v-if="authState !== 'signedin'">You are signed out.</div>
        <amplify-auth-container>
          <amplify-authenticator>
            <div v-if="authState === 'signedin' && user">
              <div>Hello, {{ user.username }}</div>
            </div>
            <amplify-sign-out></amplify-sign-out>
          </amplify-authenticator>
        </amplify-auth-container>
      </v-col>
    </v-row>
  </v-container>
</template>
<!-- 
<template>
  <v-card width="400" class="mx-auto mt-5">
    <v-card-title>
      <h1 class="display-1">Login</h1>
    </v-card-title>
    <v-card-text>
      <v-form ref="signInForm">
        <v-text-field label="Username" prepend-icon="mdi-account-circle" />
        <v-text-field
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
        />
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="info">Login</v-btn>
      :disabled="!formValidity"
      <v-btn class="mr-4" type="submit" color="success">Login</v-btn>
    </v-card-actions>
  </v-card>
</template>
 -->

<script>
import { onAuthUIStateChange } from "@aws-amplify/ui-components";
export default {
  name: "AuthStateApp",
  created() {
    this.unsubscribeAuth = onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData;
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

// export default {
//   name: "LoginPage",
//   data() {
//     return {
//       showPassword: false,
//       authState: false,
//       user: {},
//     };
//   },
// };
</script>
<style>
amplify-authenticator {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 100vh;
}
</style>
