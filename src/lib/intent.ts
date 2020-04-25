class Intent {
  get triggers() { return this._triggers }
  set triggers(triggers) { this._triggers = triggers }

  set action(value) { this._action = value }

  static createIntent(triggers, action) {
    let intent = new Intent()
    intent.triggers = triggers
    intent.action = action

    return intent
  }

  constructor() {
    this._triggers = []
    this._action = null
  }

  isTriggeredBy(command) {
    // something simple for now
    const matches = this.triggers.filter(trigger => command.includes(trigger))

    return matches.length > 0
  }

  perform() {
    if (this._action) {
      this._action()
    }
  }
}

export default Intent