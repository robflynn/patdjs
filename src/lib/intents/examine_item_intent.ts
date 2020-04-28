const Event = require('../events')

import Intent from '../intent'
import Patd from '../patd'

export default class ExamineItemIntent extends Intent {
  get verbs(): string[] {
    return [
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
  }

  perform(tokens: any[]) {
    let { item } = this.parse(tokens)

    const response = item.examine()

    Patd.shared().eventManager.emit(Event.actionResponse, response)
  }
}
