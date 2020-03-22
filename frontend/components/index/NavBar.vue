<template>
  <div class="top-bar">
    <div class="logo-container">
      <img alt="logo" src="logo.png" class="logo" />
    </div>
    <div class="nav-menu">
      <div class="soon">
        WKRÓTCE
      </div>
      <NuxtLink to="/" class="nav-link">
        <div>ZAŁÓŻ KONTO</div>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .top-bar {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 9vh;
    width: 100vw;
    z-index: 10;
  }
  .logo-container {
    display: flex;
    flex: .2;
  }
  .logo {
    padding: 1vh;
    height: 8vh;
    width: auto;
  }
  .nav-menu {
    display: flex;
    flex: .4;
    justify-content: flex-end;
    align-items: center;
    margin: 0 30px 0 10px;
  }
  .nav-link {
    background-color: $MUSTARD;
    border-radius: 10px;
    padding: 15px;
    color: $PURPLE;
    font-family: $main-font;
    text-decoration: none;
  }
  .soon {
    position: absolute;
    right: 40px;
    top: 20px;
    border-radius: 5px;
    padding: 5px 15px 5px 15px;
    background-color: $RED;
    border: 3px solid $WHITE;
    font-family: $main-font;
    font-weight: bold;
    color: $WHITE;
    transform: rotate(20deg);
  }
</style>
