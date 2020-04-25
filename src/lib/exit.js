class Exit {
  directionAliases = {
    north: ['n', 'no'],
    south: ['s', 'so'],
    west: ['w'],
    east: ['e'],
    northwest: ['nw'],
    northeast: ['ne'],
    southwest: ['sw'],
    southeast: ['se'],
    up: ['u'],
    down: ['d'],
  }

  get triggers() {
    return [this.direction, ...this.directionAliases[this.direction]]
  }

  constructor(direction, roomId) {
    this.direction = direction
    this.roomId = roomId
  }
}

export default Exit