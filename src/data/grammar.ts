export const POSSESSION = {
  summary:
    "Hungarian marks the possessed thing, not the possessor, with a personal ending. ‘My house’ is házam — house-my.",
  single: [
    { person: "én", back: "-m / -om / -am", front: "-m / -em / -öm", ex: "házam, kertem, köpenyem" },
    { person: "te", back: "-d / -od / -ad", front: "-d / -ed / -öd", ex: "házad, kerted" },
    { person: "ő", back: "-ja / -a", front: "-je / -e", ex: "háza, kertje" },
    { person: "mi", back: "-nk / -unk / -ánk", front: "-nk / -ünk", ex: "házunk, kertünk" },
    { person: "ti", back: "-tok / -otok / -atok", front: "-tek / -etek / -ötök", ex: "házatok, kertetek" },
    { person: "ők", back: "-juk / -uk", front: "-jük / -ük", ex: "házuk, kertjük" },
  ],
  multiple: [
    { person: "én", form: "-aim / -eim / -im", ex: "házaim, könyveim" },
    { person: "te", form: "-aid / -eid / -id", ex: "házaid" },
    { person: "ő", form: "-ai / -ei / -i", ex: "házai" },
    { person: "mi", form: "-aink / -eink / -ink", ex: "házaink" },
    { person: "ti", form: "-aitok / -eitek / -itek", ex: "házaitok" },
    { person: "ők", form: "-aik / -eik / -ik", ex: "házaik" },
  ],
  notes: [
    "Do not stack the ordinary plural -k onto a possessed noun. gyerekeim, never gyerekekem.",
    "To name the possessor, use nominative next to it (Péter háza) or dative + a (Péternek a háza) when the possessor is heavier or focused.",
    "Have = dative/possessive + van: Van egy házam. / Nincs házam. / Van neki kutyája?",
    "External possession: body parts and feelings often put the person in the dative or drop it onto the verb’s object: Fáj a fejem. Megfájdult a lábam.",
    "Possessive pronouns as standalone: enyém, tied/tiéd, övé, miénk, tiétek, övék — used when the noun is already known: Ez a ház az enyém.",
  ],
  examples: [
    { hu: "A barátom kocsija új.", en: "My friend’s car is new." },
    { hu: "Nekem nincs időm.", en: "I have no time." },
    { hu: "A tied szebb.", en: "Yours is prettier." },
  ],
};

export const PRONOUNS = {
  personal: [
    { nom: "én", acc: "engem", dat: "nekem", en: "I / me" },
    { nom: "te", acc: "téged", dat: "neked", en: "you (sg informal)" },
    { nom: "ő", acc: "őt", dat: "neki", en: "he / she — no gender split" },
    { nom: "mi", acc: "minket / bennünket", dat: "nekünk", en: "we / us" },
    { nom: "ti", acc: "titeket / benneteket", dat: "nektek", en: "you (pl informal)" },
    { nom: "ők", acc: "őket", dat: "nekik", en: "they" },
  ],
  polite: [
    { nom: "ön / Ön", en: "you (sg polite)" },
    { nom: "önök / Önök", en: "you (pl polite)" },
    { nom: "maga / maguk", en: "you (older / regional polite)" },
  ],
  demonstrative: [
    { hu: "ez", en: "this", note: "Harmonises and takes case: ezt, ennek, ebben, erre…" },
    { hu: "az", en: "that", note: "azt, annak, abban. Before a noun it doubles as the article az." },
    { hu: "ezek / azok", en: "these / those" },
    { hu: "ilyen / olyan", en: "this kind / that kind" },
    { hu: "ennyi / annyi", en: "this many / that many" },
  ],
  interrogative: [
    { hu: "ki / kik", en: "who" },
    { hu: "mi / mik", en: "what" },
    { hu: "melyik", en: "which (of them)" },
    { hu: "hol / hová / honnan", en: "where / to where / from where" },
    { hu: "mikor", en: "when" },
    { hu: "hogyan / hogy", en: "how" },
    { hu: "miért", en: "why" },
    { hu: "mennyi / hány", en: "how much / how many" },
  ],
  relative: [
    { hu: "aki", en: "who (people)" },
    { hu: "ami / amely / amelyik", en: "which / that (things)" },
    { hu: "ahol / ahová / ahonnan", en: "where / to where / from where" },
  ],
  reflexive: [
    { hu: "magam, magad, maga, magunk, magatok, maguk", en: "myself … themselves" },
    { hu: "Megnézem magam.", en: "I look at myself." },
  ],
  notes: [
    "Drop subject pronouns unless you are contrasting or stressing them. The verb already names the person.",
    "ő is genderless. Context or a name does the work English does with he/she.",
    "Cases attach to pronoun stems: bennem, veled, tőle, rátok.",
  ],
};

