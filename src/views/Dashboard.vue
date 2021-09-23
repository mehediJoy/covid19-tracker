<template>
  <h1 class="text-center text-4xl p-5">Worldwide Statistics.</h1>
  <p class="text-center">Last updated:</p>
  <p class="font-mono text-center">{{ convertDate(lastUpdated) }}</p>
  <div v-if="!showData">
    <h1 class="text-center text-3xl">Loading...</h1>
  </div>
  <div v-else>
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
    <div class="text-center text-black">
      <form @submit.prevent>
        <div class="flex-col">
          <h1 class="text-white text-xl m-3">Select by country</h1>
          <select
            v-model="selectedCountry"
            id="selCountries"
            class="form-select m-2 w-50"
          >
            <option
              v-for="country in countries"
              :value="country"
              :key="country.id"
            >
              {{ country.name }}
            </option>
          </select>
          <button
            @click="checkSelected()"
            class="block m-auto px-8 py-2 bg-green-500 hover:bg-green-900"
          >
            Get Data
          </button>
        </div>
      </form>
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
      lastUpdated: Date,
      selectedCountry: "No",
      countries: [],
    };
  },
  setup() {
    return {
      convertDate(date) {
        return new Date(date).toLocaleDateString("en-gb", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      },
    };
  },
  created() {
    var res = [];
    axios.get("https://api.covid19api.com/summary").then((response) => {
      // handle success

      this.showData = true;
      res = response.data;
      this.newConfirmedNum = res.Global.NewConfirmed;
      this.newDeathsNum = res.Global.NewDeaths;
      this.totalConfirmedNum = res.Global.TotalConfirmed;
      this.totalDeathsNum = res.Global.TotalDeaths;
      this.lastUpdated = res.Date;
      this.getCountries(res.Countries);
    });
  },
  methods: {
    getCountries(res) {
      var local = [];
      for (var i = 0; i < 192; i++) {
        local.push({ id: i, name: res[i].Country });
      }
      this.countries = local;
    },
    convertedCountry(Text) {
      return Text.toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
    },
    checkSelected() {
      if (this.selectedCountry === "No") {
        alert("Please Select a Country.");
      } else {
        var data = this.selectedCountry.name;
        data = this.convertedCountry(data);
        this.$router.push({
          name: "Country",
          params: { name: data },
        });
      }
    },
  },
};
</script>
