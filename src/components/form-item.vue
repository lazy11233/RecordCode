<template>
  <div>
    <label v-if="label"></label>
    <div>
      <slot>

      </slot>
    </div>
  </div>
</template>
<script>
  export default {
    name: "VFormItem",
    props: {
      label: {
        type: String,
        default: ''
      },
      prop: {
        type: String
      }
    }
  }
</script>
