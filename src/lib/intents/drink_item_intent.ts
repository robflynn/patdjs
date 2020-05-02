const Event = require('../events')

import Intent from "../intent"
import Item from '../item'

export default class DrinkItemIntent extends Intent {
  get verbs(): string[] {
    return [
      'drink',
      'imbibe',
      'guzzle',
      'sip'
    ]
  }

  perform(item?: Item, preposition?: string, target?: Item) {
    // TODO: This is going ot be a common thing.... think of a way to
    // refactor this waay.  Maybe have the intent register whether
    // or not it requires aan item and if an item is missing the
    // engine can response with '':verb what?' automatically.
    if (!item) {
      return this.emit(Event.actionResponse, `Drink what?`)
    }

    if (!item.isDrinkable) {
      return this.emit(Event.actionResponse, "You can't drink that.")
    }

    // If it's openable then we need to make sure its open before
    // they drink it. All drinkables aren't openable... like a cup!
    if (item.isOpenable && !item.isOpen()) {
      return this.emit(Event.actionResponse, `It isn't open.`)
    }

    item.drink()

    this.emit(Event.playerDrankitem, item)
    this.emit(Event.actionResponse, `You drink ${item.nameWithArticle}.`)

    return
  }
}