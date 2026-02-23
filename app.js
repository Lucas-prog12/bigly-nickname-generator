const form = document.getElementById("generator-form");
const firstNameEl = document.getElementById("firstName");
const lastNameEl = document.getElementById("lastName");
const handlesEl = document.getElementById("handles");
const xHandleEl = document.getElementById("xHandle");
const bioEl = document.getElementById("bio");
const socialTextEl = document.getElementById("socialText");
const toneEl = document.getElementById("tone");

const qEnergyEl = document.getElementById("qEnergy");
const qEgoEl = document.getElementById("qEgo");
const qDramaEl = document.getElementById("qDrama");
const qHumorEl = document.getElementById("qHumor");
const qAmbitionEl = document.getElementById("qAmbition");
const qArchetypeEl = document.getElementById("qArchetype");

const useLlmEl = document.getElementById("useLlm");
const apiKeyEl = document.getElementById("apiKey");
const modelNameEl = document.getElementById("modelName");

const generateBtn = document.getElementById("generateBtn");
const surpriseBtn = document.getElementById("surpriseBtn");
const copyAllBtn = document.getElementById("copyAllBtn");

const listEl = document.getElementById("nickname-list");
const rallyLineEl = document.getElementById("rallyLine");
const analysisSignalsEl = document.getElementById("analysisSignals");
const errorEl = document.getElementById("form-error");
const sourceStatusEl = document.getElementById("source-status");

const toneBanks = {
  playful: {
    adjectives: ["Bouncy", "Flashy", "Lucky", "Slick", "Sparkly", "Meme-Friendly", "Turbo"],
    prefixes: ["Weekend", "Snack-Sized", "Low-Stakes", "Coffee-Fueled", "Meme-Machine"],
    rallyTail: ["pure entertainment value", "a crowd favorite profile", "big feed energy", "clean viral potential"],
  },
  roast: {
    adjectives: ["Sleepy", "Low-Energy", "Crooked", "Wobbly", "Messy", "Overrated", "Tiny", "Budget"],
    prefixes: ["Deal-Losing", "Wrong-Thread", "Drama-First", "Discount", "Fact-Optional", "Spin-Cycle"],
    rallyTail: ["the ratings are not good", "all talk, no scoreboard", "very weak timeline numbers", "major weak-sauce vibes"],
  },
  chaos: {
    adjectives: ["Volcanic", "Glitchy", "Hyperactive", "Unstable", "Rocket", "Midnight", "All-Caps"],
    prefixes: ["Afterparty", "Plot-Twist", "Conspiracy", "No-Brakes", "Broken-Algorithm", "Two-Mics"],
    rallyTail: ["absolute timeline insanity", "peak chaos metrics", "interdimensional feed behavior", "total circus mode"],
  },
};

