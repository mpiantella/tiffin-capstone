<template>
  <v-app>
    <v-app-bar app color="secondary" dark>
      <v-app-bar-nav-icon color="primary"></v-app-bar-nav-icon>
      <v-btn fab large plain to="/">
        <img class="mr-2" :src="require('./assets/logo.svg')" height="60" />
      </v-btn>
      <v-toolbar-title class="redFont"
        ><h2>Remote Brilliance</h2></v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        v-for="link in topBar"
        :key="`${link.label}-header-link`"
        text
        rounded
        :to="link.url"
      >
        {{ link.label }}
      </v-btn>
      <v-btn @click="toggleTheme" icon>
        <v-icon class="redFont">mdi-toggle-switch</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
    <v-footer color="primary lighten-1" padless>
      <v-layout justify-center wrap>
        <v-btn
          v-for="link in footerBar"
          :key="`${link.label}-cta-link`"
          color="white"
          text
          rounded
          class="my-2"
          :to="link.url"
        >
          {{ link.label }}
        </v-btn>
        <v-flex primary lighten-2 py-4 text-center white--text xs12>
          {{ new Date().getFullYear() }} — <strong>Remote Brilliance</strong>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      topBar: [
        {
          label: "Job Seekers",
          url: "/jobseekers",
        },
        {
          label: "Login",
          url: "/login",
        },
        {
          label: "SignUp",
          url: "/signup",
        },
      ],
      footerBar: [
        {
          label: "About",
          url: "/about",
        },
        {
          label: "Login",
          url: "/login",
        },
        {
          label: "Job Seeker",
          url: "/jobseeker",
        },
        {
          label: "Level-Up",
          url: "/levelup",
        },
        {
          label: "Job Creator",
          url: "/jobcreator",
        },
        {
          label: "Content Creator",
          url: "/contentcreator",
        },
      ],
    };
  },
  methods: {
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  },
};
</script>
<style>
.redFont {
  color: #f44336 !important;
}
.contrastWhite {
  color: #fff !important;
}
</style>