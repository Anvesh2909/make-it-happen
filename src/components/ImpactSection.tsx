import { motion } from "framer-motion";

const ImpactSection = () => {
  return (
    <section className="py-32 px-6 bg-gradient-subtle">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-4">Impact</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            Unlocking Insights from
            <br />
            <span className="text-gradient-hero">Code-Mixed Communication</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
            This project revolutionizes how we understand multilingual social media data from India.
            By delivering explainable, multi-task NLP capabilities, we empower deeper
            and more trustworthy analysis of online communication.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-8 justify-center text-center"
        >
          {[
            { label: "Languages", value: "3+" },
            { label: "NLP Tasks", value: "3" },
            { label: "XAI Methods", value: "3" },
            { label: "Metrics", value: "4" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-4xl font-display font-bold text-primary">{stat.value}</p>
              <p className="text-sm font-mono text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-sm text-muted-foreground font-mono"
        >
          Get in touch to learn more about our advancements.
        </motion.p>
      </div>
    </section>
  );
};

export default ImpactSection;
