import { Container } from './interfaces/icontainer'
import GameObject from './game_object'

import { use } from "typescript-mix";

export default class Inventory extends GameObject {
  [x: string]: any;
  @use( Container ) this: any

  items = []

  constructor() {
    super()

    this.items = []
  }
}
