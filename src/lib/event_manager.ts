import PubSub from './pubsub'

export default class EventManager {
  constructor() {
    this.__pubsub = new PubSub()
  }

  on(event, callback) {
    this.__pubsub.subscribe(event, callback)
  }

  off(event, callback) {
    this.__pubsub.unsubscribe(event, callback)
  }

  emit(event, data) {
    this.__pubsub.publish(event, data)
  }
}