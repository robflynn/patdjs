import Vue from 'vue'
import Vuex from 'vuex'
import App from './app.vue'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    currentRoom: null,
  },

  mutations: {
    setCurrentRoom(state, room) {
      state.currentRoom = room
    }
  }
})

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
