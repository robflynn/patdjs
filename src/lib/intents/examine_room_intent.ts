const Event = require('../events')

import Intent from "../intent"
import Patd from '../patd';
import Room from '../room'

export default class ExamineRoomIntent extends Intent {
  get verbs(): string[] {
    // TODO: Maybe rooms should just be examinable just like objects
    return [
      'l'
    ]
  }

  get room(): Room {
    return Patd.shared().currentRoom
  }

  constructor() {
    super()
  }

  perform() {
    Patd.shared().eventManager.emit(Event.actionResponse, this.room.examine())
  }
}