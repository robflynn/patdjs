export default class EventManager {
  private _listeners: any

  constructor() {
    this._listeners = {}
  }

  on(event: string, callback: Function) {
    if (!this._listeners[event]) {
      this._listeners[event] = [callback]
    } else {
      this._listeners[event].push(callback)
    }
  }

  emit(event: string, data: Object) {
    if (this._listeners[event] && this._listeners[event].length > 0) {
      this._listeners[event].forEach((callback: Function) => callback(data))
    }
  }
}