<template>
  <div id="audience" class="plan">
    <v-btn v-if="allowPrereservation" color="error" @click="confirmAudience()">ZATWIERDŹ UKŁAD WIDOWNI</v-btn>
    <div class="scene">SCENA</div>
    <v-icon v-if="visible" @click="visible = ''" class="back-arrow">mdi-chevron-left</v-icon>
    <div v-if="!visible" @click="visible = 'mainHall'" class="main-hall-button">PARTER</div>
    <div v-if="!visible && (gallery || leftGallery || rightGallery)" @click="visible = 'gallery'" class="gallery-button">BALKON</div>
    <div v-if="mainHall && visible === 'mainHall'" class="main-hall">
      <div v-for="row in mainHall.rows" class="main-hall-row" :key="row">
        <template v-for="seat in row.seats">
          <Seat
            :sector="mainHall.name"
            :row="row"
            :seat="seat"
            :selected="isSelected(mainHall.name, row, seat)"
            :prereservation="allowPrereservation"
            v-on:selectSeat="({sector, row, seat}) => addToSelected(sector, row, seat)"
            v-on:deselectSeat="({sector, row, seat}) => removeFromSelected(sector, row, seat)"
            :key="seat"
          >
            {{seat}}
          </Seat>
          <div v-if="seat === 10 && place.name.startsWith('II Liceum')" class="spacer"/>
          <div v-if="seat === row.seats/2 && place.name.startsWith('Teatr Zdrojowy')" class="spacer"/>
        </template>
      </div>
    </div>
    <div v-if="gallery && visible === 'gallery'" class="gallery">
      <div v-for="row in gallery.rows" class="gallery-row" :key="row">
        <template v-for="seat in row.seats">
          <Seat
            :sector="gallery.name"
            :row="row"
            :seat="seat"
            :selected="isSelected(gallery.name, row, seat)"
            :prereservation="allowPrereservation"
            v-on:selectSeat="({sector, row, seat}) => addToSelected(sector, row, seat)"
            v-on:deselectSeat="({sector, row, seat}) => removeFromSelected(sector, row, seat)"
            :key="seat"
          >
            {{seat}}
          </Seat>
        </template>
      </div>
    </div>
    <div v-if="leftGallery && rightGallery && visible === 'gallery'" class="divided-gallery">
      <div class="gallery">
        <div v-for="row in leftGallery.rows" class="gallery-row" :key="row">
          <template v-for="seat in row.seats">
            <Seat
              :sector="leftGallery.name"
              :row="row"
              :seat="seat"
              :selected="isSelected(leftGallery.name, row, seat)"
              :prereservation="allowPrereservation"
              v-on:selectSeat="({sector, row, seat}) => addToSelected(sector, row, seat)"
              v-on:deselectSeat="({sector, row, seat}) => removeFromSelected(sector, row, seat)"
              :key="seat"
            >
              {{seat}}
            </Seat>
          </template>
        </div>
      </div>
      <div class="gallery">
        <div v-for="row in rightGallery.rows" class="gallery-row" :key="row">
          <template v-for="seat in row.seats">
            <Seat
              :sector="rightGallery.name"
              :row="row"
              :seat="seat"
              :selected="isSelected(rightGallery.name, row, seat)"
              :prereservation="allowPrereservation"
              v-on:selectSeat="({sector, row, seat}) => addToSelected(sector, row, seat)"
              v-on:deselectSeat="({sector, row, seat}) => removeFromSelected(sector, row, seat)"
              :key="seat"
            >
              {{seat}}
            </Seat>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SeatButton from './SeatButton'

  export default {
    props: ['place', 'allowPrereservation', 'preselected'],
    data() {
      return {
        visible: '',
        selected: this.preselected || []
      }
    },
    components: {
      Seat: SeatButton
    },
    computed: {
      mainHall() {
        return this.place.plan.sectors.find(sector => sector.name == "Sala")
      },
      gallery() {
        return this.place.plan.sectors.find(sector => sector.name == "Balkon")
      },
      leftGallery() {
        return this.place.plan.sectors.find(sector => sector.name == "Lewy balkon")
      },
      rightGallery() {
        return this.place.plan.sectors.find(sector => sector.name == "Prawy balkon")
      },
    },
    methods: {
      addToSelected(sector, row, seat) {
        this.selected.push({ sector: sector, row: row, seat: seat })
      },
      removeFromSelected(sector, row, seat) {
        this.selected = this.selected.filter(chair => {
          return !(chair.sector === sector && chair.row === row && chair.seat === seat)
        });
      },
      isSelected(sector, row, seat) {
        return this.selected.find(chair => chair.sector === sector && chair.row === row.id && chair.seat === seat)
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
    position: relative;
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

  .back-arrow {
    position: absolute !important;
    top: 35px !important;
    right: 20px !important;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem;
    padding: 10px;
    background-color: rgba($WHITE, .3);
    border-radius: 50%;
    color: $PURPLE;
    font-size: 40px !important;
    transition: all .5s ease-in-out;

    &:hover {
      transform: scale(1.1);
      background-color: rgba($WHITE, .6);
    }
  }

  .main-hall {
    flex: 1;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;

    &-button {
      flex: 1;
      justify-content: space-between;
      align-items: center;
      flex-direction: column;
      background-color: $MUSTARD;
      border-radius: 50px;
      padding: 10rem 3rem;
      text-align: center;
      font-family: $main-font;
      font-weight: bold;
      color: $WHITE;
      font-size: 30px;
      margin: 1rem;
      transition: all .5s ease-in-out;

      &:hover {
        cursor: pointer;
        background-color: rgba($MUSTARD, .8);
        transform: scaleY(1.05);
      }
    }

    &-row {
      margin: 15px;
      display: flex;
      flex: 1;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      flex-wrap: nowrap;
    }
  }

  .gallery {
    flex: 1;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;

    &-button {
      flex: 1;
      justify-content: space-between;
      align-items: center;
      flex-direction: column;
      background-color: $RED;
      border-radius: 50px;
      padding: 3rem;
      text-align: center;
      font-family: $main-font;
      font-weight: bold;
      color: $WHITE;
      font-size: 30px;
      margin: 1rem;
      transition: all .5s ease-in-out;

      &:hover {
        cursor: pointer;
        background-color: rgba($RED, .8);
        transform: scaleY(1.05);
      }
    }

    &-row {
      margin: 15px;
      display: flex;
      flex: 1;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      flex-wrap: nowrap;
    }
  }

  .divided-gallery {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .spacer {
    display: flex;
    flex: 1 1 100%;
    max-width: 50px;
    justify-content: center;
    align-items: center;
  }
</style>
