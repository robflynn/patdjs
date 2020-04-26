type TriggerList = Array<string>

class Intent {
  private _action: Function | null
  private _triggers: Array<string>

  get triggers() { return this._triggers }
  set triggers(triggers) { this._triggers = triggers }

  set action(value: Function) { this._action = value }

  static createIntent(triggers: TriggerList, action: Function) {
    let intent = new Intent()
    intent.triggers = triggers
    intent.action = action

    return intent
  }

  constructor() {
    this._triggers = []
    this._action = null
  }

  isTriggeredBy(command: string) {
    // something simple for now
    const matches = this.triggers.filter(trigger => command == trigger)

    return matches.length > 0
  }

  perform() {
    if (this._action) {
      this._action()
    }
  }
}

export default Intent