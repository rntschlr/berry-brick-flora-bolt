export type Letter = {
  glyph: string;
  name: string;
  ipa: string;
  hint: string;
  example: { hu: string; en: string };
  kind: "vowel-back" | "vowel-front" | "vowel-neutral" | "consonant";
};

export const LETTERS: Letter[] = [
  { glyph: "A", name: "a", ipa: "ɒ", hint: "British hot, what — never the English ‘ay’.", example: { hu: "alma", en: "apple" }, kind: "vowel-back" },
  { glyph: "Á", name: "á", ipa: "aː", hint: "Long open a, like father stretched.", example: { hu: "ház", en: "house" }, kind: "vowel-back" },
  { glyph: "B", name: "bé", ipa: "b", hint: "As in baby.", example: { hu: "barát", en: "friend" }, kind: "consonant" },
  { glyph: "C", name: "cé", ipa: "ts", hint: "Always ts, as in tsunami — never English k/s.", example: { hu: "cukor", en: "sugar" }, kind: "consonant" },
  { glyph: "Cs", name: "csé", ipa: "tʃ", hint: "church. One letter, two keys.", example: { hu: "család", en: "family" }, kind: "consonant" },
  { glyph: "D", name: "dé", ipa: "d", hint: "As in deck.", example: { hu: "doboz", en: "box" }, kind: "consonant" },
  { glyph: "Dz", name: "dzé", ipa: "dz", hint: "Rare. Hudson without the n.", example: { hu: "edz", en: "trains (sport)" }, kind: "consonant" },
  { glyph: "Dzs", name: "dzsé", ipa: "dʒ", hint: "jam, jungle. Almost only in loans.", example: { hu: "dzsungel", en: "jungle" }, kind: "consonant" },
  { glyph: "E", name: "e", ipa: "ɛ", hint: "bed, less — open, not the ‘ay’ of they.", example: { hu: "ember", en: "person" }, kind: "vowel-front" },
  { glyph: "É", name: "é", ipa: "eː", hint: "Long, like café or hey held.", example: { hu: "kéz", en: "hand" }, kind: "vowel-front" },
  { glyph: "F", name: "ef", ipa: "f", hint: "As in fish.", example: { hu: "fa", en: "tree" }, kind: "consonant" },
  { glyph: "G", name: "gé", ipa: "g", hint: "Always hard, as in go — never gem.", example: { hu: "gomb", en: "button" }, kind: "consonant" },
  { glyph: "Gy", name: "gyé", ipa: "ɟ", hint: "Palatal d: British duke, during.", example: { hu: "gyerek", en: "child" }, kind: "consonant" },
  { glyph: "H", name: "há", ipa: "h", hint: "As in human. Silent in a few names.", example: { hu: "ház", en: "house" }, kind: "consonant" },
  { glyph: "I", name: "i", ipa: "i", hint: "sit, but tenser. Neutral for harmony.", example: { hu: "hit", en: "faith" }, kind: "vowel-neutral" },
  { glyph: "Í", name: "í", ipa: "iː", hint: "see, leave. Neutral for harmony.", example: { hu: "ír", en: "writes" }, kind: "vowel-neutral" },
  { glyph: "J", name: "jé", ipa: "j", hint: "yes, you — never English jam.", example: { hu: "jó", en: "good" }, kind: "consonant" },
  { glyph: "K", name: "ká", ipa: "k", hint: "As in key.", example: { hu: "könyv", en: "book" }, kind: "consonant" },
  { glyph: "L", name: "el", ipa: "l", hint: "Clear l, never dark/velar.", example: { hu: "lány", en: "girl" }, kind: "consonant" },
  { glyph: "Ly", name: "ely", ipa: "j", hint: "Sounds exactly like j. Historical spelling.", example: { hu: "lyuk", en: "hole" }, kind: "consonant" },
  { glyph: "M", name: "em", ipa: "m", hint: "As in mind.", example: { hu: "magyar", en: "Hungarian" }, kind: "consonant" },
  { glyph: "N", name: "en", ipa: "n", hint: "As in need; ng before k/g.", example: { hu: "nap", en: "day / sun" }, kind: "consonant" },
  { glyph: "Ny", name: "eny", ipa: "ɲ", hint: "canyon, Spanish ñ.", example: { hu: "nyár", en: "summer" }, kind: "consonant" },
  { glyph: "O", name: "o", ipa: "o", hint: "Closed o, like force, not British hot.", example: { hu: "bokor", en: "bush" }, kind: "vowel-back" },
  { glyph: "Ó", name: "ó", ipa: "oː", hint: "Long o, coat held.", example: { hu: "tó", en: "lake" }, kind: "vowel-back" },
  { glyph: "Ö", name: "ö", ipa: "ø", hint: "French le, German schön. Purse the lips on e.", example: { hu: "kör", en: "circle" }, kind: "vowel-front" },
  { glyph: "Ő", name: "ő", ipa: "øː", hint: "The long twin of ö. Hold it.", example: { hu: "kő", en: "stone" }, kind: "vowel-front" },
  { glyph: "P", name: "pé", ipa: "p", hint: "As in peas. Unaspirated.", example: { hu: "pénz", en: "money" }, kind: "consonant" },
  { glyph: "R", name: "er", ipa: "r", hint: "A tapped or lightly trilled r.", example: { hu: "rózsa", en: "rose" }, kind: "consonant" },
  { glyph: "S", name: "es", ipa: "ʃ", hint: "Always sh, as in ship. This surprises everyone.", example: { hu: "sör", en: "beer" }, kind: "consonant" },
  { glyph: "Sz", name: "esz", ipa: "s", hint: "Plain s, as in see. The opposite of English.", example: { hu: "szép", en: "beautiful" }, kind: "consonant" },
  { glyph: "T", name: "té", ipa: "t", hint: "As in tell. Unaspirated, dental.", example: { hu: "tea", en: "tea" }, kind: "consonant" },
  { glyph: "Ty", name: "tyé", ipa: "c", hint: "Palatal t: British stew, Tuesday.", example: { hu: "tyúk", en: "hen" }, kind: "consonant" },
  { glyph: "U", name: "u", ipa: "u", hint: "put, book — short.", example: { hu: "utca", en: "street" }, kind: "vowel-back" },
  { glyph: "Ú", name: "ú", ipa: "uː", hint: "food, rule — long.", example: { hu: "út", en: "road" }, kind: "vowel-back" },
  { glyph: "Ü", name: "ü", ipa: "y", hint: "French tu. Say ee with pursed lips.", example: { hu: "fül", en: "ear" }, kind: "vowel-front" },
  { glyph: "Ű", name: "ű", ipa: "yː", hint: "Long ü. Hold the purse.", example: { hu: "tűz", en: "fire" }, kind: "vowel-front" },
  { glyph: "V", name: "vé", ipa: "v", hint: "As in very.", example: { hu: "víz", en: "water" }, kind: "consonant" },
  { glyph: "Z", name: "zé", ipa: "z", hint: "As in zoo.", example: { hu: "zene", en: "music" }, kind: "consonant" },
  { glyph: "Zs", name: "zsé", ipa: "ʒ", hint: "pleasure, genre, Jacques.", example: { hu: "zseb", en: "pocket" }, kind: "consonant" },
];

