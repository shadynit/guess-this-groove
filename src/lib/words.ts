interface WordEntry {
  word: string;
  adult: boolean;
}

const WORD_BANK: WordEntry[] = [
  // Funny & silly
  ...(["Snoring", "Twerking", "Hiccups", "Burrito", "Selfie", "Moonwalk",
    "Pickles", "Sneeze", "Mullet", "Waddle", "Booger", "Drool",
    "Yodel", "Pajamas", "Flamingo", "Tickle", "Wedgie", "Spaghetti",
    "Potty", "Goofy", "Wobbly", "Jiggly", "Funky", "Wacky",
    "Oink", "Squawk", "Gobble", "Quack", "Moo",
    "Bubblegum", "Unicorn", "Underwear", "Mustache", "Tutu",
    "Suspenders", "Caterpillar", "Jellyfish", "Trampoline", "Carousel",
    "Marshmallow", "Popcorn", "Somersault", "Cartwheel", "Limbo",
    "Hopscotch", "Leapfrog", "Kazoo", "Tambourine", "Cowbell",
    "Bagpipes", "Ukulele", "Pirate", "Ninja", "Werewolf",
    "Sasquatch", "Bamboozle", "Shenanigans", "Hullabaloo", "Kerfuffle",
    "Razzmatazz", "Gobbledygook", "Thingamajig", "Doohickey", "Brouhaha",
    "Rigmarole", "Hodgepodge", "Slapstick", "Goofball", "Cringe",
    "Butterfingers", "Giggle", "Snicker", "Chortle",
    "Guffaw", "Cackle", "Bonkers", "Bananas", "Weirdo",
  ] as const).map(w => ({ word: w, adult: false })),

  // Animals
  ...(["Platypus", "Blobfish", "Porcupine", "Sloth", "Armadillo",
    "Chipmunk", "Walrus", "Chameleon", "Pelican", "Hedgehog",
    "Warthog", "Baboon", "Iguana", "Llama", "Narwhal",
    "Alpaca", "Pangolin", "Manatee", "Toucan", "Lemur",
    "Gecko", "Stingray", "Hyena", "Ostrich", "Seahorse",
    "Tarantula", "Poodle", "Bullfrog", "Hamster", "Dodo",
    "Cheetah", "Vulture", "Mongoose", "Piranha", "Macaw",
  ] as const).map(w => ({ word: w, adult: false })),

  // Food
  ...(["Waffle", "Meatball", "Taco", "Pretzel", "Pancake",
    "Milkshake", "Nacho", "Dumpling", "Churro", "Corndog",
    "Pudding", "Fudge", "Guacamole", "Fondue", "Biscuit",
    "Crouton", "Sardine", "Lasagna", "Cupcake", "Smoothie",
    "Noodle", "Muffin", "Kebab", "Gravy",
    "Pickle", "Salami", "Sausage", "Schnitzel",
  ] as const).map(w => ({ word: w, adult: false })),

  // Actions & movements (clean)
  ...(["Stumble", "Yawn", "Twirl", "Wiggle", "Shimmy",
    "Gallop", "Crawl", "Headbang", "Curtsy", "Pirouette",
    "Dabbing", "Breakdance", "Tiptoeing", "Sleepwalk", "Gargle",
    "Sniffle", "Belch", "Whistle", "Hiccup", "Giggling",
    "Winking", "Flexing", "Squatting",
  ] as const).map(w => ({ word: w, adult: false })),

  // Actions (adult)
  ...(["Flirting", "Grinding", "Spanking", "Stripping", "Moaning", "Thrusting",
  ] as const).map(w => ({ word: w, adult: true })),

  // Objects (clean)
  ...(["Plunger", "Boomerang", "Flyswatter", "Boombox", "Skateboard",
    "Hammock", "Pinata", "Megaphone", "Snorkel", "Scarecrow",
    "Treadmill", "Typewriter", "Telescope", "Compass", "Mannequin",
    "Lollipop", "Chainsaw", "Thermometer", "Whistle",
  ] as const).map(w => ({ word: w, adult: false })),

  // Objects (adult)
  ...(["Condom", "Vibrator", "Handcuffs", "Whip", "Dildo",
  ] as const).map(w => ({ word: w, adult: true })),

  // Body related (clean)
  ...(["Dimples", "Freckles", "Goatee", "Nostril", "Kneecap",
    "Earlobe", "Collarbone", "Elbow", "Armpit", "Bellybutton",
    "Toenail", "Moustache",
  ] as const).map(w => ({ word: w, adult: false })),

  // Body related (adult)
  ...(["Nipple", "Booty", "Cleavage", "Crotch",
    "Boner", "Bulge", "Hickey",
  ] as const).map(w => ({ word: w, adult: true })),

  // Adult & cheeky 🔥
  ...(["Orgasm", "Foreplay", "Kinky", "Naughty", "Quickie",
    "Bondage", "Dominatrix", "Cougar", "MILF", "Stripper",
    "Escort", "Playboy", "Hooters", "Boobies", "Horny",
    "Seductive", "Aroused", "Threesome", "Fetish", "Tease",
    "Spank", "Lingerie", "Thong", "Corset", "Stilettos",
    "Striptease", "Lapdance", "Commando", "Peeping",
    "Flashing", "Groping", "Snogging",
  ] as const).map(w => ({ word: w, adult: true })),

  // Funny situations (clean)
  ...(["Photobomb", "Ghosting", "Catfishing", "Clickbait", "Facepalm",
    "Deadpan", "Buzzkill", "FOMO", "Hangover",
    "Mansplaining", "Manspreading", "Eavesdropping",
    "Sleeptalking", "Drooling", "Farting",
  ] as const).map(w => ({ word: w, adult: false })),

  // Funny situations (adult)
  ...(["Streaking", "Queefing",
  ] as const).map(w => ({ word: w, adult: true })),

  // Sounds
  ...(["Rumble", "Sizzle", "Splat", "Thud", "Whoosh",
    "Zing", "Clang", "Bonk", "Boing", "Crunch",
  ] as const).map(w => ({ word: w, adult: false })),

  // Characters & types (clean)
  ...(["Mime", "Juggler", "Magician", "Clown", "Acrobat",
    "Cowboy", "Gladiator", "Viking", "Caveman", "Astronaut",
    "Lumberjack", "Ventriloquist",
  ] as const).map(w => ({ word: w, adult: false })),

  // Characters (adult)
  ...(["Gigolo", "Playmate", "Hunk",
  ] as const).map(w => ({ word: w, adult: true })),

  // Clothing (clean)
  ...(["Onesie", "Crocs", "Sombrero", "Monocle", "Cape",
    "Speedo", "Beanie", "Overalls", "Beret",
  ] as const).map(w => ({ word: w, adult: false })),

  // Clothing (adult)
  ...(["Mankini", "G-string", "Bikini", "Boxers", "Fishnet",
  ] as const).map(w => ({ word: w, adult: true })),

  // Exclamations & slang (clean)
  ...(["Bazinga", "Geronimo", "Eureka", "Abracadabra", "Shazam",
    "Cowabunga", "Yikes", "Oopsie", "Knackered", "Cheeky",
    "Dodgy",
  ] as const).map(w => ({ word: w, adult: false })),

  // Exclamations (adult)
  ...(["Dammit", "Bollocks", "Bloody", "Wanker", "Tosser",
    "Snog", "Shag", "Randy",
  ] as const).map(w => ({ word: w, adult: true })),

  // Random hilarious (clean)
  ...(["Nincompoop", "Dingbat", "Knucklehead", "Numbskull", "Birdbrain",
    "Scatterbrain", "Blockhead", "Meathead", "Lollygag",
    "Hocus-pocus", "Roly-poly",
    "Tiddlywinks", "Cockamamie", "Balderdash", "Poppycock", "Malarkey",
    "Flimflam", "Hoopla", "Ruckus", "Tomfoolery", "Buffoonery",
    "Canoodle", "Schmooze", "Snazzy", "Swanky", "Saucy",
    "Smooching", "Noogie", "Nuggets",
    "Dumbbell", "Wobbliest", "Squishiest", "Wobbly",
  ] as const).map(w => ({ word: w, adult: false })),

  // Random (adult)
  ...(["Dingleberry", "Bootylicious", "Gooch", "Tiddies",
    "Dongle", "Knob", "Jugs", "Melons", "Rump",
    "Pecker", "Weenie", "Schlong", "Dangly", "Wiener",
    "Burp",
  ] as const).map(w => ({ word: w, adult: true })),
];

let usedIndices = new Set<number>();

export function getRandomWord(allowAdult: boolean = true): string {
  const eligible = WORD_BANK
    .map((entry, index) => ({ ...entry, index }))
    .filter(e => allowAdult || !e.adult)
    .filter(e => !usedIndices.has(e.index));

  if (eligible.length === 0) {
    usedIndices = new Set<number>();
    return getRandomWord(allowAdult);
  }

  const pick = eligible[Math.floor(Math.random() * eligible.length)];
  usedIndices.add(pick.index);
  return pick.word;
}

export function resetWords() {
  usedIndices = new Set<number>();
}
