import EventManager from "./event_manager"
import Intent from "./intent"

const generateId = () => { return Math.floor(Math.random() * 10000) }
const $INSTANCE_ID = `__patdManager${generateId()}`

class MeowIntent extends Intent {
  get triggers() {
    return [
      'meow',
      'bark'
    ]
  }

  perform() {
    console.log("You meow successfully.")
  }
}

export default class Patd {
  static shared() {
    if (window[$INSTANCE_ID] != undefined) {
      return window[$INSTANCE_ID]
    }

    window[$INSTANCE_ID] = new Patd()
    return window[$INSTANCE_ID]
  }

  get currentRoom() {
    return this._room
  }

  constructor() {
    this.rooms = this.buildRooms()
    this.eventManager = new EventManager()
    this._intents = []

    this._room = this.getStartingLocation()

    this.registerIntent(new MeowIntent())
  }

  async process(command) {
    console.log("received input: ", command)

    let intent = await this.determineUserIntent(command)

    if (intent) {
      intent.perform()
    }
  }

  async determineUserIntent(command) {
    let intents = this._intents.filter(intent => intent.isTriggeredBy(command))

    if (!intents) { return null }
    if (intents.length < 0) { return null }


    return intents[0]
  }

  registerIntent(intent) {
    this._intents.push(intent)
  }

  getStartingLocation() {
    // todo: dont hardcode starting location
    return this.rooms[0]
  }

  buildRooms() {
    return [
      {
        id: 1,
        name: "Your Bedroom",
        description: "Messy.\nJean.\nShorts.",
      }
    ]
  }
}