export const LOAN_LETTERS = [
  { glyph: "Q", name: "kú", note: "Loans only (quasi)." },
  { glyph: "W", name: "dupla vé", note: "Loans and names (Washington)." },
  { glyph: "X", name: "iksz", note: "Loans (taxi)." },
  { glyph: "Y", name: "ipszilon", note: "Names and the second half of ly, ny, gy, ty." },
];

export const SOUND_NOTES = [
  {
    title: "Forty letters, fourteen vowels",
    body: "Hungarian treats cs, dz, dzs, gy, ly, ny, sz, ty, zs as single letters. They sort as their own entries, not as c + s.",
  },
  {
    title: "Stress is boring — in a good way",
    body: "Primary stress always falls on the first syllable. Never shift it. fiaiéi is still stressed on fi-.",
  },
  {
    title: "No diphthongs",
    body: "Each vowel is its own beat. Auto is ah-oo-to, not ‘ow-to’. Stacked vowels in fiaiéi are five separate sounds.",
  },
  {
    title: "Length is meaning",
    body: "Short vs long is a different word, not a mood. kor (age) / kór (disease), öreg (old) is not őrög. Accents are not optional.",
  },
  {
    title: "Doubling holds the sound",
    body: "abban is ab-ban. Digraphs double the first glyph only: busz + -szal → busszal (busz-szal).",
  },
  {
    title: "s and sz are swapped",
    body: "s = English sh. sz = English s. This is the first trap. Magyarország starts with a sh.",
  },
];
