class Intent {
  get triggers() { return [] }

  constructor() {
  }

  isTriggeredBy(command) {
    // something simple for now
    const matches = this.triggers.filter(trigger => command.includes(trigger))

    return matches.length > 0
  }

  perform() {
  }
}

export default Intent