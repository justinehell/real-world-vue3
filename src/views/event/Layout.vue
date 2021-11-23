<template>
  <div>
    <h1>{{ event.title }}</h1>
    <div id="nav">
      <router-link :to="{ name: 'EventDetails' }">Details</router-link>
      |
      <router-link :to="{ name: 'EventRegister' }">Register</router-link>
      |
      <router-link :to="{ name: 'EventEdit' }">Edit</router-link>
    </div>
    <router-view :event="event"></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['getEventById']),
    event() {
      return this.getEventById(this.id);
    },
  },
};
</script>
