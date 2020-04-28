const Event = require('../events')

import Intent from '../intent'
import Patd from '../patd'

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

  perform(tokens: any[]) {
    let { item } = this.parse(tokens)

    const response = item.examine()

    Patd.shared().eventManager.emit(Event.actionResponse, response)
  }
}
