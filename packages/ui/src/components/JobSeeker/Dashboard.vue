<template>
  <v-container class="pt-10">
    <v-row>
      <v-col cols="8">
        <h1>Job Seeker Dashboard - {{ job.title }}</h1>
        <h2>isUserAuthenticated {{ isUserAuthenticated }}</h2>
      </v-col>
      <v-col cols="4" class="text-right">
        <v-btn class="ml-2 mt-5" rounded small @click="goBack()">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-btn class="ml-2 mt-5" rounded small @click="deleteJob(job)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <v-btn class="ml-2 mt-5" rounded small @click="updateJob(job)">
          <v-icon>mdi-update</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <div>
          <h2>
            {{ job.category }}
          </h2>
          <v-card-title class="text-h5" v-text="job.title"> </v-card-title>
          <v-card-subtitle v-text="job.type"></v-card-subtitle>
          <v-card-text>
            <div><b>Start Date</b>: {{ job.startDate }}</div>
            <div><b>End Date</b>: {{ job.endDate }}</div>
            <div><b>is Fully Remote?</b>: {{ job.isFullyRemote }}</div>
          </v-card-text>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12"><p v-html="job.content"></p> </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn class="ml-2 mt-5" outlined rounded small @click="Apply(job)">
          Apply
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";

import GetJob from "../../apis/GetJob";
import ListJobs from "../../apis/ListJobs";
import DeleteJob from "../../apis/DeleteJob";

export default {
  data() {
    return {
      job: {},
      jobs: [],
    };
  },
  methods: {
    deleteJob(job) {
      if (confirm("Do you really want to delete this job?")) {
        this.$apollo
          .mutate({
            mutation: DeleteJob,
            variables: {
              id: job.id,
            },
            update: (store, { data: { deleteJob } }) => {
              const data = store.readQuery({ query: ListJobs });
              data.listJobs.items = data.listJobs.items.filter(
                (job) => job.id !== deleteJob.id
              );
              store.writeQuery({ query: ListJobs, data });
              this.$router.push({ name: "jobcreator" });
            },
            optimisticResponse: {
              __typename: "Mutation",
              deleteJob: {
                __typename: "Job",
                ...job,
              },
            },
          })
          .then((data) => console.log(data))
          .catch((error) => console.error(error));
      }
    },
    updateJob(job) {
      // TODO
    },
    goBack() {
      this.$router.push({ name: "jobcreator" });
    },
    Apply() {
      // TODO
    },
  },

  computed: {
    ...mapGetters(["getIsUserAuthenticated"]),
    isUserAuthenticated: {
      get() {
        return this.$store.state.isUserAuthenticated;
      },
    },
  },
  apollo: {
    // how to store in local store
    job: {
      // id should be passed through the - saved in the store or something
      query: () => GetJob,
      variables() {
        console.log("here", this.$route.params.id);
        return {
          id: this.$route.params.id,
        };
      },
      update: (data) => data.getJob,
    },
  },
};
</script>
