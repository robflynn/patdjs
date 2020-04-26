import Item from '../item'

export const Container: IContainer = {
  items: [],

  isContainer(): boolean {
    return true
  },

  addItem(item: Item): void {
    this.items.push(item)

    item.parentContainer = this
  },

  removeItem(item: Item): Item | null {
    let index = this.items.indexOf(item)

    if (index < 0) { return null }

    this.items.splice(index, 1)

    return item
  },

  containsItem(item: Item): boolean {
    let index = this.items.indexOf(item)

    return index > -1
  }
}

export default interface IContainer {
  items: Array<Item>

  isContainer(): boolean
  addItem(item: Item): void
  removeItem(item: Item): Item | null
  containsItem(item: Item): boolean
}
