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
  import Emitter from "../mixins/emitter";

  export default {
    name: "VFormItem",
    mixins: [ Emitter ],
    props: {
      label: {
        type: String,
        default: ""
      },
      prop: {
        type: String
      }
    },
    mounted() {
      // 组件渲染时，将实例缓存在Form中
      if(this.prop) {
        // 如果没有传入prop，则无需校验，也就无需缓存。
        this.dispatch("vForm", "on-form-item-add", this);
      }
    },
    // 组件销毁前，将实例从form的缓存中移除
    beforeDestroy() {
      this.dispatch("vForm", "on-form-item-remove", this);
    }

  }
</script>
