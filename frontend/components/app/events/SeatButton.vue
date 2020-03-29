<template>
  <div
    @click="prereservation ? selectSeat(row, seat, selected) : () => {}"
    :class="selected ? 'seat selected ' : 'seat ' + sector.toLowerCase().replace(' ', '-')"
  >
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: ['sector', 'row', 'seat', 'selected', 'prereservation'],
    methods: {
      selectSeat(row, seat, selected) {
        if (selected) {
          this.$emit('deselectSeat', { sector: this.sector, row: row.id, seat: seat })
        } else {
          console.log(this.sector)
          this.$emit('selectSeat', { sector: this.sector, row: row.id, seat: seat })
        }
      }
    }
  }
</script>

<style lang="scss">
  .seat {
    display: flex;
    flex: 1 1 100%;
    max-width: 65px;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-family: $main-font;
    color: $BLACK;
    font-weight: bold;
    font-size: 17px;
    border-radius: 10px;
    margin: 3px;
    padding: 10px;
    transition: all .4s ease-in;

    &.selected {
      background-color: #7F828B !important;
    }

    &.balkon, &.lewy-balkon, &.prawy-balkon {
      background-color: $RED;
    }

    &.sala {
      background-color: $MUSTARD;
    }

    &:hover {
      background-color: $PURPLE;
      color: $WHITE;
      cursor: pointer;
    }
  }
</style>
