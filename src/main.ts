import Vue from 'vue'
import Vuex from 'vuex'
import App from './app.vue'
/*

registerIntent(new PutItemIntent())

const items = [
  { id: 1, name: 'sword' },
  { id: 2, name: 'banana' },
  { id: 3, name: 'mailbox' },
  { id: 4, name: 'pie hole' },
  { id: 5, name: 'goat' },
  { id: 6, name: 'table' },
  { id: 7, name: 'cake' },
  { id: 8, name: 'cake store' },
]

let engine = new IntentEngine()
window['ENGINE'] = engine

engine.registerIntent(new PutItemIntent())
engine.registerIntent(new OpenItemIntent())
engine.registerIntent(new GetItemIntent())
items.forEach(item => engine.registerItem(item))

engine.determineIntent('put the slippery banana in the got dang goat')
engine.determineIntent('open the mailbox')
engine.determineIntent('get the cake from the cake store')
engine.determineIntent('put the keys upon the table')
engine.determineIntent('from the mailbox get the banana')
engine.determineIntent('i want to put the cake in my pie hole')
*/


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
