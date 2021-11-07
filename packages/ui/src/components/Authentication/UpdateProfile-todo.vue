

<template>
  <v-container>
    <v-row class="pt-10"><h1>Activity Creator</h1></v-row>
    <v-row>
      <v-col cols="12">
        <div id="app">
          <v-row>
            <v-col>
              <v-text-field
                v-model="name"
                :error-messages="nameErrors"
                :counter="30"
                label="name"
                required
                @input="$v.name.$touch()"
                @blur="$v.name.$touch()"
              ></v-text-field> </v-col
          ></v-row>

          <v-row>
            <v-col>
              <v-text-field
                v-model="description"
                :error-messages="descriptionErrors"
                :counter="50"
                label="description"
                required
                @input="$v.description.$touch()"
                @blur="$v.description.$touch()"
              ></v-text-field> </v-col
          ></v-row>

          <v-row>
            <v-col>
              <v-select
                :items="statusEnum"
                v-model="status"
                label="status"
              ></v-select>
            </v-col>
          </v-row>
          <!-- start date  
          https://vuetifyjs.com/en/components/date-pickers/#dialog-and-menu-->
          <v-row
            ><v-col>
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
                    label="Event Date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    :error-messages="descriptionErrors"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  :active-picker.sync="activePicker"
                  max="2025-01-01"
                  min="1950-01-01"
                  @change="save"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <!-- end date -->
          <v-row>
            <v-col>
              <vue-editor
                v-model="content"
                placeholder="Add content here"
                :counter="1000"
              ></vue-editor>
            </v-col>
          </v-row>
          <v-row class="pt-2">
            <v-col>
              <v-btn
                class="redFont"
                elevation="2"
                depressed
                raised
                rounded
                @click="createActivity()"
                >Create Content</v-btn
              >
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
/* eslint-disable no-console */
import CreateActivity from "../../apis/CreateActivity";
import ListActivities from "../../apis/ListActivities";
import { VueEditor } from "vue2-editor";
import { validationMixin } from "vuelidate";
import { required, maxLength, alpha } from "vuelidate/lib/validators";

export default {
  components: {
    VueEditor,
  },

  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(30) },
    description: { required, maxLength: maxLength(50) },
    status: { required, alpha },
    content: { required, maxLength: maxLength(1000) },
    date: { required },
  },

  data: () => ({
    name: "",
    description: "",
    userId: "mpiantella", // TODO: get from cognito-state
    content: "",
    status: "created",
    statusEnum: ["created", "open", "done"],
    date: null,
    activePicker: null,
    menu: false,
  }),

  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },

  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("Name must be at most 20 characters long");
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    },
    descriptionErrors() {
      const errors = [];
      if (!this.$v.description.$dirty) return errors;
      !this.$v.description.maxLength &&
        errors.push("Description must be at most 30 characters long");
      !this.$v.description.required && errors.push("Description is required.");
      return errors;
    }, //date
    dateErrors() {
      const errors = [];
      if (!this.$v.date.$dirty) return errors;
      !this.$v.date.maxLength &&
        errors.push("Date must be at most 10 characters long");
      !this.$v.date.required && errors.push("Date is required.");
      return errors;
    },
    contentErrors() {
      const errors = [];
      if (!this.$v.content.$dirty) return errors;
      !this.$v.content.maxLength &&
        errors.push("Content must be at most 500 characters long");
      !this.$v.content.required && errors.push("Content is required.");
      return errors;
    },
  },

  methods: {
    createActivity() {
      const activity = {
        userId: this.userId,
        name: this.name,
        description: this.description,
        content: this.content,
        status: this.status,
        date: this.date,
      };

      this.$apollo
        .mutate({
          mutation: CreateActivity,
          variables: activity,
          update: (store, { data: { createActivity } }) => {
            const data = store.readQuery({ query: ListActivities });
            data.listActivities.items.push(createActivity);
            store.writeQuery({ query: ListActivities, data });
            this.$router.push({ name: "contents" });
          },
          optimisticResponse: {
            __typename: "Mutation",
            createActivity: {
              __typename: "Activity",
              ...activity,
            },
          },
        })
        .then((data) => console.log(data))
        .catch((error) => console.error("error!!!: ", error));
    },
    save(date) {
      this.$refs.menu.save(date);
    },
  },
};
</script>
