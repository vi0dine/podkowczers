<template>
  <div class="h-screen overflow-hidden">
    <Topbar />
    <Nuxt />
  </div>
</template>

<style>
html {
  @apply font-lato;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  @apply bg-gray-900;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
</style>
<script>
import Topbar from '~/components/Topbar/Topbar'
export default {
  components: { Topbar },
}
</script>
