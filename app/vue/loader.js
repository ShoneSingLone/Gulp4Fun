
import Vue from "vue";

return  {
  template: `<div id="app">
  <div ref="display"></div>
</div>`,
  data() {
    return {
      component: null
    };
  },
  methods: {
    renderCode() {
      this.splitCode();

      if (this.html !== "" && this.js !== "") {
        const parseStrToFunc = new Function(this.js)();

        parseStrToFunc.template = this.html;
        const Component = Vue.extend(parseStrToFunc);
        this.component = new Component().$mount();

        this.$refs.display.appendChild(this.component.$el);
      }
    }
  },
  mounted() {
    this.renderCode();
  }
};
