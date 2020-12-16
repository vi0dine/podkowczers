<template>
  <div class="members-carousel">
    <Carousel
      @transition-end="showImages()"
      :loop="true"
      :navigation-enabled="true"
      :scrollPerPage="true"
      :per-page-custom="[
        [0, 1],
        [860, 2],
        [1168, 3],
        [1480, 4],
      ]"
    >
      <Slide v-for="member in members" :key="member.id">
        <MemberCard :member="member" />
      </Slide>
    </Carousel>
  </div>
</template>
<script>
import MemberCard from '@/components/Members/MemberCard/MemberCard'
import $ from 'jquery'
import { Carousel, Slide } from 'vue-carousel'
export default {
  name: 'Members',
  components: { MemberCard, Carousel, Slide },
  data() {
    return {
      members: [
        {
          id: 1,
          role: 'Wokalista',
          name: 'Julia Kamińska',
        },
        {
          id: 2,
          role: 'Wokalistka',
          name: 'Julia Kamińska',
        },
        {
          id: 3,
          role: 'Tancerka',
          name: 'Julia Kamińska',
        },
        {
          id: 4,
          role: 'Wokalista',
          name: 'Julia Kamińska',
        },
        {
          id: 5,
          role: 'Tancerz',
          name: 'Julia Kamińska',
        },
        {
          id: 6,
          role: 'Wokalista',
          name: 'Julia Kamińska',
        },
        {
          id: 7,
          role: 'Technik',
          name: 'Julia Kamińska',
        },
      ],
    }
  },
  methods: {
    isInViewport(elem) {
      const rect = elem.getBoundingClientRect()
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
          (window.innerWidth || document.documentElement.clientWidth)
      )
    },
    hideImages() {
      $('.members-carousel').find('.member-card__image img').hide()
    },
    showImages() {
      $('.members-carousel')
        .find('.member-card__image img')
        .each((index, el) => {
          if (this.isInViewport(el)) {
            $(el)
              .delay(300 * index)
              .fadeIn(400)
          } else {
            $(el).hide()
          }
        })
    },
  },
  mounted() {
    this.hideImages()
    this.showImages()
  },
}
</script>
<style>
.members-carousel {
  @apply py-2 px-8 h-full;
}
</style>
