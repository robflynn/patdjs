const Event = require('./events')

import GameObject from "./game_object"
import EventManager from "./event_manager"

import Room from "./room"

import Exit from "./exit"
import Identifier from './identifier'
import GameData from "./game_data"
import Item from './item'
import Intent from './intent'
import Inventory from './inventory'
import { IntentEngine } from './IntentEngine'

export default class Patd extends GameObject {
  eventManager: EventManager

  private _room: Room
  private rooms: Room[]
  private _inventory: Inventory
  private engine: IntentEngine

  private _objects: any = {}

  private static _instance: Patd

  static shared(): Patd {
    return this._instance || (this._instance = new Patd())
  }

  constructor() {
    super()

    this.rooms = []
    this._inventory = new Inventory()

    this.eventManager = new EventManager()

    this._room = new Room()

    /*
    this.registerIntent(Intent.createIntent(['intents'], () => {
      const triggers = this.activeIntents.flatMap((intent: Intent) => intent.triggers)

      console.log(triggers.join('\n'))
    }))
    */

    this.engine = new IntentEngine()
  }

  get inventory(): Inventory {
    return this._inventory
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

    intents.push(...this.inventory.items.flatMap((item: Item) => item.activeIntents))

    return intents.filter(intent => intent != undefined)
  }

  get nearbyItems() {
    // items in the room...
    let items = this.currentRoom.items

    // Stuff you're carrying
    items.push(...this.inventory.items)

    return items
  }

  findIntent(name: string): Intent | null {
    let intents = this.activeIntents

    for (var i = 0; i < intents.length; i++) {
      let intent = intents[i]

      if (intent.constructor.name == name) {
        return intent
      }
    }

    return null
  }

  findObject(id: any): GameObject | null {
    if (this._objects.hasOwnProperty(id)) {
      return this._objects[id]
    }

    return null
  }

  findItem(id: any): Item | null {
    let object = this.findObject(id)

    if (object == null) { return null }

    if (object instanceof Item) { return object }

    return null
  }

  registerObject(object: GameObject) {
    this._objects[object.id] = object
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

    if (itemData.traits) {
      item.traits = itemData.traits
    }

    console.log(item)

    Patd.shared().registerObject(item)

    return item
  }

  buildExit(exitData: any) {
    let exit = new Exit(exitData.direction, exitData.room_id)
    exit.id = exitData.id


    return exit
  }

  async process(command: string) {
    console.log("received input: ", command)

    let intent = this.engine.determineIntent(command)

    if (intent) {
      intent.perform()
    }
  }

  async determineUserIntent(command: string) {
    let intent = this.engine.determineIntent(command.toLowerCase())

    if (intent) { return intent }

    return null
  }

  getStartingLocation() {
    // todo: dont hardcode starting location
    return this.rooms[0]
  }
}
