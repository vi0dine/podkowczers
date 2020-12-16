<template>
  <div class="navbar">
    <div class="logo__container">
      <span class="logo__title" :class="{ compact: compact }"
        >DePodkówczers</span
      >
      <span class="logo__subtitle" :class="{ compact: compact }"
        >Szkolny zespół muzyczny z Wałbrzycha</span
      >
    </div>
    <div class="flex flex-row justify-evenly items-start">
      <NuxtLink to="/" tag="div" class="nav-item">HOME</NuxtLink>
      <NuxtLink to="/members" tag="div" class="nav-item">ZESPÓŁ</NuxtLink>
      <NuxtLink to="/concerts" tag="div" class="nav-item">KONCERTY</NuxtLink>
      <NuxtLink to="/recordings" tag="div" class="nav-item">NAGRANIA</NuxtLink>
      <a href="https://bilety.depodkowczers.walbrzych.pl" class="nav-item"
        >BILETY</a
      >
    </div>
  </div>
</template>
<script>
export default {
  name: 'Topbar',
  computed: {
    compact() {
      return this.$route.path !== '/'
    },
  },
}
</script>
<style lang="scss">
.logo {
  &__container {
    @apply flex flex-col justify-start items-start;
  }

  &__title {
    @apply text-purple-800 font-black;
    font-size: 6rem;
    letter-spacing: 0.2rem;
    text-align: left;
    transition: all 1.1s ease-in-out;

    &.compact {
      font-size: 3rem;
    }
  }

  &__subtitle {
    @apply text-lg text-gray-200;
    letter-spacing: 0.2rem;
    margin-top: -1.7rem;
    margin-left: 8px;
    text-align: left;
    transition: all 0.7s ease-in-out;

    &.compact {
      opacity: 0;
    }
  }
}
.navbar {
  @apply w-full p-4 h-32 top-0 left-0 flex justify-between flex-row;
}
.nav-item {
  @apply px-4 py-2 mx-1 my-2 text-white font-bold transition duration-500;
}
.nav-item:hover {
  @apply bg-gray-800 rounded bg-opacity-75 cursor-pointer;
}
</style>
