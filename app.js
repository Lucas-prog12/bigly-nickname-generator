const form = document.getElementById("generator-form");
const firstNameEl = document.getElementById("firstName");
const lastNameEl = document.getElementById("lastName");
const handlesEl = document.getElementById("handles");
const bioEl = document.getElementById("bio");
const toneEl = document.getElementById("tone");
const surpriseBtn = document.getElementById("surpriseBtn");
const listEl = document.getElementById("nickname-list");
const rallyLineEl = document.getElementById("rallyLine");
const errorEl = document.getElementById("form-error");
const copyAllBtn = document.getElementById("copyAllBtn");

const toneBanks = {
  playful: {
    adjectives: ["Bouncy", "Flashy", "Noisy", "Turbo", "Dancing", "Lucky", "Bright", "Slick"],
    prefixes: ["Snack-Sized", "Meme-Machine", "Weekend", "Ultra", "Pocket", "Coffee-Fueled"],
    rallyTail: ["total fun energy", "a walking trend", "crowd favorite material", "pure headline bait"],
  },
  roast: {
    adjectives: ["Sleepy", "Low-Energy", "Crooked", "Wobbly", "Budget", "Overrated", "Tiny", "Messy"],
    prefixes: ["Deal-Losing", "Wrong-Thread", "Fact-Optional", "Discount", "Spin-Cycle", "Drama-First"],
    rallyTail: ["major weak-sauce vibes", "the ratings are not good", "all talk, no scoreboard", "the crowd sees everything"],
  },
  chaos: {
    adjectives: ["Hyperactive", "Volcanic", "Laser", "Glitchy", "Chaotic", "Unstable", "Galactic", "Rocket"],
    prefixes: ["Two-Mics", "All-Caps", "Midnight", "Plot-Twist", "Conspiracy", "Afterparty"],
    rallyTail: ["unbelievable chaos ratings", "peak timeline nonsense", "full circus mode", "absolutely interdimensional"],
  },
};

const topicBanks = [
  {
    keywords: ["dev", "code", "javascript", "react", "ai", "startup", "saas", "product", "tech", "api", "design"],
    adjectives: ["Beta", "Buggy", "Patchy", "Push-to-Prod", "Pixel"],
    nouns: ["Debugger", "Deploy", "Commit", "Prompt", "Console"],
    prefixes: ["404", "Merge-Conflict", "Hotfix", "Version-Zero"],
  },
  {
    keywords: ["crypto", "bitcoin", "trading", "nft", "finance", "invest", "stocks"],
    adjectives: ["Pump-and-Dump", "Leverage", "Paper-Hands", "Volatile", "Bear-Market"],
    nouns: ["Chart", "Wallet", "Dip", "Candle", "Token"],
    prefixes: ["Rug-Pull", "Margin-Call", "Bull-Trap"],
  },
  {
    keywords: ["fitness", "run", "gym", "marathon", "crossfit", "wellness", "yoga"],
    adjectives: ["Cardio", "Sweaty", "Protein", "Sprint", "Burpee"],
    nouns: ["Kettlebell", "Treadmill", "Shake", "Lunge", "PR"],
    prefixes: ["No-Rest", "Extra-Rep", "Leg-Day"],
  },
  {
    keywords: ["food", "chef", "coffee", "burger", "pizza", "baking", "restaurant"],
    adjectives: ["Greasy", "Double-Espresso", "Crunchy", "Microwave", "Saucy"],
    nouns: ["Spatula", "Macchiato", "Burger", "Biscuit", "Nacho"],
    prefixes: ["Drive-Thru", "Extra-Sauce", "Overcooked"],
  },
  {
    keywords: ["gaming", "twitch", "stream", "fps", "league", "valorant", "fortnite", "esport"],
    adjectives: ["Laggy", "No-Scope", "Tilted", "Respawn", "Ping-999"],
    nouns: ["Controller", "Headshot", "Lobby", "Loot", "Patch"],
    prefixes: ["Queue-Dodging", "AFK", "Final-Boss"],
  },
  {
    keywords: ["music", "dj", "rap", "pop", "guitar", "dance", "concert"],
    adjectives: ["Auto-Tune", "Off-Beat", "Bass-Boosted", "Encore", "Vinyl"],
    nouns: ["Mixtape", "Chorus", "Drop", "Backstage", "Playlist"],
    prefixes: ["One-More-Track", "Feedback-Loop", "Studio-Only"],
  },
];

const fallbackNouns = ["Candidate", "Champion", "Machine", "Operator", "Legend", "Package", "Storm", "Agenda"];

const surpriseProfiles = [
  {
    firstName: "Chloé",
    lastName: "Mercier",
    handles: "@chloe.codes, twitch/chlobot",
    bio: "frontend dev, run club, espresso, un peu de crypto",
    tone: "roast",
  },
  {
    firstName: "Yanis",
    lastName: "Rossi",
    handles: "@yanisplays",
    bio: "streaming, fps, editing vidéo, pizza life",
    tone: "chaos",
  },
  {
    firstName: "Mila",
    lastName: "Durand",
    handles: "@milamix",
    bio: "DJ, pop culture, social media manager",
    tone: "playful",
  },
];

