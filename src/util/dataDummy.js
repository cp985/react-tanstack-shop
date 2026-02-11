export const DUMMY_ITEMS = [
  {
    id: "armor_01",
    name: "Corazza del Guardiano Eterno",
    type: "Armatura",
    slot: "Torso",
    rarity: "Epic",
    levelRequired: 15,
    weight: 18.5,
    value: 1200,
    image: "https://picsum.photos/200",
    description:
      "Forgiata nel cuore di una stella morente, questa corazza emana un calore costante che protegge chi la indossa dai venti gelidi del Nord.",
    stats: {
      defense: 45,
      strength: 5,
      magicResist: 20,
      durability: 100,
    },
    effects: ["Immunità al congelamento", "Rigenerazione salute +2/sec"],
  },
  {
    id: "helm_02",
    name: "Elmo del Predatore d'Ombra",
    type: "Elmo",
    slot: "Testa",
    rarity: "Rare",
    levelRequired: 10,
    weight: 4.2,
    value: 450,
    image: "https://picsum.photos/200",
    description:
      "Le fessure per gli occhi brillano di una luce violetta quando un nemico è nelle vicinanze. Apparteneva a una gilda di assassini ormai dimenticata.",
    stats: {
      defense: 12,
      criticalChance: 0.05,
      stealth: 15,
      durability: 80,
    },
    effects: ["Visione notturna migliorata", "Danni da colpo critico +10%"],
  },
  {
    id: "shield_03",
    name: "Scudo del Baluardo Solare",
    type: "Scudo",
    slot: "Mano Secondaria",
    rarity: "Legendary",
    levelRequired: 25,
    weight: 25.0,
    value: 3500,
    image: "https://picsum.photos/200",
    description:
      "Si dice che questo scudo rifletta non solo la luce, ma anche le intenzioni malvagie dei nemici. È la prova del valore dei paladini del Sole.",
    stats: {
      defense: 80,
      blockChance: 0.25,
      fireResistance: 50,
      durability: 500,
    },
    effects: [
      "Riflette il 10% dei danni fisici",
      "Luce sacra: acceca i non-morti al blocco",
    ],
  },
  {
    id: "gauntlets_04",
    name: "Guanti in Pelle di Drago",
    type: "Guanti",
    slot: "Mani",
    rarity: "Common",
    levelRequired: 5,
    weight: 1.5,
    value: 80,
    image: "https://picsum.photos/200",
    description:
      "Semplici guanti rinforzati con scaglie di drago minore. Offrono un'ottima presa e protezione contro le abrasioni.",
    stats: {
      defense: 8,
      dexterity: 3,
      attackSpeed: 0.05,
      durability: 60,
    },
    effects: [],
  },
  {
    id: "boots_05",
    name: "Stivali del Viaggiatore Rapido",
    type: "Stivali",
    slot: "Piedi",
    rarity: "Rare",
    levelRequired: 8,
    weight: 2.0,
    value: 320,
    image: "https://picsum.photos/200",
    description:
      "Incantati con piume di grifone, questi stivali rendono il passo leggero come il vento, riducendo la fatica durante le lunghe marce.",
    stats: {
      defense: 10,
      movementSpeed: 1.15,
      stamina: 20,
      durability: 120,
    },
    effects: [
      "Riduzione consumo stamina nella corsa del 15%",
      "Caduta rallentata",
    ],
  },
];

export const DUMMY_USERS = [
  {
    username: "admin",
    email: "admin@admin.it",
    password: "admin",
    id: "123456789A",
  },
  {
    username: "user",
    email: "user@user.it",
    password: "user",
    id: "987654321B",
  },
];
