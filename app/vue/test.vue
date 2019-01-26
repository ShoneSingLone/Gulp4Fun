<template>
  <div class="app">
    <div ref="display" :class="[{'comments':comments}]">{{comments}}</div>
  </div>
</template>

<script>
define(["Vue"], function(Vue) {
  let comments = "comments";
  return {
    name: "test-item" /* 应该加上命名规范，view或是components */,
    template: "#template",
    mounted() {
      console.log();
    },
    data() {
      return {
        comments
      };
    },
    methods: {
      renderCode() {
        this.splitCode();
      }
    }
  };
});
</script>


<style lang="scss">
.layui-form-pane {
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(cyan, 225deg magenta, 145deg yellow);
  .layui-form-label {
    padding: 0;
    width: 110px;
    white-space: normal;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: visible;
  }
}
</style>

