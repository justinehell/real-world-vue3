<template>
  <p>{{ event.time }} on {{ event.date }} @ {{ event.organizer }}</p>
  <p>{{ event.description }}</p>
</template>

<script>
export default {
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
};
</script>
