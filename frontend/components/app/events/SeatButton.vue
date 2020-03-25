<template>
  <div @click="prereservation ? selectSeat(row, seat, selected) : () => {}" :class="selected ? 'seat selected' : 'seat'">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: ['row', 'seat', 'selected', 'prereservation'],
    methods: {
      selectSeat(row, seat, selected) {
        if (selected) {
          this.$emit('deselectSeat', { row: row, seat: seat })
        } else {
          this.$emit('selectSeat', { row: row, seat: seat })
        }
      }
    }
  }
</script>

<style lang="scss">
  .seat {
    display: flex;
    flex: 1 1 100%;
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
    background-color: $MUSTARD;
    transition: all .4s ease-in;

    &.selected {
      background-color: #7F828B !important;
    }

    &:hover {
      background-color: $PURPLE;
      color: $WHITE;
      cursor: pointer;
    }
  }
</style>
