/**
 * Client-side NLP simulation mimicking the Python CodeMixModel pipeline.
 * Uses rule-based heuristics since we can't run PyTorch in the browser.
 */

export const SENTIMENT_LABELS = ["Negative", "Neutral", "Positive"] as const;
export const EMOTION_LABELS = ["Happy", "Angry", "Sad", "Fear", "Surprise", "Disgust", "Neutral"] as const;
export const NER_LABELS = ["O", "B-PER", "I-PER", "B-LOC", "I-LOC", "B-ORG", "I-ORG"] as const;

type SentimentLabel = (typeof SENTIMENT_LABELS)[number];
type EmotionLabel = (typeof EMOTION_LABELS)[number];

export interface NLPResult {
  text: string;
  sentiment: { label: SentimentLabel; scores: Record<SentimentLabel, number> };
  emotion: { label: EmotionLabel; scores: Record<EmotionLabel, number> };
  ner: Array<{ token: string; tag: string }>;
  attention: Record<string, number>;
}

const POSITIVE_WORDS = [
  "love", "great", "amazing", "superb", "awesome", "fantastic", "wonderful", "good", "best",
  "happy", "excellent", "beautiful", "perfect", "brilliant", "baagundi", "super", "mast",
];
const NEGATIVE_WORDS = [
  "bad", "hate", "terrible", "awful", "worst", "horrible", "disgusting", "poor", "nahi",
  "pasand nahi", "sad", "angry", "bayama", "scary", "fear", "miss",
];
const FEAR_WORDS = ["fear", "scary", "bayama", "afraid", "terrified", "horror", "danger"];
const SAD_WORDS = ["sad", "miss", "cry", "tears", "lonely", "depressed", "heartbreak"];
const ANGRY_WORDS = ["angry", "furious", "rage", "hate", "annoying", "irritating"];
const SURPRISE_WORDS = ["surprise", "shocked", "unexpected", "wow", "unbelievable", "launch", "new"];
const DISGUST_WORDS = ["disgusting", "gross", "yuck", "eww", "horrible"];

const KNOWN_PERSONS = [
  "rahul gandhi", "virat kohli", "modi", "narendra modi", "sachin", "dhoni",
  "amitabh", "shah rukh khan", "priyanka", "kejriwal",
];
const KNOWN_LOCATIONS = [
  "delhi", "mumbai", "hyderabad", "bangalore", "chennai", "kolkata", "india",
  "pune", "jaipur", "lucknow", "ahmedabad",
];
const KNOWN_ORGS = [
  "microsoft", "tata", "tata consultancy services", "google", "infosys", "wipro",
  "reliance", "amazon", "flipkart", "bjp", "congress",
];

function softmax(scores: number[]): number[] {
  const max = Math.max(...scores);
  const exps = scores.map((s) => Math.exp(s - max));
  const sum = exps.reduce((a, b) => a + b, 0);
  return exps.map((e) => e / sum);
}

function countMatches(text: string, words: string[]): number {
  const lower = text.toLowerCase();
  return words.filter((w) => lower.includes(w)).length;
}

