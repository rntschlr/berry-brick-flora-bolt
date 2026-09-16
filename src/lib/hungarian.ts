export type Harmony = "back" | "front" | "rounded" | "neutral";

const BACK = "aáoóuú";
const FRONT_UNROUNDED = "eé";
const FRONT_ROUNDED = "öőüű";
const NEUTRAL = "ií";

function lastClassifying(word: string): Harmony {
  const w = word.toLowerCase().normalize("NFC");
  let seen: Harmony = "neutral";
  for (const ch of w) {
    if (BACK.includes(ch)) seen = "back";
    else if (FRONT_ROUNDED.includes(ch)) seen = "rounded";
    else if (FRONT_UNROUNDED.includes(ch)) seen = "front";
  }
  return seen;
}

export function classifyHarmony(word: string): {
  class: Harmony;
  vowels: string[];
  label: string;
  twoFold: string;
  threeFold: string;
} {
  const w = word.toLowerCase().normalize("NFC");
  const vowels = [...w].filter((ch) => BACK.includes(ch) || FRONT_UNROUNDED.includes(ch) || FRONT_ROUNDED.includes(ch) || NEUTRAL.includes(ch));
  const cls = lastClassifying(w);
  const label =
    cls === "back"
      ? "Back — endings like -ban, -ok, -hoz"
      : cls === "rounded"
        ? "Front rounded — endings like -ben, -ök, -höz"
        : cls === "front"
          ? "Front unrounded — endings like -ben, -ek, -hez"
          : "Neutral (i/í only) — treated as back: írok, hidat";
  return {
    class: cls,
    vowels,
    label,
    twoFold: cls === "back" || cls === "neutral" ? "back (-ban, -nak, -val)" : "front (-ben, -nek, -vel)",
    threeFold:
      cls === "back" || cls === "neutral"
        ? "-ok / -hoz / -on"
        : cls === "rounded"
          ? "-ök / -höz / -ön"
          : "-ek / -hez / -en",
  };
}

export function sampleSuffixes(cls: Harmony) {
  const back = cls === "back" || cls === "neutral";
  const rounded = cls === "rounded";
  return [
    { name: "inessive", form: back ? "-ban" : "-ben" },
    { name: "dative", form: back ? "-nak" : "-nek" },
    { name: "allative", form: back ? "-hoz" : rounded ? "-höz" : "-hez" },
    { name: "plural", form: back ? "-ok" : rounded ? "-ök" : "-ek" },
    { name: "1sg indef.", form: back ? "-ok" : rounded ? "-ök" : "-ek" },
  ];
}
