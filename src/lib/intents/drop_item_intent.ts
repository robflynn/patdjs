const Event = require('../events')

import Intent from '../intent'
import Item from '../item'
import Patd from '../patd'
import Room from '../room'

export default class DropItemIntent extends Intent {
  get verbs(): string[] {
    return [
      'drop',
      'discard',
      'place',
      'put'
    ]
  }

  get prepositions(): string[] {
    return [
      'in',
      'on',
      'under',
      'above',
      'inside',
      'through'
    ]
  }

  perform(item?: Item, preposition?: string, target?: Item | Room) {
    // User needs to drop something...
    if (!item) {
      return this.emit(Event.actionResponse, "Drop what?")
    }

    // And they have to have it in with them
    if (!Patd.shared().inventory.containsItem(item)) {
      return this.emit(Event.actionResponse, "You're not carrying that.")
    }

    // The target target was null
    if (target == null) {
      // so i threw it on the ground
      target = Patd.shared().currentRoom
    }

    // TODO: Should I sett up some kind of item broker?
    // Something to handle trades between two objects? This is something
    // that will happen often, whether it be a player getting something from
    // a room or another object, or an npc... or a user trying to drop something
    // somewhere.  Within these actions there are many reasons part or all of the
    // action could fail. Exanmple: put apple in safe.   if the safe is locked then
    // you can't add the item.  I don't believe a get item intent should need to know
    // about the concept of openables or lockables.
    //
    // The broker would have to know about some item internals (the traits), but item
    // is a core class and part of the same engine so no biggie... could just do this in
    // the item but that seems unneccessary and wrong. I think if I did that items
    // would need to know more details about containers and that's no good either.
    //
    // let { error } = Patd.shared().broker(item, Patd.shared().inventory, target)
    //
    Patd.shared().inventory.removeItem(item)
    target.addItem(item)

    this.emit(Event.playerDroppedItem, item)
    this.emit(Event.actionResponse, `You drop ${item.nameWithArticle}`)
  }
}