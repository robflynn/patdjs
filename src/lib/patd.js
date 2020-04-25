import EventManager from "./event_manager"

const generateId = () => { return Math.floor(Math.random() * 10000) }
const $INSTANCE_ID = `__patdManager${generateId()}`

const Event = require('./events')

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
  }

  on(event, callback) {
    this.eventManager.on(event, callback)
  }

  off(event, callback) {
    this.eventManager.off(event, callback)
  }

  emit(event, data) {
    this.eventManager.emit(event, data)
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
