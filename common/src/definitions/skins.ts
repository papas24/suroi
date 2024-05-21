import { ItemType, ObjectDefinitions, type ItemDefinition } from "../utils/objectDefinitions";

export interface SkinDefinition extends ItemDefinition {
    readonly itemType: ItemType.Skin
    readonly hideFromLoadout: boolean
    readonly grassTint: boolean
    readonly hideEquipment: boolean
    readonly isDisguise: boolean
    readonly material: string
    readonly obstacle: string
    readonly obstacleSprite: string
    readonly explodes: boolean
    readonly roleRequired?: string
}

export const Skins = ObjectDefinitions.create<SkinDefinition>()(
    defaultTemplate => ({
        [defaultTemplate]: () => ({
            itemType: ItemType.Skin,
            noDrop: false,
            hideFromLoadout: false,
            grassTint: false,
            hideEquipment: false,
            isDisguise: false,
            material: undefined,
            obstacle: undefined,
            obstacleSprite: undefined,
            explodes: false
        }),
        skin_factory: (name: string) => ({
            idString: name.toLowerCase().replace(/'/g, "").replace(/ /g, "_"),
            name
        }),
        hidden_skin: {
            extends: "skin_factory",
            applier: () => ({
                hideFromLoadout: true
            })
        },
        with_role: {
            extends: "skin_factory",
            applier: (role: string) => ({
                roleRequired: role
            })
        },
        disguise: {
            extends: "skin_factory",
            applier: (obstacle: string, material: string, explodes = false) => ({
                explodes: explodes,
                // In case of an obstacle with variations, replace the sliced part with nothing 
                obstacle: ["rock", "oak_tree", "box"].includes(obstacle.replace(obstacle.slice(obstacle.length - 2), "")) ? obstacle.replace(obstacle.slice(obstacle.length - 2), "") : obstacle,
                obstacleSprite: obstacle,
                material: material,
                isDisguise: true,
                hideFromLoadout: true,
                hideEquipment: true,
            })
        }
    })
)(
    ({ apply, simple }) => [
        simple("with_role", ["hasanger"], ["Hasanger"]),
        simple("with_role", ["leia"], ["Leia"]),
        simple("with_role", ["limenade"], ["LimeNade"]),
        simple("with_role", ["katie"], ["Katie"]),
        simple("with_role", ["eipi"], ["eipi"]),
        simple("with_role", ["error"], ["error"]),
        simple("with_role", ["123op"], ["123OP"]),
        simple("with_role", ["radians"], ["Radians"]),
        simple("with_role", ["developr"], ["Developr Swag"]),
        simple("with_role", ["designr"], ["Designr Swag"]),
        simple("with_role", ["composr"], ["Composr Swag"]),

        // Halloween Disguises
        simple("disguise", ["regular_crate", "crate"], ["Guy in a Box"]),
        simple("disguise", ["flint_crate", "crate"], ["Orange Boxman"]),
        simple("disguise", ["aegis_crate", "crate"], ["Blue Boxman"]),
        simple("disguise", ["grenade_crate", "crate"], ["Boombox"]),
        simple("disguise", ["flint_stone", "stone"], ["FLINT STONES"]),
        simple("disguise", ["barrel", "metal", true], ["Fish in a Barrel"]),
        simple("disguise", ["fridge", "appliance"], ["Indistructible"]),
        simple("disguise", ["pine_tree", "tree"], ["The Lorax"]),
        simple("disguise", ["rock_1", "stone"], ["Rock Solid"]),
        simple("disguise", ["gold_rock", "stone"], ["Gold Solid"]),
        simple("disguise", ["toilet", "porcelain"], ["Smelly"]),
        simple("disguise", ["washing_machine", "appliance"], ["C-Cleaner"]),
        simple("disguise", ["large_refinery_barrel", "metal", true], ["Large Suicide Bomber"]),
        simple("disguise", ["stove", "metal", true], ["One With Cooking"]),
        simple("disguise", ["dead_tree_big", "tree"], ["Spooky Barkskin"]),
        simple("disguise", ["airdrop_crate", "crate"], ["Hot Drop"]),
        simple("disguise", ["bush", "bush"], ["Bush Wookie"]),
        simple("disguise", ["blueberry_bush", "bush"], ["Blueberry Bush Wookie"]),
        simple("disguise", ["pumpkin", "pumpkin"], ["Pumpkin Head"]),
        simple("disguise", ["tear_gas_crate", "crate", true], ["Tear Gas-r"]),
        simple("disguise", ["super_barrel", "metal", true], ["Goldfish in a Barrel"]),
        simple("disguise", ["table", "wood"], ["Simple Wood"]),
        simple("disguise", ["rock_6", "stone"], ["Mossy"]),
        simple("disguise", ["rock_7", "stone"], ["Cracked at Suroi"]),
        simple("disguise", ["oak_tree_3", "tree"], ["Red Leaf"]),
        simple("disguise", ["oak_tree_2", "tree"], ["Orange Leaf"]),
        simple("disguise", ["ammo_crate", "cardboard"], ["Guy in Ammunition"]),
       // simple("disguise", ["box_1", "cardboard"], ["Guy In Size 0"]),
       // simple("disguise", ["box_2", "cardboard"], ["Guy In Size 2"]),
       // simple("disguise", ["box_3", "cardboard"], ["Guy In Size 4"]),

        ...[
            "HAZEL Jumpsuit",
            "The Amateur",
            "The Pro",
            "Forest Camo",
            "Desert Camo",
            "Arctic Camo",
            "Bloodlust",
            "Tomato",
            "Greenhorn",
            "Blue Blood",
            "Silver Lining",
            "Pot o' Gold",
            "Gunmetal",
            "Algae",
            "Twilight Zone",
            "Bubblegum",
            "Sunrise",
            "Sunset",
            "Stratosphere",
            "Mango",
            "Snow Cone",
            "Aquatic",
            "Floral",
            "Sunny",
            "Volcanic",
            "Ashfall",
            "Solar Flare",
            "Beacon",
            "Wave Jumpsuit",
            "Toadstool",
            "Full Moon",
            "Swiss Cheese",
            "Target Practice",
            "Zebra",
            "Tiger",
            "Bee",
            "Armadillo",
            "Printer",
            "Distant Shores"
        ].map(name => simple("skin_factory", name)),
        ...[
            "Lemon",
            "Flamingo",
            "Peachy Breeze",
            "Deep Sea",
            "Basic Outfit",
            "Peppermint",
            "Spearmint",
            "Coal",
            "Henry's Little Helper",
            "Candy Cane",
            "Christmas Tree",
            "Gingerbread",
            "Verified",
            "no kil pls",
            "Stardust",
            "Aurora",
            "Nebula"
        ].map(name => simple("hidden_skin", [], [name])),
        apply(
            "hidden_skin",
            {
                grassTint: true,
                hideEquipment: true
            },
            [],
            ["Ghillie Suit"]
        )
    ]
);
