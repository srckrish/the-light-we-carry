// Cultural narrative, constellations, and interactive data for Tihar and Chhath

export const TIHAR_DAYS = [
  {
    id: "kaag-tihar",
    dayNum: 1,
    title: "Kaag Tihar",
    devanagari: "काग तिहार",
    subtitle: "Messengers of the divine",
    summary: "Crows are offered food and honoured as messengers bridging our world and Yamaraj, the god of death.",
    tagline: "Crows, our messengers",
    accent: "#F59E0B", // Marigold gold
    emoji: "🐦",
    actionLabel: "Offer food",
    toastMessage: "Grains offered. A gentle light for the crows.",
    deepDescription: "On the first day of Tihar, before anyone in the household eats, offerings of cooked rice, grains, and sweets are placed on rooftops and ledges for the crows. In Nepali folklore, the crow is believed to be the messenger of Yama, bearing news between realms. Feeding them invites harmony and warding off misfortune."
  },
  {
    id: "kukur-tihar",
    dayNum: 2,
    title: "Kukur Tihar",
    devanagari: "कुकुर तिहार",
    subtitle: "Loyal guardians and timeless companions",
    summary: "Dogs are thanked for their loyalty, companionship, and faithful protection with a red tika and a fragrant marigold garland.",
    tagline: "Dogs, loyal guardians",
    accent: "#E11D48", // Vermillion
    emoji: "🐕",
    actionLabel: "Give a garland",
    toastMessage: "Marigold garland bestowed. A light for our faithful guardians.",
    deepDescription: "The second day honors dogs—both beloved family companions and street dogs alike. Each receives a crimson tika on the forehead, a golden sayapatri (marigold) garland, and rich treats. Dogs are revered as the loyal sentinels of Yamaraj and symbols of boundless devotion."
  },
  {
    id: "gai-tihar",
    dayNum: 3,
    title: "Gai Tihar & Laxmi Puja",
    devanagari: "गाई तिहार / लक्ष्मी पूजा",
    subtitle: "Sacred mother & the welcoming of wealth",
    summary: "Crows and dogs lead to the cow, honoured by day. At nightfall, every home glows with oil diyas and vibrant rangolis to welcome Goddess Laxmi.",
    tagline: "Cows, and Laxmi’s lamps",
    accent: "#D9A441", // Diya Gold
    emoji: "🐄",
    actionLabel: "Light Laxmi's lamps",
    toastMessage: "Lamps ignited along the pathway. May abundance enter your home.",
    deepDescription: "By daylight, cows are venerated as earthly symbols of motherhood, patience, and nourishment. As dusk falls, oil lamps (diyas) line every threshold, window, and courtyard, and colorful rangoli patterns guide Laxmi, goddess of prosperity and grace, into welcoming homes."
  },
  {
    id: "goru-tihar",
    dayNum: 4,
    title: "Goru Tihar & Mha Puja",
    devanagari: "गोरु तिहार / म्ह पूजा",
    subtitle: "The strength of the earth & reverence of the self",
    summary: "Oxen are thanked for plowing the fields. In Newar tradition, this night marks Mha Puja—a sacred ritual honouring the divine within oneself and greeting Nepal Sambat.",
    tagline: "Oxen, and Mha Puja",
    accent: "#C2410C", // Terracotta
    emoji: "🐂",
    actionLabel: "Offer gratitude",
    toastMessage: "Gratitude sent to the soil and the inner light.",
    deepDescription: "Oxen, pillars of agricultural life in Nepal, receive garlands and grain. Concurrently, the Newar community celebrates Mha Puja (worship of the self), purifying mind and spirit for the new year of the Nepal Sambat lunar calendar."
  },
  {
    id: "bhai-tika",
    dayNum: 5,
    title: "Bhai Tika",
    devanagari: "भाइटीका",
    subtitle: "The unbreakable bond of brothers and sisters",
    summary: "Sisters bless their brothers with the sacred seven-colored saptarangi tika, makhamali garlands, and prayers for longevity and protection.",
    tagline: "Sisters bless brothers",
    accent: "#FBBF24", // Radiance Gold
    emoji: "🌼",
    actionLabel: "Send a blessing",
    toastMessage: "Seven-colored tika blessed. A wish for enduring life and affection.",
    deepDescription: "On the final day of Tihar, sisters draw circles of mustard oil and holy water to protect their brothers. They bestow the vertical seven-color tika on their foreheads, drape evergreen globe amaranth (makhamali) garlands that never wither, and exchange heartfelt gifts."
  },
  {
    id: "chhath",
    dayNum: 6,
    title: "Chhath Puja",
    devanagari: "छठ पूजा",
    subtitle: "Devotion to Surya and the sacred river",
    summary: "A grand festival of purity and gratitude celebrated on the banks of holy rivers, honouring Surya (the Sun) and Chhathi Maiya with evening and dawn offerings.",
    tagline: "Sun & sacred waters",
    accent: "#0D9488", // River Teal & Dawn Gold
    emoji: "🌅",
    actionLabel: "Offer Arghya",
    toastMessage: "Arghya offered to the divine sun as the waters turn to gold.",
    deepDescription: "Chhath is an ancient festival of profound austerity and natural harmony. Devotees observe strict fasting (Vrata), standing waist-deep in river waters. Offerings of seasonal fruits, thekua, and sacred sugarcane in bamboo soop baskets are made first to the setting sun (Sandhya Arghya) and concluded with the rising sun (Usha Arghya)."
  }
];

