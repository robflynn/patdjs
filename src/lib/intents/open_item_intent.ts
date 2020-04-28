const Event = require('../events')

import Intent from "../intent"

export default class OpenItemIntent extends Intent {
  get verbs(): string[] {
    return [
      'open'
    ]
  }

  perform(tokens: any[]) {
    let { item } = this.parse(tokens)

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