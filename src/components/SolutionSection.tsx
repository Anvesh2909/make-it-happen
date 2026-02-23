import { motion } from "framer-motion";
import { Brain, Layers, Search, BarChart3 } from "lucide-react";

const features = [
  { icon: Brain, title: "Multilingual Understanding", desc: "Interprets complex code-mixed inputs across Indian languages." },
  { icon: Layers, title: "Multi-Task Performance", desc: "Executes sentiment, emotion, and NER concurrently." },
  { icon: Search, title: "Explainable Predictions", desc: "Clarifies reasoning behind each prediction transparently." },
  { icon: BarChart3, title: "Real-World Application", desc: "Optimized for authentic social media text from diverse platforms." },
];

const SolutionSection = () => {
  return (
    <section className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-4">Our Solution</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            Bridging the Language Gap
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A novel, unified AI system designed to provide comprehensive and transparent understanding of code-mixed Indian languages.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative p-6 rounded-xl bg-card border border-border shadow-card group hover:shadow-glow hover:border-glow transition-all duration-500"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-base font-display font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
