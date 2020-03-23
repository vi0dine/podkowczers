<template>
  <div>
    <NavBar/>
    <div class="content"
         style="background:linear-gradient(45deg, rgba(152, 68, 71, 0.2) 35%, rgba(95, 15, 64, 0.9)), url('bg.jpg')">
      <div class="intro-container">
        <div class="intro-text">
          Oficjalna strona zespołu DePodkówczers z&nbsp;Wałbrzycha
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from '~/components/index/NavBar.vue'

  export default {
    auth: false,
    components: {
      NavBar: NavBar
    },
    head() {
      return {
        title: 'DePodkówczers - Oficjalna strona internetowa',
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: 'Oficjalna strona internetowa zespołu DePodkówczers z Wałbrzycha'
          }
        ]
      }
    }
  }
</script>

<style scoped lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Kalam:700&display=swap');

  .content {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    height: 100vh;
    width: 100vw;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
  }

  .intro-container {
    flex: .3;
    width: 50vw;
    margin-right: 5vw;
    padding: 50px;
  }

  .intro-text {
    -webkit-text-stroke: 2px $MUSTARD;
    -webkit-text-fill-color: $RED;
    text-align: right;
    font-family: 'Kalam', cursive;
    font-weight: bold;
    font-size: 56pt;
  }
</style>
