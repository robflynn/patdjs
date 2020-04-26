import Intent from "../intent"
import IContainer from '../interfaces/icontainer'
import Item from '../item'

export default class OpenContainerIntent extends Intent {
  private container: IContainer

  get triggers(): string[] {
    const actions = [
      'open'
    ]

    actions.forEach((action: string) => {
      if (this.container.name) {
        console.log('it had a name?')
      }
    })

    return []
  }

  constructor(container: IContainer) {
    super()

    this.container = container
  }

  perform() {

  }
}