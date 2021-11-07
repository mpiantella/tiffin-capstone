<template>
  <v-container>
    <v-row class="pt-10">
      <v-col>
        <h1>Sign Up</h1>
        <div>
          <div v-if="authState !== 'signedin'">You are signed out.</div>
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
</script>
<style>
:root {
  --amplify-primary-color: #f44336;
  --amplify-primary-tint: #2196f3;
  --amplify-primary-shade: #f44336;
  --amplify-background-color: #fff;
}
</style>
