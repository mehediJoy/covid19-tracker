<template>
  <div class="lg:h-36 w-80 bg-gray-600 shadow-md rounded-lg">
    <div class="align-middle mt-5">
      <h3 class="text-center text-3xl">{{ title }}</h3>
      <p class="text-center text-2xl font-mono">
        {{ transformNumber(amount) }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Box",
  props: {
    title: String,
    amount: Number,
  },
  setup() {
    return {
      transformNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      },
    };
  },
};
</script>

<style></style>
