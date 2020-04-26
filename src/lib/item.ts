import GameObject from './game_object'
import { ExamineItemIntent, GetItemIntent } from './intents'

class Item extends GameObject {
  name: string
  aliases?: string[]
  description?: string
  environmental?: string

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

    this.registerIntent(new ExamineItemIntent(this))
    this.registerIntent(new GetItemIntent(this))
  }

  examine(): string {
    let buffer = []

    if (this.description) {
      buffer.push(this.description)
    }

    if (buffer.length == 0) {
      buffer.push(`You see nothing special about ${this.nameWithArticle}`)
    }

    return buffer.join('\n').trim()
  }

  pickUp(): Item | null {
    return this
  }
}

export default Item