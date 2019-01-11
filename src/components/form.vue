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
    data() {
      return {
        fileds: []
      }
    },
    created() {
      this.$on("on-form-item-add", field => {
        if (field) this.fileds.push(field);
      });
      this.$on("on-form-item-remove", field => {
        if (field.prop) this.fileds.splice(this.fileds.indexOf(field), 1);
      })
    }
  }
</script>
<style lang="scss" scoped>

</style>
