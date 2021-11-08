<template>
  <v-container class="pt-10">
    <v-row>
      <v-col>
        <h1>Job Creator</h1>
      </v-col>
      <v-col cols="4" class="text-right">
        <!-- This button can only be displayed if user is logged in and have a subsciption-->
        <v-btn
          class="redFont"
          elevation="2"
          depressed
          raised
          rounded
          to="/jobcreate"
          >Create a Job</v-btn
        >
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
import ListJobs from "../../apis/ListJobs";

export default {
  data() {
    return {
      listJobs: [],
    };
  },

  methods: {
    readJob(id) {
      const params = { id: id };
      this.$router.push({ name: "jobview", params });
    },
  },
  apollo: {
    // how to store in local store
    jobs: {
      query: () => ListJobs,
      update: (data) => data.listJobs.items,
    },
  },
};
</script>
