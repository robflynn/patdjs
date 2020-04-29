const Event = require('../events')

import Intent from "../intent"
import Item from '../item'

export default class OpenItemIntent extends Intent {
  get verbs(): string[] {
    return [
      'open'
    ]
  }

  perform(item?: Item, preposition?: string, target?: Item) {
    // TODO: This is going ot be a common thing.... think of a way to
    // refactor this waay.  Maybe have the intent register whether
    // or not it requires aan item and if an item is missing the
    // engine can response with '':verb what?' automatically.
    if (!item) {
      return this.emit(Event.actionResponse, `Open what?`)
    }

    if (!item.isOpenable) {
      return this.emit(Event.actionResponse, `It doesn't open.`)
    }

    if (item.isOpen()) {
      return this.emit(Event.actionResponse, `It's already open.`)
    }

    if (!item.open()) {
      return this.emit(Event.actionResponse, `It won't open.`)
    }

    this.emit(Event.playerOpenedItem, item)
    this.emit(Event.actionResponse, `You open ${item.nameWithArticle}.`)

    return
  }
}