const Event = require('../events')

import Intent from '../intent'
import Item from '../item'
import Patd from '../patd'

export default class DropItemIntent extends Intent {
  get verbs(): string[] {
    return [
      'drop',
      'discard',
      'place',
      'put'
    ]
  }

  get prepositions(): string[] {
    return [
      'in',
      'on',
      'under',
      'above',
      'inside',
      'through'
    ]
  }

  perform(tokens: any[]) {
    let { item, preposition, target } = this.parse(tokens)

    if (!Patd.shared().inventory.containsItem(item)) {
      return this.emit(Event.actionResponse, "You're not carrying that.")
    }

    let theItem = Patd.shared().inventory.removeItem(item)

    if (!theItem) { return this.emit(Event.actionResponse, "You can't drop that.") }

    Patd.shared().currentRoom.addItem(item)

    this.emit(Event.playerDroppedItem, item)

    this.emit(Event.actionResponse, `You drop ${item.nameWithArticle}`)
  }
}