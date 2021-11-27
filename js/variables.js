const dataObject = {
    "speckCoin": {
        "name": "SpeckCoin",
        "owned": 100,
        "unlocked": true,
        "costFactor": 1.1,
        "buildings": {
            "tier1": {
                "name": "Flyspeck Clone",
                "cost": 100,
                "owned": 0,
                "produced": 0,
                "baseRate": 10,
                "multiplier": 1,
                "unlocked": true
            },
            "tier2": {
                "name": "Cloner",
                "cost": 2000,
                "owned": 0,
                "produced": 0,
                "baseRate": 1,
                "multiplier": 1,
                "unlocked": false
            },
            "tier3": {
                "name": "Printer",
                "cost": 40000,
                "owned": 0,
                "produced": 0,
                "baseRate": 1,
                "multiplier": 1,
                "unlocked": false
            },
            "tier4": {
                "name": "Factory",
                "cost": 800000,
                "owned": 0,
                "produced": 0,
                "baseRate": 1,
                "multiplier": 1,
                "unlocked": false
            },
            "tier5": {
                "name": "Industry",
                "cost": 16000000,
                "owned": 0,
                "produced": 0,
                "baseRate": 1,
                "multiplier": 1,
                "unlocked": false
            }
        }
    },

    "diamond": {
        "name": "Diamond",
        "owned": 0,
        "unlocked": false,
        "costFactor": 2,
        "buildings": {
            "tier1": {
                "name": "Diamond Processor",
                "cost": 1,
                "owned": 0,
                "produced": 0,
                "baseRate": 1,
                "multiplier": 1,
                "unlocked": false
            },
            "tier2": {
                "name": "Building 2",
                "cost": 10,
                "owned": 0,
                "produced": 0,
                "baseRate": 10,
                "multiplier": 1,
                "unlocked": false
            },
            "tier3": {
                "name": "Building 3",
                "cost": 100,
                "owned": 0,
                "produced": 0,
                "baseRate": 100,
                "multiplier": 1,
                "unlocked": false
            },
            "tier4": {
                "name": "Building 4",
                "cost": 1000,
                "owned": 0,
                "produced": 0,
                "baseRate": 1000,
                "multiplier": 1,
                "unlocked": false
            },
            "tier5": {
                "name": "Building 5",
                "cost": 10000,
                "owned": 0,
                "produced": 0,
                "baseRate": 10000,
                "multiplier": 1,
                "unlocked": false
            }
        }
    },

    "resets": {
        "diamond": {
            "name": "Prestige",
            "cost": 1e16,
            "scale": 1.1,
            "unlocked": false
        }
    },

    "products": {
        "deltamine": {
            "name": "Deltamine",
            "owned": 0
        }
    },

    "resources": [
        "speckCoin",
        "diamond"
    ]
};
let $_$ = JSON.parse(JSON.stringify(dataObject));

let lore = [
    "They took away everything.",
    "Our work, our homes, our lives.",
    "They made themselves feared, by all.",
    "They ruled with the tyranny of a thousand dictators.",
    "They made chaos.",
    "It's time for you to stop them.",
    "It may seem irrelevant, but you must make SpeckCoins.",
    "You will understand soon."
]
let loreIndex = 0;

loadGameTo();