const topicBanks = [
  {
    name: "tech",
    keywords: ["dev", "code", "javascript", "react", "python", "api", "startup", "saas", "ai", "product", "ux", "frontend", "backend"],
    adjectives: ["Patchy", "Beta", "Push-to-Prod", "Buggy", "Pixel"],
    nouns: ["Deploy", "Commit", "Prompt", "Console", "Debugger"],
    prefixes: ["404", "Merge-Conflict", "Hotfix", "Version-Zero"],
  },
  {
    name: "finance",
    keywords: ["crypto", "bitcoin", "trading", "stocks", "invest", "nft", "fund", "money", "market"],
    adjectives: ["Pump-and-Dump", "Leverage", "Paper-Hands", "Bear-Market", "Volatile"],
    nouns: ["Wallet", "Chart", "Candle", "Dip", "Token"],
    prefixes: ["Rug-Pull", "Margin-Call", "Bull-Trap"],
  },
  {
    name: "gaming",
    keywords: ["gaming", "stream", "twitch", "fps", "valorant", "fortnite", "league", "esport", "ranked", "speedrun"],
    adjectives: ["Laggy", "No-Scope", "Tilted", "Respawn", "Ping-999"],
    nouns: ["Lobby", "Controller", "Headshot", "Loot", "Patch"],
    prefixes: ["AFK", "Queue-Dodging", "Final-Boss"],
  },
  {
    name: "fitness",
    keywords: ["run", "gym", "fitness", "marathon", "crossfit", "workout", "wellness", "yoga"],
    adjectives: ["Cardio", "Sweaty", "Sprint", "Protein", "No-Rest"],
    nouns: ["Kettlebell", "Treadmill", "Lunge", "PR", "Shake"],
    prefixes: ["Leg-Day", "Extra-Rep", "No-Rest"],
  },
  {
    name: "media",
    keywords: ["content", "creator", "youtube", "podcast", "viral", "marketing", "influence", "social", "reel", "tiktok"],
    adjectives: ["Viral", "Clickbait", "Trend-Chasing", "Hashtag", "Thumbnail"],
    nouns: ["Feed", "Clip", "Algorithm", "Mic", "Timeline"],
    prefixes: ["For-You", "Engagement-Bait", "Thumbnail-War"],
  },
  {
    name: "food",
    keywords: ["coffee", "chef", "food", "burger", "pizza", "cook", "recipe", "baking", "restaurant"],
    adjectives: ["Greasy", "Double-Espresso", "Crunchy", "Saucy", "Microwave"],
    nouns: ["Spatula", "Macchiato", "Nacho", "Burger", "Biscuit"],
    prefixes: ["Drive-Thru", "Extra-Sauce", "Overcooked"],
  },
];

const quizMaps = {
  energy: {
    chill: {
      signals: ["calme", "froid", "calculé"],
      adjectives: ["Slow-Motion", "Sleepy", "Measured"],
      prefixes: ["Low-Battery", "Late-Arrival"],
    },
    balanced: {
      signals: ["stable", "propre", "régulier"],
      adjectives: ["Steady", "Consistent", "Polished"],
      prefixes: ["Middle-Lane", "Safe-Mode"],
    },
    turbo: {
      signals: ["hyper", "rapide", "bruyant"],
      adjectives: ["Turbo", "Noisy", "Rocket"],
      prefixes: ["No-Brakes", "All-Gas"],
    },
  },
  ego: {
    low: {
      signals: ["humble", "low profile"],
      adjectives: ["Modest", "Understated"],
      prefixes: ["Quiet-Mode"],
    },
    medium: {
      signals: ["confiant"],
      adjectives: ["Confident", "Mainstream"],
      prefixes: ["Center-Stage"],
    },
    high: {
      signals: ["ego", "spotlight", "main character"],
      adjectives: ["Main-Character", "Loud", "Huge-Ego"],
      prefixes: ["Mirror-Loving", "Look-At-Me"],
    },
  },
  drama: {
    avoid: {
      signals: ["anti-drama"],
      adjectives: ["Diplomatic", "Peaceful"],
      prefixes: ["No-Drama"],
    },
    neutral: {
      signals: ["pragmatique"],
      adjectives: ["Pragmatic", "Split-Decision"],
      prefixes: ["Maybe-Maybe-Not"],
    },
    seek: {
      signals: ["drama", "controverse", "clash"],
      adjectives: ["Explosive", "Unfiltered", "Spicy"],
      prefixes: ["Timeline-War", "Chaos-Dealer"],
    },
  },
  humor: {
    dry: {
      signals: ["humour sec"],
      adjectives: ["Dry", "Deadpan"],
      prefixes: ["Sarcasm-Only"],
    },
    meme: {
      signals: ["meme", "shitpost"],
      adjectives: ["Meme", "Viral", "Reply-Guy"],
      prefixes: ["Template-Based"],
    },
    savage: {
      signals: ["roast", "piquant"],
      adjectives: ["Savage", "Ruthless"],
      prefixes: ["No-Mercy"],
    },
  },
  ambition: {
    craft: {
      signals: ["craft", "qualité"],
      adjectives: ["Builder", "Detail-Obsessed"],
      prefixes: ["Long-Game"],
    },
    money: {
      signals: ["argent", "business"],
      adjectives: ["Revenue", "Cashflow", "Deal-Hunting"],
      prefixes: ["Profit-First"],
    },
    fame: {
      signals: ["notoriété", "visibilité"],
      adjectives: ["Viral", "Spotlight", "Trend-Chasing"],
      prefixes: ["Fame-Chasing"],
    },
    chaos: {
      signals: ["chaos", "imprévisible"],
      adjectives: ["Unhinged", "Wildcard", "Unstable"],
      prefixes: ["Burn-It-Down"],
    },
  },
  archetype: {
    builder: {
      signals: ["builder", "constructeur"],
      adjectives: ["Builder", "Systematic"],
      prefixes: ["Blueprint"],
    },
    performer: {
      signals: ["performer", "show"],
      adjectives: ["Showtime", "Stage-Ready"],
      prefixes: ["Spotlight"],
    },
    analyst: {
      signals: ["analyst", "data"],
      adjectives: ["Spreadsheet", "Data-Driven"],
      prefixes: ["Chart-Watching"],
    },
    troll: {
      signals: ["troll", "provoc"],
      adjectives: ["Baiting", "Chaotic", "Provocative"],
      prefixes: ["Reply-Farming"],
    },
  },
};

