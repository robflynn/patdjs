import GameObject from './game_object'

export enum Direction {
  North = "north",
  South = "south",
  East = "east",
  West = "west",
  NorthWest = "northwest",
  NorthEast = "northeast",
  SouthWest = "southwest",
  SouthEast = "southbeast",
  Up = "up",
  Down = "down",
}

export default class Exit extends GameObject {
  direction: Direction
  roomId: string

  get triggers() {
    return [this.direction, ...this.directionAliases()]
  }

  constructor(direction: Direction, roomId: string) {
    super()

    this.direction = direction
    this.roomId = roomId
  }

  private directionAliases(): Array<string> {
    switch(this.direction) {
      case Direction.North:
        return ['n']
      case Direction.South:
        return ['s']
      case Direction.East:
        return ['e']
      case Direction.West:
        return ['w']
      case Direction.NorthEast:
        return ['ne']
      case Direction.NorthWest:
        return ['nw']
      case Direction.SouthEast:
        return ['se']
      case Direction.SouthWest:
        return ['sw']
      case Direction.Up:
        return ['u']
      case Direction.Down:
        return ['d']
      default:
        return []
    }
  }
}

