import Patd from './patd'
import Intent from './intent'
import Item from './item'

const Ner = require('wink-ner')
const winkTokenizer = require('wink-tokenizer')
const winkTagger = require( 'wink-pos-tagger' );
const tokenize = winkTokenizer().tokenize

export class IntentEngine {
  private ner: any
  private knowledge: any = []

  get intents(): Intent[] {
    return Patd.shared().activeIntents
  }

  get items(): Item[] {
    return Patd.shared().nearbyItems
  }

  constructor() {
    this.ner = Ner()
  }

  prepareIntent(intent: Intent) {
    console.log(intent)
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

  prepareItem(item: any) {
    const names = [item.name, ...item.aliases]

    names.forEach(name => {
      let data = {
        text: name,
        entityType: 'item',
        uid: item.id
      }

      console.log(data)

      this.learn(data)
    })
  }

  learn(data: any) {
    console.log('learning: ', data)

    this.knowledge.push(data)
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

    this.knowledge = []

    this.intents.forEach(intent => this.prepareIntent(intent))
    this.items.forEach(item => this.prepareItem(item))

    const tokens = this.tokenize(command)

    const potentialIntents = tokens.filter((token: any) => token.entityType == 'action' )
                                   .map((token: any) => { return token.uid })

    console.log(potentialIntents)

    const intentID = potentialIntents[0]

    console.log(intentID)

    let intent = Patd.shared().findIntent(intentID)

    console.log(intent)

    if (!intent) { return null }

    let { item, preposition, target } = this.parse(tokens)

    console.log('wat ', intent)
    intent.perform(item, preposition, target)

    return null
  }

  private parse(tokens: any): any {
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
          target = Patd.shared().findItem(token.uid)

          return
        }

        directObject = Patd.shared().findItem(token.uid)

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