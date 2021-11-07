<template>
  <v-container>
    <v-row class="pt-10"><h1>Single Activiy goes here</h1></v-row>
    <v-row>
      <v-col cols="12">
        <div>
          <!-- start of activity list -->
          <!-- end of activity list -->
          <v-btn
            class="redFont"
            elevation="10"
            depressed
            raised
            rounded
            to="/createcontent"
            >Create Content</v-btn
          >
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import getActivity from "../../queries/GetActivity";
export default {
  data() {
    return {
      activity: {},
      activityName: "",
      activities: [],
    };
  },
  apollo: {
    // how to store in local store
    getActivity: {
      // id should be passed through the - saved in the store or something
      query: (id) => getActivity,
    },
  },
};
</script>
