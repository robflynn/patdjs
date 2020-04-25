import Exit from "./exit"
import { TakeExitIntent } from "./intents"
import GameObject from './game_object';

class Room extends GameObject {
  name: string = "A room"
  description: string = "A non-descript room."
  exits: Array<Exit>

  get activeIntents() {
    return this._intents
  }

  constructor() {
    super()

    this.exits = []
  }

  addExit(exit: Exit) {
    this.exits.push(exit)

    let intent = new TakeExitIntent(exit)

    this.registerIntent(intent)
  }
}

export default Room