<template>
    <div class="dashboard-container">
      <div class="stats-tile mustard">
        <p class="stats-tile-title">Użytkownicy</p>
      </div>
      <div class="stats-tile red">
        <p class="stats-tile-title">Koncerty</p>
      </div>
      <div class="stats-tile red">
        <p class="stats-tile-title">Wydarzenia</p>
      </div>
      <div class="stats-tile mustard">
        <p class="stats-tile-title">Bilety</p>
      </div>
      <div class="stats-tile mustard">
        <p class="stats-tile-title">Rezerwacje</p>
      </div>
      <div class="stats-tile red">
      </div>
    </div>
</template>

<script>

  export default {
    layout: 'app'
  }
</script>

<style lang="scss">
  .dashboard-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .stats-tile {
    flex: 1 1 33%;
    height: 30vh;
    border-radius: 20px;
    margin: 10px 5px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 15px;

    &.red {
      background-color: $RED !important;
    }

    &.mustard {
      background-color: $MUSTARD !important;
    }

    &-title {
      width: 100%;
      font-family: $main-font;
      font-weight: bold;
      font-size: 33px;
      color: $BLACK;
      border-bottom: 1px solid $PURPLE;
    }
  }
</style>
