<template>
  <div class="app">
    <div ref="display"></div>
  </div>
</template>


<script>
define(["Vue"], function(Vue) {
  return {
    name: "test" /* 应该加上命名规范，view或是components */,
    template: "#template",
    mounted() {
      colg;
    },
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
});
</script>

