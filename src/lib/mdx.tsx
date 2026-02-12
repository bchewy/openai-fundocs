import fs from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { Callout } from "@/components/Callout";
import { PromptSandwich } from "@/components/PromptSandwich";
import { ToolPicker } from "@/components/ToolPicker";
import { AgentBriefBuilder } from "@/components/AgentBriefBuilder";

const CONTENT_ROOT = path.join(process.cwd(), "content", "docs");

export type LoadedMdx = {
  content: React.ReactNode;
};

export const loadMdxFromFile = cache(async (relativeFilePath: string) => {
  const fullPath = path.join(CONTENT_ROOT, relativeFilePath);
  const source = await fs.readFile(fullPath, "utf8");

  const { content } = await compileMDX({
    source,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: "wrap",
              properties: {
                className: ["heading-anchor"],
              },
            },
          ],
        ],
      },
    },
    components: {
      Callout,
      PromptSandwich,
      ToolPicker,
      AgentBriefBuilder,
    },
  });

  return { content } satisfies LoadedMdx;
});

