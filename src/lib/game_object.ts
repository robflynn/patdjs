import { v4 as uuidv4 } from 'uuid';

import Intent from "./intent"
import Identifier from "./identifier"

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
}