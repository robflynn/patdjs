import Exit from "./exit"
import { TakeExitIntent, ExamineRoomIntent } from "./intents"
import GameObject from './game_object'
import Item from './item'

import { use } from "typescript-mix";

export interface IContainer {
  items: Array<Item>

  isContainer(): boolean
  addItem(item: Item): void
  removeItem(item: Item): void
  containsItem(item: Item): boolean
}

const Container: IContainer = {
  items: [],

  isContainer(): boolean {
    return true
  },

  addItem(item: Item): void {
    this.items.push(item)
  },

  removeItem(item: Item): void {
    let index = this.items.indexOf(item)

    if (index > -1) {
      this.items.splice(index, 1)
    }
  },

  containsItem(item: Item): boolean {
    let index = this.items.indexOf(item)

    return index > -1
  }
}

class Room extends GameObject {
  [x: string]: any;
  @use( Container ) this: any

  items = []

  name: string = "A room"
  description: string = "A non-descript room."
  exits: Array<Exit>

  get activeIntents() {
    return [...this._intents, ...this.items.flatMap((item: Item) => item.activeIntents)]
  }

  get fullDescription(): string {
    return `
${this.description}

${this.environmentalDescriptors}
    `.trim()
  }

  constructor() {
    super()

    this.exits = []

    this.registerIntent(new ExamineRoomIntent(this))
  }

  get environmentalDescriptors(): string {
    return this.items.filter((item: Item) => item.affectsEnvironment)
                     .map((item: Item) => item.environmental)
                     .join('\n')
  }

  addExit(exit: Exit) {
    this.exits.push(exit)

    this.registerIntent(new TakeExitIntent(exit))
  }

  examine(): string {
    let buffer: string[] = []

    buffer.push(this.name)
    buffer.push(this.description)

    this.items.filter((item: Item) => item.affectsEnvironment)
              .forEach((item: Item) => {
                if (item.environmental) {
                  buffer.push(item.environmental)
                }
              })

    return buffer.join('\n')
  }
}

export default Room