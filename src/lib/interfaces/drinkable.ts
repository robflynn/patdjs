export default interface IDrinkable {
  drink(): void
}

export const Drinkable: IDrinkable = {
  drink() {
    return false
  }
}
