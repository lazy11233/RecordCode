<template>
  <label>
    <span>
      <input type="checkbox">
    </span>
  </label>
</template>
<script>
  import Emitter from "../mixins/emitter";

  export default {
    name: "iCheckboxGroup",
    mixins: [ Emitter ],
    props: {
      type: Array,
      default() {
        return [];
      }
    },
    data() {
      return {
        currentValue: this.value,
        children: []
      }
    },
    methods: {
      // updateModel(update) {
      //   this.children = findeComponentDownward(this, "iCheckbox");
      //   if (this.children) {
      //     const { value } = this;
      //     this.children.forEach(child => {
      //       child.model = value;
      //
      //       if (update) {
      //         child.currentValue = value.indexOf(child.label) >= 0;
      //         child.group = true;
      //       }
      //     });
      //   }
      // }
    }
  }
</script>
<style lang="scss" scoped>

</style>
