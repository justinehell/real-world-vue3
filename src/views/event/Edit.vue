<template>
  <p>Edit the event here</p>
</template>

<script>
export default {
  name: 'EventEdit',
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
};
</script>
