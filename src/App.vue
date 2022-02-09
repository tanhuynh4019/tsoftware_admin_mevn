<template>
  <v-app id="inspire">
    <Header />
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Header from "./components/Header.vue";
export default {
  data: () => ({ drawer: null }),
  components: {
    Header,
  },
};
</script>
