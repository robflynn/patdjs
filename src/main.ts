import Vue from 'vue'
import Vuex from 'vuex'
import App from './app.vue'

const Ner = require('wink-ner')
const winkTokenizer = require('wink-tokenizer')
const winkTagger = require( 'wink-pos-tagger' );
const tokenize = winkTokenizer().tokenize

let registeredIntents: any = {}
let registeredItems: any = {}

const registerIntent = (intent: Intent) => {
  registeredIntents[intent.constructor.name] = intent
}

const registerItem = (item: any) => {
  registeredItems[item.id] = item
}

const process = (command: string) => {
  console.log(command)
}

class Intent {
  get verbs(): string[] { return [] }
  get prepositions(): string[] { return [] }

  perform(tokens: any[]) {
  }

  items(tokens: any[]) {
    let items = window['ENGINE'].items

    return tokens.filter((token: any) => token.entityType == 'item')
                 .map((token:any) => { return items[token.uid] } )

  }

  parse(tokens: any): any {
    let directObject = null
    let target: any = null
    let preposition = null
    let prepositionSeen = false

    tokens.forEach((token: any) => {
      if (token.entityType == 'preposition') {
        prepositionSeen = true
        preposition = token.uid

        return
      }

      if (token.entityType == 'item') {
        if (prepositionSeen && target == null) {
          target = window['ENGINE'].items[token.uid]

          return
        }

        directObject = window['ENGINE'].items[token.uid]

        return
      }
    })

    return {
      item: directObject,
      preposition: prepositionSeen ? preposition: null,
      target: target
    }
  }
}

class IntentEngine {
  private intents: any = {}
  items: any = {}
  private ner: any
  private knowledge: any = []

  constructor() {
    this.ner = Ner()
  }

  registerIntent(intent: Intent) {
    this.intents[intent.constructor.name] = intent

    this.learnIntent(intent)
  }

  learnIntent(intent: Intent) {
    let verbs = intent.verbs
    let intentName = intent.constructor.name
    let prepositions = intent.prepositions

    verbs.forEach(verb => {
      let data = {
        text: verb,
        entityType: 'action',
        uid: intentName
      }

      this.learn(data)
    })

    prepositions.forEach(preposition => {
      let data = {
        text: preposition,
        entityType: 'preposition',
        uid: preposition
      }

      this.learn(data)
    })
  }

  registerItem(item: any) {
    this.items[item.id] = item

    this.learnItem(item)
  }

  learnItem(item: any) {
    let data = {
      text: item.name,
      entityType: 'item',
      uid: item.id
    }

    this.learn(data)
  }

  learn(data: any) {
    this.knowledge.push(data)
//    this.ner.learn(data)

    console.log('learning: ', data)
  }

  tokenize(command: string): any {
    this.ner.learn(this.knowledge)

    let tokens = tokenize(command)

    tokens = this.ner.recognize(tokens)

    const tag = winkTagger().tag
    tokens = tag(tokens)

    tokens = tokens.filter((token: any) => token.entityType != undefined )

    return tokens
  }

  determineIntent(command: string): Intent | null {
    console.log('checking: ', command)

    const tokens = this.tokenize(command)

    const potentialIntents = tokens.filter((token: any) => token.entityType == 'action' )
                                   .map((token: any) => { return token.uid })

    potentialIntents.forEach((potentialIntent: any) => {
      let intent = this.intents[potentialIntent]

      console.log(intent)
      intent.perform(tokens)
    })

    return null
  }
}

class PutItemIntent extends Intent {
  get verbs(): string[] {
    return [
      'put',
      'place',
      'discard'
    ]
  }

  get prepositions(): string[] {
    return [
      'in',
      'on',
      'through',
      'under',
      'upon'
    ]
  }

  perform(tokens: any[]): string {
    let response: string = "response"

    let { item, preposition, target } = this.parse(tokens)

    console.log(item, preposition, target)

    // This is where you'd check to see if yuou're carrying the item and if so
    // put it in the appropriate target location

    return response
  }
}

class OpenItemIntent extends Intent {
  get verbs(): string[] {
    return [
      'open',
    ]
  }

  get prepositions(): string[] {
    return []
  }

  perform(tokens: any[]): string {
    let response: string = "response"

    let { item, preposition, target } = this.parse(tokens)

    console.log(item, preposition, target)

    return response
  }
}

class GetItemIntent extends Intent {
  get verbs(): string[] {
    return [
      'get',
      'grab',
      'carry',
      'pick up',
      'take'
    ]
  }

  get prepositions(): string[] {
    return [
      'from'
    ]
  }

  perform(tokens: any[]): string {
    let response: string = "response"

    let { item, preposition, target } = this.parse(tokens)

    console.log(item, preposition, target)

    return response
  }
}


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

/*
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

*/