// Constellation path definitions normalized to [-1, 1] relative to center
export const CONSTELLATIONS = [
  // 0: Kaag (Crow in flight)
  [
    [[0.85, -0.15], [0.62, -0.32], [0.4, -0.28], [0.2, -0.1], [-0.1, -0.2], [-0.45, -0.05], [-0.9, 0.25], [-0.45, 0.18], [-0.1, 0.3], [0.15, 0.38], [0.3, 0.1], [0.42, -0.02], [0.62, -0.1], [0.85, -0.15]],
    [[0.15, 0.38], [0.15, 0.75]],
    [[-0.02, 0.33], [-0.04, 0.75]]
  ],
  // 1: Kukur (Loyal Dog guarding)
  [
    [[0.85, -0.2], [0.65, -0.5], [0.5, -0.75], [0.38, -0.45], [0.15, -0.15], [-0.2, 0.1], [-0.5, 0.4], [-0.55, 0.78], [-0.15, 0.78], [-0.15, 0.45], [0.2, 0.36], [0.3, 0.78], [0.55, 0.78], [0.5, 0.2], [0.55, -0.1], [0.85, -0.2]]
  ],
  // 2: Gai (Sacred Cow)
  [
    [[0.9, -0.05], [0.78, -0.3], [0.55, -0.32], [0.5, -0.58], [0.4, -0.3], [0.3, -0.28], [-0.5, -0.25], [-0.72, -0.1], [-0.72, 0.2], [-0.6, 0.25], [-0.58, 0.72], [-0.45, 0.72], [-0.4, 0.28], [0.1, 0.3], [0.15, 0.72], [0.28, 0.72], [0.3, 0.25], [0.5, 0.2], [0.58, 0.1], [0.9, 0.2], [0.9, -0.05]],
    [[-0.72, -0.1], [-0.9, 0.1], [-0.88, 0.4]]
  ],
  // 3: Goru (Ox of the soil)
  [
    [[0.9, -0.05], [0.78, -0.3], [0.58, -0.34], [0.52, -0.62], [0.4, -0.32], [0.25, -0.56], [-0.1, -0.6], [-0.4, -0.28], [-0.74, -0.12], [-0.74, 0.2], [-0.6, 0.25], [-0.58, 0.72], [-0.45, 0.72], [-0.4, 0.28], [0.1, 0.3], [0.15, 0.72], [0.28, 0.72], [0.3, 0.25], [0.5, 0.2], [0.9, 0.2], [0.9, -0.05]],
    [[0.25, -0.56], [0.55, -0.4]]
  ],
  // 4: Bhai Tika (Mandala & Lotus of Blessings)
  [
    [[-0.85, 0.3], [-0.55, 0.55], [0.55, 0.55], [0.85, 0.3], [0.55, 0.12], [-0.55, 0.12], [-0.85, 0.3]],
    [[0, -0.72], [0.14, -0.38], [0, -0.12], [-0.14, -0.38], [0, -0.72]],
    [[0, -0.95], [0, -0.85]],
    [[-0.5, -0.7], [-0.42, -0.6]],
    [[0.5, -0.7], [0.42, -0.6]],
    [[-0.3, 0.33], [0.3, 0.33]]
  ]
];

