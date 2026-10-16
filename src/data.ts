export type Word = { hanzi: string; pinyin: string; en: string; emoji: string; cat: string };

export const WORDS: Record<string, Word> = {};
const add = (list: [string, string, string, string, string][]) =>
  list.forEach(([hanzi, pinyin, en, emoji, cat]) => (WORDS[hanzi] = { hanzi, pinyin, en, emoji, cat }));

add([
  // Numbers
  ["一", "yī", "One", "1️⃣", "numbers"], ["二", "èr", "Two", "2️⃣", "numbers"], ["三", "sān", "Three", "3️⃣", "numbers"],
  ["四", "sì", "Four", "4️⃣", "numbers"], ["五", "wǔ", "Five", "5️⃣", "numbers"], ["六", "liù", "Six", "6️⃣", "numbers"],
  ["七", "qī", "Seven", "7️⃣", "numbers"], ["八", "bā", "Eight", "8️⃣", "numbers"], ["九", "jiǔ", "Nine", "9️⃣", "numbers"],
  ["十", "shí", "Ten", "🔟", "numbers"],
  // Body & People
  ["人", "rén", "Person", "🧍", "people"], ["口", "kǒu", "Mouth", "👄", "people"], ["牙", "yá", "Tooth", "🦷", "people"],
  ["耳", "ěr", "Ear", "👂", "people"], ["手", "shǒu", "Hand", "✋", "people"], ["头", "tóu", "Head", "🙆", "people"],
  ["男", "nán", "Male", "👦", "people"], ["女", "nǚ", "Female", "👧", "people"],
  ["我", "wǒ", "I / Me", "🙋", "people"], ["你", "nǐ", "You", "👉", "people"], ["他", "tā", "He / Him", "🧒", "people"],
  ["我们", "wǒ men", "We / Us", "🤝", "people"], ["你们", "nǐ men", "You (plural)", "👥", "people"], ["他们", "tā men", "They / Them", "👪", "people"],
  ["好", "hǎo", "Good", "👍", "people"], ["爱", "ài", "Love", "❤️", "people"],
  ["你好", "nǐ hǎo", "Hello", "👋", "people"], ["男孩", "nán hái", "Boy", "👦", "people"], ["女孩", "nǚ hái", "Girl", "👧", "people"],
  ["我爱你", "wǒ ài nǐ", "I love you", "💖", "people"], ["再见", "zài jiàn", "Goodbye", "👋", "people"],
  // Nature
  ["木", "mù", "Wood", "🌳", "nature"], ["叶", "yè", "Leaf", "🍃", "nature"], ["花", "huā", "Flower", "🌸", "nature"],
  ["草", "cǎo", "Grass", "🌱", "nature"], ["土", "tǔ", "Soil", "🟫", "nature"], ["天", "tiān", "Sky", "🌤️", "nature"],
  ["日", "rì", "Sun", "☀️", "nature"], ["月", "yuè", "Moon", "🌙", "nature"], ["风", "fēng", "Wind", "🌬️", "nature"],
  ["雨", "yǔ", "Rain", "🌧️", "nature"], ["水", "shuǐ", "Water", "💧", "nature"], ["火", "huǒ", "Fire", "🔥", "nature"],
  ["山", "shān", "Mountain", "⛰️", "nature"], ["石", "shí", "Stone", "🪨", "nature"], ["虫", "chóng", "Insect", "🐛", "nature"],
  ["云", "yún", "Cloud", "☁️", "nature"],
  // Home, Animals & Food
  ["牛", "niú", "Cow", "🐮", "home"], ["羊", "yáng", "Sheep", "🐑", "home"], ["田", "tián", "Field", "🌾", "home"],
  ["米", "mǐ", "Rice", "🍚", "home"], ["肉", "ròu", "Meat", "🍖", "home"],
  ["门", "mén", "Door", "🚪", "home"], ["刀", "dāo", "Knife", "🔪", "home"], ["书", "shū", "Book", "📖", "home"],
  ["尺", "chǐ", "Ruler", "📏", "home"], ["车", "chē", "Vehicle", "🚗", "home"],
  ["开", "kāi", "Open", "🔓", "home"], ["关", "guān", "Close", "🔒", "home"], ["圈", "quān", "Circle", "⭕", "home"],
  // Doing (verbs)
  ["学", "xué", "Learn / Study", "✏️", "doing"], ["买", "mǎi", "Buy", "🛒", "doing"], ["给", "gěi", "Give", "🎁", "doing"],
  ["拿", "ná", "Take / Hold", "👐", "doing"], ["做", "zuò", "Do / Make", "🎨", "doing"], ["带", "dài", "Bring / Take", "🧳", "doing"],
  ["用", "yòng", "Use", "🛠️", "doing"], ["去", "qù", "Go", "🏃", "doing"], ["来", "lái", "Come", "🤗", "doing"],
  ["到", "dào", "Arrive / To", "🛬", "doing"], ["起", "qǐ", "Rise", "🎈", "doing"], ["向", "xiàng", "Towards", "🧭", "doing"],
  ["要", "yào", "Want", "🤲", "doing"], ["有", "yǒu", "Have", "🎒", "doing"], ["能", "néng", "Can / Able to", "💪", "doing"],
  // Little helpers + describing + pointers
  ["是", "shì", "To be / Am / Is / Are", "🟰", "helpers"], ["的", "de", "Possessive particle", "💠", "helpers"],
  ["得", "de", "Result particle", "🎯", "helpers"], ["了", "le", "Past tense particle", "🏁", "helpers"],
  ["把", "bǎ", "Object marker", "🤏", "helpers"], ["和", "hé", "And", "➕", "helpers"],
  ["也", "yě", "Also", "📎", "helpers"], ["都", "dōu", "All / Both", "🌈", "helpers"],
  ["又", "yòu", "Again", "🔁", "helpers"], ["连", "lián", "Even / Connect", "🔗", "helpers"],
  ["在", "zài", "At / In / On", "📍", "helpers"], ["里", "lǐ", "Inside", "📦", "helpers"],
  ["个", "gè", "Measure word", "🔢", "helpers"],
  ["很", "hěn", "Very", "🌟", "helpers"], ["真", "zhēn", "True / Really", "💎", "helpers"],
  ["最", "zuì", "Most", "🥇", "helpers"], ["剩", "shèng", "Leftover / Remainder", "🥡", "helpers"],
  ["不", "bù", "No / Not", "❌", "helpers"], ["多", "duō", "Many / Much", "🌊", "helpers"],
  ["少", "shǎo", "Few / Little", "💧", "helpers"], ["对", "duì", "Correct / Right", "✅", "helpers"],
  ["错", "cuò", "Wrong / Error", "✖️", "helpers"],
  ["大", "dà", "Big", "🎃", "helpers"], ["小", "xiǎo", "Small", "🌰", "helpers"],
  ["上", "shàng", "Up", "⬆️", "helpers"], ["下", "xià", "Down", "⬇️", "helpers"],
  ["这", "zhè", "This", "👇", "helpers"], ["那", "nà", "That", "👆", "helpers"],
  ["几", "jǐ", "How many / Several", "❓", "helpers"],
]);

