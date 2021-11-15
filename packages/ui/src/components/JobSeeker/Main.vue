<template>
  <v-container class="pt-10">
    <v-row>
      <v-col>
        <h1 v-if="isUserAuthenticated">Welcome {{ user.firstName }}!</h1>
        <h1 v-else>Welcome to the Remote Brilliance!</h1>
      </v-col>

      <v-col cols="4" class="text-right">
        <!-- This button can only be displayed if user is logged in and have a subsciption-->
        <!-- <v-btn
          class="redFont"
          elevation="2"
          depressed
          raised
          rounded
          to="/userlevelup"
          >Level Up</v-btn
        > -->
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <h2>Name: {{ user.firstName }} {{ user.lastName }}</h2>

        <p><b>username</b> {{ user.username }}</p>
        <p><b>username</b> {{ user.email }}</p>
        <p><b>username</b> {{ user.phone }}</p>
        <p><b>applications</b> {{ user.applications }}</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" v-for="(job, i) in jobs" :key="i">
        <v-card :color="job.name">
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="text-h5" v-text="job.title"> </v-card-title>
              <v-card-subtitle v-text="job.category"></v-card-subtitle>
              <v-card-text>
                <div><b>Start Date</b>: {{ job.startDate }}</div>
                <div><b>End Date</b>: {{ job.endDate }}</div>
                <div><b>is Fully Remote?</b>: {{ job.isFullyRemote }}</div>
              </v-card-text>
            </div>
            <v-card-actions justify-space-around>
              <v-btn class="ml-2 mt-5" outlined rounded @click="readJob(job.id)"
                >Read More
              </v-btn>
              <v-btn class="ml-2 mt-5" outlined rounded>Apply </v-btn>
            </v-card-actions>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import GetUser from "../../apis/GetUser";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      user: [],
    };
  },
  computed: {
    ...mapGetters(["getIsUserAuthenticated"]),
    isUserAuthenticated: {
      get() {
        return this.$store.state.isUserAuthenticated;
      },
    },
  },

  methods: {
    readJob(id) {
      const params = { id: id };
      this.$router.push({ name: "jobview", params });
    },
    applyForJob(job) {
      //expand: !this.expand;
      // just update a single job
      const _job = {
        id: job.id,
        title: job.title,
        category: job.category,
        type: job.type,
        userId: job.userId,
        description: job.description,
        isFullyRemote: job.isFullyRemote,
        howtoApply: job.howtoApply,
        companyDescription: job.companyDescription,
        companyHQ: job.companyHQ,
        companyName: job.companyName,
        companyStatement: job.companyStatement,
        companyWebsiteURL: job.companyWebsiteURL,
        logo: job.logo,
        startDate: job.startDate,
        endDate: job.endDate,
      };
      console.log(JSON.stringify(_job, null, 2));
      /*
      this.$apollo
        .mutate({
          mutation: UpdateJob,
          variables: _job,
          update: (store, { data: { updateJob } }) => {
            const data = store.readQuery({ query: ListJobs });
            data.listJobs.items.push(updateJob);
            store.writeQuery({ query: ListJobs, data });
            this.$router.push({ name: "jobcreator" });
          },
          optimisticResponse: {
            __typename: "Mutation",
            updateJob: {
              __typename: "Job",
              ..._job,
            },
          },
        })
        .then((data) => console.log(data))
        .catch((error) => console.error("error!!!: ", error));
        */
    },
  },
  apollo: {
    // how to store in local store
    user: {
      query: () => GetUser,
      variables() {
        return {
          id: this.$route.params.id,
        };
      },
      update: (data) => data.getUser,
    },
  },
};
</script>
