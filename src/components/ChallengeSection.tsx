import { motion } from "framer-motion";
import { AlertTriangle, Globe, Layers, Eye } from "lucide-react";

const limitations = [
  {
    icon: Globe,
    title: "English-Centric Training",
    description: "Most NLP models are trained on pure English datasets, ill-equipped for multilingual nuances.",
  },
  {
    icon: AlertTriangle,
    title: "No Code-Mix Comprehension",
    description: "Systems struggle with mixed scripts, informal slang, and transliteration in Indian social media.",
  },
  {
    icon: Layers,
    title: "Single-Task Focus",
    description: "Existing models perform only one task—sentiment OR emotion OR entity recognition—limiting utility.",
  },
  {
    icon: Eye,
    title: "Absence of Explainability",
    description: "They fail to explain why a prediction was made, hindering trust and deeper insights.",
  },
];

const ChallengeSection = () => {
  return (
    <section className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-4">The Problem</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            Code-Mixed Indian Social Media
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Users in India blend languages like Telugu-English, Hindi-English, and Tamil-English within single sentences.
            Conventional NLP systems cannot handle this dynamic communication style.
          </p>
        </motion.div>

        {/* Example code-mixed text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-16 p-6 rounded-xl bg-secondary/30 border border-border"
        >
          <p className="font-mono text-sm text-muted-foreground mb-2">// example code-mixed tweet</p>
          <p className="font-mono text-base text-foreground">
            "Ee movie <span className="text-primary">chala bagundi</span> 🔥 but climax <span className="text-primary">lo twist expect cheyyale</span>"
          </p>
          <p className="font-mono text-xs text-muted-foreground mt-2">— Telugu-English code-mixed sentiment</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {limitations.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group p-6 rounded-xl bg-card border border-border hover:border-glow transition-colors duration-300 shadow-card"
            >
              <item.icon className="w-5 h-5 text-primary mb-4" />
              <h3 className="text-lg font-display font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChallengeSection;
