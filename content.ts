// every piece of copy and every link on the site lives here.
// strings are rendered exactly as written: no css lowercasing, so BATMAN / $BATMAN stay uppercase.

export type HeroMedia =
  | { kind: "image"; src: string }
  | { kind: "video"; src: string; poster: string };

export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  title: "$BATMAN — near's co-founder's corgi",
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
  buy: "https://app.rhea.finance/#near|batman-4.nearlytrade.near",
  x: "https://x.com/BatmanDogNear",
  dexscreener: "https://dexscreener.com/near/refv2-batman-4.nearlytrade.near:wrap.near:10000",
  nearblocks: "https://nearblocks.io/token/batman-4.nearlytrade.near",
  skidanovPost: "https://x.com/AlexSkidanov/status/2110408460735246583",
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
  // swap to { kind: "video", src: "/hero-loop.mp4", poster: "/hero-bg-frame.png" } once the loop is in /public
  media: { kind: "image", src: "/hero-bg-frame.png" } as HeroMedia,
};

export const lore = {
  heading: "who is batman?",
  body: "alex skidanov co-founded near. alex has a corgi. the corgi's name is batman. that's the lore. that's the whole lore.",
  post: {
    src: "/skidanov-post.png",
    alt: "alex skidanov's post on x: \"BATMAN!!! so resemblance. such uncanny\" with a photo of his corgi",
    width: 598,
    height: 699,
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

export const howToBuy = {
  heading: "how to join us",
  steps: [
    "get a near wallet (meteor or hot)",
    "buy some near",
    "swap near for $BATMAN on rhea, paste the CA if it doesn't show up",
  ],
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
    { label: "rhea", href: links.buy },
    { label: "dexscreener", href: links.dexscreener },
    { label: "nearblocks", href: links.nearblocks },
  ],
};

export const footer = {
  disclaimer:
    "$BATMAN is a memecoin with no intrinsic value or expectation of financial return. not affiliated with near foundation or alex skidanov. not financial advice.",
  copyright: "© 2026 batman",
};
