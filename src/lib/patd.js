import EventManager from "./event_manager"
import Intent from "./intent"

const generateId = () => { return Math.floor(Math.random() * 10000) }
const $INSTANCE_ID = `__patdManager${generateId()}`

class MeowIntent extends Intent {
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

  constructor() {
    this.scenes = this.buildScenes()
    this.eventManager = new EventManager()
    this._intents = []


  }

  async process(command) {
    console.log("received input: ", command)

    let intent = await this.determineUserIntent(command)

    if (intent) {
      intent.perform()
    }
  }

  async determineUserIntent(command) {

    return new MeowIntent()

    //

    let intents = this._intents.filter(intent => intent.isTriggeredBy(command))

    if (!intents) { return null }
    if (intents.length < 0) { return null }

    return intents[0]
  }

  registerIntent(intent) {
    this.intents.append(intent)
  }

  buildScenes() {
    return [
      {
        id: 1,
        name: "Your Bedroom",
        description: "Messy.\nJean.\nShorts.",
      }
    ]
  }
}
