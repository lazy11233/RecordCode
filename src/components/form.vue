<template>
  <form>
    <slot>

    </slot>
  </form>
</template>
<script>
  export default {
    name: 'VForm',
    props: {
      model: {
        type: Object
      },
      rules: {
        type: Object
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>
