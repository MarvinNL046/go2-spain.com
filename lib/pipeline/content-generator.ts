import { generateContent, type AiModel } from "./ai-provider";
import { generateBlogImage } from "./image-generator";
import { scrapeTopicContext } from "./scraper";
import fs from "fs";
import path from "path";

// -------------------------------------------------------------------
// Types
// -------------------------------------------------------------------

export type PostCategory =
  | "city-guide"
  | "food"
  | "activities"
  | "practical"
  | "budget"
  | "seasonal"
  | "regions";

export interface BlogPostOptions {
  topic?: string;
  category?: PostCategory;
  model?: AiModel;
  generateImage?: boolean;
  scrapeContext?: boolean;
  scrapeUrls?: string[];
}

interface QueuedTopic {
  topic: string;
  category: PostCategory;
  targetKeyword: string;
  searchVolume: number;
  scrapeUrls: string[];
  priority: number;
}

export interface GeneratedPost {
  title: string;
  slug: string;
  date: string;
  author: { name: string };
  category: PostCategory;
  tags: string[];
  image: string;
  imageBase64?: string;
  description: string;
  featured: boolean;
  readingTime: number;
  lastUpdated: string;
  sources: Array<{ name: string; url: string }>;
  content: string;
  scrapeData?: string;
}

export interface TranslatedPost {
  locale: string;
  content: string;
}

// -------------------------------------------------------------------
// Topic bank -- Spain travel topics rotating across categories
// -------------------------------------------------------------------

const TOPIC_BANK: Record<PostCategory, string[]> = {
  "city-guide": [
    "Hidden Gems in Barcelona That Most Tourists Miss",
    "Madrid Beyond the Prado: A Local's Guide to the City",
    "Seville Day Trips: Andalusian Villages and Countryside",
    "Granada Old Town Walking Tour: Alhambra, Tapas & History",
    "Valencia: The City of Arts and Sciences Worth the Journey",
    "San Sebastian: Where Spain Meets the Basque Country",
    "Bilbao: The Guggenheim and Beyond",
    "Malaga: Gateway to the Costa del Sol",
  ],
  food: [
    "Best Tapas Bars in Barcelona You Must Visit",
    "Spanish Cooking Classes Worth Taking: Barcelona vs Madrid",
    "Guide to Spanish Regional Cuisines: North vs South vs East",
    "Must-Try Spanish Dishes for First-Time Visitors",
    "Vegan and Vegetarian Food Guide to Spain",
    "Spain's Best Markets for Food Lovers",
    "Paella vs Fideuà: The Great Spanish Debate",
    "Spanish Cheese Guide: Region by Region",
  ],
  activities: [
    "Best Wine Tasting Tours in Spain: Ranked by Region",
    "Cycling the Camino de Santiago: Routes and Tips",
    "Skiing in the Sierra Nevada: Complete Guide",
    "Flamenco Shows in Seville: When and Where to Visit",
    "Civil War History in Spain: A Historical Journey",
    "Balearic Islands Sailing: Day Trip vs Multi-Day",
    "Hiking the Picos de Europa: A Natural Wonder",
    "Alhambra Visit: Day Trip Planning Guide",
  ],
  practical: [
    "Spain Visa and Entry Requirements 2026: Complete Guide",
    "Getting Around Spain by Train: AVE Routes, Prices & Tips",
    "Spain Travel SIM Card vs eSIM: Which Is Better in 2026?",
    "Common Scams in Spain and How to Avoid Them",
    "Spain Travel Insurance: What You Actually Need",
    "Money in Spain: Cards, Cash & Tipping Guide",
    "Spain Health Tips: What Travelers Should Know",
    "Airport to City: Best Transfer Options for Madrid, Barcelona & Malaga",
  ],
  budget: [
    "Spain on 50 EUR Per Day: A Realistic Budget Travel Guide",
    "Free Things to Do in Barcelona (No Entry Fee Needed)",
    "Cheapest Way to Travel Between Spanish Cities",
    "Budget Hotels vs Hostels in Spain: Honest Comparison",
    "How to Eat Like a Local in Spain on a Budget",
    "Free Museums and Monuments in Spain",
    "Spain Budget vs Comfort Travel: What's Worth Splurging On",
  ],
  seasonal: [
    "La Tomatina Guide 2026: Spain's Wildest Festival",
    "Best Spanish Destinations During Winter",
    "Spain in September: The Best Month to Visit?",
    "Christmas Markets in Spain: Where to Find the Best Ones",
    "Spain Summer vs Winter: Month by Month Guide",
    "New Year's Eve in Spain: Where to Celebrate",
    "Feria de Abril in Seville: Planning Your Visit",
  ],
  regions: [
    "Andalusia vs Catalonia: Which Region Is Right for You?",
    "Two Weeks in Southern Spain: Region by Region",
    "Basque Country vs Galicia: The Definitive Comparison",
    "La Rioja Wine Route: Villages, Vineyards & Culture",
    "Canary Islands: Spain's Atlantic Paradise",
    "The Balearic Islands: Spain's Mediterranean Gems",
    "Costa Brava to Costa del Sol: Which Coast to Visit",
    "Extremadura: Spain's Best-Kept Secret",
  ],
};

