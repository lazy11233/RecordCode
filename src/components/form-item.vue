<template>
  <div>
    <label v-if="label"></label>
    <div>
      <slot></slot>
      <div v-if="validateState === 'error'">{{ validateMessage }}</div>
    </div>
  </div>
</template>
<script>
  import Emitter from "../mixins/emitter";

  export default {
    name: "vFormItem",
    mixins: [ Emitter ],
    inject: ['form'],
    props: {
      label: {
        type: String,
        default: ""
      },
      prop: {
        type: String
      }
    },
    data() {
      return {
        isRequired: false,
        validateState: '',
        validateMessage: ''
      }
    },
    computed: {
      fieldValue() {
        return this.form.modle[this.prop];
      }
    },
    mounted() {
      // 组件渲染时，将实例缓存在Form中
      if(this.prop) {
        // 如果没有传入prop，则无需校验，也就无需缓存。
        this.dispatch("vForm", "on-form-item-add", this);
        this.setRules();
      }
    },
    // 组件销毁前，将实例从form的缓存中移除
    beforeDestroy() {
      this.dispatch("vForm", "on-form-item-remove", this);
    },
    methods: {
      setRules() {
        let rules = this.getRules();
        if(rules.length) {
          rules.every(one => {
            this.isRequired = one.required;
          })
        }
        this.$on("on-form-change", this.onFieldChange);
        this.$on("on-form-blur", this.onFieldBlur);
      },
      onFieldBlur() {
        this.validate('blur');
      },
      onFieldChange() {
        this.validate('change');
      },
      getRules() {
        let formRules = this.form.rules;
        formRules = formRules ? formRules[this.prop] : [];
        return [].concat(formRules || []);
      }
    }
  }
</script>
