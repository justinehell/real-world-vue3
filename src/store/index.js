import { createStore } from 'vuex';
import EventService from '../services/EventService';

export default createStore({
  state: {
    flashMessage: '',
    events: [],
    user: 'Adam Jahr',
  },
  getters: {
    getEventById: (state) => (id) => {
      return state.events.find((event) => event.id === id);
    },
  },
  mutations: {
    UPDATE_MESSAGE(state, message) {
      state.flashMessage = message;
      setTimeout(() => {
        state.flashMessage = '';
      }, 3000);
    },
    SET_EVENTS(state, events) {
      state.events = events;
    },
    UPDATE_EVENTS(state, newEvent) {
      state.events.push(newEvent);
    },
  },
  actions: {
    updateMessage({ commit }, message) {
      commit('UPDATE_MESSAGE', message);
    },
    fetchEvents({ commit }) {
      EventService.getEvents()
        .then((response) => {
          commit('SET_EVENTS', response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async fetchEventById({ commit }, id) {
      await EventService.getEvent(id).then((response) => {
        commit('SET_EVENTS', [response.data]);
      });
    },
    createEvent({ commit }, newEvent) {
      EventService.postEvent(newEvent).then(() => {
        commit('UPDATE_EVENTS', newEvent).catch((error) => {
          console.log(error);
        });
      });
    },
  },
  modules: {},
});
