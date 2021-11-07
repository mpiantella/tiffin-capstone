<template>
  <v-container class="pt-10">
    <v-row><h1>Content Creator</h1></v-row>
    <v-row>
      <v-col cols="12" v-for="(activity, i) in activities" :key="i">
        <v-card :color="activity.name">
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title
                class="text-h5"
                v-text="activity.name"
              ></v-card-title>
              <v-card-subtitle v-text="activity.description"></v-card-subtitle>
              <v-card-text>
                <div><b>Date</b>: {{ activity.date }}</div>
                <div><b>Status</b>: {{ activity.status }}</div>
              </v-card-text>
              <v-card-actions align>
                <v-btn
                  class="ml-2 mt-5"
                  outlined
                  rounded
                  small
                  @click="readActivity(activity.id)"
                >
                  Read More
                </v-btn>
              </v-card-actions>
            </div>
            <!-- 
            <v-avatar class="ma-3" size="125" tile>
              <v-img :src="item.src"></v-img>
            </v-avatar> -->
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="pt-2">
      <v-col>
        <!-- This button can only be displayed if user is logged in-->
        <v-btn
          class="redFont"
          elevation="2"
          depressed
          raised
          rounded
          to="/contentcreate"
          >Create Content</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import ListActivities from "../../queries/ListActivities";

export default {
  data() {
    return {
      listActivities: [],
    };
  },

  methods: {
    readActivity(id) {
      const params = { id: id };
      this.$router.push({ name: "contentdashboard", params });
    },
  },
  apollo: {
    // how to store in local store
    activities: {
      query: () => ListActivities,
      update: (data) => data.listActivities.items,
    },
  },
};
</script>
