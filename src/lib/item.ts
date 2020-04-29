import GameObject from './game_object'
import IContainer from './interfaces/icontainer'
import { Openable } from './interfaces/openable'

import { use } from "typescript-mix";

enum Trait {
  gettable = "gettable",
  openable = "openable",
  container = "container",
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