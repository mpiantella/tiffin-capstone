<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Sign Up</h1>
        <v-form ref="signUpForm" v-model="formValidity">
          <v-text-field label="Name" type="name" v-model="name"></v-text-field>
          <v-text-field
            label="Email"
            type="email"
            v-model="email"
            :rules="emailRules"
          ></v-text-field>
          <v-file-input label="Attach profile picture"></v-file-input>
          <!-- date picker-->

          <div>
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="date"
                  label="Birthday date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="date"
                :active-picker.sync="activePicker"
                :max="
                  new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                    .toISOString()
                    .substr(0, 10)
                "
                min="1950-01-01"
                @change="save"
              ></v-date-picker>
            </v-menu>
          </div>

          <!-- end of date picker-->
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
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    activePicker: null,
    date: null,
    menu: false,
    formValidity: false,
    isAgreeToTerms: false,
    agreeToTermsRules: [
      (value) =>
        !!value ||
        "You must agree to the terms and conditions to sign up for an account.",
    ],
    email: "",
    name: "",
    emailRules: [
      (value) => !!value || "Email is required.",
      (value) =>
        value.indexOf("@") !== 0 || "Email should have a valid username",
      // more rules
    ],
  }),
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },
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
    save(date) {
      this.$refs.menu.save(date);
    },
  },
};

import { Auth } from "aws-amplify";

async function signUp() {
  try {
    const { user } = await Auth.signUp({
      username,
      password,
      attributes: {
        email, // optional
        phone_number, // optional - E.164 number convention
        // other custom attributes
      },
    });
    console.log(user);
  } catch (error) {
    console.log("error signing up:", error);
  }
}
</script>