const fallbackNouns = ["Candidate", "Machine", "Operator", "Legend", "Package", "Agenda", "Player", "Storm"];

const surpriseProfiles = [
  {
    firstName: "Mila",
    lastName: "Rossi",
    handles: "@milarunclub",
    xHandle: "@miladaily",
    bio: "Creator fitness + contenu lifestyle",
    socialText: "Post 1: 5k ce matin, no excuses. Post 2: Le café avant le code. Post 3: Build in public every day.",
    tone: "roast",
    quiz: { energy: "turbo", ego: "medium", drama: "neutral", humor: "meme", ambition: "craft", archetype: "builder" },
  },
  {
    firstName: "Yanis",
    lastName: "Durand",
    handles: "@yanisfps",
    xHandle: "@yanisplays",
    bio: "Streaming FPS + clips TikTok",
    socialText: "Post 1: New clutch compilation live tonight. Post 2: Ping 120 but still top frag. Post 3: Ranked grind until dawn.",
    tone: "chaos",
    quiz: { energy: "turbo", ego: "high", drama: "seek", humor: "savage", ambition: "fame", archetype: "performer" },
  },
  {
    firstName: "Lea",
    lastName: "Martin",
    handles: "@leadata",
    xHandle: "@leadash",
    bio: "Data analyst, finance threads, macro nerd",
    socialText: "Post 1: CPI print was predictable. Post 2: Risk management over hype. Post 3: Thread on market structure tonight.",
    tone: "playful",
    quiz: { energy: "balanced", ego: "low", drama: "avoid", humor: "dry", ambition: "money", archetype: "analyst" },
  },
];

