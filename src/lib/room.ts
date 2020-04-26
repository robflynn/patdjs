import Exit from "./exit"
import { TakeExitIntent, ExamineRoomIntent } from "./intents"
import GameObject from './game_object'
import Item from './item'
import IContainer from './interfaces/icontainer'

import { use } from "typescript-mix";

const Container: IContainer = {
  items: [],

  isContainer(): boolean {
    return true
  },

  addItem(item: Item): void {
    this.items.push(item)

    item.parentContainer = this
  },

  removeItem(item: Item): Item | null {
    let index = this.items.indexOf(item)

    if (index < 0) { return null }

    this.items.splice(index, 1)

    return item
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
                     .join('\n\n')
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