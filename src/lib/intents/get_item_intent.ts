const Event = require('../events')

import Intent from '../intent'
import Item from '../item'
import Patd from '../patd'

export default class GetItemIntent extends Intent {
  item: Item

  get triggers(): string[] {
    return ['get']
  }

  constructor(item: Item) {
    super()

    this.item = item
  }

  perform() {
    // Makee sure we can get the item
    let theItem = this.item.pickUp()

    // TODO: How do I want to handle failures/errors. What if this was a locked box or something?
    if (!theItem) { return }

    Patd.shared().inventory.addItem(theItem)

    const response = `You get ${theItem.nameWithArticle}`

    Patd.shared().eventManager.emit(Event.actionResponse, response)
  }
}