// import { reactive } from 'vue';
import { createStore } from 'vuex';

// export default reactive({ flashMessage: '', event: null });
export default createStore({
  state: {
    flashMessage: '', // <-- TODO : Update the use of this data
    event: null, // <-- TODO : Update the use of this data
    user: 'Adam Jahr',
  },
  mutations: {},
  actions: {},
  modules: {},
});
