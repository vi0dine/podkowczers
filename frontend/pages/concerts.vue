<template>
  <div class="flex flex-col justify-between max-h-screen max-w-full">
    <div class="flex flex-row justify-between p-4">
      <div class="flex flex-1 px-2">
        <ConcertInfo :concert="currentConcert" />
      </div>
      <div class="flex flex-1 px-2">
        <ConcertSlideshow :concert="currentConcert" />
      </div>
    </div>
    <Timeline
      @concertChange="setCurrentConcert"
      :concerts="concerts"
      :active="currentConcert"
    />
  </div>
</template>
<script>
import * as _ from 'lodash'
import Timeline from '@/components/Concerts/Timeline/Timeline'
import ConcertInfo from '@/components/Concerts/ConcertInfo/ConcertInfo'
import ConcertSlideshow from '@/components/Concerts/ConcertSlideshow/ConcertSlideshow'
export default {
  components: { ConcertSlideshow, ConcertInfo, Timeline },
  data() {
    return {
      concerts: [
        {
          id: 1,
          date: new Date(),
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In consequat ut diam at ornare. In ac bibendum dolor. Ut a blandit leo. Nullam eget nibh sem. Donec sit amet nibh nec nisl faucibus tempor eu ac nisi. In hac habitasse platea dictumst. Sed efficitur, libero ac pharetra gravida, ante elit semper lacus, nec imperdiet lectus orci nec leo. Vestibulum quis ligula ante. Etiam congue rutrum euismod.\n' +
            '\n' +
            'Duis ultrices, lorem et hendrerit dictum, turpis nibh vestibulum libero, non consectetur nisi lectus sit amet mi. Fusce pretium pharetra elit, quis hendrerit metus. Phasellus sapien dolor, porta non dolor a, vehicula sagittis enim. Cras quis finibus enim. Ut pellentesque porta dictum. Quisque feugiat tempus risus non malesuada. Proin mattis convallis eros sit amet fermentum. Mauris scelerisque orci justo, eu aliquet risus tempus non. Aenean consectetur, massa vitae lobortis suscipit, elit tortor dictum ipsum, et interdum libero justo eu sem. Quisque tempus placerat nulla eget hendrerit. Cras sit amet felis ut ante hendrerit bibendum. Vestibulum sed gravida odio. Aenean id lectus interdum, accumsan arcu nec, pellentesque leo. Nullam sollicitudin nisl quis tincidunt rhoncus.\n' +
            '\n' +
            'Etiam maximus quam sapien, at imperdiet ante molestie nec. Maecenas vitae lorem vitae ex accumsan dictum. Suspendisse viverra id nisl at ultricies. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ac tincidunt augue.\n' +
            '\n' +
            'Nam condimentum venenatis efficitur. In posuere laoreet odio vitae sagittis. Vestibulum iaculis mi et nulla lacinia accumsan. Fusce pulvinar et turpis a vulputate. Pellentesque consectetur varius mauris, at viverra justo euismod quis. Ut pulvinar arcu odio, vel dignissim nisl tempor at. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Curabitur metus urna, lacinia sed tellus in, scelerisque sollicitudin leo.\n' +
            '\n' +
            'Sed nec ligula et elit luctus interdum nec venenatis nibh. Quisque magna erat, scelerisque at cursus fringilla, tempor tincidunt massa. In non mauris id felis ultricies tincidunt in sed lorem. Nullam non mollis metus. Proin mollis mattis libero eu sollicitudin. Vivamus non auctor augue, eget condimentum lacus. Sed turpis neque, efficitur condimentum vulputate nec, porttitor non urna. Mauris eu nulla elit. Aenean lobortis pharetra quam, et suscipit tortor pharetra sit amet. Proin nisl enim, dapibus ac diam pharetra, sollicitudin bibendum purus. Duis a ligula eget arcu condimentum venenatis. Duis scelerisque libero ut velit placerat tempor. Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n' +
            '\n' +
            'Quisque suscipit, risus non porttitor auctor, diam velit aliquam ipsum, non placerat nisi dolor ac turpis. Ut nunc ipsum, tristique sollicitudin dapibus et, sollicitudin eu sapien. Nam dignissim erat a est aliquet elementum. Cras vehicula sem eu feugiat ornare. Integer at nisl varius, sagittis ipsum varius, luctus nisi. Phasellus vestibulum elementum ipsum ut euismod. Nulla cursus sit amet velit sit amet rhoncus. In pulvinar volutpat sollicitudin. Sed scelerisque ante at erat interdum venenatis. Duis mattis sapien elit, ac ullamcorper ipsum maximus consequat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum sodales vestibulum justo et pellentesque.\n' +
            '\n' +
            'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam dapibus risus a congue ullamcorper. Donec vel rutrum ligula, eget imperdiet est. Sed euismod consequat eros. Donec bibendum rhoncus mi eget molestie. Mauris vitae mauris eu risus blandit dapibus. Vivamus ut justo mi. Donec sed laoreet diam.',
        },
        {
          id: 2,
          date: new Date(),
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In consequat ut diam at ornare. In ac bibendum dolor. Ut a blandit leo. Nullam eget nibh sem. Donec sit amet nibh nec nisl faucibus tempor eu ac nisi. In hac habitasse platea dictumst. Sed efficitur, libero ac pharetra gravida, ante elit semper lacus, nec imperdiet lectus orci nec leo. Vestibulum quis ligula ante. Etiam congue rutrum euismod.\n' +
            '\n' +
            'Duis ultrices, lorem et hendrerit dictum, turpis nibh vestibulum libero, non consectetur nisi lectus sit amet mi. Fusce pretium pharetra elit, quis hendrerit metus. Phasellus sapien dolor, porta non dolor a, vehicula sagittis enim. Cras quis finibus enim. Ut pellentesque porta dictum. Quisque feugiat tempus risus non malesuada. Proin mattis convallis eros sit amet fermentum. Mauris scelerisque orci justo, eu aliquet risus tempus non. Aenean consectetur, massa vitae lobortis suscipit, elit tortor dictum ipsum, et interdum libero justo eu sem. Quisque tempus placerat nulla eget hendrerit. Cras sit amet felis ut ante hendrerit bibendum. Vestibulum sed gravida odio. Aenean id lectus interdum, accumsan arcu nec, pellentesque leo. Nullam sollicitudin nisl quis tincidunt rhoncus.\n' +
            '\n' +
            'Etiam maximus quam sapien, at imperdiet ante molestie nec. Maecenas vitae lorem vitae ex accumsan dictum. Suspendisse viverra id nisl at ultricies. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ac tincidunt augue.\n' +
            '\n' +
            'Nam condimentum venenatis efficitur. In posuere laoreet odio vitae sagittis. Vestibulum iaculis mi et nulla lacinia accumsan. Fusce pulvinar et turpis a vulputate. Pellentesque consectetur varius mauris, at viverra justo euismod quis. Ut pulvinar arcu odio, vel dignissim nisl tempor at. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Curabitur metus urna, lacinia sed tellus in, scelerisque sollicitudin leo.\n' +
            '\n' +
            'Sed nec ligula et elit luctus interdum nec venenatis nibh. Quisque magna erat, scelerisque at cursus fringilla, tempor tincidunt massa. In non mauris id felis ultricies tincidunt in sed lorem. Nullam non mollis metus. Proin mollis mattis libero eu sollicitudin. Vivamus non auctor augue, eget condimentum lacus. Sed turpis neque, efficitur condimentum vulputate nec, porttitor non urna. Mauris eu nulla elit. Aenean lobortis pharetra quam, et suscipit tortor pharetra sit amet. Proin nisl enim, dapibus ac diam pharetra, sollicitudin bibendum purus. Duis a ligula eget arcu condimentum venenatis. Duis scelerisque libero ut velit placerat tempor. Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n',
        },
        {
          id: 3,
          date: new Date(),
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In consequat ut diam at ornare. In ac bibendum dolor. Ut a blandit leo. Nullam eget nibh sem. Donec sit amet nibh nec nisl faucibus tempor eu ac nisi. In hac habitasse platea dictumst. Sed efficitur, libero ac pharetra gravida, ante elit semper lacus, nec imperdiet lectus orci nec leo. Vestibulum quis ligula ante. Etiam congue rutrum euismod.\n' +
            '\n' +
            'Duis ultrices, lorem et hendrerit dictum, turpis nibh vestibulum libero, non consectetur nisi lectus sit amet mi. Fusce pretium pharetra elit, quis hendrerit metus. Phasellus sapien dolor, porta non dolor a, vehicula sagittis enim. Cras quis finibus enim. Ut pellentesque porta dictum. Quisque feugiat tempus risus non malesuada. Proin mattis convallis eros sit amet fermentum. Mauris scelerisque orci justo, eu aliquet risus tempus non. Aenean consectetur, massa vitae lobortis suscipit, elit tortor dictum ipsum, et interdum libero justo eu sem. Quisque tempus placerat nulla eget hendrerit. Cras sit amet felis ut ante hendrerit bibendum. Vestibulum sed gravida odio. Aenean id lectus interdum, accumsan arcu nec, pellentesque leo. Nullam sollicitudin nisl quis tincidunt rhoncus.\n' +
            '\n' +
            'Etiam maximus quam sapien, at imperdiet ante molestie nec. Maecenas vitae lorem vitae ex accumsan dictum. Suspendisse viverra id nisl at ultricies. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ac tincidunt augue.\n',
        },
      ],
      currentConcert: null,
    }
  },
  mounted() {
    this.currentConcert = _.last(_.sortBy(this.concerts, 'date'))
  },
  methods: {
    setCurrentConcert(payload) {
      this.currentConcert = this.concerts.find(
        (concert) => concert.id === payload.id
      )
    },
  },
}
</script>
