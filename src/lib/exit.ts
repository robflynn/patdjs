const directionAliases = {
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

type Direction = string

class Exit {
  direction: Direction
  roomId: string

  get triggers() {
    return [this.direction, ...directionAliases[this.direction]]
  }

  constructor(direction: Direction, roomId: string) {
    this.direction = direction
    this.roomId = roomId
  }
}

export default Exit