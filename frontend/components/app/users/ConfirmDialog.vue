<template>
  <v-dialog
    v-model="dialog"
    max-width="40vw"
  >
    <template v-slot:activator="{on}">
      <span class="clickable" v-on="on">
        <slot></slot>
      </span>
    </template>
    <v-card>
      <v-card-title class="question">{{ question }}</v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="success"
          text
          @click="confirm()"
        >
          TAK
        </v-btn>

        <v-btn
          color="error"
          text
          @click="reject()"
        >
          NIE
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['question'],
    data () {
      return {
        dialog: false
      }
    },
    methods: {
      confirm() {
        this.$emit('confirm')
        this.dialog = false;
      },
      reject() {
        this.$emit('reject');
        this.dialog = false;
      }
    }
  }
</script>

<style scoped lang="scss">
  .clickable:hover {
    cursor: pointer;
  }

  .question {
    font-family: $main-font;
    color: $WHITE;
  }
</style>