function normalize(input) {
  return (input || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function tokenize(...values) {
  return normalize(values.filter(Boolean).join(" "))
    .split(/[^a-z0-9_]+/)
    .filter((token) => token.length > 1);
}

function tokenizeHandle(rawHandle) {
  return normalize((rawHandle || "").replace(/^@/, "")).split(/[^a-z0-9]+/).filter((part) => part.length > 1);
}

function unique(list) {
  return [...new Set(list)];
}

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function buildQuizPack(quiz) {
  const packs = [
    quizMaps.energy[quiz.energy],
    quizMaps.ego[quiz.ego],
    quizMaps.drama[quiz.drama],
    quizMaps.humor[quiz.humor],
    quizMaps.ambition[quiz.ambition],
    quizMaps.archetype[quiz.archetype],
  ].filter(Boolean);

  return {
    signals: unique(packs.flatMap((pack) => pack.signals || [])),
    adjectives: unique(packs.flatMap((pack) => pack.adjectives || [])),
    prefixes: unique(packs.flatMap((pack) => pack.prefixes || [])),
  };
}

function computeTopicMatches(tokens) {
  return topicBanks
    .map((topic) => {
      const score = topic.keywords.reduce((acc, keyword) => {
        return acc + (tokens.some((token) => token.startsWith(keyword) || keyword.startsWith(token)) ? 1 : 0);
      }, 0);
      return { ...topic, score };
    })
    .filter((topic) => topic.score > 0)
    .sort((a, b) => b.score - a.score);
}

function makeAlliterativeChoice(pool, letter) {
  const matching = pool.filter((word) => normalize(word).startsWith(letter));
  return matching.length ? pick(matching) : pick(pool);
}

function buildEnrichment(profile) {
  const quizPack = buildQuizPack(profile.quiz);
  const xHandleParts = tokenizeHandle(profile.xHandle);

  const tokens = tokenize(
    profile.firstName,
    profile.lastName,
    profile.handles,
    profile.xHandle,
    profile.bio,
    profile.socialText,
    quizPack.signals.join(" "),
  ).concat(xHandleParts);

  const topics = computeTopicMatches(tokens);

  const topicAdjectives = unique(topics.flatMap((topic) => topic.adjectives));
  const topicPrefixes = unique(topics.flatMap((topic) => topic.prefixes));
  const topicNouns = unique(topics.flatMap((topic) => topic.nouns));

  const signals = [];
  if (topics.length) signals.push(`Topics détectés: ${topics.slice(0, 3).map((topic) => topic.name).join(", ")}`);
  if (profile.socialText.trim()) signals.push(`Posts analysés: ${Math.min(10, profile.socialText.split(/\n+/).filter(Boolean).length)} extrait(s)`);
  if (profile.xHandle.trim()) signals.push(`Signal handle X: ${profile.xHandle.trim()}`);
  signals.push(`Quiz persona: ${quizPack.signals.slice(0, 4).join(", ")}`);

  return {
    tokens,
    topics,
    quizPack,
    adjectives: topicAdjectives,
    prefixes: topicPrefixes,
    nouns: topicNouns,
    signals,
  };
}

function localReason(topic, quizPack) {
  const parts = [];
  if (topic) parts.push(`vibe ${topic}`);
  if (quizPack.signals.length) parts.push(`persona ${quizPack.signals[0]}`);
  parts.push("format rally");
  return parts.join(" · ");
}

function makeLocalNicknames(profile, enrichment) {
  const firstName = profile.firstName.trim();
  const lastName = profile.lastName.trim();
  const baseName = `${firstName}${lastName ? ` ${lastName}` : ""}`;
  const shortName = lastName ? `${firstName} ${lastName.charAt(0)}.` : firstName;
  const family = lastName || firstName;
  const initial = normalize(firstName).charAt(0) || "s";

  const tone = toneBanks[profile.tone] || toneBanks.roast;
  const adjectives = unique([...tone.adjectives, ...enrichment.quizPack.adjectives, ...enrichment.adjectives]);
  const prefixes = unique([...tone.prefixes, ...enrichment.quizPack.prefixes, ...enrichment.prefixes]);
  const nouns = unique([...fallbackNouns, ...enrichment.nouns]);

  const topTopic = enrichment.topics[0]?.name || null;

  const templates = [
    () => `${makeAlliterativeChoice(adjectives, initial)} ${firstName}`,
    () => `${pick(prefixes)} ${baseName}`,
    () => `${pick(adjectives)}-${pick(nouns)} ${firstName}`,
    () => `${pick(adjectives)} ${pick(nouns)} ${firstName}`,
    () => `${pick(prefixes)} ${family}`,
    () => `${makeAlliterativeChoice(adjectives, initial)} ${shortName}`,
    () => `${pick(adjectives)} ${family} ${pick(nouns)}`,
  ];

  const candidates = unique(
    Array.from({ length: 22 }, (_, idx) => templates[idx % templates.length]().replace(/\s+/g, " ").trim()),
  );

  const scored = candidates.map((nick) => {
    let score = 26 + Math.floor(Math.random() * 50);
    if (normalize(nick).startsWith(initial)) score += 13;
    if (nick.includes("-")) score += 7;
    if (enrichment.tokens.some((token) => normalize(nick).includes(token.slice(0, 4)))) score += 9;
    return {
      nick,
      score: clamp(score, 1, 99),
      reason: localReason(topTopic, enrichment.quizPack),
    };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 5);
}

function buildRallyLine(bestNick, toneKey) {
  const tone = toneBanks[toneKey] || toneBanks.roast;
  return `People are saying "${bestNick}" everywhere. Honestly, ${pick(tone.rallyTail)}.`;
}

function copyText(value) {
  if (!value) return;
  navigator.clipboard.writeText(value).catch(() => {
    /* Ignore clipboard failures in restricted contexts. */
  });
}

function renderSignals(signals) {
  analysisSignalsEl.innerHTML = "";
  (signals || []).forEach((signal) => {
    const li = document.createElement("li");
    li.textContent = signal;
    analysisSignalsEl.append(li);
  });
}

function renderResults(entries, tone, signals) {
  listEl.innerHTML = "";

  entries.forEach((entry, index) => {
    const item = document.createElement("li");
    item.className = "nickname-item";
    item.style.animationDelay = `${index * 70}ms`;

    const rank = document.createElement("span");
    rank.className = "rank-pill";
    rank.textContent = `${index + 1}`;

    const center = document.createElement("div");

    const title = document.createElement("div");
    title.className = "nick-main";
    title.textContent = entry.nick;

    const meta = document.createElement("div");
    meta.className = "nick-meta";
    meta.textContent = `${entry.reason || "Generated"} · Power ${entry.score}/99`;

    center.append(title, meta);

    const copyBtn = document.createElement("button");
    copyBtn.className = "copy-btn";
    copyBtn.type = "button";
    copyBtn.textContent = "Copier";
    copyBtn.addEventListener("click", () => copyText(entry.nick));

    item.append(rank, center, copyBtn);
    listEl.append(item);
  });

  rallyLineEl.textContent = buildRallyLine(entries[0].nick, tone);
  renderSignals(signals);
}

function extractJson(text) {
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) return null;
    try {
      return JSON.parse(match[0]);
    } catch {
      return null;
    }
  }
}

function mapLlmResult(data, fallbackEntries) {
  const fromLlm = Array.isArray(data?.nicknames) ? data.nicknames : [];

  const normalized = fromLlm
    .map((entry) => {
      const nick = (entry?.name || entry?.nickname || "").toString().trim();
      if (!nick) return null;
      return {
        nick,
        score: clamp(Number(entry?.power) || Math.floor(65 + Math.random() * 30), 1, 99),
        reason: (entry?.why || "analyse LLM").toString().slice(0, 120),
      };
    })
    .filter(Boolean)
    .slice(0, 5);

  if (!normalized.length) return fallbackEntries;

  while (normalized.length < 5 && fallbackEntries[normalized.length]) {
    normalized.push(fallbackEntries[normalized.length]);
  }

  return normalized.slice(0, 5);
}

async function fetchWithTimeout(url, options, timeoutMs = 22000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

async function generateWithLlm(profile, enrichment, localEntries) {
  const apiKey = apiKeyEl.value.trim();
  const model = modelNameEl.value.trim() || "gpt-4o-mini";

  if (!apiKey) {
    throw new Error("Clé API manquante pour le mode LLM.");
  }

  const payload = {
    profile: {
      firstName: profile.firstName,
      lastName: profile.lastName,
      handles: profile.handles,
      xHandle: profile.xHandle,
      bio: profile.bio,
      socialText: profile.socialText,
      tone: profile.tone,
      quiz: profile.quiz,
    },
    inferredSignals: enrichment.signals,
    detectedTopics: enrichment.topics.map((topic) => topic.name),
  };

  const response = await fetchWithTimeout("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 1,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You generate satirical Trump-style campaign nicknames. Return strict JSON only with keys analysis, nicknames, rally_line. analysis must include persona and signals array. nicknames must contain exactly 5 items with name, why, power (0-99). Avoid hateful slurs.",
        },
        {
          role: "user",
          content: JSON.stringify(payload),
        },
      ],
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`LLM error ${response.status}: ${details.slice(0, 140)}`);
  }

  const data = await response.json();
  const rawText = data?.choices?.[0]?.message?.content || "";
  const parsed = extractJson(rawText);
  if (!parsed) throw new Error("Réponse LLM invalide.");

  const entries = mapLlmResult(parsed, localEntries);

  const llmSignals = [];
  if (parsed?.analysis?.persona) llmSignals.push(`Persona IA: ${parsed.analysis.persona}`);
  if (Array.isArray(parsed?.analysis?.signals)) {
    parsed.analysis.signals.slice(0, 3).forEach((signal) => llmSignals.push(`Signal IA: ${signal}`));
  }

  return {
    entries,
    llmSignals,
    rallyLine: typeof parsed?.rally_line === "string" ? parsed.rally_line : null,
  };
}

