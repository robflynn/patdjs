const Event = require('../events')

import Intent from '../intent'
import Item from '../item'
import Patd from '../patd'

export default class ExamineItemIntent extends Intent {
  item: Item

  get triggers(): string[] {
    const actions = [
      'look',
      'look at',
      'observe',
      'examine',
      'inspect',
      'check out',
      'describe',
      'analyze',
      'study',
      'gaze at',
      'gaze upon'
    ]

    const articles = ['the', 'that']

    let triggers: string[] = []

    actions.forEach(action => {
      triggers.push(`${action} ${this.item.name.toLowerCase()}`)

      articles.forEach(article => triggers.push(`${action} ${article} ${this.item.name.toLowerCase()}`))

      articles.forEach(article => {
        if (this.item.aliases && this.item.aliases.length > 0) {
          this.item.aliases.forEach((alias: string) => {
            triggers.push(`${action} ${article} ${alias.toLowerCase()}`)
          })
        }
      })
    })

    return triggers
  }

  constructor(item: Item) {
    super()

    this.item = item
  }

  perform() {
    const response = this.item.examine()

    Patd.shared().eventManager.emit(Event.actionResponse, response)
  }
}
