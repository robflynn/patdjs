import Patd from "../patd"
import Intent from "../intent"
import Exit from "../exit"

export default class TakeExitIntent extends Intent {
  exit: Exit

  get triggers() {
    return this.exit.triggers
  }

  constructor(exit: Exit) {
    super()

    this.exit = exit
  }

  perform() {
    const room = Patd.shared().findRoom(this.exit.roomId)

    Patd.shared().currentRoom = room
  }
}