import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { classifyHarmony, sampleSuffixes } from "./hungarian.ts";

describe("classifyHarmony", () => {
  it("classifies back vowels (ház)", () => {
    const r = classifyHarmony("ház");
    assert.equal(r.class, "back");
    assert.match(r.twoFold, /back/);
    assert.ok(r.vowels.includes("á"));
  });

  it("classifies front unrounded (ember)", () => {
    const r = classifyHarmony("ember");
    assert.equal(r.class, "front");
    assert.match(r.threeFold, /-ek/);
  });

  it("classifies front rounded (tök)", () => {
    const r = classifyHarmony("tök");
    assert.equal(r.class, "rounded");
    assert.match(r.threeFold, /-ök/);
  });

  it("treats i/í-only stems as neutral → back endings", () => {
    const r = classifyHarmony("hid");
    assert.equal(r.class, "neutral");
    assert.match(r.twoFold, /back/);
  });

  it("uses the last classifying vowel (virág → back)", () => {
    // i is neutral; á is back — last classifying wins
    const r = classifyHarmony("virág");
    assert.equal(r.class, "back");
  });

  it("normalizes NFC and is case-insensitive", () => {
    const a = classifyHarmony("HÁZ");
    const b = classifyHarmony("ház");
    assert.equal(a.class, b.class);
  });
});

describe("sampleSuffixes", () => {
  it("returns five named endings for back harmony", () => {
    const s = sampleSuffixes("back");
    assert.equal(s.length, 5);
    assert.equal(s.find((x) => x.name === "inessive")?.form, "-ban");
    assert.equal(s.find((x) => x.name === "allative")?.form, "-hoz");
  });

  it("picks -höz for rounded and -hez for front", () => {
    assert.equal(sampleSuffixes("rounded").find((x) => x.name === "allative")?.form, "-höz");
    assert.equal(sampleSuffixes("front").find((x) => x.name === "allative")?.form, "-hez");
  });

  it("treats neutral like back", () => {
    assert.equal(sampleSuffixes("neutral").find((x) => x.name === "dative")?.form, "-nak");
  });
});
