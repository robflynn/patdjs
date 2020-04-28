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
    let data = {
      text: item.name,
      entityType: 'item',
      uid: item.id
    }

    this.learn(data)
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

    potentialIntents.forEach((potentialIntent: any) => {

      console.log('checking: potentialIntent: ', potentialIntent)
      let intent = Patd.shared().findIntent(potentialIntent)
      console.log(Patd.shared().activeIntents)
      console.log(intent)

      intent.perform(tokens)
    })

    return null
  }
}