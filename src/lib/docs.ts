export type DocSectionKey = "core-concepts" | "agents" | "tools";

export type DocPage = {
  slug: string; // e.g. "core-concepts/text-generation"
  title: string;
  description: string;
  section: DocSectionKey;
  group?: string; // optional sub-group label shown in sidebar
  file: string; // relative to content/docs
};

export type DocSection = {
  key: DocSectionKey;
  title: string;
  description: string;
};

export const DOC_SECTIONS: DocSection[] = [
  {
    key: "core-concepts",
    title: "Core Concepts",
    description: "The “what” and “why” in plain language.",
  },
  {
    key: "agents",
    title: "Agents",
    description: "Give your assistant a plan, memory, and guardrails.",
  },
  {
    key: "tools",
    title: "Tools",
    description: "Give the model gear so it can check reality.",
  },
];

export const DOC_PAGES: DocPage[] = [
  // Core concepts
  {
    slug: "core-concepts",
    title: "Welcome to the Workshop",
    description: "A room-by-room tour of what the platform can do.",
    section: "core-concepts",
    file: "core-concepts/index.mdx",
  },
  {
    slug: "core-concepts/text-generation",
    title: "Text Generation (The Writing Desk)",
    description: "How to ask for writing that fits your situation.",
    section: "core-concepts",
    file: "core-concepts/text-generation.mdx",
  },
  {
    slug: "core-concepts/structured-output",
    title: "Structured Output (The Form Filler)",
    description: "Get answers that fit into neat little boxes.",
    section: "core-concepts",
    file: "core-concepts/structured-output.mdx",
  },
  {
    slug: "core-concepts/function-calling",
    title: "Function Calling (The Errand Runner)",
    description: "Let the model ask your software to do things.",
    section: "core-concepts",
    file: "core-concepts/function-calling.mdx",
  },
  {
    slug: "core-concepts/images-and-vision",
    title: "Images & Vision (The Gallery Wall)",
    description: "Make images, understand images, and stay specific.",
    section: "core-concepts",
    file: "core-concepts/images-and-vision.mdx",
  },
  {
    slug: "core-concepts/audio-and-speech",
    title: "Audio & Speech (The Recording Booth)",
    description: "Turn speech into text and text into speech.",
    section: "core-concepts",
    file: "core-concepts/audio-and-speech.mdx",
  },
  {
    slug: "core-concepts/code-generation",
    title: "Code Generation (The Workbench)",
    description: "Draft, refactor, review, and debug with help.",
    section: "core-concepts",
    file: "core-concepts/code-generation.mdx",
  },
  {
    slug: "core-concepts/responses-api",
    title: "Responses API (The New Control Panel)",
    description: "One place to run multi-step, tool-using conversations.",
    section: "core-concepts",
    file: "core-concepts/responses-api.mdx",
  },

  // Agents
  {
    slug: "agents",
    title: "Agents Overview",
    description: "A helpful teammate that can think in steps.",
    section: "agents",
    file: "agents/index.mdx",
  },
  {
    slug: "agents/agent-builder",
    title: "Agent Builder",
    description: "Design an agent like a flowchart, not a research paper.",
    section: "agents",
    file: "agents/agent-builder.mdx",
  },
  {
    slug: "agents/node-reference",
    title: "Node Reference (The Agent Map)",
    description: "The Lego pieces you can snap together.",
    section: "agents",
    file: "agents/node-reference.mdx",
  },
  {
    slug: "agents/safety",
    title: "Safety in Building Agents",
    description: "Seatbelts, speed limits, and what to log.",
    section: "agents",
    file: "agents/safety.mdx",
  },
  {
    slug: "agents/agents-sdk",
    title: "Agents SDK",
    description: "For builders: run agents in your app and keep traces.",
    section: "agents",
    file: "agents/agents-sdk.mdx",
  },
  {
    slug: "agents/chatkit",
    title: "ChatKit (Deploy)",
    description: "A ready-to-ship chat UI for your agent.",
    section: "agents",
    group: "Deploy",
    file: "agents/deploy/chatkit.mdx",
  },
  {
    slug: "agents/custom-theming",
    title: "Custom Theming (Deploy)",
    description: "Make it look like your product, not ours.",
    section: "agents",
    group: "Deploy",
    file: "agents/deploy/custom-theming.mdx",
  },
  {
    slug: "agents/widgets",
    title: "Widgets (Deploy)",
    description: "Drop-in pieces: chat bubbles, launchers, and more.",
    section: "agents",
    group: "Deploy",
    file: "agents/deploy/widgets.mdx",
  },
  {
    slug: "agents/actions",
    title: "Actions (Deploy)",
    description: "Buttons and flows the agent can trigger safely.",
    section: "agents",
    group: "Deploy",
    file: "agents/deploy/actions.mdx",
  },
  {
    slug: "agents/advanced-integration",
    title: "Advanced Integration (Deploy)",
    description: "When you need custom routing, auth, and data flows.",
    section: "agents",
    group: "Deploy",
    file: "agents/deploy/advanced-integration.mdx",
  },
  {
    slug: "agents/agent-evals",
    title: "Agent Evals (Optimize)",
    description: "Score your agent so “good” is measurable.",
    section: "agents",
    group: "Optimize",
    file: "agents/optimize/agent-evals.mdx",
  },
  {
    slug: "agents/trace-grading",
    title: "Trace Grading (Optimize)",
    description: "Grade what happened, not just what it said.",
    section: "agents",
    group: "Optimize",
    file: "agents/optimize/trace-grading.mdx",
  },
  {
    slug: "agents/voice-agents",
    title: "Voice Agents",
    description: "Natural conversations, with the same guardrails.",
    section: "agents",
    file: "agents/voice-agents.mdx",
  },

  // Tools
  {
    slug: "tools",
    title: "Tools (Meet Your Gear)",
    description: "Tools help the model stop guessing and start checking.",
    section: "tools",
    file: "tools/index.mdx",
  },
  {
    slug: "tools/using-tools",
    title: "Using Tools",
    description: "How the model chooses a tool and how you stay in control.",
    section: "tools",
    file: "tools/using-tools.mdx",
  },
  {
    slug: "tools/web-search",
    title: "Web Search (The Scout)",
    description: "Let the model look things up with citations.",
    section: "tools",
    file: "tools/web-search.mdx",
  },
  {
    slug: "tools/file-search",
    title: "File Search (Your Librarian)",
    description: "Search your docs and answer with receipts.",
    section: "tools",
    file: "tools/file-search.mdx",
  },
  {
    slug: "tools/retrieval",
    title: "Retrieval (How the Library Works)",
    description: "Indexing, ranking, and making search feel smart.",
    section: "tools",
    file: "tools/retrieval.mdx",
  },
  {
    slug: "tools/connectors-mcp",
    title: "Connectors & MCP (Adapters to Other Worlds)",
    description: "Plug into external services through safe connectors.",
    section: "tools",
    file: "tools/connectors-mcp.mdx",
  },
  {
    slug: "tools/skills",
    title: "Skills (Reusable Recipe Cards)",
    description: "Teach the model how your team works, consistently.",
    section: "tools",
    file: "tools/skills.mdx",
  },
  {
    slug: "tools/code-interpreter",
    title: "Code Interpreter (The Lab Bench)",
    description: "Run calculations, analyze data, and create artifacts.",
    section: "tools",
    file: "tools/code-interpreter.mdx",
  },
  {
    slug: "tools/shell",
    title: "Shell (The Workshop)",
    description: "Run real commands, read real output, and keep logs.",
    section: "tools",
    file: "tools/shell.mdx",
  },
  {
    slug: "tools/apply-patch",
    title: "Apply Patch (The Mechanic)",
    description: "Make careful, structured edits to files.",
    section: "tools",
    file: "tools/apply-patch.mdx",
  },
  {
    slug: "tools/image-generation",
    title: "Image Generation (The Art Studio)",
    description: "Generate or edit images on purpose.",
    section: "tools",
    file: "tools/image-generation.mdx",
  },
  {
    slug: "tools/computer-use",
    title: "Computer Use (Remote Hands)",
    description: "Click/type/scroll loops with guardrails and screenshots.",
    section: "tools",
    file: "tools/computer-use.mdx",
  },
  {
    slug: "tools/local-shell",
    title: "Local Shell (Legacy Wing)",
    description: "Outdated patterns and why you probably should not use them.",
    section: "tools",
    file: "tools/local-shell.mdx",
  },
];

export function getDocPageBySlug(slug: string): DocPage | undefined {
  return DOC_PAGES.find((p) => p.slug === slug);
}

export function getDocPagesBySection(section: DocSectionKey): DocPage[] {
  return DOC_PAGES.filter((p) => p.section === section);
}

export function getAllDocSlugs(): string[] {
  return DOC_PAGES.map((p) => p.slug);
}

