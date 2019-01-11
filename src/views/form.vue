<template>
  <div>
    <i-form :model="form" :rules="rules">
      <i-form-item label="用户名" prop="name">
        <i-input v-model="form.name"></i-input>
      </i-form-item>
      <i-form-item label="邮箱" prop="email">
        <i-input v-model="form.email"></i-input>
      </i-form-item>
    </i-form>
  </div>
</template>
<script>
  import iForm from "../components/form"
  import iFormItem from "../components/form-item"
  import iInput from "../components/input"

  export default {
    name: "FormValidate",
    components: {
      iForm,
      iFormItem,
      iInput
    },
    data() {
      return {
        form: {
          name: '',
          email: ''
        },
        rules: {
          name: [
            { required: true, message: "用户名不能为空", trigger: "blur" }
          ],
          email: [
            { required: true, message: "邮箱不能为空", trigger: "blur" },
            { type: "email", message: "邮箱格式不正确", trigger: "blur" }
          ]
        }
      }
    }
  }
</script>