/** Exact order from your list (99 words) for the Word Sheet */
export const WORD_ORDER = [
  "一","二","三","四","五","六","七","八","九","十",
  "人","口","牙","耳","手","头","男","女","门","刀",
  "木","叶","花","草","土","天","日","月","风","雨",
  "水","火","山","石","虫","云","牛","羊","米","肉",
  "大","小","上","下","开","关","书","尺","车","田",
  "我","你","他","是","的","要","有","和","很","我们",
  "你们","他们","在","里","都","能","又","给","拿","最",
  "真","好","爱","用","得","也","向","买","了","学",
  "做","个","带","去","来","到","把","圈","起","剩",
  "连","不","多","少","对","错","这","那","几",
];

export const CATS = [
  { id: "all", label: "All", emoji: "🌈" },
  { id: "numbers", label: "Numbers", emoji: "🔢" },
  { id: "people", label: "Me & People", emoji: "🙋" },
  { id: "nature", label: "Nature", emoji: "🌳" },
  { id: "home", label: "Home & Animals", emoji: "🏠" },
  { id: "doing", label: "Doing", emoji: "🏃" },
  { id: "helpers", label: "Little Helpers", emoji: "✨" },
];

export type Scene = {
  id: number;
  title: string;
  prompt: string;
  vo: string;
  words: string[];
  bg: string;
  props: string[];
  overlay?: string;
};

