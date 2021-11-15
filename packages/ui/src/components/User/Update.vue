<template>
  <v-container>
    <v-row class="pt-10"><h1>Create a User</h1></v-row>
    <v-row>
      <v-col cols="12">
        <div id="app">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="username"
                  :counter="15"
                  label="Username"
                  readonly
                ></v-text-field>
                <v-text-field
                  v-model="username"
                  :counter="15"
                  label="Username"
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  v-model="firstName"
                  :counter="15"
                  label="First Name"
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  v-model="lastName"
                  :counter="15"
                  label="Last Name"
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  v-model="email"
                  :error-messages="emailErrors"
                  :counter="20"
                  label="email"
                  required
                  @input="$v.email.$touch()"
                  @blur="$v.email.$touch()"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  v-model="phone"
                  :error-messages="phoneErrors"
                  :counter="20"
                  label="Phone"
                  required
                  @input="$v.phone.$touch()"
                  @blur="$v.phone.$touch()"
                ></v-text-field>
              </v-col>
            </v-row>
            <!-- 
              address: Address!
              profile: Profile
              activities: [Activity]
              applications: [String]
              subscription: Subscription -->
            <v-row class="pt-2">
              <v-col cols="12">
                <v-btn
                  class="redFont mr-4"
                  elevation="2"
                  depressed
                  raised
                  rounded
                  @click="createUser()"
                >
                  Create User
                </v-btn>
                <v-btn
                  class="redFont mr-4"
                  elevation="2"
                  depressed
                  raised
                  rounded
                  @click="resetValidation()"
                >
                  Reset Form
                </v-btn>
                <v-btn
                  class="redFont mr-4"
                  elevation="2"
                  depressed
                  raised
                  rounded
                  @click="cancel()"
                  >Cancel</v-btn
                >
              </v-col>
            </v-row>
          </v-form>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
/* eslint-disable no-console */
import CreateUser from "../../apis/CreateUser";
// import GetUser from "../../apis/GetUser";
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  components: {},

  mixins: [validationMixin],

  validations: {
    email: { required, email },
    phone: { required, maxLength: maxLength(10) },
  },

  data: () => ({
    cognitoid: "bfbb9639-9c05-4868-b2e1-bd56edaf416f",
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: {}, //Address!
    profile: {}, //Profile
    activities: [], //Activity
    applications: [], // Strings
    subscription: {}, //Subscription
    // flags
    valid: true,
  }),

  computed: {
    ...mapState(["AmplifyStore"]),
    ...mapGetters(["getUser"]),
    user: {
      get() {
        return this.$store.state.user;
      },
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
    phoneErrors() {
      const errors = [];
      if (!this.$v.phone.$dirty) return errors;
      !this.$v.phone.maxLength &&
        errors.push("Phone must be at most 30 characters long");
      !this.$v.phone.required && errors.push("Phone is required.");
      return errors;
    },
  },

  created() {
    this.initialize();
  },
  methods: {
    ...mapActions(["fetchUser"]),
    initialize() {
      if (!this.user) {
        this.fetchUser().then((user) => {
          this.user = user;
        });
      }
    },
    createUser() {
      const user = {
        cognitoid: this.cognitoid,
        email: this.email,
        username: this.username,
        firstName: this.firstName,
        lastName: this.lastName,
        phone: this.phone,
        registered: false,
        subcribed: false,
        //address: {},
        // profile: {},
        // activities: [],
        // applications: [],
        // subscription: {}, //Subscription
      };

      console.log(JSON.stringify(user));
      this.$apollo
        .mutate({
          mutation: CreateUser,
          variables: user,
          update: (store, { data: { createUser } }) => {
            // const data = store.readQuery({
            //   query: GetUser,
            //   variables: createUser.id,
            // });
            // data.GetUser.update(createUser);
            // store.writeQuery({ query: GetUser,  });
            console.log("\t\t\t" + JSON.stringify(createUser, null, 2));
            this.$router.push({
              name: "jobseekers",
              params: { id: createUser.id },
            });
          },
          optimisticResponse: {
            __typename: "Mutation",
            createUser: {
              __typename: "User",
              ...user,
            },
          },
        })
        .then((data) => console.log(data))
        .catch((error) => console.error("error!!!: ", error));
    },
    resetValidation() {
      this.$refs.form.reset();
    },
    cancel() {
      this.$router.push({ name: "/" });
    },
  },
};
</script>
