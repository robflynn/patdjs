import Patd from './patd'
import GameObject from './game_object'
import Item from './item'

export default class Intent extends GameObject {
  get verbs(): string[] { return this._verbs }
  get prepositions(): string[] { return this._prepositions }

  private _verbs: string[] = []
  private _prepositions: string[] = []
  private _perform?: Function

  constructor(verbs?: string[], prepositions?: string[], perform?: Function) {
    super()

    if (verbs) { this._verbs = verbs }
    if (prepositions) { this._prepositions = prepositions }
    if (perform) { this._perform = perform }
  }

  perform(item?: Item, preposition?: string, target?: Item) {
    if (this._perform) {
      this._perform(item, preposition, target)
    }
  }

  static createIntent(verbs: string[], prepositions: string[], perform: Function): Intent {
    return new Intent(verbs, prepositions, perform)
  }
}
