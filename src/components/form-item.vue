<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <div>
      <slot></slot>
    </div>
  </div>
</template>
<script>
  import Emitter from '../mixins/emitter';
  import AsyncValidator from 'async-validator';

  export default {
    name: "iFormItem",
    mixins: [ Emitter ],
    inject: ['form'],
    props: {
      label: {
        type: String,
        required: false,
        default: ''
      },
      prop: {
        type: String
      }
    },
    data() {
      return {
        validateState: '',
        validateMessage: '',
      }
    },
    computed: {
      fieldValue() {
        return this.form.model[this.prop];
      }
    },
    mounted() {
      if (this.prop) {
        this.dispatch("iForm", "on-form-item-add", this);
        this.setRules();
      }
    },
    beforeDestroy() {
      this.dispatch("iForm", "on-form-item-remove", this);
    },
    methods: {
      setRules() {
        this.$on("on-form-change", this.onFiledChange);
        this.$on("on-form-blur", this.onFiledBlur);
      },
      getRules() {
        let formRules = this.form.rules;
        formRules = formRules ? formRules[this.prop] : [];
        return [].concat(formRules || []);
      },
      onFiledBlur() {
        // blur触发校验
        this.validate("blur");
      },
      onFiledChange() {
        // change触发校验
        this.validate("change");
      },
      filteredRules(trigger) {
        const rules = this.getRules();
        return rules.filter(rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1);
      },
      /**
       * @param trigger   校验类型
       * @param callback  回调函数
       */
      validate(trigger, callback = function() {}) {
        // 根据 trigger 类型取得相应的校验方式
        const rules = this.filteredRules(trigger);
        if (!rules || rules.length === 0) {
          return true;
        }
        this.validateState = "validating";
        let descriptor = {};
        descriptor[this.prop] = rules;

        const validator = new AsyncValidator(descriptor);
        let model = {};

        model[this.prop] = this.fieldValue;

        validator.validate(model, { firstFields: true }, errors => {
          this.validateState = !errors ? 'success' : 'error';
          this.validateMessage = errors ? errors[0].message : '';

          callback(this.validateMessage);
        });
      }
    }
  }
</script>
