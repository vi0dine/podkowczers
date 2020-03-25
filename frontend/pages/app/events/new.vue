<template>
  <div class="root">
    <h1>Dodaj wydarzenie</h1>
    <div class="form">
      <form>
        <div style="flex: 1">
          <v-select
            v-model="place"
            :items="places"
            label="Miejsce"
            :error="this.$v.place.invalid"
            required
          />
          <v-select
            v-model="concert"
            :items="concerts"
            label="Koncert"
            :error="this.$v.concert.invalid"
            required
          />
          <div>
            <v-date-picker
              v-model="date"
              color="#ffc857"
              header-color="#5F0F40"
              event-color="#ffc857"
              landscape
              full-width
              locale="pl-pl"
            />
            <v-time-picker
              v-model="time"
              header-color="#5F0F40"
              color="#ffc857"
              format="24hr"
              scrollable
              landscape
              full-width
            />
            <v-slider
              style="margin-top: 2rem"
              v-model="estimatedLength"
              :tick-labels="['0', '30 min', '1 h', '1.5 h', '2 h', '2.5 h', '3 h', '3.5 h']"
              ticks
              step="30"
              min="0"
              max="210"
              label="Przewidywany czas trwania (min)"
            >
              <template v-slot:thumb-label="props">
                <span style="text-align: center">
                  {{ props.value }}
                </span>
              </template>
            </v-slider>
          </div>
        </div>
        <div class="form-actions">
          <v-checkbox
            v-model="prereservation"
            label="Miejsca dla gości"
          />
          <v-checkbox
            v-model="plannedOpening"
            label="Zaplanowane otwarcie rezerwacji"
          />
          <div v-if="plannedOpening" class="planned-opening">
            <v-menu
              v-model="plannedDateOpen"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  style="margin: 0 2rem"
                  v-model="plannedDate"
                  label="Data rozpoczęcia rezerwacji"
                  persistent-hint
                  prepend-icon="mdi-calendar"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker :min="today" v-model="plannedDate" no-title @input="plannedDateOpen = false"></v-date-picker>
            </v-menu>
            <v-menu
              ref="plannedTimeOpen"
              v-model="plannedTimeOpen"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="plannedTime"
              transition="scale-transition"
              offset-y
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  style="margin: 0 2rem"
                  v-model="plannedTime"
                  label="Godzina rozpoczęcia"
                  prepend-icon="mdi-clock"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="plannedTimeOpen"
                v-model="plannedTime"
                format="24hr"
                full-width
                @click:minute="$refs.plannedTimeOpen.save(plannedTime)"
              ></v-time-picker>
            </v-menu>
          </div>
          <div class="overview">
            <p><strong>Koncert:</strong> {{ concert.name }}</p>
            <p><strong>Miejsce:</strong> {{ place.name }}</p>
            <p><strong>Czas rozpoczęcia:</strong> {{ startsAt }}</p>
            <p><strong>Czas trwania:</strong> {{ estimatedLength }} min</p>
            <p v-if="plannedOpening"><strong>Rozpoczęcie rezerwacji:</strong> {{ reservationStartsAt }}</p>
            <p><strong>Dostępne miejsca:</strong> {{ availableSeats }}</p>
            <v-btn @click="submitEvent()" width="100%" color="error">Utwórz wydarzenie</v-btn>
          </div>
        </div>
      </form>
    </div>
    <div v-if="place && prereservation" class="seats">
      <Audience
        :place="place"
        :allow-prereservation="prereservation"
        v-on:confirmedAudience="(seats) => updateSeats(seats)"
      />
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import pl from 'moment/locale/pl'
  import { validationMixin } from 'vuelidate'
  import { required, requiredIf } from 'vuelidate/lib/validators'
  import AudiencePlan from '../../../components/app/events/AudiencePlan'

  moment.locale('pl')

  export default {
    layout: 'app',
    mixins: [validationMixin],
    components: {
      Audience: AudiencePlan
    },
    data() {
      return {
        places: [
          {
            text: 'II Liceum Ogólnokształcące',
            value: { name: 'II Liceum Ogólnokształcące im. Hugona Kołłątaja w Wałbrzychu', rows: 10, seats: 20 }
          }
        ],

        prereservation: false,
        plannedOpening: false,
        plannedDateOpen: false,
        plannedDate: '',
        plannedTimeOpen: false,
        plannedTime: '',

        place: '',
        concert: '',
        date: '',
        time: '',
        estimatedLength: 0,
        selectedSeats: []
      }
    },
    validations: {
      place: {
        required
      },
      concert: {
        required
      },
      date: {
        required,
        minValue: moment()
      },
      time: {
        required
      },
      estimatedLength: {
        required
      },
      plannedDate: {
        required: requiredIf(() => this.plannedOpening)
      },
      plannedTime: {
        required: requiredIf(() => this.plannedOpening)
      }
    },
    async fetch() {
      await this.$store.dispatch('concerts/fetchConcerts')
    },
    methods: {
      updateSeats(seats) {
        this.selectedSeats = seats;
      },
      async submitEvent() {
        await this.$axios.$post('/api/v1/events', {
          event: {
            concert_id: this.concert.id,
            place: this.place,
            starts_at: moment(`${this.date} ${this.time}`).format(),
            estimated_length: this.estimatedLength,
            planned: moment(`${this.plannedDate} ${this.plannedTime}`).format(),
            reserved_seats: this.selectedSeats
          }
        });
        await this.$store.dispatch('events/fetchEvents');
        await this.$router.push({ path: '/app/events' })
      }
    },
    computed: {
      today() {
        return moment().format()
      },
      concerts() {
        const concerts = this.$store.state.concerts.concerts

        if (concerts) {
          return concerts.map(concert => ({ value: { id: concert.id, name: concert.name }, text: concert.name }))
        }
      },
      startsAt() {
        if (this.date && this.time) {
          return moment(`${this.date} ${this.time}`).format('LLL')
        }
      },
      reservationStartsAt() {
        if (this.plannedDate && this.plannedTime) {
          return moment(`${this.plannedDate} ${this.plannedTime}`).format('LLL')
        }
      },
      availableSeats() {
        const placeSeats = this.place.rows * this.place.seats;
        const questsSeats = this.selectedSeats.length;

        if (placeSeats) {
          return placeSeats - questsSeats
        }
      }
    },
    watch: {
      prereservation : function() {
        if (this.prereservation && this.place) {
          setTimeout(() => {
            this.$scrollTo('#audience', 500)
          }, 250)
        } else {
          this.selectedSeats = []
        }
      },
      plannedOpening : function() {
        if (!this.plannedOpening) {
          this.plannedDate = '';
          this.plannedTime = '';
        }
      }
    }
  }
</script>

<style lang="scss">
  .root {
    display: flex;
    flex-direction: column;
  }

  .planned-opening {
    width: 100%;
    padding-left: 2rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .overview {
    border: 4px solid $MUSTARD;
    background-color: rgba($MUSTARD, .05);
    border-radius: 5px;
    padding: 2rem;
    width: 100%;

    & p {
      font-family: $main-font;
      text-shadow: 1px 1px 2px $BLACK;
      color: $WHITE;
      font-size: 18px;

      & strong {
        color: $RED;
        font-size: 18px;
      }
    }
  }

  .form {
    display: flex;
    flex: 1;

    & form {
      display: flex;
      flex: 1;
      flex-direction: row;
      justify-content: space-between;
    }

    &-actions {
      display: flex;
      flex: 1;
      padding: 0 2rem;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
    }
  }

  .seats {
    display: flex;
    flex: 1;
  }
</style>
