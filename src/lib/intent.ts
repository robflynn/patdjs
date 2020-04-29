import Patd from './patd'
import GameObject from './game_object'
import Item from './item'

export default class Intent extends GameObject {
  get verbs(): string[] { return [] }
  get prepositions(): string[] { return [] }

  perform(item?: Item, preposition?: string, target?: Item) {}
}