function normalize(input) {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function tokenize(...values) {
  return normalize(values.filter(Boolean).join(" "))
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length > 1);
}

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function unique(list) {
  return [...new Set(list)];
}

function makeAlliterativeChoice(pool, letter) {
  const byInitial = pool.filter((word) => normalize(word).startsWith(letter));
  if (byInitial.length) return pick(byInitial);
  return pick(pool);
}

function getTopicEnrichment(tokens) {
  const bucket = {
    adjectives: [],
    nouns: [],
    prefixes: [],
  };

  topicBanks.forEach((topic) => {
    if (topic.keywords.some((key) => tokens.includes(key))) {
      bucket.adjectives.push(...topic.adjectives);
      bucket.nouns.push(...topic.nouns);
      bucket.prefixes.push(...topic.prefixes);
    }
  });

  return {
    adjectives: unique(bucket.adjectives),
    nouns: unique(bucket.nouns),
    prefixes: unique(bucket.prefixes),
  };
}

function makeNicknameSet(profile) {
  const firstName = profile.firstName.trim();
  const lastName = profile.lastName.trim();
  const tone = toneBanks[profile.tone] || toneBanks.roast;
  const tokens = tokenize(firstName, lastName, profile.handles, profile.bio);
  const initial = normalize(firstName).charAt(0) || "s";

  const topic = getTopicEnrichment(tokens);
  const adjectives = unique([...tone.adjectives, ...topic.adjectives]);
  const prefixes = unique([...tone.prefixes, ...topic.prefixes]);
  const nouns = unique([...fallbackNouns, ...topic.nouns]);

  const nameAnchor = `${firstName}${lastName ? ` ${lastName}` : ""}`;
  const shortAnchor = lastName ? `${firstName} ${lastName.charAt(0)}.` : firstName;

  const candidateFactory = [
    () => `${makeAlliterativeChoice(adjectives, initial)} ${firstName}`,
    () => `${pick(prefixes)} ${nameAnchor}`,
    () => `${makeAlliterativeChoice(adjectives, initial)} ${shortAnchor}`,
    () => `${pick(adjectives)}-${pick(nouns)} ${firstName}`,
    () => `${pick(prefixes)} ${lastName || firstName}`,
    () => `${pick(adjectives)} ${pick(nouns)} ${firstName}`,
    () => `${pick(adjectives)} ${lastName || pick(nouns)} ${firstName}`,
  ];

  const candidates = unique(
    Array.from({ length: 18 }, (_, idx) => {
      const build = candidateFactory[idx % candidateFactory.length];
      return build().replace(/\s+/g, " ").trim();
    }),
  );

  const scored = candidates.map((nick) => {
    let score = 10 + Math.floor(Math.random() * 60);
    if (normalize(nick).startsWith(initial)) score += 16;
    if (tokens.some((token) => normalize(nick).includes(token.slice(0, 4)))) score += 8;
    if (nick.includes("-")) score += 6;
    return { nick, score: Math.min(99, score) };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 5);
}

function buildRallyLine(bestNick, toneKey) {
  const tone = toneBanks[toneKey] || toneBanks.roast;
  return `People are saying \"${bestNick}\" everywhere. Honestly, ${pick(tone.rallyTail)}.`;
}

function copyText(value) {
  if (!value) return;
  navigator.clipboard.writeText(value).catch(() => {
    /* Ignore clipboard failures in restrictive contexts. */
  });
}

function renderResults(entries, tone) {
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
    meta.textContent = `Power score: ${entry.score}/99`;

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
}

function generateFromForm() {
  const payload = {
    firstName: firstNameEl.value,
    lastName: lastNameEl.value,
    handles: handlesEl.value,
    bio: bioEl.value,
    tone: toneEl.value,
  };

  if (!payload.firstName.trim()) {
    errorEl.textContent = "Le prénom est obligatoire.";
    firstNameEl.focus();
    return null;
  }

  errorEl.textContent = "";
  const nicknames = makeNicknameSet(payload);
  renderResults(nicknames, payload.tone);
  return nicknames;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  generateFromForm();
});

surpriseBtn.addEventListener("click", () => {
  const sample = pick(surpriseProfiles);
  firstNameEl.value = sample.firstName;
  lastNameEl.value = sample.lastName;
  handlesEl.value = sample.handles;
  bioEl.value = sample.bio;
  toneEl.value = sample.tone;
  generateFromForm();
});

copyAllBtn.addEventListener("click", () => {
  const nicks = [...listEl.querySelectorAll(".nick-main")].map((el) => el.textContent);
  if (!nicks.length) return;
  const payload = nicks.map((nick, index) => `${index + 1}. ${nick}`).join("\n");
  copyText(payload);
});

surpriseBtn.click();
