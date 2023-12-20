<template>
  <v-app id="app">
    <v-navigation-drawer app color="#0d47a1!important" permanent>
      <v-list-item link to="/" style="padding: 0">
        <img
          src="http://192.168.1.250/_nuxt/img/logo-taimuihongsg.70ce818.jpg"
          height="120"
          width="100%"
          alt="logo"
          style="padding: 4px"
        />
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item-group>
        <v-list class="custom-title">
          <v-list-item link to="/benhvien/congkham">
            <v-list-item-icon>
              <v-icon>mdi-chart-bubble</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="custom-title"
              >Thù lao công khám</v-list-item-title
            >
          </v-list-item>

        </v-list>
      </v-list-item-group>
      <!-- Your sidebar content goes here -->
    </v-navigation-drawer>

    <v-app-bar app id="app-bar" color="#0d47a1!important">
      <v-toolbar-title>130 tool</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Welcome",
          to: "/",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Inspire",
          to: "/inspire",
        },
      ],
      miniVariant: false, // Keep the drawer open
      right: true,
      rightDrawer: false,
      title: "Vuetify.js",
    };
  },
};
</script>

<style scoped>
#app {
  /* Set the background color to white */
  color: white;
}

#app-bar,
#navigation {
  background-color: #0d47a1 !important;
  color: white;
}
.custom-title {
  color: white;
}
</style>
