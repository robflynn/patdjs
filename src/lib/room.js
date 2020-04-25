import Patd from "./patd"
import Intent from "./intent"

class TakeExitIntent extends Intent {
  get triggers() {
    return this.exit.triggers
  }

  constructor(exit) {
    super()

    this.exit = exit
  }

  perform() {
    const room = Patd.shared().findRoom(this.exit.roomId)

    Patd.shared().currentRoom = room
  }
}

class Room {
  get activeIntents() {
    return this._intents
  }

  constructor() {
    this._intents = []
    this.exits = []
  }

  registerIntent(intent) {
    this._intents.push(intent)
  }

  addExit(exit) {
    this.exits.push(exit)

    let intent = new TakeExitIntent(exit)

    this.registerIntent(intent)
  }
}

export default Room