const Event = require('../events')

import Intent from "../intent"
import Patd from '../patd';
import Room from '../room'

export default class ExamineRoomIntent extends Intent {
  get triggers(): string[] {
    return [
      "examine room",
      "look around",
       "look at surroundings",
       "look at my surroundings",
       "look around the room",
       "look at room",
       "look",
       "what's around me",
       "what is around me",
       "describe my surroundings",
       "describe surroundings"
    ]
  }

  get room(): Room {
    return this._room
  }

  private _room: Room

  constructor(room: Room) {
    super()

    this._room = room
  }

  perform() {
    Patd.shared().eventManager.emit(Event.actionResponse,this.room.examine())
  }
}