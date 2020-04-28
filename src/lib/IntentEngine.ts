import Patd from './patd'
import Intent from './intent'
import Item from './item'

const Ner = require('wink-ner')
const WinkTokenizer = require('wink-tokenizer')


/**
 *
 * intents
 *  register action verbs
 *
 *
 * get item intent
 * ===============
 * verbs: get
 * synonyms: grab, pick (up), fetch, loot, carry
 *
 * triggers: :action :item
 *           :action :item :preposition :item
 *           :preposition :item :action :item
 */



export class IntentEngine {
  ner = new Ner()

  constructor() {
  }

  determineIntent(command: string): Intent | null {

    // TODO: For now we'll re-train every request until we get item registration working
    let items = Patd.shared().registeredItems
    let intents = Patd.shared().activeIntents

    let itemTrainingData = this.generateItemTrainingData(items)
    let actionTrainingData = this.generateActionTrainingData(intents)

    this.ner.learn([
      ...itemTrainingData,
      ...actionTrainingData
    ])

    let tokenize = WinkTokenizer().tokenize

    let tokens = tokenize(command)

    tokens = this.ner.recognize(tokens)

    console.log(tokens)

    return null

    // let intents = Patd.shared().activeIntents.filter(intent => intent.isTriggeredBy(command))

    if (!intents) {
      return null
    }

    if (intents.length <= 0) {
      return null
    }

    return intents[0]
  }

  private generateActionTrainingData(intents: Intent[]): any {
    return intents.map(intent => {
      return intent.actions.map(action => {
        return { text: action, entityType: 'action', uid: intent.constructor.name }
      })
    }).filter(array => array.length > 0).flat()
  }

  private generateItemTrainingData(items: Item[]): any {
    return items.map(item => { return { text: item.name, entityType: 'item', uid: item.id } })
  }
}