// Supported translation locales
const TRANSLATION_LOCALES = ["nl", "zh", "de", "fr", "es", "it", "ja"] as const;
export type TranslationLocale = (typeof TRANSLATION_LOCALES)[number];

// -------------------------------------------------------------------
// Topic queue
// -------------------------------------------------------------------

async function getExistingSlugsFromGitHub(): Promise<Set<string>> {
  const slugs = new Set<string>();
  try {
    const token = process.env.GITHUB_TOKEN;
    if (!token) throw new Error("No GITHUB_TOKEN");

    const res = await fetch(
      "https://api.github.com/repos/MarvinNL046/go2-spain.com/contents/content/blog/en",
      {
        headers: {
          Authorization: `token ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
        signal: AbortSignal.timeout(8000),
      }
    );
    if (!res.ok) throw new Error(`GitHub API: ${res.status}`);

    const files = (await res.json()) as Array<{ name: string }>;
    for (const f of files) {
      if (f.name.endsWith(".md")) {
        slugs.add(f.name.replace(".md", ""));
      }
    }
    console.log(`[content-generator] Found ${slugs.size} existing slugs from GitHub`);
  } catch (err) {
    console.warn("[content-generator] GitHub slug check failed, falling back to filesystem:", err);
    const enDir = path.join(process.cwd(), "content", "blog", "en");
    if (fs.existsSync(enDir)) {
      for (const f of fs.readdirSync(enDir)) {
        if (f.endsWith(".md")) slugs.add(f.replace(".md", ""));
      }
    }
    // Also check flat blog dir
    const flatDir = path.join(process.cwd(), "content", "blog");
    if (fs.existsSync(flatDir)) {
      for (const f of fs.readdirSync(flatDir)) {
        if (f.endsWith(".md")) slugs.add(f.replace(".md", ""));
      }
    }
  }
  return slugs;
}

async function getNextQueuedTopic(): Promise<(QueuedTopic & { category: PostCategory }) | null> {
  try {
    const queuePath = path.join(process.cwd(), "content", "topic-queue.json");
    if (!fs.existsSync(queuePath)) return null;

    const queue = JSON.parse(fs.readFileSync(queuePath, "utf-8")) as { topics: QueuedTopic[] };
    const existingSlugs = await getExistingSlugsFromGitHub();

    const sorted = [...queue.topics].sort((a, b) => {
      if (a.priority !== b.priority) return a.priority - b.priority;
      return b.searchVolume - a.searchVolume;
    });

    const STOP_WORDS = new Set(["in", "the", "a", "an", "of", "for", "to", "and", "or", "is", "vs", "at", "on", "per", "your", "you", "best", "top", "guide", "complete", "ultimate", "2026", "2025"]);
    const existingSlugList = [...existingSlugs];

    for (const item of sorted) {
      const keywordWords = item.targetKeyword
        .toLowerCase()
        .split(/\s+/)
        .filter((w) => !STOP_WORDS.has(w) && w.length > 1);

      const topicWords = item.topic
        .toLowerCase()
        .split(/[\s:\u2014\-,]+/)
        .filter((w) => !STOP_WORDS.has(w) && w.length > 2);

      const alreadyPublished = existingSlugList.some((slug) => {
        const allKeywordsMatch = keywordWords.length > 0 && keywordWords.every((word) => slug.includes(word));
        const topicMatchCount = topicWords.filter((word) => slug.includes(word)).length;
        const topicMatchRatio = topicWords.length > 0 ? topicMatchCount / topicWords.length : 0;
        return allKeywordsMatch || (topicMatchCount >= 3 && topicMatchRatio >= 0.5);
      });

      if (!alreadyPublished) {
        console.log(`[content-generator] Queue: "${item.topic}" not yet published`);
        return item;
      }
    }

    return null;
  } catch (err) {
    console.warn("[content-generator] Failed to read topic queue:", err);
    return null;
  }
}

// -------------------------------------------------------------------
// Topic selection
// -------------------------------------------------------------------

export async function selectTopic(
  existingTitles: string[] = [],
  preferredCategory?: PostCategory
): Promise<{ topic: string; category: PostCategory; scrapeUrls?: string[] }> {
  const queued = await getNextQueuedTopic();
  if (queued) {
    console.log(`[content-generator] Using queued topic: "${queued.topic}"`);
    return { topic: queued.topic, category: queued.category, scrapeUrls: queued.scrapeUrls };
  }

  const category =
    preferredCategory ||
    randomFrom(Object.keys(TOPIC_BANK) as PostCategory[]);

  const candidates = TOPIC_BANK[category].filter(
    (t) => !existingTitles.some((existing) => existing.toLowerCase() === t.toLowerCase())
  );

  if (candidates.length === 0) {
    const otherCategory = randomFrom(
      (Object.keys(TOPIC_BANK) as PostCategory[]).filter((c) => c !== category)
    );
    const otherCandidates = TOPIC_BANK[otherCategory].filter(
      (t) => !existingTitles.some((existing) => existing.toLowerCase() === t.toLowerCase())
    );
    const topic = randomFrom(otherCandidates.length > 0 ? otherCandidates : TOPIC_BANK[otherCategory]);
    return { topic, category: otherCategory };
  }

  return { topic: randomFrom(candidates), category };
}

// -------------------------------------------------------------------
// Main blog post generation
// -------------------------------------------------------------------

export async function generateBlogPost(
  options: BlogPostOptions = {}
): Promise<GeneratedPost> {
  const model = options.model || "claude-haiku";
  const doScrape = options.scrapeContext !== false;
  const doImage = options.generateImage !== false;

  let topic = options.topic;
  let category = options.category;
  let scrapeUrls = options.scrapeUrls;

  if (!topic) {
    const selected = await selectTopic([], category);
    topic = selected.topic;
    category = selected.category;
    if (selected.scrapeUrls) scrapeUrls = selected.scrapeUrls;
  } else if (!category) {
    category = detectCategory(topic);
  }

  console.log(`[content-generator] Topic: "${topic}" | Category: ${category}`);

  let scrapeData: string | null = null;
  if (doScrape) {
    try {
      scrapeData = await scrapeTopicContext(topic, scrapeUrls);
      console.log(`[content-generator] Scraped ${scrapeData.length} chars of context`);
    } catch (err) {
      console.warn("[content-generator] Context scrape failed:", err);
    }
  }

  const sitemapLinks = await loadSitemapLinks();
  const prompt = buildPrompt(topic, category!, sitemapLinks, scrapeData);
  const rawResponse = await generateContent(prompt, {
    model,
    maxTokens: 16384,
    temperature: 0.5,
  });

  const post = parseGeneratedPost(rawResponse, topic, category!);

  if (scrapeData) {
    post.scrapeData = scrapeData;
  }

  if (doImage) {
    try {
      const imageResult = await generateBlogImage(post.title, post.category, post.slug);
      post.image = imageResult.publicPath;
      post.imageBase64 = imageResult.base64;
    } catch (err) {
      console.warn("[content-generator] Image generation failed:", err);
      post.image = `/images/blog/${post.slug}.webp`;
    }
  }

  return post;
}

// -------------------------------------------------------------------
// Translation
// -------------------------------------------------------------------

export async function translatePost(
  post: GeneratedPost,
  targetLocale: TranslationLocale,
  model: AiModel = "claude-haiku"
): Promise<TranslatedPost> {
  const localeNames: Record<TranslationLocale, string> = {
    nl: "Dutch",
    zh: "Simplified Chinese",
    de: "German",
    fr: "French",
    es: "Spanish",
    it: "Italian",
    ja: "Japanese",
  };

  const localeName = localeNames[targetLocale];

  const prompt = `You are a professional travel content translator specializing in Spanish tourism content.

Translate the following blog post from English to ${localeName}.

STRICT RULES:
1. Translate ALL body text naturally and idiomatically
2. Translate: title, description, tags (in the YAML frontmatter), and all Markdown body content
3. Keep UNCHANGED: slug, date, author, category, image path, all URLs, lastUpdated, sources
4. Preserve ALL Markdown formatting: headers, bold, italic, tables, blockquotes, code blocks, links
5. Keep affiliate link text in ${localeName} but keep the URL exactly as-is
6. Do NOT add or remove any content
7. Respond ONLY with the complete translated Markdown

BLOG POST TO TRANSLATE:
${post.content}`;

  const translatedContent = await generateContent(prompt, {
    model,
    maxTokens: 16384,
    temperature: 0.3,
  });

  return {
    locale: targetLocale,
    content: translatedContent.trim(),
  };
}

export async function translatePostToAllLocales(
  post: GeneratedPost,
  model: AiModel = "claude-haiku"
): Promise<TranslatedPost[]> {
  const results: TranslatedPost[] = [];

  for (const locale of TRANSLATION_LOCALES) {
    try {
      console.log(`[content-generator] Translating to ${locale}...`);
      const translated = await translatePost(post, locale, model);
      results.push(translated);
    } catch (err) {
      console.error(`[content-generator] Translation to ${locale} failed:`, err);
    }
  }

  return results;
}

// -------------------------------------------------------------------
// Sitemap internal link loader
// -------------------------------------------------------------------

async function loadSitemapLinks(): Promise<string> {
  const siteUrl = "https://go2-spain.com";

  try {
    const localSitemapPath = path.join(process.cwd(), "public", "sitemap.xml");
    let xml: string;

    if (fs.existsSync(localSitemapPath)) {
      xml = fs.readFileSync(localSitemapPath, "utf-8");
    } else {
      const response = await fetch(`${siteUrl}/sitemap.xml`, {
        signal: AbortSignal.timeout(10000),
      });
      if (!response.ok) return FALLBACK_INTERNAL_LINKS;
      xml = await response.text();
    }

    const urlMatches = xml.match(/<loc>([^<]+)<\/loc>/g) || [];
    const allUrls = urlMatches
      .map((m) => m.replace(/<\/?loc>/g, ""))
      .filter((url) => url.startsWith(siteUrl))
      .filter((url) => {
        const urlPath = url.replace(siteUrl, "");
        return !urlPath.match(/^\/(nl|de|fr|zh|ja|es|it)\//);
      });

    const groups: Record<string, string[]> = {};
    for (const url of allUrls) {
      const p = url.replace(siteUrl, "");
      if (!p || p === "/") continue;
      const section = p.split("/")[1] || "other";
      if (!groups[section]) groups[section] = [];
      if (groups[section].length < 12) {
        groups[section].push(url);
      }
    }

    let result = "";
    for (const [section, urls] of Object.entries(groups)) {
      if (urls.length === 0) continue;
      result += `${section}:\n`;
      for (const url of urls) {
        const parts = url.split("/").filter(Boolean);
        const lastPart = parts[parts.length - 1] || section;
        const anchor = lastPart
          .replace(/-/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase());
        result += `- [${anchor}](${url})\n`;
      }
      result += "\n";
    }
    return result || FALLBACK_INTERNAL_LINKS;
  } catch {
    return FALLBACK_INTERNAL_LINKS;
  }
}

const FALLBACK_INTERNAL_LINKS = `
city:
- [Barcelona](https://go2-spain.com/city/barcelona/)
- [Madrid](https://go2-spain.com/city/madrid/)
- [Seville](https://go2-spain.com/city/seville/)
- [Granada](https://go2-spain.com/city/granada/)
- [Valencia](https://go2-spain.com/city/valencia/)
- [San Sebastian](https://go2-spain.com/city/san-sebastian/)
- [Malaga](https://go2-spain.com/city/malaga/)

food:
- [Spanish Food Guide](https://go2-spain.com/food/)

drinks:
- [Spanish Drinks Guide](https://go2-spain.com/drinks/)

region:
- [Regions Overview](https://go2-spain.com/region/)

visa:
- [Spain Visa Guide](https://go2-spain.com/visa/)

practical-info:
- [Practical Info](https://go2-spain.com/practical-info/)

blog:
- [Blog](https://go2-spain.com/blog/)
`;

// -------------------------------------------------------------------
// Prompt builder
// -------------------------------------------------------------------

function buildPrompt(
  topic: string,
  category: PostCategory,
  sitemapLinks: string,
  scrapeData: string | null
): string {
  const siteUrl = "https://go2-spain.com";
  const today = new Date().toISOString().split("T")[0];
  const year = new Date().getFullYear();

  let widgetReference: string = '';
  try {
    const refPath = path.join(process.cwd(), 'content', 'writer-reference.md');
    if (fs.existsSync(refPath)) {
      widgetReference = fs.readFileSync(refPath, 'utf-8');
    }
    const affRefPath = path.join(process.cwd(), 'content', 'affiliate-reference.txt');
    if (fs.existsSync(affRefPath)) {
      widgetReference += '\n\n---\nFULL AFFILIATE & WIDGET REFERENCE:\n' + fs.readFileSync(affRefPath, 'utf-8');
    }
  } catch { /* ignore */ }

  const categoryInstructions: Record<PostCategory, string> = {
    "city-guide":
      "Write an in-depth city/destination guide. Cover barrios/neighbourhoods, top sights, where to eat, where to stay, and practical tips. Include a 1-day and 3-day itinerary suggestion.",
    food: "Write a comprehensive Spanish food guide. Explain the dish/cuisine with cultural context, regional variations, where to find the best versions, and how to order like a local. Include a comparison table of similar dishes.",
    activities:
      "Write a detailed activities/experiences guide. Compare options (operators, prices, locations), give honest pros/cons, and include a practical booking guide at the end.",
    practical:
      "Write a thorough practical travel guide. Cover all scenarios, give exact prices and steps, and anticipate common questions. Accuracy is critical.",
    budget:
      "Write a realistic budget travel guide with exact costs in EUR. Include sample day budgets, money-saving tips, and where to splurge vs. save.",
    seasonal:
      "Write a seasonal/festival travel guide. Cover what happens, when, where the best locations are, and how to plan. Include practical tips for crowds and booking.",
    regions:
      "Write a comprehensive region guide or comparison. Cover landscapes, villages, activities, accommodation options, how to get there, and who each region suits best.",
  };

  const contextSection: string = scrapeData
    ? `\nREFERENCE DATA:\nUse ONLY the facts, prices, statistics, and details from the data below. Every price, statistic, and specific claim MUST come from this data or a cited external source.\n\n${scrapeData.slice(0, 6000)}\n`
    : `\nNO REFERENCE DATA AVAILABLE: Write only in general terms. Do NOT name any specific restaurants, hotels, venues, or people.\n`;

  return `You are a senior Spain travel writer for go2-spain.com, a comprehensive Spain travel resource.
You and your team have lived in and traveled Spain extensively -- Barcelona for 3 years, toured Andalusia, explored the Basque Country, and navigated the Balearic Islands as locals. You write from genuine first-hand experience.

Write a comprehensive, SEO-optimized blog post about: "${topic}"

${categoryInstructions[category]}

---

CONTENT REQUIREMENTS:

1. FRONTMATTER (YAML):
\`\`\`yaml
---
title: "The Full Post Title"
slug: "url-friendly-slug"
date: "${today}"
author:
  name: "Go2Spain Team"
category: "${category}"
tags: ["tag1", "tag2", "tag3", "tag4"]
image: "/images/blog/SLUG.webp"
description: "Compelling meta description under 155 characters"
featured: false
readingTime: 8
lastUpdated: "${today}"
sources:
  - name: "Spain.info Official Tourism"
    url: "https://www.spain.info/en/"
  - name: "Lonely Planet Spain"
    url: "https://www.lonelyplanet.com/spain"
---
\`\`\`

2. OPENING PARAGRAPH: Hook the reader immediately with a compelling fact or scene.

3. KEY TAKEAWAYS TABLE (immediately after intro):
5-7 rows covering key questions readers have.

4. BODY SECTIONS (8-10 numbered H2 sections) with H3 subheadings, bullet lists, first-person experience signals.

5. DID YOU KNOW CALLOUTS (2-3 throughout).

6. COMPARISON TABLE (at least one).

7. WIDGET PLACEMENT (3-5 widgets using <!-- WIDGET:type --> syntax).

8. FAQ SECTION (3-5 questions).

9. CONCLUSION with CTA.

---

INTERNAL LINKING (5-8 internal links):
Available internal links:
${sitemapLinks}
${widgetReference ? `\nWRITER REFERENCE:\n${widgetReference}\n` : ''}
---

E-E-A-T SIGNALS: Reference hands-on visits, use precise details (prices in EUR), cite credible sources.

ANTI-HALLUCINATION RULES: Never invent prices or specific venue names not in reference data.

TARGET LENGTH: 1800-2500 words.
TONE: Knowledgeable, warm, practical.
${contextSection}

RESPOND WITH THE COMPLETE BLOG POST -- frontmatter + Markdown body only. No preamble.`;
}

// -------------------------------------------------------------------
// Response parser
// -------------------------------------------------------------------

function parseGeneratedPost(
  rawResponse: string,
  topic: string,
  category: PostCategory
): GeneratedPost {
  const today = new Date().toISOString().split("T")[0];

  let content = rawResponse.trim();
  content = content.replace(/^```yaml\s*\n?/, "");
  content = content.replace(/^```(?:markdown|md)?\s*\n?/, "");
  content = content.replace(/^yaml\s*\n/, "");
  content = content.replace(/\n?\s*```\s*$/, "");
  content = content.replace(/^(---\s*\n[\s\S]*?\n---)\s*\n```\s*\n/, "$1\n");
  content = content.replace(/```(?:markdown|md|)?\s*\n((?:[^\n]*\|[^\n]*\n)+)```/g, "$1");
  content = content.replace(/\n{4,}/g, '\n\n\n');

  const fmMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);

  let title = topic;
  let slug = slugify(topic);
  let description = "";
  let postCategory: PostCategory = category;
  let tags: string[] = [];
  let image = `/images/blog/${slug}.webp`;
  let readingTime = 8;
  let sources: Array<{ name: string; url: string }> = [];

  if (fmMatch) {
    const fm = fmMatch[1];

    const titleMatch = fm.match(/^title:\s*["']?(.+?)["']?\s*$/m);
    const slugMatch = fm.match(/^slug:\s*["']?(.+?)["']?\s*$/m);
    const descMatch = fm.match(/^description:\s*["']?(.+?)["']?\s*$/m);
    const catMatch = fm.match(/^category:\s*["']?(.+?)["']?\s*$/m);
    const imageMatch = fm.match(/^image:\s*["']?(.+?)["']?\s*$/m);
    const rtMatch = fm.match(/^readingTime:\s*(\d+)/m);

    if (titleMatch) title = titleMatch[1].trim();
    if (slugMatch) slug = slugMatch[1].trim();
    if (descMatch) description = descMatch[1].trim().slice(0, 155);
    if (catMatch) postCategory = (catMatch[1].trim() as PostCategory) || category;
    if (imageMatch) image = imageMatch[1].trim();
    if (rtMatch) readingTime = parseInt(rtMatch[1], 10);

    const tagsMatch = fm.match(/^tags:\s*\[([^\]]+)\]/m);
    if (tagsMatch) {
      tags = tagsMatch[1]
        .split(",")
        .map((t) => t.trim().replace(/^["']|["']$/g, ""));
    }

    const sourceMatches = [...fm.matchAll(/- name:\s*["']?(.+?)["']?\s*\n\s*url:\s*["']?(.+?)["']?\s*$/gm)];
    sources = sourceMatches.map((m) => ({
      name: m[1].trim(),
      url: m[2].trim(),
    }));
  }

  if (!image || image === "/images/blog/SLUG.webp") {
    image = `/images/blog/${slug}.webp`;
  } else {
    image = image.replace("/SLUG.webp", `/${slug}.webp`);
  }

  return {
    title,
    slug,
    date: today,
    author: { name: "Go2Spain Team" },
    category: postCategory,
    tags,
    image,
    description,
    featured: false,
    readingTime,
    lastUpdated: today,
    sources,
    content,
  };
}

// -------------------------------------------------------------------
// Utilities
// -------------------------------------------------------------------

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function detectCategory(topic: string): PostCategory {
  const lower = topic.toLowerCase();
  if (lower.includes("region") || lower.includes("andalusia") || lower.includes("catalonia") || lower.includes("basque") || lower.includes("galicia") || lower.includes("canary") || lower.includes("balearic") || lower.includes("extremadura")) return "regions";
  if (lower.includes("food") || lower.includes("eat") || lower.includes("restaurant") || lower.includes("cuisine") || lower.includes("tapas") || lower.includes("paella") || lower.includes("cheese")) return "food";
  if (lower.includes("visa") || lower.includes("money") || lower.includes("scam") || lower.includes("sim") || lower.includes("esim") || lower.includes("insurance") || lower.includes("transport") || lower.includes("train")) return "practical";
  if (lower.includes("budget") || lower.includes("cheap") || lower.includes("free") || lower.includes("eur")) return "budget";
  if (lower.includes("festival") || lower.includes("tomatina") || lower.includes("christmas") || lower.includes("season") || lower.includes("winter") || lower.includes("summer") || lower.includes("feria")) return "seasonal";
  if (lower.includes("wine") || lower.includes("cycling") || lower.includes("skiing") || lower.includes("sailing") || lower.includes("hiking") || lower.includes("flamenco") || lower.includes("camino")) return "activities";
  return "city-guide";
}
