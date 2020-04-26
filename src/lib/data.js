module.exports = {
  "rooms": [
    {
        "id": "wohouse",
        "name": "West of House",
        "description": "This is an open field west of a white house, with a boarded front door.",
        "items": [
            {
                "name": "mailbox",
                "description": "a small, red, wooden mailbox",
                "environmental": "There is a small mailbox here.",
                "aliases": ['small mailbox'],
            }
        ],
        "exits": [
            { "direction": "north", "room_id": "nohouse" },
            { "direction": "south", "room_id": "sohouse" }
        ],
    },
    {
        "id": "nohouse",
        "name": "North of House",
        "description": "You are facing the north side of a white house.  There is no door here, and all the windows are barred.",
        "items": [
            {
                "name": "house",
                "description": "The house is a beautiful colonial house which is painted white.  It is clear that the owners must have been extremely wealthy."
            }
        ],
        "exits": [
            { "direction": "west", "room_id": "wohouse" },
            { "direction": "north", "room_id": "nforest1" }
        ]

    },
    {
        "id": "nforest1",
        "name": "Forest",
        "description": "This is a dimly lit forest, with large trees all around.  One particularly large tree with some low branches stands here.",
        "exits": [
            { "direction": "south", "room_id": "nohouse" },
        ],
        "escapes": [
            {
                "commands": ["climb the tree", "climb the large tree", "shimmy up the tree", "climb tree"],
                "room_id": "upatree1"
            }
        ],
        "items": [
            {
                "name": "large tree",
                "observers": [
                    {
                        "intent": "examine",
                        "action": "message",
                        "message": "You hear in the distance the chirping of a song bird."
                    }
                ]
            }
        ]

    },
    {
        "id": "upatree1",
        "name": "Up a Tree",
        "description": "You are about 10 feet above the ground nestled among some large branches.  The nearest branch above you is above your reach.",
        "items": [
            {
                "name": "nest",
                "traits": ["gettable", "container", "defers"],
                "environmentalText": "On the branch is a small birds nest.",
                "items": [
                    {
                        "name": "egg",
                        "description": "I see nothing special about the jewel-encrusted egg.",
                        "environmentalText": "In the bird's nest is a large egg encrusted with precious jewels, apparently scavenged somewhere by a childless songbird.  The egg is covered with fine gold inlay, and ornamented in lapis lazuli and mother-of-pearl.  Unlike most eggs, this one is hinged and has a delicate looking clasp holding it closed.  The egg appears extremely fragile.",
                        "traits": ["gettable"]
                    }
                ]
            }
        ],
        "exits": [
            {
                "direction": "down",
                "room_id": "nforest1"
            }
        ]
    },
    {
        "id": "sohouse",
        "name": "South of House",
        "description": "You are facing the south side of a white house.  There is no door here, and all the windows are barred.",
        "items": [
            {
                "name": "house",
                "description": "The house is a beautiful colonial house which is painted white.  It is clear that the owners must have been extremely wealthy."
            }
        ],
        "exits": [
            { "direction": "north", "room_id": "nohouse" },
            { "direction": "east", "room_id": "behindhouse" }
        ]
    },
    {
        "id": "behindhouse",
        "name": "Behind House",
        "description": "You are behind the white house.  In one corner of the house there is a small window which is slightly ajar.",
        "escapes": [
            {
                "commands": ["enter window", "climb through window", "go through window"],
                "room_id": "upatree1"
            }
        ],
        "items": [
            {
                "name": "house",
                "description": "The house is a beautiful colonial house which is painted white.  It is clear that the owners must have been extremely wealthy."
            },
            {
                "id": "behindhouse--window",
                "name": "window",
                "traits": ["openable"]
            }
        ]
    }
]
}