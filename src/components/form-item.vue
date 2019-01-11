<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <div>
      <slot></slot>
    </div>
  </div>
</template>
<script>
  import Emitter from '../mixins/emitter'

  export default {
    name: "iFormItem",
    mixins: [ Emitter ],
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
      onFiledBlur() {
        // blur触发校验

      },
      onFiledChange() {
        // change触发校验

      }
    }
  }
</script>
