<template>
  <div class="text-center ma-2">
    <v-snackbar v-model="snackbar" top right color="white">
      <v-row>
        <v-col sm="1">
          <v-icon color="#1B5E20" v-if="alerts=='success'">mdi-check-circle</v-icon>
          <v-icon color="#BF360C" v-if="alerts=='warning'">mdi-alert-box</v-icon>
          <v-icon color="#263238" v-if="alerts=='info'">mdi-information</v-icon>
          <v-icon color="#B71C1C" v-if="alerts=='error'">mdi-close-circle</v-icon>
        </v-col>
        <v-col sm="9">
          <h6 class="blue-grey--text text--darken-4">
            {{alerts=='success' ? 'Thành công' : alerts=='warning' ? 'Cảnh báo' : alerts=='info' ? 'Thông tin' : 'Lỗi'}}
          </h6>
          <p class="blue-grey--text text--darken-4">{{ message }}</p>
        </v-col>
        <v-col sm="2">
          <v-btn icon @click="snackbar = false" dark>
            <v-icon color="#263238">mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "Snackbar",
  props: ["message", "active", "alerts"],
  data() {
    return {
      snackbar: this.active,
      text: "",
    };
  },
  components: {},
};
</script>