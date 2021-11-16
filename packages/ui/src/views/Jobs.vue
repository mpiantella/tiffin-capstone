<!-- DONE -->
<template>
  <v-container class="pt-10">
    <v-row>
      <v-col>
        <!-- Top Left Title -->
        <h1>Find the job that will improve your life!</h1>
      </v-col>
      <v-col cols="4" class="text-right">
        <!-- Top Right Actions -->
        <v-btn
          v-if="isUserAuth"
          class="redFont"
          elevation="2"
          depressed
          raised
          rounded
          to="/jobcreate"
          >Create Job</v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" v-for="(job, i) in jobs" :key="i">
        <v-card :color="job.title">
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="text-h5 mb-2" v-text="job.category">
              </v-card-title>
              <v-card-subtitle v-text="job.title"></v-card-subtitle>
              <v-card-text>
                <div>
                  <span class="font-weight-bold ml-4 mb-2">Type</span>
                  {{ job.type }}
                </div>
                <div>
                  <span class="font-weight-bold ml-4 mb-2">Category</span>
                  {{ job.category }}
                </div>
                <div>
                  <span class="font-weight-bold ml-4 mb-2">Fully Remote?</span>
                  {{ job.isFullyRemote }}
                </div>
              </v-card-text>
            </div>
            <v-card-actions justify-space-around>
              <v-btn class="ml-2 mt-5" outlined rounded @click="readJob(job.id)"
                >Read More
              </v-btn>
            </v-card-actions>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import ListJobs from "../apis/ListJobs";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      listJob: [],
    };
  },
  computed: {
    ...mapGetters(["getIsUserAuthenticated"]),
    isUserAuth: {
      get() {
        return this.$store.state.isUserAuth;
      },
    },
  },

  methods: {
    readJob(id) {
      const params = { id: id };
      this.$router.push({ name: "jobdashboard", params });
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
