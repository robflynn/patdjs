const Event = require('../events')

import Intent from '../intent'
import Patd from '../patd'
import Item from '../item'

export default class ExamineItemIntent extends Intent {
  get verbs(): string[] {
    return [
      'look',
      'observe',
      'examine',
      'inspect',
      'check',
      'describe',
      'analyze',
      'study',
      'gaze'
    ]
  }

  perform(item?: Item, preposition?: string, target?: Item) {
    if (!item) {
      return this.emit(Event.actionResponse, 'Look at what?')
    }

    Patd.shared().eventManager.emit(Event.actionResponse, item.examine())
  }
}
