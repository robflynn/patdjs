const Event = require('./events')

import GameObject from "./game_object"
import EventManager from "./event_manager"

import Room from "./room"

import Exit from "./exit"
import Identifier from './identifier'
import GameData from "./game_data"
import Item from './item'

export default class Patd extends GameObject {
  eventManager: EventManager

  private _room: Room
  private rooms: Array<Room>

  private static _instance: Patd

  static shared(): Patd {
    return this._instance || (this._instance = new Patd())
  }

  get currentRoom(): Room {
    return this._room
  }

  set currentRoom(room: Room) {
    let oldValue = this._room

    this._room = room

    this.eventManager.emit(Event.playerExitedRoom, oldValue)
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
    super()

    this.rooms = []

    this.eventManager = new EventManager()

    this._room = new Room()
  }

  findRoom(roomId: Identifier) {
    return this.rooms.filter(room => room.id == roomId)[0]
  }

  loadGame(gameData: GameData) {
    // tslint:disable-next-line
    gameData.rooms.forEach((room: any) => this.buildRoom(room))

    this.currentRoom = this.rooms[0]
  }

  buildRoom(data: any) {
    let room = new Room()
    room.id = data.id
    room.name = data.name
    room.description = data.description

    if (data.exits && data.exits.length > 0) {
      data.exits.forEach((exitData: any) => room.addExit(this.buildExit(exitData)))
    }

    if (data.items && data.items.length > 0) {
      data.items.forEach((itemData: any) => room.addItem(this.buildItem(itemData)))
    }

    this.rooms.push(room)
  }

  buildItem(itemData: any): Item {
    let item = new Item(itemData.name)

    item.description = itemData.description
    item.environmental = itemData.environmental
    item.aliases = itemData.aliases

    return item
  }

  buildExit(exitData: any) {
    let exit = new Exit(exitData.direction, exitData.room_id)
    exit.id = exitData.id


    return exit
  }

  async process(command: string) {
    console.log("received input: ", command)

    let intent = await this.determineUserIntent(command)

    if (intent) {
      intent.perform()
    }
  }

  async determineUserIntent(command: string) {
    let input = command.toLowerCase()
    let intents = this.activeIntents.filter(intent => intent.isTriggeredBy(input))

    if (!intents) { return null }
    if (intents.length < 0) { return null }

    return intents[0]
  }

  getStartingLocation() {
    // todo: dont hardcode starting location
    return this.rooms[0]
  }
}
