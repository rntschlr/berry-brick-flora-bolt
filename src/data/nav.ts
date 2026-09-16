export type NavItem = {
  href: string;
  label: string;
  id: string;
  blurb: string;
};

export const NAV: NavItem[] = [
  { id: "desk", href: "/", label: "Desk", blurb: "Start here" },
  { id: "alphabet", href: "/alphabet", label: "Alphabet", blurb: "40 letters, the s/sz trap" },
  { id: "harmony", href: "/harmony", label: "Vowel harmony", blurb: "Back, front, rounded" },
  { id: "cases", href: "/cases", label: "Noun cases", blurb: "18 endings and the triads" },
  { id: "verbs", href: "/verbs", label: "Verbs", blurb: "Definite, coverbs, mood" },
  { id: "possession", href: "/possession", label: "Possession", blurb: "házam, van kutyám" },
  { id: "pronouns", href: "/pronouns", label: "Pronouns", blurb: "Drop them, case them" },
  { id: "adjectives", href: "/adjectives", label: "Adjectives", blurb: "Comparative, no agreement" },
  { id: "word-building", href: "/word-building", label: "Word-building", blurb: "Suffix machinery" },
  { id: "grammar", href: "/grammar", label: "Syntax & extras", blurb: "van, plurals, word order" },
  { id: "basics", href: "/basics", label: "Basics", blurb: "Numbers, colours, time" },
  { id: "phrases", href: "/phrases", label: "How to say", blurb: "Hello to I love you" },
  { id: "lab", href: "/lab", label: "Workbenches", blurb: "Case lab, conjugator" },
  { id: "practice", href: "/practice", label: "Drill", blurb: "Twenty questions" },
];
