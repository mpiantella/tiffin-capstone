<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Sign Up</h1>
        <v-form ref="signUpForm" v-model="formValidity">
          <v-text-field
            label="Email"
            type="email"
            v-model="email"
            :rules="emailRules"
          ></v-text-field>
          <v-autocomplete
            label="Which browser do you want to use"
            :items="browsers"
          ></v-autocomplete>
          <v-file-input label="Attach profile picture"></v-file-input>
          <v-text-field label="Birthday" v-model="birthday"></v-text-field>
          <v-date-picker v-model="birthday"></v-date-picker>
          <v-checkbox
            label="Agree to Terms and Conditions"
            v-model="isAgreeToTerms"
            :rules="agreeToTemsRules"
          ></v-checkbox>
          <v-btn
            class="mr-4"
            type="submit"
            color="success"
            :disabled="!formValidity"
            >Submit</v-btn
          >
          <v-btn class="mr-4" color="success" @click="validateForm"
            >Validate Form</v-btn
          >
          <v-btn class="mr-4" color="warning" @click="resetValidation"
            >Reset Validation</v-btn
          >
          <v-btn color="error" @click="resetForm">Reset Form</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    formValidity: false,
    birthday: "",
    browsers: ["Safari", "Chrome", "Firefox", "Edge", "Brave"],
    isAgreeToTerms: false,
    agreeToTemsRules: [
      (value) =>
        !!value ||
        "You must agree to the terms and conditions to sign up for an account.",
    ],
    email: "",
    emailRules: [
      (value) => !!value || "Email is required.",
      (value) =>
        value.indexOf("@") !== 0 || "Email should have a valid username",
      // more rules
    ],
  }),
  methods: {
    validateForm() {
      this.$refs.signUpForm.validate();
    },
    resetForm() {
      this.$refs.signUpForm.reset();
    },
    resetValidation() {
      this.$refs.signUpForm.resetValidation();
    },
  },
};
</script>
