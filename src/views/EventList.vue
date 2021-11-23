<template>
  <div class="events">
    <h1>Event For Good</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue';
import { mapState } from 'vuex';

export default {
  name: 'EventList',
  props: {
    page: {
      type: Number,
      default: 1,
    },
  },
  components: {
    EventCard,
  },
  created() {
    this.$store.dispatch('fetchEvents').catch((error) => {
      this.$router.push({
        name: 'ErrorDisplay',
        params: { error },
      });
    });
  },
  computed: {
    ...mapState(['events']),
  },
};
</script>
<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
