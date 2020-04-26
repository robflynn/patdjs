import { v4 as uuidv4 } from 'uuid';

const Event = require('./events')

import Intent from "./intent"
import Identifier from "./identifier"
import Patd from './patd'

export default class GameObject {
  id: Identifier

  protected _intents: Array<Intent>

  get activeIntents(): Array<Intent> {
    return this._intents
  }

  constructor() {
    this.id = uuidv4()
    this._intents = []
  }

  registerIntent(intent: Intent) {
    this._intents.push(intent)
  }

  emit(event: Event, data: any) {
    Patd.shared().eventManager.emit(event, data)
  }
}