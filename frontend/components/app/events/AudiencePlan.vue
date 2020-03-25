<template>
  <div id="audience" class="plan">
    <v-btn color="error" @click="confirmAudience()">ZATWIERDŹ UKŁAD WIDOWNI</v-btn>
    <div class="scene">SCENA</div>
    <div class="audience">
      <div v-for="n in place.rows" class="audience-row" :key="n">
        <template v-for="m in place.seats">
          <Seat
            :row="n"
            :seat="m"
            :selected="isSelected(n, m)"
            :prereservation="allowPrereservation"
            v-on:selectSeat="({row, seat}) => addToSelected(row, seat)"
            v-on:deselectSeat="({row, seat}) => removeFromSelected(row, seat)"
            :key="m"
          >
            {{m}}
          </Seat>
          <div v-if="m === 10" class="spacer"/>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import SeatButton from './SeatButton'

  export default {
    props: ['place', 'allowPrereservation'],
    data() {
      return {
        selected: []
      }
    },
    components: {
      Seat: SeatButton
    },
    methods: {
      addToSelected(row, seat) {
        this.selected.push({ row: row, seat: seat })
      },
      removeFromSelected(row, seat) {
        this.selected = this.selected.filter(chair => {
          return !(chair.row === row && chair.seat === seat)
        });
      },
      isSelected(row, seat) {
        return this.selected.find(chair => chair.row === row && chair.seat === seat)
      },
      confirmAudience() {
        this.$emit('confirmedAudience', this.selected)
        this.$scrollTo('.root', 500)
      }
    },
    watch: {
      allowPrereservation : function(value) {
        if (!value) {
          this.selected = []
        }
      }
    }
  }
</script>

<style lang="scss">
  .plan {
    display: flex;
    flex: 1;
    flex-direction: column;
  }

  .scene {
    flex: 1;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-radius: 10px;
    padding: 20px;
    margin: 25px;
    background-color: $RED;
  }

  .audience {
    flex: 1;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;

    &-row {
      margin: 15px;
      display: flex;
      flex: 1;
      flex-direction: row;
      justify-content: space-evenly;
      flex-wrap: nowrap;
    }
  }

  .spacer {
    display: flex;
    flex: 2 1 100%;
    margin-right: 2rem;
    margin-left: 2rem;
  }
</style>
