<template>
    <div>
        <router-view />
    </div>
</template>

<script>

export default {
    name: 'App',
    setup() {
        console.log(process.env.NODE_ENV, process.env.VUE_APP_BASE_URL)
    }
}
</script>

<style scoped lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
