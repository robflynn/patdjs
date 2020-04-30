const Event = require("@/lib/events")
import Patd from "@/lib/patd"
import Item from "@/lib/item"
import { Trait } from "@/lib/item"
import Intent from '@/lib/intent'

export default class SpecialThing extends Item {
  timesTurned: number = 0

  get description(): string {
    let description = 'This thing is fairly special, I think. '

    if (this.timesTurned == 0) {
      description += 'I wonder what happens if you turn it?'
    } else {
      description += `It has been turned ${this.timesTurned} times.`
    }

    return description
  }

  constructor() {
    super('special thing')

    this.id = 'special'

    this.environmental = 'Some kind of special thing is being special over there.'
    this.traits = [Trait.gettable]

    // TODO: Make this prettier
    this.registerIntent(Intent.createIntent(
      ['turn the special thing'],
      [],
      () => {
        this.emit(Event.actionResponse, 'You turn the special thing.')

        if (this.timesTurned == 0) {
         this.emit(Event.actionResponse, 'You hear a whirring in the distance.')
        }

        if (this.timesTurned == 1) {
          this.emit(Event.actionResponse, 'The ground begins to trumble beneath your feet.')
        }

        if (this.timesTurned == 2) {
          this.emit(Event.actionResponse, 'Drink more slurm.')
        }

        if (this.timesTurned == 43) {
          this.emit(Event.actionResponse, `I can't believe you've done this.`)
        }

        this.timesTurned++
      }
    ))
  }
}