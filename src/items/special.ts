import Item from "@/lib/item"
import { Trait } from "@/lib/item"

export default class SpecialThing extends Item {
  constructor() {
    super('special thing')

    this.id = 'special'

    this.description = 'This thing is fairly special, I think.'
    this.environmental = 'Some kind of special thing is being special over there.'
    this.traits = [Trait.gettable]
  }
}