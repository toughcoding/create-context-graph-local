import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import { motion } from "framer-motion";
import { AnimatedGraphBanner } from "@site/src/components/AnimatedGraphBanner";
import {
  TerminalCommand,
  TerminalBlock,
} from "@site/src/components/TerminalCommand";

import styles from "./index.module.css";

// Feature card data
const FEATURES: {
  icon: string;
  title: string;
  description: string;
  accent: string;
}[] = [
  {
    icon: "🏥",
    title: "22 Industry Domains",
    description:
      "Healthcare, financial services, manufacturing, and 19 more. Each with a complete ontology, demo data, and agent tools.",
    accent: "#22c55e",
  },
  {
    icon: "🤖",
    title: "8 Agent Frameworks",
    description:
      "PydanticAI, Claude Agent SDK, LangGraph, CrewAI, and more. Pick your framework, get a working agent.",
    accent: "#3b82f6",
  },
  {
    icon: "📄",
    title: "Rich Demo Data",
    description:
      "LLM-generated entities, professional documents, and multi-step decision traces. Ready to explore out of the box.",
    accent: "#a855f7",
  },
  {
    icon: "🔗",
    title: "Graph Visualization",
    description:
      "Interactive NVL graph explorer with entity detail panel. Click any node to see properties and connections.",
    accent: "#f97316",
  },
  {
    icon: "⚡",
    title: "SaaS Connectors",
    description:
      "Import from GitHub, Slack, Gmail, Jira, Notion, and Salesforce. Or generate synthetic data.",
    accent: "#eab308",
  },
  {
    icon: "✨",
    title: "Custom Domains",
    description:
      "Describe your domain in plain English. The LLM generates a complete ontology, tools, and data.",
    accent: "#ec4899",
  },
];

function HeroSection(): ReactNode {
  return (
    <section className={styles.hero}>
      <AnimatedGraphBanner />
      <div className={styles.heroContent}>
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Create{" "}
          <span className={styles.titleGradient}>Context Graph</span>
        </motion.h1>

        <motion.p
          className={styles.tagline}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          AI agents with graph memory, scaffolded in minutes
        </motion.p>

        <TerminalCommand command="uvx create-context-graph" large />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <Link className={styles.secondaryCta} to="/docs/intro">
            Read the docs →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function FeaturesSection(): ReactNode {
  return (
    <section className={styles.features}>
      <div className={styles.featuresInner}>
        <h2 className={styles.featuresTitle}>Everything you need</h2>
        <p className={styles.featuresSubtitle}>
          From domain ontology to running full-stack app in one command
        </p>
        <div className={styles.featureGrid}>
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              className={styles.featureCard}
              style={
                { "--card-accent": feature.accent } as React.CSSProperties
              }
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <span className={styles.featureIcon}>{feature.icon}</span>
              <h3 className={styles.featureCardTitle}>{feature.title}</h3>
              <p className={styles.featureCardDesc}>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function QuickStartSection(): ReactNode {
  return (
    <section className={styles.quickstart}>
      <div className={styles.quickstartInner}>
        <h2 className={styles.quickstartTitle}>Up and running in 2 minutes</h2>
        <p className={styles.quickstartSubtitle}>
          Scaffold, install, seed, and start
        </p>
        <TerminalBlock
          lines={[
            {
              text: "$ uvx create-context-graph my-app --domain healthcare --framework pydanticai --demo-data",
              color: "#22c55e",
            },
            { text: "" },
            { text: "$ cd my-app && make install && make docker-up && make seed && make start", color: "#60a5fa" },
            { text: "" },
            {
              text: "  🏥 Healthcare Context Graph is ready!",
              color: "#a855f7",
            },
            {
              text: "  Backend:  http://localhost:8000",
              color: "rgba(255,255,255,0.5)",
            },
            {
              text: "  Frontend: http://localhost:3000",
              color: "rgba(255,255,255,0.5)",
            },
          ]}
        />
      </div>
    </section>
  );
}

function FooterCTA(): ReactNode {
  return (
    <section className={styles.footerCta}>
      <div className={styles.footerCtaInner}>
        <motion.h2
          className={styles.footerCtaTitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Ready to build?
        </motion.h2>

        <TerminalCommand command="uvx create-context-graph" />

        <Link className={styles.secondaryCta} to="/docs/intro">
          Read the docs →
        </Link>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="AI agents with graph memory"
      description="Interactive CLI scaffolding tool that generates domain-specific context graph applications with Neo4j"
    >
      <HeroSection />
      <FeaturesSection />
      <QuickStartSection />
      <FooterCTA />
    </Layout>
  );
}
