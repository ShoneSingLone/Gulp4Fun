
define(["Vue"], function(Vue) {
    return {
        name: "test" /* 应该加上命名规范，view或是components */,
        template: "\r\n  <div class=\"app\">\r\n    <div ref=\"display\"></div>\r\n  </div>\r\n",
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
