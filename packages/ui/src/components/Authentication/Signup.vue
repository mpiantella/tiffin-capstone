<template>
  <v-container>
    <v-row>
      <v-col>
        <amplify-authenticator username-alias="email">
          <amplify-sign-up
            slot="sign-up"
            username-alias="email"
            :formFields="formFields"
          ></amplify-sign-up>
          <amplify-sign-in
            slot="sign-in"
            username-alias="email"
          ></amplify-sign-in>
        </amplify-authenticator>
        <!-- <h1>Sign Up</h1>
        <v-form ref="signUpForm" v-model="formValidity">
          <v-text-field
            label="Username"
            type="name"
            v-model="username"
            prepend-icon="mdi-account-circle"
          ></v-text-field>
          <v-text-field
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
          />
          <v-text-field
            label="Email"
            type="email"
            v-model="email"
            :rules="emailRules"
          ></v-text-field>
          <v-file-input label="Attach profile picture"></v-file-input>
          <v-checkbox
            label="Agree to Terms and Conditions"
            v-model="isAgreeToTerms"
            :rules="agreeToTermsRules"
          ></v-checkbox>
          <v-btn
            class="mr-4"
            type="submit"
            color="success"
            :disabled="!formValidity"
            >Submit</v-btn
          >
          <v-btn color="error" @click="resetForm">Reset Form</v-btn>
        </v-form> -->
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { onAuthUIStateChange } from "@aws-amplify/ui-components";

export default {
  name: "AuthWithSlots",
  data() {
    return {
      formFields: [
        {
          type: "name",
          label: "Name",
          placeholder: "Please enter your name",
          inputProps: { required: true, autocomplete: "name" },
        },
        {
          type: "email",
          label: "Enter Email",
          placeholder: "Please enter your email",
          inputProps: { required: true, autocomplete: "username" },
        },
        {
          type: "password",
          label: "Custom Password Label",
          placeholder:
            "The password must have at least one character and a letter",
          inputProps: { required: true, autocomplete: "new-password" },
        },
        {
          type: "phone_number",
          label: "Enter Phone Number",
          placeholder: "Please enter your phone number",
        },
      ],
    };
  },
};
// export default {
//   data: () => ({
//     activePicker: null, // del
//     date: null, // del
//     menu: false, // del
//     formValidity: false, //to-do
//     isAgreeToTerms: false,
//     username: "",
//     password: "",
//     email: "", // optional
//     phoneNumber: "",
//     // move rules elsewhere
//     agreeToTermsRules: [
//       (value) =>
//         !!value ||
//         "You must agree to the terms and conditions to sign up for an account.",
//     ],
//     emailRules: [
//       (value) => !!value || "Email is required.",
//       (value) =>
//         value.indexOf("@") !== 0 || "Email should have a valid username",
//     ],
//   }),
//   watch: {
//     menu(val) {
//       val && setTimeout(() => (this.activePicker = "YEAR"));
//     },
//   },
//   methods: {
//     validateForm() {
//       this.$refs.signUpForm.validate();
//     },
//     resetForm() {
//       this.$refs.signUpForm.reset();
//     },
//     resetValidation() {
//       this.$refs.signUpForm.resetValidation();
//     },
//     save(date) {
//       this.$refs.menu.save(date);
//     },
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
  --main-bg-color: red;
  --amplify-primary-color: pink;
}
</style>