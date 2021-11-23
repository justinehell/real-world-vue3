<template>
  <h1>Events for Good</h1>
  <div class="events">
    <router-link
      class="event-link"
      :to="{ name: 'EventDetails', params: { id: event.id } }"
      v-for="event in events"
      :key="event.id"
    >
      <EventCard :event="event" />
    </router-link>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService.js'
export default {
  name: 'EventList',
  components: {
    EventCard,
  },
  data() {
    return {
      events: null,
    }
  },
  created() {
    EventService.getEvents()
      .then((response) => {
        this.events = response.data
      })
      .catch((error) => {
        console.log(error)
      })
  },
}
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
