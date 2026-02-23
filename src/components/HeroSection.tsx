import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-accent/5 blur-[100px]" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-sm tracking-[0.3em] uppercase text-primary mb-6">
            Research Project · NLP · Explainable AI
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.95] tracking-tight mb-8"
        >
          <span className="text-foreground">Explainable</span>
          <br />
          <span className="text-gradient-hero">Multilingual NLP</span>
          <br />
          <span className="text-muted-foreground text-4xl md:text-5xl lg:text-6xl font-light">
            for Code-Mixed Indian Text
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10"
        >
          A unified AI system for sentiment analysis, emotion detection, and named entity recognition
          in Telugu-English, Hindi-English, and Tamil-English code-mixed social media text.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          {["XLM-RoBERTa", "SHAP", "LIME", "Multi-Task Learning"].map((tag) => (
            <span
              key={tag}
              className="px-4 py-2 rounded-full border border-glow bg-secondary/50 text-sm font-mono text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-20 animate-float"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="mx-auto text-muted-foreground">
            <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
