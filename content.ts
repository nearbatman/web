// every piece of copy and every link on the site lives here.
// strings are rendered exactly as written: no css lowercasing, so BATMAN / $BATMAN stay uppercase.

export type HeroMedia =
  | { kind: "image"; src: string }
  | { kind: "video"; src: string; poster: string; playbackRate?: number };

export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  title: "$BATMAN — near's co-founder's corgi",
  ticker: "$BATMAN",
  description: "batman is the corgi of near's co-founder. now he's a memecoin on near.",
};

export const token = {
  ticker: "$BATMAN",
  ca: "batman-4.nearlytrade.near",
  chain: "near",
  supply: "~1B",
  liquidity: "locked",
};

export const links = {
  buy: "https://nearly.trade/batman-4.nearlytrade.near",
  x: "https://x.com/BatmanDogNear",
  dexscreener: "https://dexscreener.com/near/refv2-batman-4.nearlytrade.near:wrap.near:10000",
  nearblocks: "https://nearblocks.io/tokens/batman-4.nearlytrade.near",
  skidanovPost: "https://x.com/AlexSkidanov/status/2099238589989265664",
  irlPost: "https://x.com/AlexSkidanov/status/2106115398865494404",
};

export const copyCa = {
  label: "ca",
  copy: "copy contract address",
  copied: "copied",
  failed: "copy blocked. address selected, copy it manually.",
};

export const hero = {
  wordmark: "BATMAN",
  sub: "near's co-founder named his corgi batman. the rest is history.",
  buyLabel: "buy $BATMAN",
  media: {
    kind: "video",
    src: "/hero-loop.mp4",
    poster: "/hero-bg-frame.png",
    playbackRate: 0.75,
  } as HeroMedia,
};

// rain + fog laid over the hero video. tune everything here.
export const weather = {
  rain: {
    density: 150, // drops per 1920x1080 of hero area, all layers together
    angle: 12, // degrees off vertical, drops fall down-left
    speed: 1, // multiplier on each layer's own speed
    opacity: 0.2, // peak streak opacity (bone), scaled per layer
    // far -> near: px/s, streak length + width in px, share of the drops, opacity multiplier
    layers: [
      { speed: 900, length: 14, width: 0.8, share: 0.5, alpha: 0.6 },
      { speed: 1400, length: 24, width: 1, share: 0.3, alpha: 0.85 },
      { speed: 2000, length: 40, width: 1.5, share: 0.2, alpha: 1 },
    ],
  },
  fog: {
    opacity: 0.15, // peak opacity of each fog bank (bone)
  },
};

// fixed city backdrop below the hero; scrolls "down the building" as you read
export const pageBg = {
  src: "/page-bg-descent.jpg",
  width: 1920,
  height: 1140,
  heightVh: 140, // rendered image height as % of the viewport, aspect kept (width covers)
  bgOpacity: 0.15, // image opacity over #0B0B0F
  fadeHeight: 200, // px of soft dark fade under the hero's bottom edge
};

export const lore = {
  heading: "who is batman?",
  body: "alex skidanov co-founded near. alex has a corgi. the corgi's name is batman. that's the lore. that's the whole lore.",
  post: {
    src: "/skidanov-post.png",
    alt: "alex skidanov's post on x: \"Batman is the chunker at the bottom left. He was a puppy when the article was written in 2016, old man now.\" with a photo of batman and three other corgis",
    width: 617,
    height: 650,
    linkLabel: "open alex skidanov's post on x",
  },
};

export const heist = {
  heading: "the 3.8m heist",
  beats: [
    "october 2026. near intents gets hacked. $3.8m walks out the door.",
    "the chain lights up. somebody calls batman.",
    "every dollar comes back. 100%. batman takes the credit.",
  ],
  note: "the hack and the recovery are real. the flying corgi is not. probably.",
  film: {
    src: "/batman-film.mp4",
    poster: "/batman-film-poster.jpg",
    playLabel: "play the film",
  },
};

export const tokenomics = {
  heading: "the numbers",
  rows: [
    { label: "chain", value: token.chain },
    { label: "supply", value: token.supply },
    { label: "ticker", value: token.ticker },
    { label: "liquidity", value: token.liquidity },
  ],
};

// live market tiles above the tokenomics table, fetched client-side from dexscreener
export const liveStats = {
  endpoint: "https://api.dexscreener.com/latest/dex/pairs/near/refv2-batman-4.nearlytrade.near:wrap.near:10000",
  refreshMs: 30_000,
  label: "live",
  source: "via dexscreener",
  marketCap: "market cap",
  price: "price",
  volume: "24h volume",
  change: "24h",
  unavailable: "—",
};

export const howToBuy = {
  heading: "how to join us",
  // this word inside a step becomes the green buy link
  buyLinkText: "nearly.trade",
  steps: [
    "get a near wallet (meteor or hot)",
    "buy some near",
    "swap near for $BATMAN on nearly.trade, paste the CA if it doesn't show up",
  ],
};

export type FaqItem = {
  q: string;
  a: string;
  // this text inside the answer becomes a green link
  link?: { text: string; href: string };
  // show the copy-the-contract pill under the answer
  ca?: boolean;
};

export const faq = {
  heading: "faqs",
  sub: "frequently barked questions.",
  items: [
    {
      q: "is this affiliated with near or alex skidanov?",
      a: "no. batman is a real corgi owned by near's co-founder. $BATMAN is a community memecoin, not affiliated with near foundation or alex skidanov.",
    },
    {
      q: "is batman a real dog?",
      a: "very real. very chunky. see the post above.",
    },
    {
      q: "what's the contract address?",
      a: "batman-4.nearlytrade.near",
      ca: true,
    },
    {
      q: "where can i buy?",
      a: "on nearly.trade. get a near wallet, buy some near, swap for $BATMAN.",
      link: { text: "nearly.trade", href: links.buy },
    },
    {
      q: "is liquidity locked?",
      a: "yes, liquidity is locked.",
    },
    {
      q: "will it go up?",
      a: "batman doesn't do price predictions. he does naps. not financial advice.",
    },
  ] satisfies FaqItem[],
};

export const linkList = {
  heading: "batman is watching.",
  irl: {
    src: "/batman-irl-1.jpg",
    alt: "batman the corgi, irl",
    width: 680,
    height: 510,
    linkLabel: "batman irl, alex skidanov's post on x",
  },
  items: [
    { label: "X", href: links.x },
    { label: "nearly.trade", href: links.buy },
    { label: "dexscreener", href: links.dexscreener },
    { label: "nearblocks", href: links.nearblocks },
  ],
};

export const footer = {
  disclaimer:
    "$BATMAN is a memecoin with no intrinsic value or expectation of financial return. not affiliated with near foundation or alex skidanov. not financial advice.",
  copyright: "© 2026 batman",
  xLabel: "batman on x",
};

export const notFound = {
  title: "lost the trail",
  line: "batman lost the trail.",
  home: "back to base",
};
