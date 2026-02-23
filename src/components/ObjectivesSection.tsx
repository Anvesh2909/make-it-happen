import { motion } from "framer-motion";

const objectives = [
  {
    num: "01",
    title: "Sentiment & Emotion Classification",
    description: "Accurately detect sentiment (Positive, Negative, Neutral) and classify emotions (Happy, Angry, Sad, Fear) within code-mixed text.",
    tags: ["Sentiment", "Emotion", "Classification"],
  },
  {
    num: "02",
    title: "Named Entity Recognition",
    description: "Extract Person, Location, and Organization entities from code-mixed social media, adapting to transliteration and script variations.",
    tags: ["NER", "Entities", "Extraction"],
  },
  {
    num: "03",
    title: "XLM-RoBERTa Integration",
    description: "Leverage state-of-the-art cross-lingual models for deep multilingual understanding across diverse Indian languages.",
    tags: ["Transformer", "Cross-lingual", "Embeddings"],
  },
  {
    num: "04",
    title: "Explainability & Evaluation",
    description: "Provide transparency via attention mechanisms, SHAP, and LIME. Evaluate with accuracy, F1-score, precision, and recall.",
    tags: ["SHAP", "LIME", "Attention", "Metrics"],
  },
];

const ObjectivesSection = () => {
  return (
    <section className="py-32 px-6 bg-gradient-subtle">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-4">Objectives</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            A Holistic Approach
          </h2>
        </motion.div>

        <div className="space-y-6">
          {objectives.map((obj, i) => (
            <motion.div
              key={obj.num}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group flex gap-6 md:gap-10 p-6 md:p-8 rounded-xl bg-card/50 border border-border hover:border-glow transition-all duration-300"
            >
              <span className="text-5xl md:text-6xl font-display font-bold text-primary/20 group-hover:text-primary/40 transition-colors shrink-0">
                {obj.num}
              </span>
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-display font-semibold text-foreground mb-2">
                  {obj.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">{obj.description}</p>
                <div className="flex flex-wrap gap-2">
                  {obj.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 text-xs font-mono rounded-full bg-secondary text-secondary-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ObjectivesSection;
