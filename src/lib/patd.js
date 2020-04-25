const Event = require('./events')

import EventManager from "./event_manager"

import Room from "./room"
import Exit from "./exit"

const generateId = () => { return Math.floor(Math.random() * 10000) }
const $INSTANCE_ID = `__patdManager${generateId()}`

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

  set currentRoom(room) {
    let oldValue = this._room

    this._room = room

    this.eventManager.emit(Event.playerLeftRoom, oldValue)
    this.eventManager.emit(Event.playerEnteredRoom, room)
  }

  get intents() {
    return this._intents
  }

  get activeIntents() {
    let intents = [...this.intents]

    if (this.currentRoom) {
      intents.push(...this.currentRoom.activeIntents)
    }

    return intents
  }

  constructor() {
    this.rooms = []
    this._intents = []

    this.eventManager = new EventManager()

    this._room = null
  }

  findRoom(roomId) {
    return this.rooms.filter(room => room.id == roomId)[0]
  }

  loadGame(gameData) {
    gameData.rooms.forEach(room => this.buildRoom(room))

    this.currentRoom = this.rooms[0]
  }

  buildRoom(data) {
    let room = new Room()
    room.id = data.id
    room.name = data.name
    room.description = data.description

    if (data.exits && data.exits.length > 0) {
      data.exits.forEach(exitData => room.addExit(this.buildExit(exitData)))
    }

    this.rooms.push(room)
  }

  buildExit(exitData) {
    let exit = new Exit(exitData.direction, exitData.room_id)
    exit.id = exitData.id


    return exit
  }

  async process(command) {
    console.log("received input: ", command)

    let intent = await this.determineUserIntent(command)

    if (intent) {
      intent.perform()
    }
  }

  async determineUserIntent(command) {
    let input = command.toLowerCase()
    let intents = this.activeIntents.filter(intent => intent.isTriggeredBy(input))

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
}
