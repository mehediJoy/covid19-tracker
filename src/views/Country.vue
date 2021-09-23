<template>
  <div v-if="!showData">
    <h1 class="text-center text-4xl p-5">Loading...</h1>
  </div>
  <div v-else>
    <h1 class="text-center text-4xl p-5">{{ countryName }}</h1>
    <div class="flex-col justify-center">
      <div class="m-4 sm:flex justify-around">
        <box :title="`New Confirmed`" :amount="newConfirmedNum" />
        <box :title="`Total Confirmed`" :amount="totalConfirmedNum" />
      </div>
      <div class="m-4 sm:flex justify-around">
        <box :title="`New Deaths`" :amount="newDeathsNum" />
        <box :title="`Total Deaths`" :amount="totalDeathsNum" />
      </div>
    </div>
    <button
      @click="buttonClicked()"
      class="px-6 py-2 block m-auto bg-red-500 hover:bg-red-900"
    >
      Home
    </button>
  </div>
</template>

<script>
import Box from "../components/box.vue";

import axios from "axios";

export default {
  name: "Country",
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
      countryName: String,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      var res = [];
      var country = this.$route.params.name;
      axios
        .get("https://api.covid19api.com/summary")
        .then((response) => {
          this.showData = true;
          res = response.data.Countries;
          this.setCountryData(res, country);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    },
    setCountryData(res, country) {
      for (var i = 0; i < 192; i++) {
        if (res[i].Slug === country) {
          this.countryName = res[i].Country;
          this.newConfirmedNum = res[i].NewConfirmed;
          this.newDeathsNum = res[i].NewDeaths;
          this.totalConfirmedNum = res[i].TotalConfirmed;
          this.totalDeathsNum = res[i].TotalDeaths;
        }
      }
      console.log(res);
    },
    buttonClicked() {
      this.$router.push("/");
    },
  },
};
</script>

<style></style>
