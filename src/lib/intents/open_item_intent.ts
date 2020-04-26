const Event = require('../events')

import Intent from "../intent"
import Item from '../item'

export default class OpenItemIntent extends Intent {
  private item: Item

  get triggers(): string[] {
    const actions = [
      'open',
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
    if (!this.item.isOpenable) {
      return this.emit(Event.actionResponse, `It doesn't open.`)
    }

    if (this.item.isOpen()) {
      return this.emit(Event.actionResponse, `It's already open.`)
    }

    this.emit(Event.playerOpenedItem, this.item)
    this.emit(Event.actionResponse, `You open ${this.item.nameWithArticle}.`)

    return this.item.open()
  }
}