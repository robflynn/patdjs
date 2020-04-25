module.exports = {
  rooms: [
    {
      id: 1,
      name: "Your Room",
      description: "Dirty.\nJean.\nShorts.",
      exits: [{
        id: 3,
        name: "go",
        room_id: 2
      }]
    },
    {
      id: 2,
      name: "Another Room",
      description: "This room is different from the other room."
    }
  ]
}