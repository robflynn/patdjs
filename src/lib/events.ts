enum PatdEvent {
  inputReceived = "PLAYER_INPUT_RECEIVED",
  playerEnteredRoom = "PLAYER_ENTERED_ROOM",
  playerExitedRoom = "PLAYER_EXITED_ROOM",
  actionResponse = "ACTION_RESPONSE",
  playerPickedUpItem = "PLAYER_PICKED_UP_ITEM",
  playerDroppedItem = "PLAYER_DROPPED_ITEM",
  playerOpenedItem = "PLAYER_OPENED_ITEM",
}

module.exports = PatdEvent