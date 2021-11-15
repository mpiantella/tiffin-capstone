<template>
  <v-container class="pt-10">
    <v-row>
      <v-col cols="8">
        <h1>User profile</h1>
      </v-col>
      <v-col cols="4" class="text-right">
        <!-- Create Jobs/Create Content-->
        <!-- Add flag: ifUser IsSubcribed show CreateJob-->
        <v-btn
          class="ml-2 redFont"
          elevation="2"
          depressed
          raised
          rounded
          to="/jobcreator"
          >Manage Jobs
        </v-btn>
        <v-btn
          class="ml-2 redFont"
          elevation="2"
          depressed
          raised
          rounded
          to="/contents"
          >Manage Content
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card elevation="2" class="pa-2 mx-auto" outlined>
          <h3 v-if="user">{{ user.username }}'s profile</h3>
          <br />
          <div><b>Email</b> {{ user.email }}</div>
          <br />
          <div><b>Phone</b> {{ user.phone }}</div>
          <br />
        </v-card>

        <div class="pt-10">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-expansion-panels v-model="panel" :disabled="disabled" multiple>
              <!-- Start of Address -->
              <v-expansion-panel>
                <v-expansion-panel-header>Address</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="address1"
                        :error-messages="address1Errors"
                        :counter="50"
                        label="Address 1"
                        required
                        @input="$v.address1.$touch()"
                        @blur="$v.address1.$touch()"
                      ></v-text-field>

                      <v-text-field
                        v-model="address2"
                        label="Address 2"
                      ></v-text-field>

                      <v-text-field
                        v-model="city"
                        :error-messages="cityErrors"
                        :counter="20"
                        label="City"
                        required
                        @input="$v.city.$touch()"
                        @blur="$v.city.$touch()"
                      ></v-text-field>

                      <v-text-field
                        v-model="state"
                        :error-messages="stateErrors"
                        :counter="20"
                        label="State"
                        required
                        @input="$v.state.$touch()"
                        @blur="$v.state.$touch()"
                      ></v-text-field>

                      <v-text-field
                        v-model="zipCode"
                        :error-messages="zipCodeErrors"
                        :counter="10"
                        label="Zip Code"
                        required
                        @input="$v.zipCode.$touch()"
                        @blur="$v.zipCode.$touch()"
                      ></v-text-field>

                      <v-text-field
                        v-model="country"
                        :error-messages="countryErrors"
                        :counter="20"
                        label="Country"
                        required
                        @input="$v.country.$touch()"
                        @blur="$v.country.$touch()"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <!--  
                  address1: String
                  address2: String
                  city: String!
                  state: String!
                  zipCode: String!
                  country: String
                -->
                </v-expansion-panel-content>
              </v-expansion-panel>
              <!-- End of Address -->

              <!-- Start of Profile -->
              <v-expansion-panel>
                <v-expansion-panel-header>Profile</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <!--  
                  currentRole: String!
                  summary: String
                  skills: [String]
                  endorsements: [String]
                -->
                </v-expansion-panel-content>
              </v-expansion-panel>
              <!-- End of Profile -->

              <!-- Start of Activities -->
              <v-expansion-panel>
                <v-expansion-panel-header>Activities</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <!-- activities -->
                </v-expansion-panel-content>
              </v-expansion-panel>
              <!-- End of Activities -->

              <!-- Start of Applications -->
              <v-expansion-panel>
                <v-expansion-panel-header
                  >Applications</v-expansion-panel-header
                >
                <v-expansion-panel-content>
                  <!--  {{user.applications}}-->
                </v-expansion-panel-content>
              </v-expansion-panel>
              <!-- End of Applications -->

              <!-- Start of Subscription -->
              <v-expansion-panel>
                <v-expansion-panel-header
                  >Subscription</v-expansion-panel-header
                >
                <v-expansion-panel-content>
                  <!-- 
                  subscriptionsId: String!
                  userId: String!
                  billing: Billing
                  active: Boolean
                -->
                </v-expansion-panel-content>
              </v-expansion-panel>
              <!-- End of Subscription -->
            </v-expansion-panels>
            <v-row class="pt-4">
              <v-col cols="12">
                <v-btn
                  class="redFont mr-4"
                  elevation="2"
                  depressed
                  raised
                  rounded
                  @click="updateUser()"
                >
                  Update Profile
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
import { mapGetters, mapActions } from "vuex";
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  validations: {
    address1: { required, maxLength: maxLength(50) },
    city: { required, maxLength: maxLength(20) },
    state: { required, maxLength: maxLength(20) },
    zipCode: { required, maxLength: maxLength(10) },
    country: { required, maxLength: maxLength(20) },
  },

  computed: {
    ...mapGetters(["getUser"]),
    user: {
      get() {
        console.log;
        return this.$store.state.user;
      },
    },
    address1Errors() {
      const errors = [];
      if (!this.$v.address1.$dirty) return errors;
      !this.$v.address1.maxLength &&
        errors.push("Address1 must be at most 50 characters long");
      !this.$v.address1.required && errors.push("address1 is required.");
      return errors;
    },
    cityErrors() {
      const errors = [];
      if (!this.$v.city.$dirty) return errors;
      !this.$v.city.maxLength &&
        errors.push("City must be at most 20 characters long");
      !this.$v.city.required && errors.push("city is required.");
      return errors;
    },
    stateErrors() {
      const errors = [];
      if (!this.$v.state.$dirty) return errors;
      !this.$v.state.maxLength &&
        errors.push("State must be at most 20 characters long");
      !this.$v.state.required && errors.push("state is required.");
      return errors;
    },
    zipCodeErrors() {
      const errors = [];
      if (!this.$v.zipCode.$dirty) return errors;
      !this.$v.zipCode.maxLength &&
        errors.push("Zip Code must be at most 10 characters long");
      !this.$v.zipCode.required && errors.push("Zip Code is required.");
      return errors;
    },
    countryErrors() {
      const errors = [];
      if (!this.$v.country.$dirty) return errors;
      !this.$v.country.maxLength &&
        errors.push("Country must be at most 20 characters long");
      !this.$v.country.required && errors.push("Country is required.");
      return errors;
    },
  },
  created() {
    this.initialize();
  },
  data() {
    return {
      // address
      address1: "",
      address2: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      // valid
      valid: false,
      disabled: false,
      panel: [],
    };
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
    updateUser() {
      const user = {
        cognitoid: "bfbb9639-9c05-4868-b2e1-bd56edaf416f",
        email: this.user.email,
        username: this.user.username,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        phone: this.user.phone,
        //
        registered: false,
        subcribed: false,
        address: {
          address1: this.address1,
          address2: this.address2,
          city: this.city,
          state: this.state,
          zipCode: this.zipCode,
          country: this.country,
        },
        // profile: {},
        // activities: [],
        // applications: [],
        // subscription: {}, //Subscription
      };

      console.log(JSON.stringify(user));
      if (this.validate()) {
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
      } else {
        alert("This form is not valid!");
      }
    },
    cancel() {
      // no
      this.isEdit = false;
    },
    validate() {
      this.$refs.form.validate();
    },
  },
};
</script>
