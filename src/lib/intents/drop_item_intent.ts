const Event = require('../events')

import Intent from '../intent'
import Item from '../item'
import Patd from '../patd'

export default class DropItemIntent extends Intent {
  item: Item

  get triggers(): string[] {
    const actions = [
      'drop',
      'discard'
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
    let item = Patd.shared().inventory.removeItem(this.item)
    if (!item) { return this.emit(Event.actionResponse, "You're not carrying that.") }

    Patd.shared().currentRoom.addItem(item)

    this.emit(Event.playerDroppedItem, item)

    const response = `You drop ${item.nameWithArticle}`
    this.emit(Event.actionResponse, response)
  }
}