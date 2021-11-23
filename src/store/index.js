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
      return EventService.getEvents()
        .then((response) => {
          commit('SET_EVENTS', response.data);
        })
        .catch((error) => {
          throw error;
        });
    },
    async fetchEventById({ state, commit }, id) {
      let event = state.events.find((e) => e.id === id);
      if (!event) {
        const { data } = await EventService.getEvent(id);
        event = data;
      }
      commit('SET_EVENTS', [event]);
    },
    createEvent({ commit }, newEvent) {
      return EventService.postEvent(newEvent)
        .then(() => {
          commit('UPDATE_EVENTS', newEvent);
        })
        .catch((error) => {
          throw error;
        });
    },
  },
  modules: {},
});
