const Event = require('../events')

import Intent from '../intent'
import Item from '../item'
import Patd from '../patd'

export default class GetItemIntent extends Intent {
  item: Item

  get triggers(): string[] {
    const actions = [
      'get',
      'pick up',
      'loot',
      'grab',
      'fetch',
      'obtain',
    ]

    const triggers: string[] = []

    actions.forEach((action: string) => {
      triggers.push(`${action} ${this.item.name}`)
      triggers.push(`${action} ${this.item.nameWithArticle}`)
    })

    return triggers.map((trigger: String) => trigger.toLowerCase())
  }

  constructor(item: Item) {
    super()

    this.item = item
  }

  perform() {
    // Makee sure we can get the item
    let theItem = this.item.pickUp()

    // TODO: How do I want to handle failures/errors. What if this was a locked box or something?
    if (!theItem) {
      this.emit(Event.actionResponse, 'You cannot get that.')
      return
    }

    Patd.shared().inventory.addItem(theItem)

    const response = `You get ${theItem.nameWithArticle}`

    this.emit(Event.actionResponse, response)
  }
}