function collectProfile() {
  return {
    firstName: firstNameEl.value,
    lastName: lastNameEl.value,
    handles: handlesEl.value,
    xHandle: xHandleEl.value,
    bio: bioEl.value,
    socialText: socialTextEl.value,
    tone: toneEl.value,
    quiz: {
      energy: qEnergyEl.value,
      ego: qEgoEl.value,
      drama: qDramaEl.value,
      humor: qHumorEl.value,
      ambition: qAmbitionEl.value,
      archetype: qArchetypeEl.value,
    },
  };
}

async function runGeneration() {
  const profile = collectProfile();

  if (!profile.firstName.trim()) {
    errorEl.textContent = "Le prénom est obligatoire.";
    firstNameEl.focus();
    return;
  }

  errorEl.textContent = "";
  sourceStatusEl.textContent = "Analyse locale + quiz en cours...";
  generateBtn.disabled = true;

  try {
    const enrichment = buildEnrichment(profile);
    let entries = makeLocalNicknames(profile, enrichment);
    let signals = [...enrichment.signals];
    let rallyOverride = null;
    const sources = ["règles locales", "quiz", "texte social"];

    if (profile.xHandle.trim()) {
      sources.push("handle X (heuristique)");
    }

    if (useLlmEl.checked) {
      try {
        const llm = await generateWithLlm(profile, enrichment, entries);
        entries = llm.entries;
        signals = [...signals, ...llm.llmSignals];
        rallyOverride = llm.rallyLine;
        sources.push("LLM");
      } catch (llmError) {
        signals.push(`LLM indisponible: ${llmError.message}`);
      }
    }

    renderResults(entries, profile.tone, signals);
    if (rallyOverride) rallyLineEl.textContent = rallyOverride;

    sourceStatusEl.textContent = `Sources utilisées: ${sources.join(" + ")}`;
  } finally {
    generateBtn.disabled = false;
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  await runGeneration();
});

surpriseBtn.addEventListener("click", async () => {
  const sample = pick(surpriseProfiles);
  firstNameEl.value = sample.firstName;
  lastNameEl.value = sample.lastName;
  handlesEl.value = sample.handles;
  xHandleEl.value = sample.xHandle;
  bioEl.value = sample.bio;
  socialTextEl.value = sample.socialText;
  toneEl.value = sample.tone;

  qEnergyEl.value = sample.quiz.energy;
  qEgoEl.value = sample.quiz.ego;
  qDramaEl.value = sample.quiz.drama;
  qHumorEl.value = sample.quiz.humor;
  qAmbitionEl.value = sample.quiz.ambition;
  qArchetypeEl.value = sample.quiz.archetype;

  await runGeneration();
});

copyAllBtn.addEventListener("click", () => {
  const nicks = [...listEl.querySelectorAll(".nick-main")].map((node) => node.textContent);
  if (!nicks.length) return;
  copyText(nicks.map((nick, idx) => `${idx + 1}. ${nick}`).join("\n"));
});

surpriseBtn.click();
