const Event = require('../events')

import Intent from '../intent'
import Item from '../item'
import Patd from '../patd'

export default class GetItemIntent extends Intent {
  get verbs(): string[] {
    return [
      'get',
      'pickup',
      'pick up',
      'loot',
      'grab',
      'fetch',
      'obtain',
      'carry',
      'gather',
    ]
  }

  get prepositions(): string[] {
    return [
      'from',
      'out'
    ]
  }

  perform(tokens: any[]) {
    let { item, preposition, target } = this.parse(tokens)

    // Makee sure we can get the item
    let theItem = item.pickUp()

    // TODO: How do I want to handle failures/errors. What if this was a locked box or something?
    if (!theItem) {
      this.emit(Event.actionResponse, 'You cannot get that.')
      return
    }

    const parent = theItem.parentContainer
    if (!parent) { return }

    let removedItem = parent.removeItem(item)
    if (!removedItem) { return }

    Patd.shared().inventory.addItem(item)

    this.emit(Event.playerPickedUpItem, theItem)
    this.emit(Event.actionResponse, `You get ${theItem.nameWithArticle}`)
  }
}