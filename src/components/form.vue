<template>
  <form>
    <slot>

    </slot>
  </form>
</template>
<script>
  export default {
    name: 'vForm',
    props: {
      model: {
        type: Object
      },
      rules: {
        type: Object
      }
    },
    provide() {
      return {
        form: this
      }
    },
    data() {
      return {
        fields: []  // 用来校验FormItem选项的
      }
    },
    created() {
      this.$on("on-form-item-add", (field) => {
        if(field) this.fields.push(field);
      });
      this.$on("on-form-item-remove", field => {
        if(field) this.fields.splice(this.fields.indexOf(field), 1);
      });
    }
  }
</script>
<style lang="scss" scoped>

</style>
