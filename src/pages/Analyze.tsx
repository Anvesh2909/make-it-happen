import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Zap, Brain, MapPin, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { analyzeText, type NLPResult, SENTIMENT_LABELS, EMOTION_LABELS } from "@/lib/nlpEngine";

const SAMPLE_TEXTS = [
  "Idi chala baagundi yaar, I love this movie!",
  "Mujhe yeh product bilkul pasand nahi aaya, very bad quality",
  "Rahul Gandhi ne Delhi mein press conference ki",
  "Enakku romba bayama irukku, this situation is scary",
  "Microsoft vallu new product launch chesaru Hyderabad lo",
  "Superb performance from Virat Kohli today, absolutely amazing!",
];

const SENTIMENT_COLORS: Record<string, string> = {
  Positive: "text-green-400",
  Negative: "text-red-400",
  Neutral: "text-muted-foreground",
};

const EMOTION_EMOJI: Record<string, string> = {
  Happy: "😊", Angry: "😠", Sad: "😢", Fear: "😨",
  Surprise: "😲", Disgust: "🤢", Neutral: "😐",
};

const NER_COLORS: Record<string, string> = {
  PER: "bg-blue-500/20 text-blue-300 border-blue-500/40",
  LOC: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
  ORG: "bg-purple-500/20 text-purple-300 border-purple-500/40",
};

export default function Analyze() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<NLPResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    if (!text.trim()) return;
    setIsAnalyzing(true);
    // Simulate processing delay
    setTimeout(() => {
      setResult(analyzeText(text.trim()));
      setIsAnalyzing(false);
    }, 800);
  };

  const maxAttn = result ? Math.max(...Object.values(result.attention)) : 1;

  return (
    <main className="bg-background min-h-screen">
      {/* Header */}
      <header className="border-b border-border/50 sticky top-0 z-50 bg-background/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2 font-mono text-xs">
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
          </Link>
          <h1 className="font-display font-bold text-lg text-gradient-hero">
            Code-Mixed NLP Analyzer
          </h1>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Input Section */}
        <section className="mb-10">
          <label className="block font-mono text-sm text-primary mb-3 tracking-wider uppercase">
            Enter Code-Mixed Text
          </label>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste code-mixed Indian text here... (Hindi-English, Telugu-English, Tamil-English)"
            className="bg-card border-border text-foreground min-h-[100px] font-body text-base resize-none focus:border-primary/50"
          />

          <div className="flex flex-wrap gap-2 mt-4">
            {SAMPLE_TEXTS.map((s, i) => (
              <button
                key={i}
                onClick={() => setText(s)}
                className="px-3 py-1.5 rounded-full border border-border bg-secondary/50 text-xs font-mono text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors truncate max-w-[280px]"
              >
                {s}
              </button>
            ))}
          </div>

          <Button
            onClick={handleAnalyze}
            disabled={!text.trim() || isAnalyzing}
            className="mt-6 gap-2 font-mono"
            size="lg"
          >
            <Zap className="w-4 h-4" />
            {isAnalyzing ? "Analyzing..." : "Analyze Text"}
          </Button>
        </section>

        {/* Results */}
        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              key={result.text}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="grid gap-6 md:grid-cols-2"
            >
              {/* Sentiment */}
              <div className="bg-card border border-border rounded-xl p-6 shadow-card">
                <div className="flex items-center gap-2 mb-4">
                  <Brain className="w-5 h-5 text-primary" />
                  <h2 className="font-display font-semibold text-foreground">Sentiment</h2>
                </div>
                <p className={`text-3xl font-display font-bold mb-4 ${SENTIMENT_COLORS[result.sentiment.label]}`}>
                  {result.sentiment.label}
                </p>
                <div className="space-y-2">
                  {SENTIMENT_LABELS.map((l) => (
                    <div key={l} className="flex items-center gap-3">
                      <span className="font-mono text-xs text-muted-foreground w-16">{l}</span>
                      <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${result.sentiment.scores[l] * 100}%` }}
                          transition={{ duration: 0.6, delay: 0.1 }}
                          className="h-full bg-primary/70 rounded-full"
                        />
                      </div>
                      <span className="font-mono text-xs text-muted-foreground w-12 text-right">
                        {(result.sentiment.scores[l] * 100).toFixed(1)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Emotion */}
              <div className="bg-card border border-border rounded-xl p-6 shadow-card">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">{EMOTION_EMOJI[result.emotion.label]}</span>
                  <h2 className="font-display font-semibold text-foreground">Emotion</h2>
                </div>
                <p className="text-3xl font-display font-bold mb-4 text-accent">
                  {result.emotion.label}
                </p>
                <div className="space-y-1.5">
                  {EMOTION_LABELS.map((l) => (
                    <div key={l} className="flex items-center gap-3">
                      <span className="font-mono text-xs text-muted-foreground w-16 truncate">{l}</span>
                      <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${result.emotion.scores[l] * 100}%` }}
                          transition={{ duration: 0.6, delay: 0.15 }}
                          className="h-full bg-accent/70 rounded-full"
                        />
                      </div>
                      <span className="font-mono text-[10px] text-muted-foreground w-10 text-right">
                        {(result.emotion.scores[l] * 100).toFixed(0)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* NER */}
              <div className="bg-card border border-border rounded-xl p-6 shadow-card">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-5 h-5 text-primary" />
                  <h2 className="font-display font-semibold text-foreground">Named Entities</h2>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {result.ner.map((n, i) => {
                    const entityType = n.tag !== "O" ? n.tag.slice(2) : null;
                    return (
                      <span
                        key={i}
                        className={`px-2 py-1 rounded text-sm font-mono ${
                          entityType
                            ? `border ${NER_COLORS[entityType] || "bg-muted text-foreground"}`
                            : "text-muted-foreground"
                        }`}
                      >
                        {n.token}
                        {entityType && n.tag.startsWith("B-") && (
                          <span className="ml-1 text-[10px] opacity-70">{entityType}</span>
                        )}
                      </span>
                    );
                  })}
                </div>
                {result.ner.every((n) => n.tag === "O") && (
                  <p className="text-sm text-muted-foreground mt-2 font-mono">No entities detected</p>
                )}
                <div className="flex gap-4 mt-4 text-[10px] font-mono text-muted-foreground">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-blue-500/40" /> PER</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-emerald-500/40" /> LOC</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-purple-500/40" /> ORG</span>
                </div>
              </div>

              {/* Attention */}
              <div className="bg-card border border-border rounded-xl p-6 shadow-card">
                <div className="flex items-center gap-2 mb-4">
                  <Eye className="w-5 h-5 text-primary" />
                  <h2 className="font-display font-semibold text-foreground">Attention Weights</h2>
                </div>
                <p className="text-[10px] font-mono text-muted-foreground mb-3">
                  CLS → token attention (last layer, head-0)
                </p>
                <div className="flex flex-wrap gap-1">
                  {Object.entries(result.attention).map(([token, weight], i) => {
                    const intensity = weight / (maxAttn + 1e-9);
                    return (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.03 }}
                        className="px-2 py-1 rounded text-sm font-mono"
                        style={{
                          backgroundColor: `hsl(38 90% 55% / ${intensity * 0.6})`,
                          color: intensity > 0.5 ? "hsl(225 30% 6%)" : "hsl(210 20% 85%)",
                        }}
                        title={`${token}: ${weight.toFixed(4)}`}
                      >
                        {token}
                      </motion.span>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
