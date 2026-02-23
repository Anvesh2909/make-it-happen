import { motion } from "framer-motion";

const team = [
  { name: "Bharath Chepuri", id: "2300031558" },
  { name: "Mokam Reddy", id: "2300032813" },
  { name: "Anvesh Yadav", id: "" },
  { name: "Shaik Salman", id: "2300032987" },
  { name: "E Praveen", id: "2300033269" },
];

const TeamSection = () => {
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
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-4">The Team</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            Meet the Researchers
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="p-5 rounded-xl bg-card border border-border text-center shadow-card"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-lg font-display font-bold text-primary">
                  {member.name.charAt(0)}
                </span>
              </div>
              <h3 className="text-sm font-display font-semibold text-foreground mb-1">{member.name}</h3>
              {member.id && (
                <p className="text-xs font-mono text-muted-foreground">{member.id}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
