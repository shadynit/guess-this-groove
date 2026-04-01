import { WordCategory } from "./gameTypes";

interface WordEntry {
  word: string;
  adult: boolean;
  category: WordCategory;
}

const WORD_BANK: WordEntry[] = [
  // ===== EASY WORDS (70%) =====
  
  // Funny & silly (easy)
  ...(["Snoring", "Hiccups", "Selfie", "Pickles", "Sneeze", "Drool",
    "Pajamas", "Tickle", "Popcorn", "Bubble", "Giggle", "Clumsy",
    "Silly", "Goofy", "Wobbly", "Jiggly", "Funky", "Wacky",
    "Oink", "Quack", "Moo", "Burp", "Yawn", "Blink",
    "Grin", "Smile", "Laugh", "Dizzy", "Fuzzy", "Fluffy",
    "Squishy", "Bouncy", "Wiggly", "Zappy", "Loopy", "Nutty",
    "Dorky", "Nerdy", "Clunky", "Cranky", "Grumpy", "Jumpy",
    "Perky", "Quirky", "Snappy", "Zippy", "Cheesy", "Corny",
    "Giggly", "Bonkers", "Weirdo", "Doodle", "Booboo", "Tummy",
    "Noodle", "Waddle", "Fumble", "Mumble", "Stumble", "Tumble",
  ] as const).map(w => ({ word: w, adult: false, category: "funny" as WordCategory })),

  // Animals (easy)
  ...(["Puppy", "Kitten", "Bunny", "Monkey", "Parrot", "Penguin",
    "Dolphin", "Turtle", "Chicken", "Duck", "Frog", "Bear",
    "Tiger", "Lion", "Elephant", "Giraffe", "Zebra", "Horse",
    "Pig", "Cow", "Sheep", "Goat", "Mouse", "Rabbit",
    "Snake", "Fish", "Bird", "Owl", "Eagle", "Shark",
    "Whale", "Crab", "Snail", "Ant", "Bee", "Spider",
    "Panda", "Koala", "Hippo", "Donkey", "Camel", "Fox",
    "Wolf", "Deer", "Squirrel", "Otter", "Seal", "Bat",
    "Lizard", "Goldfish", "Pigeon", "Crow", "Hawk", "Goose",
    "Swan", "Moose", "Skunk", "Raccoon", "Beaver", "Pony",
    "Hamster", "Peacock", "Flamingo", "Lobster", "Jellyfish", "Starfish",
    "Rooster", "Lamb", "Chick", "Catfish", "Toad", "Poodle",
  ] as const).map(w => ({ word: w, adult: false, category: "animals" as WordCategory })),

  // Food (easy)
  ...(["Pizza", "Burger", "Taco", "Cake", "Cookie", "Candy",
    "Cheese", "Bread", "Rice", "Pasta", "Soup", "Salad",
    "Apple", "Banana", "Grape", "Mango", "Lemon", "Cherry",
    "Donut", "Waffle", "Pancake", "Toast", "Butter", "Honey",
    "Sugar", "Pepper", "Ketchup", "Mustard", "Pickle", "Olive",
    "Carrot", "Potato", "Tomato", "Onion", "Garlic", "Corn",
    "Pretzel", "Muffin", "Brownie", "Pudding", "Fudge", "Bacon",
    "Steak", "Shrimp", "Lobster", "Nugget", "Fries", "Gravy",
    "Yogurt", "Cereal", "Oatmeal", "Bagel", "Cracker", "Chips",
    "Cupcake", "Popsicle", "Sandwich", "Hotdog", "Sausage", "Noodles",
    "Milkshake", "Jellybean", "Gummy", "Caramel", "Toffee", "Coconut",
  ] as const).map(w => ({ word: w, adult: false, category: "food" as WordCategory })),

  // Actions (easy)
  ...(["Jump", "Dance", "Sing", "Clap", "Wave", "Kick",
    "Punch", "Spin", "Crawl", "Climb", "Swim", "Run",
    "Walk", "Skip", "Hop", "Slide", "Throw", "Catch",
    "Push", "Pull", "Shake", "Stretch", "Bend", "Twist",
    "Wink", "Nod", "Bow", "Hug", "Kiss", "Slap",
    "Poke", "Scratch", "Sneeze", "Cough", "Whistle", "Yell",
    "Cry", "Whisper", "Stomp", "March", "Juggle", "Flex",
    "Squat", "Lunge", "Dab", "Floss", "Surf", "Skate",
    "Peek", "Sniff", "Lick", "Blow", "Squeeze", "Pinch",
    "Splash", "Gobble", "Chomp", "Munch", "Scream", "Giggle",
  ] as const).map(w => ({ word: w, adult: false, category: "actions" as WordCategory })),

  // Objects (easy)
  ...(["Phone", "Clock", "Mirror", "Pillow", "Blanket", "Candle",
    "Hammer", "Ladder", "Bucket", "Basket", "Button", "Zipper",
    "Pencil", "Crayon", "Eraser", "Ribbon", "Balloon", "Magnet",
    "Guitar", "Drum", "Piano", "Trumpet", "Violin", "Flute",
    "Camera", "Rocket", "Robot", "Helmet", "Shield", "Sword",
    "Crown", "Trophy", "Medal", "Whistle", "Lantern", "Compass",
    "Anchor", "Shovel", "Broom", "Mop", "Sponge", "Towel",
    "Curtain", "Puzzle", "Dice", "Domino", "Marble", "Kite",
    "Umbrella", "Backpack", "Wallet", "Bottle", "Sticker", "Stamp",
    "Wrench", "Spatula", "Toaster", "Blender", "Scissors", "Tape",
  ] as const).map(w => ({ word: w, adult: false, category: "objects" as WordCategory })),

  // Body (easy)
  ...(["Elbow", "Ankle", "Thumb", "Dimple", "Freckle", "Eyebrow",
    "Eyelash", "Nostril", "Chin", "Cheek", "Forehead", "Wrist",
    "Shoulder", "Knuckle", "Toenail", "Armpit",
    "Belly", "Tongue", "Spine", "Bicep", "Beard", "Ponytail",
  ] as const).map(w => ({ word: w, adult: false, category: "body" as WordCategory })),

  // Sounds (easy)
  ...(["Boom", "Bang", "Splash", "Crash", "Buzz", "Hiss",
    "Roar", "Growl", "Howl", "Chirp", "Beep", "Ring",
    "Snap", "Pop", "Crack", "Thud", "Sizzle", "Rumble",
    "Squeak", "Rattle", "Clatter", "Jingle",
    "Whoosh", "Ding", "Clang", "Purr", "Crunch", "Gurgle",
  ] as const).map(w => ({ word: w, adult: false, category: "sounds" as WordCategory })),

  // Characters (easy)
  ...(["Clown", "Pirate", "Ninja", "Cowboy", "Wizard", "Knight",
    "Queen", "King", "Prince", "Chef", "Doctor", "Pilot",
    "Dancer", "Singer", "Painter", "Juggler", "Magician", "Mime",
    "Zombie", "Ghost", "Vampire", "Mermaid", "Dragon", "Giant",
    "Fairy", "Witch", "Alien", "Superhero", "Detective", "Spy",
  ] as const).map(w => ({ word: w, adult: false, category: "characters" as WordCategory })),

  // Clothing (easy)
  ...(["Boots", "Sandals", "Gloves", "Scarf", "Hoodie", "Beanie",
    "Shorts", "Jacket", "Vest", "Apron", "Turban", "Tiara",
    "Goggles", "Slippers", "Poncho", "Overalls",
    "Sneakers", "Socks", "Bowtie", "Suspenders", "Raincoat", "Tutu",
  ] as const).map(w => ({ word: w, adult: false, category: "clothing" as WordCategory })),

  // Situations (easy)
  ...(["Yawning", "Snoring", "Tripping", "Slipping", "Drooling",
    "Farting", "Burping", "Blushing", "Waving", "Shivering",
    "Sweating", "Sneezing", "Choking", "Stumbling", "Fumbling",
    "Daydreaming", "Sleepwalking", "Overreacting", "Panicking", "Celebrating",
  ] as const).map(w => ({ word: w, adult: false, category: "situations" as WordCategory })),

  // Exclamations (easy)
  ...(["Yikes", "Oops", "Wow", "Boom", "Bingo",
    "Bravo", "Cheers", "Hooray", "Tada",
    "Yippee", "Woohoo", "Bazinga", "Eureka", "Hallelujah",
  ] as const).map(w => ({ word: w, adult: false, category: "exclamations" as WordCategory })),

  // Random (easy)
  ...(["Dork", "Nerd", "Geek", "Goofball", "Bonkers", "Bananas",
    "Weirdo", "Rascal", "Scooter", "Noodle", "Nugget", "Pumpkin",
    "Mischief", "Ruckus", "Chaos", "Prankster",
    "Trickster", "Joker", "Clumsy", "Bubbly",
    "Dingbat", "Goober", "Knucklehead", "Doofus", "Goofball",
    "Dimwit", "Nincompoop", "Meatball", "Butterfingers", "Scallywag",
  ] as const).map(w => ({ word: w, adult: false, category: "random" as WordCategory })),

  // Corporate (easy)
  ...(["Meeting", "Email", "Deadline", "Laptop", "Printer",
    "Coffee", "Stapler", "Cubicle", "Salary", "Overtime",
    "Resume", "Interview", "Promotion", "Memo", "Report",
    "Budget", "Intern", "Manager", "Boss", "Client",
    "Invoice", "Payroll", "Feedback", "Agenda", "Contract",
    "Teamwork", "Brainstorm", "Networking", "Delegate", "Mentor",
    "Spreadsheet", "Whiteboard", "Calendar", "Watercooler", "Briefcase",
    "Commute", "Startup", "Layoff", "Keynote", "Webinar",
  ] as const).map(w => ({ word: w, adult: false, category: "corporate" as WordCategory })),

  // Hollywood movies (single-word titles, easy)
  ...(["Jaws", "Rocky", "Titanic", "Frozen", "Brave",
    "Gladiator", "Avatar", "Inception", "Interstellar", "Gravity",
    "Psycho", "Aliens", "Predator", "Bambi", "Dumbo",
    "Ratatouille", "Coco", "Moana", "Tangled", "Shrek",
    "Cars", "Up", "Bolt", "Grease", "Ghost",
    "Joker", "Tenet", "Arrival", "Her", "Drive",
    "Spotlight", "Amadeus", "Platoon", "Juno", "Scream",
    "Speed", "Heat", "Taken", "Logan", "Deadpool",
    "Aladdin", "Mulan", "Enchanted", "Rango", "Zootopia",
  ] as const).map(w => ({ word: w, adult: false, category: "hollywood" as WordCategory })),

  // Bollywood movies (single-word titles, easy)
  ...(["Sholay", "Lagaan", "Drishyam", "Dangal", "Padmaavat",
    "Pushpa", "Dhoom", "Golmaal", "Ghajini", "Barfi",
    "Krrish", "Dil", "Simmba", "Judwaa", "Gadar",
    "Devdas", "Agneepath", "Jab", "Swades", "Rang",
    "Raees", "Sultan", "Bhool", "Taal", "Parinda",
    "Andhadhun", "Masaan", "Stree", "Kaabil", "Bajrangi",
    "Housefull", "Piku", "Highway", "Mardaani", "Queen",
    "Badlapur", "Bhool", "Darr", "Hera", "Coolie",
  ] as const).map(w => ({ word: w, adult: false, category: "bollywood" as WordCategory })),

  // ===== NORMAL/HARDER WORDS (30%) =====

  // Funny (normal)
  ...(["Twerking", "Moonwalk", "Mullet", "Waddle", "Wedgie",
    "Bamboozle", "Kerfuffle", "Slapstick", "Cringe", "Guffaw",
    "Cackle", "Chortle", "Snicker",
  ] as const).map(w => ({ word: w, adult: false, category: "funny" as WordCategory })),

  // Animals (normal)
  ...(["Platypus", "Porcupine", "Armadillo", "Chameleon", "Narwhal",
    "Pangolin", "Manatee", "Tarantula", "Piranha", "Mongoose",
    "Walrus", "Iguana", "Lemur", "Warthog", "Baboon",
  ] as const).map(w => ({ word: w, adult: false, category: "animals" as WordCategory })),

  // Food (normal)
  ...(["Burrito", "Spaghetti", "Guacamole", "Fondue", "Croissant",
    "Schnitzel", "Sardine", "Lasagna", "Dumpling", "Churro",
    "Kebab", "Milkshake", "Smoothie", "Crouton", "Nacho",
  ] as const).map(w => ({ word: w, adult: false, category: "food" as WordCategory })),

  // Actions (normal)
  ...(["Shimmy", "Gallop", "Pirouette", "Gargle", "Tiptoeing",
    "Headbang", "Curtsy", "Somersault", "Cartwheel", "Limbo",
    "Breakdance", "Leapfrog", "Sleepwalk",
  ] as const).map(w => ({ word: w, adult: false, category: "actions" as WordCategory })),

  // Objects (normal)
  ...(["Plunger", "Boomerang", "Megaphone", "Snorkel", "Scarecrow",
    "Treadmill", "Typewriter", "Telescope", "Mannequin", "Chainsaw",
    "Hammock", "Pinata", "Skateboard", "Trampoline", "Thermometer",
  ] as const).map(w => ({ word: w, adult: false, category: "objects" as WordCategory })),

  // Characters (normal)
  ...(["Gladiator", "Viking", "Caveman", "Astronaut", "Lumberjack",
    "Ventriloquist", "Acrobat", "Werewolf", "Sasquatch",
  ] as const).map(w => ({ word: w, adult: false, category: "characters" as WordCategory })),

  // Situations (normal)
  ...(["Photobomb", "Ghosting", "Catfishing", "Clickbait", "Facepalm",
    "Eavesdropping", "Mansplaining", "Hangover", "Buzzkill",
  ] as const).map(w => ({ word: w, adult: false, category: "situations" as WordCategory })),

  // Random (normal)
  ...(["Blockhead", "Buffoonery", "Tomfoolery",
    "Balderdash", "Poppycock", "Malarkey", "Schmooze", "Canoodle",
    "Rigmarole", "Hodgepodge", "Shenanigans", "Hullabaloo", "Brouhaha",
  ] as const).map(w => ({ word: w, adult: false, category: "random" as WordCategory })),

  // Corporate (normal)
  ...(["Synergy", "Leverage", "Bandwidth", "Scalability", "Pipeline",
    "Onboarding", "Stakeholder", "Micromanage", "Downsizing", "Outsourcing",
    "Buzzword", "Bootstrapping", "Disruption", "Monetize", "Blockchain",
  ] as const).map(w => ({ word: w, adult: false, category: "corporate" as WordCategory })),

  // Hollywood (normal)
  ...(["Memento", "Whiplash", "Nosferatu", "Chinatown", "Vertigo",
    "Casablanca", "Fantasia", "Unforgiven", "Braveheart", "Goodfellas",
  ] as const).map(w => ({ word: w, adult: false, category: "hollywood" as WordCategory })),

  // Bollywood (normal)
  ...(["Mughal", "Zanjeer", "Parinda", "Satya", "Trishul",
    "Agantuk", "Maqbool", "Omkara", "Haider", "Tamasha",
  ] as const).map(w => ({ word: w, adult: false, category: "bollywood" as WordCategory })),

  // ===== ADULT 18+ =====

  // Actions (adult)
  ...(["Flirting", "Grinding", "Spanking", "Stripping", "Moaning", "Thrusting",
    "Seducing", "Fondling", "Caressing", "Teasing", "Licking", "Biting",
    "Sucking", "Nibbling", "Mounting", "Humping", "Undressing", "Massaging",
    "Smooching", "Necking", "Petting", "Ravishing", "Dominating",
  ] as const).map(w => ({ word: w, adult: true, category: "actions" as WordCategory })),

  // Objects (adult)
  ...(["Condom", "Vibrator", "Handcuffs", "Whip", "Dildo",
    "Lubricant", "Blindfold", "Paddle", "Garter", "Collar",
    "Leash", "Feather", "Candle", "Rope", "Cage",
    "Harness", "Restraints", "Beads", "Plug",
  ] as const).map(w => ({ word: w, adult: true, category: "objects" as WordCategory })),

  // Body (adult)
  ...(["Nipple", "Booty", "Cleavage", "Crotch",
    "Boner", "Bulge", "Hickey", "Abs", "Tushy",
    "Midriff", "Thigh", "Navel", "Curves", "Backside",
    "Derriere", "Torso", "Pelvis", "Buttocks", "Groin",
  ] as const).map(w => ({ word: w, adult: true, category: "body" as WordCategory })),

  // Adult & cheeky 🔥
  ...(["Orgasm", "Foreplay", "Kinky", "Naughty", "Quickie",
    "Bondage", "Dominatrix", "Cougar", "Stripper",
    "Playboy", "Hooters", "Boobies", "Horny",
    "Seductive", "Aroused", "Threesome", "Fetish", "Tease",
    "Spank", "Lingerie", "Thong", "Corset", "Stilettos",
    "Striptease", "Lapdance", "Commando", "Peeping",
    "Flashing", "Groping", "Snogging",
    "Risque", "Frisky", "Steamy", "Sultry", "Sensual",
    "Erotic", "Provocative", "Scandalous", "Taboo", "Sinful",
    "Temptation", "Desire", "Passion", "Lust", "Fantasy",
    "Intimate", "Ravish", "Climax", "Ecstasy", "Pleasure",
    "Affair", "Rendezvous", "Mistress", "Swinger", "Voyeur",
    "Exhibitionist", "Sadomasochist", "Submission", "Kink", "Roleplay",
  ] as const).map(w => ({ word: w, adult: true, category: "actions" as WordCategory })),

  // Situations (adult)
  ...(["Streaking", "Queefing", "Skinnydipping", "Catcalling",
    "Mooning", "Sexting", "Hookup",
  ] as const).map(w => ({ word: w, adult: true, category: "situations" as WordCategory })),

  // Characters (adult)
  ...(["Gigolo", "Playmate", "Hunk", "Vixen", "Temptress",
    "Seductress", "Casanova", "Heartthrob", "Bombshell",
    "Hottie", "Stud", "Minx", "Siren", "Babe",
  ] as const).map(w => ({ word: w, adult: true, category: "characters" as WordCategory })),

  // Clothing (adult)
  ...(["Mankini", "Bikini", "Boxers", "Fishnet", "Speedo",
    "Negligee", "Bustier", "Teddy", "Bodystocking",
    "Camisole", "Babydoll", "Lace", "Leather",
    "Latex", "Mesh", "Sheer", "Satin", "Silk",
  ] as const).map(w => ({ word: w, adult: true, category: "clothing" as WordCategory })),

  // Exclamations (adult)
  ...(["Dammit", "Bollocks", "Bloody", "Wanker", "Tosser",
    "Snog", "Shag", "Randy", "Cheeky", "Saucy",
    "Filthy", "Dirty", "Raunchy",
  ] as const).map(w => ({ word: w, adult: true, category: "exclamations" as WordCategory })),

  // Random (adult)
  ...(["Dingleberry", "Bootylicious", "Gooch", "Tiddies",
    "Dongle", "Knob", "Jugs", "Melons", "Rump",
    "Pecker", "Weenie", "Schlong", "Wiener",
    "Jiggle", "Wobble", "Busty", "Chesty",
    "Thicc", "Smutty", "Buxom", "Voluptuous", "Curvaceous",
  ] as const).map(w => ({ word: w, adult: true, category: "random" as WordCategory })),
];

let usedIndices = new Set<number>();

export function getRandomWord(allowAdult: boolean = false, categories: WordCategory[] = ["all"]): string {
  const isAll = categories.includes("all");
  
  const eligible = WORD_BANK
    .map((entry, index) => ({ ...entry, index }))
    .filter(e => {
      // Adult words only appear when adult mode is explicitly on
      if (e.adult && !allowAdult) return false;
      
      if (!isAll) {
        return categories.includes(e.category);
      }
      return true;
    })
    .filter(e => !usedIndices.has(e.index));

  if (eligible.length === 0) {
    usedIndices = new Set<number>();
    return getRandomWord(allowAdult, categories);
  }

  const pick = eligible[Math.floor(Math.random() * eligible.length)];
  usedIndices.add(pick.index);
  return pick.word;
}

export function resetWords() {
  usedIndices = new Set<number>();
}
