"use strict";

define(["Vue"], function (Vue) {
  var comments = "comments";
  return {
    name: "test-item"
    /* 应该加上命名规范，view或是components */
    ,
    template: "\n  <div class=\"app\">\n    <div ref=\"display\" :class=\"[{'comments':comments}]\">{{comments}}</div>\n  </div>\n",
    mounted: function mounted() {
      console.log();
    },
    data: function data() {
      return {
        comments: comments
      };
    },
    methods: {
      renderCode: function renderCode() {
        this.splitCode();
      }
    }
  };
});