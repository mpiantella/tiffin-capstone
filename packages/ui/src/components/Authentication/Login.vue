<template>
  <v-container class="pt-10">
    <v-row>
      <v-col>
        <amplify-authenticator>
          <div>
            <h1>Sign In</h1>
            <amplify-sign-out></amplify-sign-out>
          </div>
        </amplify-authenticator>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "LoginPage",
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