export const CHHATH_RITUAL_STAGES = [
  {
    day: "Day 1",
    name: "Nahay-Khay",
    devanagari: "नहाय-खाय",
    tagline: "Sanctification & Pure Feast",
    desc: "Devotees take a holy purification dip in the sacred river and prepare a pure satvik meal of rice and pumpkin cooked in brass or clay vessels.",
  },
  {
    day: "Day 2",
    name: "Kharna",
    devanagari: "खरना",
    tagline: "Sacred Fast & Rasiyaw",
    desc: "A day-long nirjala (waterless) fast. After sundown, prayer offerings of jaggery kheer (Rasiyaw) and fresh rotis are made before the 36-hour vigil begins.",
  },
  {
    day: "Day 3",
    name: "Sandhya Arghya",
    devanagari: "सन्ध्या अर्घ्य",
    tagline: "Offering to the Setting Sun",
    desc: "Devotees stand waist-deep in river waters, holding bamboo soop trays laden with thekua, sugarcane, and fruits to honor the setting sun (Astachalgami Surya).",
  },
  {
    day: "Day 4",
    name: "Usha Arghya",
    devanagari: "उषा अर्घ्य / पारन",
    tagline: "Dawn Offering & Blessing",
    desc: "Before dawn, prayers welcome the rising sun (Udayagami Surya) with Arghya of milk and holy water, completing the fast and sharing sacred prasad.",
  },
];

export const CHHATH_CAPTION_STEPS = [
  {
    phase: "sunset",
    title: "Sandhya Arghya · The Setting Sun",
    time: "Sunset Twilight (सन्ध्या अर्घ्य)",
    desc: "Uniquely, Chhath begins by honouring the setting sun. Devotees stand waist-deep in river waters, raising bamboo soop baskets filled with thekua, bananas, and sugarcane in gratitude for the cycle of life.",
  },
  {
    phase: "night",
    title: "Kosiya Bharai · The Night Vigil",
    time: "Midnight River Vigil (कोसिया भराई)",
    desc: "Through the quiet night, terracotta canopies of clay diyas glow along the riverbanks. Families keep vigil singing traditional folk hymns to Chhathi Maiya under a celestial night sky.",
  },
  {
    phase: "sunrise",
    title: "Usha Arghya · The Dawn Rebirth",
    time: "Dawn Awakening (उषा अर्घ्य)",
    desc: "At sunrise, golden light bathes the river. Devotees pour arghya of milk and water toward the rising sun, joyfully completing their 36-hour fast and distributing blessed thekua to all.",
  },
];

export const QUIZ_QUESTIONS = [
  {
    question: "Which day opens Tihar by honouring crows as sacred messengers?",
    options: ["Kaag Tihar", "Gai Tihar", "Bhai Tika"],
    answerIndex: 0,
    explanation: "Kaag Tihar opens the festival. Crows are offered fresh grains on rooftops as they are considered messengers of Yama."
  },
  {
    question: "On which day are dogs thanked for their loyalty, guardianship, and companionship?",
    options: ["Goru Tihar", "Kukur Tihar", "Kaag Tihar"],
    answerIndex: 1,
    explanation: "On Kukur Tihar, dogs are adorned with vibrant marigold garlands and blessed with a vermillion tika."
  },
  {
    question: "When do homes illuminate with countless oil lamps to welcome Goddess Laxmi?",
    options: ["Laxmi Puja night", "Bhai Tika morning", "Usha Arghya dawn"],
    answerIndex: 0,
    explanation: "On Laxmi Puja, the evening of Gai Tihar, homes glow with clay diyas and colorful rangolis to welcome the goddess of prosperity."
  },
  {
    question: "Which observance celebrates the divine within oneself and welcomes the Nepal Sambat new year?",
    options: ["Bhai Tika", "Mha Puja", "Chhath"],
    answerIndex: 1,
    explanation: "Mha Puja is celebrated primarily by the Newar community, dedicated to purifying and worshipping one's own inner spirit."
  },
  {
    question: "Who receives the sacred seven-colored saptarangi tika on the final day of Tihar?",
    options: ["Brothers", "Oxen", "Crows"],
    answerIndex: 0,
    explanation: "On Bhai Tika, sisters bless their brothers with seven-colored tika and wishes for long life, health, and prosperity."
  },
  {
    question: "Chhath Puja is dedicated to which celestial deity?",
    options: ["Surya, the Sun God", "Goddess Laxmi", "Lord Shiva"],
    answerIndex: 0,
    explanation: "Chhath honours Surya, the Sun God, and Chhathi Maiya, expressing profound gratitude for the life-giving warmth of the sun."
  }
];

export const WISH_PRESETS = [
  "May gratitude and peace find their way into your home.",
  "May your days glow with love, family, and golden warmth.",
  "May every light you kindle in others return to you multiplied.",
  "Wishing you and your family a blessed Tihar and auspicious Chhath."
];
