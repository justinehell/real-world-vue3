<template>
  <p>Register for the event here</p>
  <button @click="register">Register Me</button>
</template>

<script>
export default {
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
  inject: ['GStore'], // <-- Inject the Global Store
  methods: {
    register() {
      // Assuming successful API call to register them

      this.GStore.flashMessage =
        'You are successfully registered for ' + this.event.title;
      setTimeout(() => {
        // After 3 seconds remove it
        this.GStore.flashMessage = '';
      }, 3000);

      this.$router.push({
        name: 'EventDetails',
      });
    },
  },
};
</script>
