
export default class Patd {
  constructor() {
    this.scenes = this.buildScenes()
  }

  buildScenes() {
    return [
      {
        id: 1,
        name: "Your Bedroom",
        description: "Messy.\nJean.\nShorts.",
      }
    ]
  }
}
