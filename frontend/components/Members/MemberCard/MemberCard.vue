<template>
  <div class="card-wrapper">
    <div class="member-card">
      <div class="member-card__image">
        <img
          :id="member.id"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/barbarian.png"
        />
      </div>
      <div class="member-card__info">
        <div class="member-card__name">{{ member.name }}</div>
        <div class="member-card__role">{{ member.role }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MemberCard',
  props: ['member'],
}
</script>
<style lang="scss">
$border-radius-size: 14px;

.card-wrapper {
  @apply px-8 my-8;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  height: 75vh;
}

.member-card {
  @apply bg-gradient-to-tr from-purple-900 to-blue-800 relative text-center w-full;
  z-index: 9999;
  height: 70%;
  border-radius: $border-radius-size + 5;
  box-shadow: -1px 15px 30px -12px teal;
}

.member-card__image {
  @apply relative mb-3 rounded-t-lg border-b-4;
  background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/wizard-bg.jpg')
    no-repeat;
  background-size: cover;
  height: 80%;

  img {
    position: absolute;
    left: -10px;
    top: -150px;
  }
}

.member-card__info {
  @apply text-left text-white px-4 py-4 absolute bottom-0 w-full;
}

.member-card__role {
  @apply uppercase text-sm font-bold mb-1;
}

.member-card__name {
  @apply text-2xl text-white font-extrabold mb-1;
}
</style>
