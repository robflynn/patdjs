import GameObject from './game_object'
import {
  ExamineItemIntent,
  GetItemIntent,
  DropItemIntent,
  OpenItemIntent
} from './intents'

import IContainer from './interfaces/icontainer'

import { use } from "typescript-mix";

enum Trait {
  gettable = "gettable",
  openable = "openable",
  container = "container",
}

enum OpenState {
  open,
  closed
}

interface IOpenable {
  openState: OpenState

  open(): boolean
  close(): boolean
  isOpen(): boolean
}

const Openable: IOpenable = {
  openState: OpenState.closed,

  isOpen(): boolean {
    return this.openState == OpenState.open
  },

  open(): boolean {
    this.openState = OpenState.open

    return true
  },

  close(): boolean {
    this.openState = OpenState.closed

    return true
  },
}

class Item extends GameObject {
  [x: string]: any;
  @use( Openable ) this: any

  name: string
  aliases?: string[]
  description?: string
  environmental?: string

  parentContainer?: IContainer

  traits: Trait[]

  get isOpenable(): boolean {
    return this.traits.includes(Trait.openable)
  }

  get affectsEnvironment(): boolean {
    return this.environmental != null && this.environmental != ''
  }

  get article(): string {
    return "the"
  }

  get nameWithArticle(): string {
    return `${this.article} ${this.name}`
  }

  constructor(name: string) {
    super()

    this.name = name
    this.traits = []

    this.registerIntent(new ExamineItemIntent(this))
    this.registerIntent(new GetItemIntent(this))
    this.registerIntent(new DropItemIntent(this))
    this.registerIntent(new OpenItemIntent(this))
  }

  examine(): string {
    let buffer = []

    if (this.description) {
      buffer.push(this.description)
    }

    if (this.isOpenable) {
      buffer.push(this.isOpen() ? "it is open." : "it is closed.")
    }

    if (buffer.length == 0) {
      buffer.push(`You see nothing special about ${this.nameWithArticle}`)
    }

    return buffer.join('\n').trim()
  }

  pickUp(): Item | null {
    if (!this.traits.includes(Trait.gettable)) {
      return null
    }

    return this
  }
}

export default Item