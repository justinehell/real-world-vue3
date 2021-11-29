<script>
// Vue 3 multi-components introduce a new data level property called emits
// see more : https://www.vuemastery.com/courses/from-vue2-to-vue3/multi-root-components
export default {
  emits: {
    peekedIntoTheBox: (payload) => {
      return ['dead', 'alive', 'both'].includes(payload)
    },
  },
}
</script>
