<template>
  <v-container class="pt-10">
    <v-row>
      <v-col>
        <h1>Authentication</h1>
        <div>
          <amplify-authenticator username-alias="email">
            <amplify-sign-up
              slot="sign-up"
              username-alias="email"
              :form-fields.prop="formFields"
            ></amplify-sign-up>
            <amplify-sign-in
              slot="sign-in"
              username-alias="email"
            ></amplify-sign-in>
          </amplify-authenticator>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "AuthStateApp",
  created() {
    // this.unsubscribeAuth = onAuthUIStateChange((authState, authData) => {
    //   console.log("Auth Template: authState: ", authState);
    //   this.authState = authState;
    //   this.user = authData;
    //   AmplifyStore.commit("setUser", authData);
    // });
  },
  data() {
    return {
      user: undefined,
      authState: undefined,
      unsubscribeAuth: undefined,
      formFields: [
        {
          type: "email",
          label: "Email Label",
          placeholder: "Please enter valid email",
          // inputProps: { required: true, autocomplete: "username" },
        },
        {
          type: "password",
          label: "Password Label",
          placeholder: "Please enter valid password",
          // inputProps: { required: true, autocomplete: "new-password" },
        },
        {
          type: "phone_number",
          label: "Phone Label",
          placeholder: "Please enter valid phone",
        },
        {
          type: "name",
          label: "First Name",
          placeholder: "First Name",
        },
        {
          type: "family_name",
          label: "Last Name",
          placeholder: "Last Name",
        },
      ],
    };
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