export const ADJECTIVES = {
  summary:
    "Attributive adjectives sit before the noun and do not agree in number or case. Predicative adjectives do take plural.",
  points: [
    "a piros ház, a piros házakban — red stays bare in front of the noun.",
    "A ház piros. A házak pirosak. — after the noun (predicate), plural -k appears.",
    "Comparative: -bb / -abb / -ebb. szebb, nagyobb, öregebb.",
    "Superlative: leg- + comparative. a legszebb, a legnagyobb.",
    "‘than’: -nál/-nél or mint. Nagyobb nálam. Nagyobb, mint Péter.",
    "Equality: olyan … mint. Olyan magas, mint a testvére.",
    "Irregulars: jó → jobb → legjobb; sok → több → legtöbb; szép is regular-ish (szebb).",
  ],
  examples: [
    { hu: "Ez egy szép város.", en: "This is a beautiful city." },
    { hu: "Buda idősebb Pestnél.", en: "Buda is older than Pest." },
    { hu: "A Duna a leghosszabb folyó itt.", en: "The Danube is the longest river here." },
  ],
  list: [
    { hu: "nagy", en: "big", cmp: "nagyobb" },
    { hu: "kicsi", en: "small", cmp: "kisebb" },
    { hu: "jó", en: "good", cmp: "jobb" },
    { hu: "rossz", en: "bad", cmp: "rosszabb" },
    { hu: "szép", en: "beautiful", cmp: "szebb" },
    { hu: "magas", en: "tall", cmp: "magasabb" },
    { hu: "fiatal", en: "young", cmp: "fiatalabb" },
    { hu: "öreg / idős", en: "old", cmp: "öregebb / idősebb" },
    { hu: "meleg", en: "warm", cmp: "melegebb" },
    { hu: "hideg", en: "cold", cmp: "hidegebb" },
  ],
};

export const WORD_BUILDING = [
  { suffix: "-ás / -és", makes: "noun from verb", ex: "írás (writing), kérdés (question)" },
  { suffix: "-ság / -ség", makes: "abstract noun", ex: "szépség (beauty), barátság (friendship)" },
  { suffix: "-mány / -mény", makes: "result noun", ex: "tanulmány (study), eredmény (result)" },
  { suffix: "-ász / -ész", makes: "profession", ex: "orvos? no — fodrász (hairdresser), újságíró uses -ó" },
  { suffix: "-ó / -ő", makes: "present participle / agent", ex: "tanuló (learner), író (writer)" },
  { suffix: "-t / -tt", makes: "past participle", ex: "zárt (closed), főtt (cooked)" },
  { suffix: "-va / -ve", makes: "adverbial participle", ex: "ülve (while sitting), nyitva (open)" },
  { suffix: "-s / -os / -es / -ös", makes: "adjective ‘having’", ex: "szerencsés (lucky), vizes (wet)" },
  { suffix: "-i", makes: "adjective of origin/relation", ex: "budapesti, délutáni, magyarországi" },
  { suffix: "-an / -en / -ul / -ül", makes: "adverb", ex: "szépen, magyarul, jól (irregular)" },
  { suffix: "-ít", makes: "causative / transitive verb", ex: "szépít (beautify), készít (prepare)" },
  { suffix: "-ul / -ül", makes: "intransitive verb", ex: "készül (get ready), szépül" },
  { suffix: "-zik / -l", makes: "verb from noun", ex: "kávézik, telefonál, ebédel" },
  { suffix: "-kozik / -kezik / -közik", makes: "reflexive / middle", ex: "mosakodik (washes oneself)" },
  { suffix: "-gat / -get", makes: "frequentative", ex: "nézeget (keep glancing), olvasgat" },
  { suffix: "-hat / -het", makes: "potential", ex: "láthat, mehet" },
  { suffix: "-at / -tat", makes: "causative", ex: "csináltat (have something done)" },
  { suffix: "-lag / -leg", makes: "adverb of viewpoint", ex: "elméletileg, viszonylag" },
  { suffix: "-féle / -szerű", makes: "kind / -like", ex: "ezerféle, gyermekszerű" },
  { suffix: "-ik (adj)", makes: "‘the … one of’", ex: "második (second), melyik" },
];

export const PLURALS = {
  summary: "The plural suffix is -k, usually with a linking vowel. Quantity already pluralises — don’t double it.",
  points: [
    "házak, emberek, sörök, autók. Linking vowels o / e / ö, sometimes a / e after low stems (házak).",
    "Final a/e lengthen: kutya → kutyák, eke → ekék.",
    "After a number or quantity, keep the singular: három ház, sok ember, két sör.",
    "Adjectives before nouns do not pluralise. Predicates do: A lányok szépek.",
    "Possessed plurals use the possessive plural set, not -k + possessive.",
  ],
  examples: [
    { hu: "Látok sok embert.", en: "I see many people. (not embereket)" },
    { hu: "A magyar lányok szépek.", en: "Hungarian girls are pretty." },
  ],
};

