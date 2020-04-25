import Patd from "./patd"
import Intent from "./intent"

import Exit from "./exit"
import { TakeExitIntent } from "./intents"


class Room {
  exits: Array<Exit>

  private _intents: Array<Intent>

  get activeIntents() {
    return this._intents
  }

  constructor() {
    this._intents = []
    this.exits = []
  }

  registerIntent(intent: Intent) {
    this._intents.push(intent)
  }

  addExit(exit: Exit) {
    this.exits.push(exit)

    let intent = new TakeExitIntent(exit)

    this.registerIntent(intent)
  }
}

export default Room