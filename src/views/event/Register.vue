<template>
  <div>
    <p>Register for the event here</p>
    <button @click="register">Register Me</button>
  </div>
</template>

<script>
export default {
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
  methods: {
    register() {
      // Assuming successful API call to register them

      const message = 'You are successfully registered for ' + this.event.title;
      this.$store.dispatch('updateMessage', message);
      this.$router.push({
        name: 'EventDetails',
      });
    },
  },
};
</script>