export function analyzeText(text: string): NLPResult {
  const lower = text.toLowerCase();
  const words = text.split(/\s+/);

  // --- Sentiment ---
  const posCount = countMatches(lower, POSITIVE_WORDS);
  const negCount = countMatches(lower, NEGATIVE_WORDS);
  const rawSent = [negCount * 1.5 + 0.1, 0.5, posCount * 1.5 + 0.1];
  const sentProbs = softmax(rawSent);
  const sentScores = Object.fromEntries(
    SENTIMENT_LABELS.map((l, i) => [l, Math.round(sentProbs[i] * 1000) / 1000])
  ) as Record<SentimentLabel, number>;
  const sentLabel = SENTIMENT_LABELS[sentProbs.indexOf(Math.max(...sentProbs))];

  // --- Emotion ---
  const rawEmo = [
    countMatches(lower, POSITIVE_WORDS) * 1.2, // Happy
    countMatches(lower, ANGRY_WORDS) * 1.3,     // Angry
    countMatches(lower, SAD_WORDS) * 1.3,        // Sad
    countMatches(lower, FEAR_WORDS) * 1.3,       // Fear
    countMatches(lower, SURPRISE_WORDS) * 1.1,   // Surprise
    countMatches(lower, DISGUST_WORDS) * 1.3,    // Disgust
    0.3,                                          // Neutral
  ];
  const emoProbs = softmax(rawEmo);
  const emoScores = Object.fromEntries(
    EMOTION_LABELS.map((l, i) => [l, Math.round(emoProbs[i] * 1000) / 1000])
  ) as Record<EmotionLabel, number>;
  const emoLabel = EMOTION_LABELS[emoProbs.indexOf(Math.max(...emoProbs))];

  // --- NER ---
  const ner: Array<{ token: string; tag: string }> = [];
  const usedIndices = new Set<number>();

  // Multi-word entities first
  for (const name of [...KNOWN_PERSONS, ...KNOWN_LOCATIONS, ...KNOWN_ORGS]) {
    const nameWords = name.split(" ");
    const idx = lower.indexOf(name);
    if (idx === -1) continue;
    const before = lower.slice(0, idx);
    const startWord = before.split(/\s+/).filter(Boolean).length;
    const isP = KNOWN_PERSONS.includes(name);
    const isL = KNOWN_LOCATIONS.includes(name);
    const prefix = isP ? "PER" : isL ? "LOC" : "ORG";
    nameWords.forEach((_, j) => {
      usedIndices.add(startWord + j);
    });
    // We'll mark in the full pass below
  }

  words.forEach((word, i) => {
    if (usedIndices.has(i)) return;
    const w = word.toLowerCase().replace(/[^a-z]/g, "");
    let tag = "O";
    if (KNOWN_PERSONS.some((p) => p.split(" ").includes(w))) tag = "B-PER";
    else if (KNOWN_LOCATIONS.some((l) => l.split(" ").includes(w))) tag = "B-LOC";
    else if (KNOWN_ORGS.some((o) => o.split(" ").includes(w))) tag = "B-ORG";
    ner.push({ token: word, tag });
  });

  // Re-build with multi-word awareness
  const nerFinal: Array<{ token: string; tag: string }> = [];
  let i = 0;
  while (i < words.length) {
    const remaining = words.slice(i).join(" ").toLowerCase();
    let matched = false;
    for (const entities of [
      { list: KNOWN_PERSONS, prefix: "PER" },
      { list: KNOWN_LOCATIONS, prefix: "LOC" },
      { list: KNOWN_ORGS, prefix: "ORG" },
    ]) {
      for (const name of entities.list) {
        if (remaining.startsWith(name) || remaining.startsWith(name.replace(/[^a-z ]/g, ""))) {
          const count = name.split(" ").length;
          for (let j = 0; j < count && i + j < words.length; j++) {
            nerFinal.push({
              token: words[i + j],
              tag: j === 0 ? `B-${entities.prefix}` : `I-${entities.prefix}`,
            });
          }
          i += count;
          matched = true;
          break;
        }
      }
      if (matched) break;
    }
    if (!matched) {
      nerFinal.push({ token: words[i], tag: "O" });
      i++;
    }
  }

  // --- Attention (simulated) ---
  const attention: Record<string, number> = {};
  const allKeywords = [...POSITIVE_WORDS, ...NEGATIVE_WORDS, ...FEAR_WORDS, ...SAD_WORDS, ...ANGRY_WORDS];
  words.forEach((w) => {
    const clean = w.toLowerCase().replace(/[^a-z]/g, "");
    const isKey = allKeywords.includes(clean);
    const isEntity = nerFinal.some((n) => n.token === w && n.tag !== "O");
    attention[w] = isKey ? 0.6 + Math.random() * 0.4 : isEntity ? 0.4 + Math.random() * 0.3 : 0.05 + Math.random() * 0.15;
  });

  return {
    text,
    sentiment: { label: sentLabel, scores: sentScores },
    emotion: { label: emoLabel, scores: emoScores },
    ner: nerFinal,
    attention,
  };
}
