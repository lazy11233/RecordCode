<template>
  <div id="app">
    <div class="nav">
      <ul>
        <li>
          <router-link to="/form">实战 1：具有数据校验功能的表单组件 —— Form</router-link>
        </li>
      </ul>
    </div>
    <hr>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
