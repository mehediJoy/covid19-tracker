<template>
  <h1 class="text-center text-4xl p-5">Worldwide Statistics.</h1>
  <div v-if="!showData">
    <h1 class="text-center text-3xl">Loading...</h1>
  </div>
  <div v-else>
    <div class="flex justify-center">
      <box :title="`New Confirmed`" :amount="newConfirmedNum" />
    </div>
  </div>
</template>

<script>
import axios from "axios";

import Box from "../components/box.vue";

export default {
  name: "Dashboard",
  components: {
    Box,
  },
  data() {
    return {
      showData: false,
      newConfirmedNum: Number,
      newDeathsNum: Number,
      totalConfirmedNum: Number,
      totalDeathsNum: Number,
    };
  },
  created() {
    var res = [];
    axios
      .get("https://api.covid19api.com/summary")
      .then((response) => {
        // handle success

        this.showData = true;
        res = response.data;
        this.newConfirmedNum = res.Global.NewConfirmed;

        console.log(res);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  },
};
</script>