export type Chapter = {
  id: string;
  name: string;
  short: string;
  duration: string;
  emoji: string;
  color: string;
  scenes: Scene[];
};

export const MASTER_PROMPT =
  "Soft 2D storybook animation for children ages 3–6, watercolor-and-paper texture, rounded friendly shapes, warm pastel palette, gentle golden lighting, slow smooth camera moves. Main character: Peshini, a cheerful 5-year-old girl with brown skin, rosy cheeks, big sparkling dark eyes, black curly hair in two puff buns with red bows, yellow t-shirt, blue overalls, red sneakers. Bouncy, playful movement. Mood: cozy, magical, encouraging. No scary elements, no fast cuts, no realistic humans.";

export const CHAPTERS: Chapter[] = [
  {
    id: "open", name: "Opening", short: "Welcome", duration: "0:20", emoji: "📚", color: "from-amber-200 to-rose-200",
    scenes: [
      { id: 1, title: "The Glowing Storybook", bg: "from-indigo-200 via-purple-100 to-amber-100", props: ["📖", "✨", "🛏️", "⭐"],
        prompt: "A storybook on a child's bed glows and opens by itself; pages flutter; Peshini pops out of the page waving.",
        vo: "Welcome to Peshini's Mandarin Adventure!", words: ["你好"] },
    ],
  },
  {
    id: "c1", name: "Chapter 1 — Counting Toys", short: "Counting", duration: "1:30", emoji: "🧸", color: "from-yellow-200 to-orange-200",
    scenes: [
      { id: 2, title: "The Toy Box", bg: "from-sky-100 via-amber-50 to-orange-100", props: ["🧸", "🧱", "🪀", "🎈"],
        prompt: "Morning bedroom, toy box overflowing with colorful blocks; Peshini opens the lid, eyes wide with wonder.",
        vo: "Good morning, Peshini! What's inside your toy box?", words: [] },
      { id: 3, title: "Floating Numbers", bg: "from-amber-100 via-yellow-50 to-orange-100", props: ["🧱", "✨", "🟦", "🟥"],
        prompt: "Blocks float up one by one; giant glowing golden Chinese numbers (一 二 三 四 五 六 七 八 九 十) appear in the air with sparkles as she counts.",
        vo: "Let's count the blocks! Each number twice, nice and slow.", words: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"] },
      { id: 4, title: "Touch Your Toes", bg: "from-orange-100 via-pink-50 to-yellow-100", props: ["🦶", "😄", "⭐", "🎵"],
        prompt: "Peshini touches her toes counting to ten, giggling.", overlay: "Count with me!",
        vo: "Count with me! Touch your toes… yī, èr, sān!", words: ["一", "二", "三"] },
    ],
  },
  {
    id: "c2", name: "Chapter 2 — Body & Friends", short: "Friends", duration: "1:30", emoji: "👫", color: "from-pink-200 to-fuchsia-200",
    scenes: [
      { id: 5, title: "Magic Mirror", bg: "from-pink-100 via-rose-50 to-purple-100", props: ["🪞", "✨", "💫", "🌟"],
        prompt: "Peshini looks in a mirror, pointing to her head, mouth, ear, hand; glowing characters (头 口 耳 手 牙) sparkle where she points.",
        vo: "Point to your head… your mouth… your ear!", words: ["头", "口", "耳", "手", "牙"] },
      { id: 6, title: "Friends at the Door", bg: "from-rose-100 via-amber-50 to-pink-100", props: ["🔔", "🚪", "👦", "👧"],
        prompt: "Doorbell rings; a boy (男孩) and girl (女孩) arrive; three friends wave \"Nǐ hǎo!\" and hold hands.",
        vo: "Wǒ, nǐ, tā… wǒmen!", words: ["你好", "男孩", "女孩", "我", "你", "他", "我们"] },
      { id: 7, title: "Magic Finger", bg: "from-violet-100 via-pink-50 to-sky-100", props: ["☝️", "✨", "🪄", "💫"],
        prompt: "A giant friendly finger draws 人 in the air like a magic trick.",
        vo: "Two little lines… it's a person!", words: ["人"] },
    ],
  },
  {
    id: "c3", name: "Chapter 3 — Nature Walk", short: "Nature", duration: "1:30", emoji: "🌳", color: "from-green-200 to-sky-200",
    scenes: [
      { id: 8, title: "Sunny Meadow", bg: "from-sky-200 via-sky-100 to-lime-100", props: ["☀️", "☁️", "🌼", "🦋"],
        prompt: "Door opens to a sunny meadow: sun 日 beams, sky 天 stretches, cloud 云 drifts.",
        vo: "Look up! The sun, the sky, a fluffy cloud!", words: ["日", "天", "云"] },
      { id: 9, title: "Whoosh, the Wind", bg: "from-teal-100 via-green-50 to-lime-100", props: ["🌬️", "🍃", "🌳", "🍂"],
        prompt: "Wind 风 rustles leaves 叶 off a tree 木; Peshini's hair flutters, she laughs.",
        vo: "Whoosh! The wind blows the leaves off the tree!", words: ["风", "叶", "木"] },
      { id: 10, title: "Rain & Flowers", bg: "from-slate-200 via-sky-100 to-emerald-100", props: ["🌧️", "☂️", "🌸", "🐛"],
        prompt: "Gentle rain 雨 falls; umbrella opens; after-rain timelapse of flowers 花 and grass 草 growing; a cute bug 虫 crawls on a leaf.",
        vo: "Pitter-patter rain… and then flowers grow!", words: ["雨", "花", "草", "虫"] },
      { id: 11, title: "Moonrise", bg: "from-indigo-300 via-purple-200 to-orange-200", props: ["🌙", "⛰️", "💧", "⭐"],
        prompt: "Sunset; moon 月 rises over a mountain 山 beside a stream 水.",
        vo: "Goodnight sun. Hello moon, over the mountain and the water.", words: ["月", "山", "水"] },
    ],
  },
  {
    id: "c4", name: "Chapter 4 — Farm & House", short: "Farm", duration: "1:30", emoji: "🐮", color: "from-red-200 to-amber-200",
    scenes: [
      { id: 12, title: "Red Barn Farm", bg: "from-sky-100 via-lime-50 to-yellow-100", props: ["🐮", "🐑", "🌾", "🏡"],
        prompt: "Red barn farm: a friendly cow 牛 moos and sheep 羊 bounce in the field 田.",
        vo: "Moo! Baa! Animals in the field!", words: ["牛", "羊", "田"] },
      { id: 13, title: "Lunch Time", bg: "from-amber-100 via-orange-50 to-rose-100", props: ["🍚", "🍖", "🥢", "😋"],
        prompt: "Lunch table: steaming rice bowl 米 and meat 肉; Peshini rubs her tummy happily.",
        vo: "Yum yum! Rice and meat!", words: ["米", "肉"] },
      { id: 14, title: "Big & Small", bg: "from-orange-100 via-yellow-50 to-lime-100", props: ["🎃", "🌰", "🙌", "🤏"],
        prompt: "Opposites game: Peshini stretches arms wide (大 dà!), then curls into a tiny ball (小 xiǎo!); giant pumpkin vs. tiny seed.",
        vo: "Stretch up big… curl up small!", words: ["大", "小"] },
      { id: 15, title: "Open, Close, Read", bg: "from-rose-100 via-amber-50 to-sky-100", props: ["🚪", "📖", "🚗", "🔑"],
        prompt: "She opens a door (开), closes it (关), reads a book (书), a toy car 车 zooms past.",
        vo: "Open the door… close the door… read a book! Vroom, a car!", words: ["开", "关", "书", "车"] },
    ],
  },
  {
    id: "c5", name: "Chapter 5 — Peshini's Busy Day", short: "Busy Day", duration: "1:30", emoji: "🍎", color: "from-violet-200 to-rose-200",
    scenes: [
      { id: 16, title: "Busy Day Montage", bg: "from-yellow-100 via-rose-50 to-sky-100", props: ["✏️", "🍎", "🛒", "🎁"],
        prompt: "Montage: learning at a desk, at a market buying apples, giving an apple to her friend, running to and fro.",
        vo: "Xué… mǎi… gěi… qù… lái!", words: ["学", "买", "给", "去", "来"] },
      { id: 17, title: "Pointing Game", bg: "from-lime-100 via-sky-50 to-violet-100", props: ["👇", "👆", "🎈", "🏠"],
        prompt: "Pointing game: she points at something close (这 zhè!) then something far (那 nà!)",
        vo: "This one is close… that one is far!", words: ["这", "那"] },
      { id: 18, title: "Goodnight Hug", bg: "from-indigo-300 via-purple-200 to-pink-200", props: ["❤️", "🌙", "⭐", "🤗"],
        prompt: "Nighttime: Peshini hugs her mom; a warm glowing heart (爱 ài) forms around them.", overlay: "Now you say it!",
        vo: "Wǒ ài nǐ! Now you say it!", words: ["爱", "我爱你"] },
    ],
  },
  {
    id: "c6", name: "Chapter 6 — Home Treasures", short: "Home", duration: "1:30", emoji: "🏠", color: "from-orange-200 to-yellow-200",
    scenes: [
      { id: 22, title: "The Little Door", bg: "from-amber-100 via-orange-50 to-rose-100", props: ["🚪", "⬆️", "⬇️", "🔔"],
        prompt: "Peshini finds a tiny red door in her room; she looks up (上) and down (下), then knocks on the door (门).",
        vo: "Knock knock! A little door! Look up… look down… open the door!", words: ["门", "上", "下"] },
      { id: 23, title: "Kitchen Helpers", bg: "from-yellow-100 via-amber-50 to-orange-100", props: ["🔪", "📏", "🔥", "🍌"],
        prompt: "Cozy safe kitchen: a friendly butter knife (刀) slices a banana, a ruler (尺) measures the table, a warm lantern fire (火) glows — no scary flames.",
        vo: "Careful helpers! A knife to slice banana, a ruler to measure, a warm little fire!", words: ["刀", "尺", "火"] },
      { id: 24, title: "Garden Dig", bg: "from-lime-100 via-amber-50 to-yellow-100", props: ["🟫", "🪨", "📦", "📍"],
        prompt: "Garden timelapse: Peshini digs soft soil (土), finds round stones (石); a seed is inside (里) a box, and she is at (在) the garden.",
        vo: "Dig the soil! Hello stones! The seed is inside… I am in the garden!", words: ["土", "石", "里", "在"] },
    ],
  },
  {
    id: "c7", name: "Chapter 7 — We Are Friends", short: "Us", duration: "1:30", emoji: "👪", color: "from-pink-200 to-rose-200",
    scenes: [
      { id: 25, title: "Boys and Girls", bg: "from-pink-100 via-rose-50 to-sky-100", props: ["👦", "👧", "👥", "👪"],
        prompt: "Playground: a boy (男) and a girl (女) swing; Peshini waves to you all (你们) and to them (他们).",
        vo: "He's a boy! She's a girl! Hello to you all… and hello to them!", words: ["男", "女", "你们", "他们"] },
      { id: 26, title: "Really Very Good", bg: "from-rose-100 via-amber-50 to-yellow-100", props: ["👍", "💎", "🌟", "🥇"],
        prompt: "Art table: Peshini holds up her drawing — it is (是) good (好), really (真) very (很) good; her (的) heart shines.",
        vo: "It is good! Really, very good! My beautiful drawing!", words: ["是", "的", "好", "真", "很"] },
    ],
  },
  {
    id: "c8", name: "Chapter 8 — Peshini Can!", short: "I Can", duration: "1:30", emoji: "💪", color: "from-sky-200 to-emerald-200",
    scenes: [
      { id: 27, title: "Want, Have, Can", bg: "from-sky-100 via-amber-50 to-lime-100", props: ["🤲", "🎒", "💪", "🍎"],
        prompt: "Market stall: Peshini wants (要) red apples, she has (有) a little basket, and she can (能) carry it herself!",
        vo: "I want apples! I have a basket! I can carry it!", words: ["要", "有", "能"] },
      { id: 28, title: "Little Busy Hands", bg: "from-emerald-100 via-yellow-50 to-orange-100", props: ["👐", "🎨", "🧳", "🛠️"],
        prompt: "Craft corner: she takes (拿) blocks, makes (做) a tall tower, brings (带) one to her friend, and uses (用) a spoon to stir soup.",
        vo: "Take it… make it… bring it… use it! Busy little hands!", words: ["拿", "做", "带", "用"] },
      { id: 29, title: "Go, Arrive, Rise", bg: "from-lime-100 via-sky-50 to-amber-100", props: ["🛬", "🎈", "🧭", "🏃"],
        prompt: "Park path: friends arrive (到), balloons rise (起) into the sky, and Peshini walks towards (向) them.",
        vo: "We arrive! Balloons rise up! Walk towards your friends!", words: ["到", "起", "向"] },
    ],
  },
  {
    id: "c9", name: "Chapter 9 — Magic Little Words", short: "Magic", duration: "2:00", emoji: "✨", color: "from-violet-200 to-amber-200",
    scenes: [
      { id: 30, title: "Together Again", bg: "from-violet-100 via-pink-50 to-amber-100", props: ["➕", "📎", "🌈", "🔁"],
        prompt: "Circle time: you and (和) me, me also (也), all (都) together, again (又)! Friends link arms, connected (连) in a ring.",
        vo: "You and me! Me also! All together! Again! We are connected!", words: ["和", "也", "都", "又", "连"] },
      { id: 31, title: "Tiny Word Tricks", bg: "from-amber-100 via-yellow-50 to-violet-100", props: ["🏁", "🔢", "🤏", "⭕"],
        prompt: "Cookie party: all finished (了)! One measure-word (个) cookie, take the cookie with bǎ (把), yummy de (得)! Cookies left over (剩) make a circle (圈).",
        vo: "All gone — le! One ge cookie! Bǎ! De! Leftovers in a circle!", words: ["了", "个", "把", "得", "剩", "圈"] },
      { id: 32, title: "Many or Few?", bg: "from-sky-100 via-yellow-50 to-rose-100", props: ["❌", "🌊", "💧", "❓"],
        prompt: "Guessing game: no (不) peeking! Many (多) marbles or few (少)? Correct (对) or wrong (错)? How many (几)? The most (最) stars wins!",
        vo: "No peeking! Many or few? Right or wrong? How many? The most!", words: ["不", "多", "少", "对", "错", "几", "最"] },
    ],
  },
  {
    id: "outro", name: "Review & Outro", short: "Review", duration: "1:00", emoji: "🌟", color: "from-sky-200 to-indigo-200",
    scenes: [
      { id: 19, title: "Firefly Characters", bg: "from-indigo-200 via-violet-100 to-amber-100", props: ["📖", "✨", "🌟", "💫"],
        prompt: "The storybook's dictionary pages flip; characters float around Peshini like fireflies.",
        vo: "Look at all the words we learned today!", words: ["一", "人", "日", "月", "大", "小", "爱"] },
      { id: 20, title: "Quiz Moment", bg: "from-amber-100 via-yellow-50 to-sky-100", props: ["❓", "2️⃣", "3️⃣", "🤔"],
        prompt: "Quiz moment: two numbers appear.", overlay: "Is this èr or sān?",
        vo: "Is this èr or sān?", words: ["二", "三"] },
      { id: 21, title: "Zài jiàn!", bg: "from-pink-200 via-rose-100 to-amber-100", props: ["💖", "📕", "👋", "✨"],
        prompt: "All characters swirl into a heart shape; the book closes gently.",
        vo: "Great job today, Peshini! Zài jiàn!", words: ["再见"] },
    ],
  },
];

export const ALL_SCENES = CHAPTERS.flatMap((c) => c.scenes.map((s) => ({ ...s, chapter: c })));

export const AUDIO_DIRECTION = [
  ["🎙️ Narrator", "Warm, slow female voice (English) + native Mandarin speaker for all words"],
  ["👧 Peshini", "Sweet child voice, repeats every word after the narrator"],
  ["🎵 Music", "Gentle ukulele + xylophone, playful and soft"],
  ["✨ SFX", "Magical “pop + sparkle” every time a character appears"],
  ["📏 Rule", "Every Chinese word = shown on screen + spoken twice + pause for the child to repeat"],
];

export const TIPS = [
  ["Generate 5–10s clips", "Most AI video tools cap length — plan ~25–30 clips, then stitch in CapCut or iMovie."],
  ["Overlay the characters", "AI garbles Chinese text. Add 一, 二, 三 as clean text overlays in editing, pinyin above."],
  ["Lock Peshini's look", "Use a fixed character reference image (image-to-video) for consistency across scenes."],
  ["Plan your formats", "16:9 for YouTube; crop 9:16 versions of each chapter for Shorts / Reels."],
];

export const TONE_MARKS: Record<string, number> = {
  ā: 1, ē: 1, ī: 1, ō: 1, ū: 1, ǖ: 1,
  á: 2, é: 2, í: 2, ó: 2, ú: 2, ǘ: 2,
  ǎ: 3, ě: 3, ǐ: 3, ǒ: 3, ǔ: 3, ǚ: 3,
  à: 4, è: 4, ì: 4, ò: 4, ù: 4, ǜ: 4,
};

export function tonesOf(pinyin: string): number[] {
  return pinyin.split(/\s+/).flatMap((syl) => {
    const tones: number[] = [];
    for (const ch of syl) if (TONE_MARKS[ch]) tones.push(TONE_MARKS[ch]);
    return tones.length ? tones : [5];
  });
}

export const TONE_INFO: Record<number, { name: string; gesture: string; color: string }> = {
  1: { name: "1st tone · flat", gesture: "Hand glides straight across ➡️", color: "text-sky-600" },
  2: { name: "2nd tone · rising", gesture: "Hand swoops up ↗️", color: "text-emerald-600" },
  3: { name: "3rd tone · dip", gesture: "Hand dips down and up ↘️↗️", color: "text-amber-600" },
  4: { name: "4th tone · falling", gesture: "Hand chops down ↘️", color: "text-rose-600" },
  5: { name: "neutral tone", gesture: "Light little tap 👆", color: "text-slate-500" },
};
