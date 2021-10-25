<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Sign Up</h1>
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
    activePicker: null, // del
    date: null, // del
    menu: false, // del
    formValidity: false, //to-do
    isAgreeToTerms: false,
    username: "",
    password: "",
    email: "", // optional
    phoneNumber: "",
    // move rules elsewhere
    agreeToTermsRules: [
      (value) =>
        !!value ||
        "You must agree to the terms and conditions to sign up for an account.",
    ],
    emailRules: [
      (value) => !!value || "Email is required.",
      (value) =>
        value.indexOf("@") !== 0 || "Email should have a valid username",
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
</script>
