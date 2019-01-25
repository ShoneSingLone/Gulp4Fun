<template>
  <div ref="display"></div>
</template>

<script>
import Vue from "vue";

export default {
  data() {
    return {
      component: null
    };
  },
  methods: {
    renderCode() {
      this.splitCode();
    }
  },
  mounted() {
    this.renderCode();
  }
};
</script>