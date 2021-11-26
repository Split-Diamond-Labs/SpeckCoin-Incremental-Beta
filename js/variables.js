const dataObject = {
    "coins": 100,
    "coinBuildings": {
        "costFactor": 1.1,

        "tier1": {
            "owned": 0,
            "produced": 0,
            "cost": 100,
            "multiplier": 1,
            "onget": `
            $_$["coins"] -= $_$["coinBuildings"]["tier1"]["cost"];
            $_$["coins"] -= $_$["coinBuildings"]["tier1"]["cost"] *= $_$["coinBuildings"]["costFactor"];
            $_$["coinBuildings"]["tier1"][produced ? "produced" : "owned"]++;`
        },

        "tier2": {
            "owned": 0,
            "produced": 0,
            "cost": 2000,
            "multiplier": 1,
            "onget": `
            $_$["coins"] -= $_$["coinBuildings"]["tier2"]["cost"];
            $_$["coins"] -= $_$["coinBuildings"]["tier2"]["cost"] *= $_$["coinBuildings"]["costFactor"];
            $_$["coinBuildings"]["tier2"][produced ? "produced" : "owned"]++;`
        },

        "tier3": {
            "owned": 0,
            "produced": 0,
            "cost": 40000,
            "multiplier": 1,
            "onget": `
            $_$["coins"] -= $_$["coinBuildings"]["tier3"]["cost"];
            $_$["coins"] -= $_$["coinBuildings"]["tier3"]["cost"] *= $_$["coinBuildings"]["costFactor"];
            $_$["coinBuildings"]["tier3"][produced ? "produced" : "owned"]++;`
        },

        "tier4": {
            "owned": 0,
            "produced": 0,
            "cost": 800000,
            "multiplier": 1,
            "onget": `
            $_$["coins"] -= $_$["coinBuildings"]["tier4"]["cost"];
            $_$["coins"] -= $_$["coinBuildings"]["tier4"]["cost"] *= $_$["coinBuildings"]["costFactor"];
            $_$["coinBuildings"]["tier4"][produced ? "produced" : "owned"]++;`
        },

        "tier5": {
            "owned": 0,
            "produced": 0,
            "cost": 16000000,
            "multiplier": 1,
            "onget": `
            $_$["coins"] -= $_$["coinBuildings"]["tier5"]["cost"];
            $_$["coins"] -= $_$["coinBuildings"]["tier5"]["cost"] *= $_$["coinBuildings"]["costFactor"];
            $_$["coinBuildings"]["tier5"][produced ? "produced" : "owned"]++;`
        }
    },

    "diamonds": 0,
    "diamondBuildings": {
        "costFactor": 1.5,

        "tier1": {
            "owned": 0,
            "produced": 0,
            "cost": 1,
            "multiplier": 1
        },

        "tier2": {
            "owned": 0,
            "produced": 0,
            "cost": 10,
            "multiplier": 1
        },

        "tier3": {
            "owned": 0,
            "produced": 0,
            "cost": 100,
            "multiplier": 1
        },

        "tier4": {
            "owned": 0,
            "produced": 0,
            "cost": 1000,
            "multiplier": 1
        },

        "tier5": {
            "owned": 0,
            "produced": 0,
            "cost": 10000,
            "multiplier": 1
        }
    }
};
let $_$ = dataObject;

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