export const VAN = {
  summary: "van is ‘is’ and also ‘there is’. Hungarian drops it when a quality is predicated in 3rd person present.",
  points: [
    "Keep van for location, existence, and possession: Itt van. Van kenyér. Van kutyám.",
    "Drop van when saying what someone/something is like, in 3sg/3pl present: Ő tanár. A ház nagy. Ők fáradtak.",
    "Never drop it in the past or future: Tanár volt. Tanár lesz.",
    "Negatives of existence: nincs / nincsenek. Nincs időm. Nincsenek almáim.",
    "1st and 2nd persons of ‘to be’ never drop: Tanár vagyok. Éhes vagy?",
  ],
  examples: [
    { hu: "A kávé forró.", en: "The coffee is hot. (no van)" },
    { hu: "A kávé az asztalon van.", en: "The coffee is on the table. (van stays)" },
    { hu: "Nincs itthon.", en: "S/he isn’t at home." },
  ],
};

export const HOGY = {
  summary: "hogy is ‘that’ (complementiser) and also ‘how’. Context splits them.",
  points: [
    "Complement: Azt mondta, hogy késik. — She said that she’s late.",
    "Hungarian likes a dummy azt before the clause: Azt akarom, hogy maradj.",
    "How?: Hogy vagy? Hogyan működik? (hogyan is the careful form)",
    "As a relative manner: úgy … ahogy.",
  ],
  examples: [
    { hu: "Nem tudom, hogy hol van.", en: "I don’t know where it is." },
    { hu: "Hogy hívnak?", en: "What are you called?" },
  ],
};

export const NEGATIVES = {
  summary: "nem negates statements. ne negates commands and most subjunctives. se / sem add ‘neither / not even’.",
  points: [
    "Nem beszélek németül.",
    "Ne menj! Ne edd meg!",
    "sincs = sem + nincs. Semmit sem láttam — double negatives are grammatical and required.",
    "sehol, soha, senki, semmi, sehogy — negative indefinites want a negative particle in the clause.",
  ],
  examples: [
    { hu: "Senki nem jött.", en: "Nobody came." },
    { hu: "Soha nem ittam pálinkát.", en: "I have never drunk pálinka." },
  ],
};

export const SYNTAX = {
  summary:
    "Hungarian is topic–focus–verb, not SVO. Whatever is new or contrasted sits immediately before the verb and takes the stress.",
  points: [
    "Neutral: Péter tegnap könyvet vett. (object next to the verb, often coverb after).",
    "Focus: Péter KÖNYVET vett (not a newspaper). Only one focused constituent.",
    "Questions put the question word in focus: Kit láttál? Hol van a kulcs?",
    "Coverbs jump off when the focus is something else: Nem mentem be. Most megyek be.",
    "Definite articles: a / az (az before vowels). Indefinite: egy, often omitted in generic objects.",
    "Yes–no questions: same words, rising intonation, or the particle -e: Van-e kenyér?",
  ],
  examples: [
    { hu: "A levelet megírtam.", en: "The letter, I have written. (letter is topic)" },
    { hu: "MEGírtam a levelet.", en: "I (did) write the letter. (completion focused)" },
  ],
};

export const POSTPOSITIONS = [
  { hu: "előtt", en: "in front of / before", personal: "előttem" },
  { hu: "mögött", en: "behind", personal: "mögöttem" },
  { hu: "alatt", en: "under", personal: "alattam" },
  { hu: "fölött / felett", en: "above", personal: "fölöttem" },
  { hu: "mellett", en: "beside", personal: "mellettem" },
  { hu: "között / közt", en: "between", personal: "közöttünk" },
  { hu: "után", en: "after", personal: "utánam" },
  { hu: "helyett", en: "instead of", personal: "helyettem" },
  { hu: "nélkül", en: "without", personal: "nélkülem" },
  { hu: "szerint", en: "according to", personal: "szerintem" },
  { hu: "miatt", en: "because of", personal: "miattam" },
  { hu: "számára / részére", en: "for (someone)", personal: "számomra" },
  { hu: "óta", en: "since", personal: "—" },
  { hu: "felé", en: "towards", personal: "felém" },
  { hu: "iránt", en: "towards (feeling)", personal: "irántam" },
  { hu: "ellen", en: "against", personal: "ellenem" },
  { hu: "alapján", en: "on the basis of", personal: "—" },
];
