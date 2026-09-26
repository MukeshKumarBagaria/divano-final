/**
 * The catalogue behind the category pages, the navigation and the sitemap.
 *
 * PLACEHOLDER CATALOGUE — model names, prices and every figure in `specs`,
 * `widths` and `footprint` are stand-ins. Replace them with the real range
 * before launch; nothing here has been measured or certified.
 */

export type Img = { src: string; alt: string; w?: number; h?: number };
export type Faq = { q: string; a: string };

export type ChairModel = {
  name: string;
  image: Img;
  note: string;
  price: number;
  badge?: string;
  /** Product cutouts sit on white; studio photographs fill the frame. */
  fit: "contain" | "cover";
};

export type ChairType = {
  slug: string;
  index: string;
  name: string;
  singular: string;
  short: string;
  note: string;
  tagline: string;
  intro: string;
  seo: { title: string; description: string; keywords: string[] };
  image: Img;
  backHeight: string;
  bestFor: string[];
  highlights: { title: string; body: string }[];
  specs: { label: string; value: string }[];
  models: ChairModel[];
  compare: { use: string; support: string; adjust: string; upholstery: string; hours: string };
  faqs: Faq[];
};

export const chairTypes: ChairType[] = [
  {
    slug: "low-back-chairs",
    index: "01",
    name: "Low back chairs",
    singular: "Low back chair",
    short: "Low back",
    note: "For dynamic workspaces",
    tagline: "Compact support for desks that change hands.",
    intro:
      "A shorter backrest that supports the lower spine and tucks neatly under the desk. Built for hot desks, training rooms and shared workstations, where people sit for shorter stretches and the floor needs to stay clear.",
    seo: {
      title: "Low Back Office Chairs",
      description:
        "Low back ergonomic office chairs for hot desks, training rooms and shared workstations. Mesh and leather task chairs made to order in India by Divano Elegante.",
      keywords: ["low back office chair", "task chair", "workstation chair", "hot desk chair India"],
    },
    image: { src: "/images/chair-low.jpg", alt: "Black mesh low back task chair with adjustable arms in a bright studio", w: 1024, h: 1024 },
    backHeight: "480 mm",
    bestFor: ["Hot desks", "Training rooms", "Shared workstations", "Home study"],
    highlights: [
      { title: "Lower-spine support", body: "The backrest meets the lumbar curve and stops below the shoulder blades, so you sit upright without leaning back." },
      { title: "Tucks under the desk", body: "A compact back and optional flip-up arms keep aisles clear between shifts." },
      { title: "Easy to share", body: "One-lever height adjustment means each new person sets the chair up in seconds." },
    ],
    specs: [
      { label: "Back height", value: "480 mm" },
      { label: "Seat height", value: "440 – 540 mm, gas lift" },
      { label: "Mechanism", value: "Centre tilt with lock" },
      { label: "Armrests", value: "Fixed or flip-up" },
      { label: "Base", value: "Nylon five-star" },
      { label: "Castors", value: "Nylon, carpet or hard floor" },
      { label: "Upholstery", value: "Mesh back, fabric or leatherette seat" },
    ],
    models: [
      {
        name: "Strata Task Chair",
        image: { src: "/chairs/low-back-chair.jpg", alt: "Strata task chair in black leatherette with chrome arms", w: 1000, h: 1000 },
        note: "Padded leatherette, chrome arm caps",
        price: 8500,
        badge: "Bestseller",
        fit: "contain",
      },
      {
        name: "Strata Mesh Task Chair",
        image: { src: "/images/chair-low.jpg", alt: "Strata mesh task chair in black", w: 1024, h: 1024 },
        note: "Breathable mesh, height-adjustable arms",
        price: 9200,
        fit: "cover",
      },
    ],
    compare: {
      use: "Hot desks, training rooms",
      support: "Lower back",
      adjust: "Height, tilt lock",
      upholstery: "Mesh, fabric, leatherette",
      hours: "Short to half-day sessions",
    },
    faqs: [
      { q: "Is a low back chair ergonomic enough for a full day?", a: "For shorter sessions and shared desks, yes. If one person will sit for most of the day, a mid back chair with adjustable lumbar support is the better choice." },
      { q: "Can I get low back chairs with or without arms?", a: "Yes. Fixed arms, flip-up arms and armless versions are specified per order, which is useful where chairs need to slide fully under a desk." },
      { q: "Do you supply low back chairs in bulk for offices?", a: "Yes. We build to the quantity you need and can match finishes across a whole floor. Share a headcount and we will come back with a quote and lead time." },
    ],
  },
  {
    slug: "mid-back-chairs",
    index: "02",
    name: "Mid back chairs",
    singular: "Mid back chair",
    short: "Mid back",
    note: "Balanced everyday support",
    tagline: "The everyday chair for full working days.",
    intro:
      "A backrest that rises to the shoulder blades, with lumbar support where it matters. The mid back is the workhorse of the range: comfortable for a full working day, compact enough for an open-plan floor.",
    seo: {
      title: "Mid Back Ergonomic Office Chairs",
      description:
        "Mid back ergonomic office chairs with lumbar support and breathable mesh, for full working days. Made to order for offices and homes across India by Divano Elegante.",
      keywords: ["mid back office chair", "ergonomic chair with lumbar support", "mesh office chair India", "work from home chair"],
    },
    image: { src: "/images/chair-mid.jpg", alt: "Grey mesh mid back ergonomic chair with adjustable arms and an aluminium base", w: 1024, h: 1024 },
    backHeight: "620 mm",
    bestFor: ["Open-plan offices", "Work from home", "Operations teams", "Co-working"],
    highlights: [
      { title: "Lumbar where it counts", body: "A contoured mesh back with adjustable lumbar support keeps the lower spine in its natural curve." },
      { title: "Breathable all day", body: "Open-weave mesh lets air through, which you notice by mid-afternoon in a warm office." },
      { title: "Tuned to the sitter", body: "Seat height, tilt tension and arm height adjust so one chair fits a wide range of people." },
    ],
    specs: [
      { label: "Back height", value: "620 mm" },
      { label: "Seat height", value: "440 – 540 mm, gas lift" },
      { label: "Mechanism", value: "Synchro tilt, multi-lock" },
      { label: "Lumbar", value: "Height-adjustable" },
      { label: "Armrests", value: "Flip-up or 2D adjustable" },
      { label: "Base", value: "Nylon or aluminium five-star" },
      { label: "Upholstery", value: "Mesh back, fabric or mesh seat" },
    ],
    models: [
      {
        name: "Vela Mesh Chair",
        image: { src: "/chairs/mid-back-chair.jpg", alt: "Vela mesh chair with a white frame and flip-up arms", w: 650, h: 1000 },
        note: "Flip-up arms, white or black frame",
        price: 11200,
        badge: "Bestseller",
        fit: "contain",
      },
      {
        name: "Vela Pro Mesh Chair",
        image: { src: "/images/chair-mid.jpg", alt: "Vela Pro mesh chair in grey with an aluminium base", w: 1024, h: 1024 },
        note: "Synchro tilt, adjustable lumbar",
        price: 13900,
        fit: "cover",
      },
    ],
    compare: {
      use: "Open-plan offices, home offices",
      support: "Up to the shoulder blades",
      adjust: "Height, synchro tilt, lumbar, arms",
      upholstery: "Mesh, fabric",
      hours: "A full working day",
    },
    faqs: [
      { q: "What is the difference between a mid back and a high back chair?", a: "A mid back chair supports you up to the shoulder blades; a high back chair continues to the shoulders and usually adds a headrest. Mid back chairs suit most desk work; high back chairs suit long days and cabins where people recline." },
      { q: "Is a mesh chair better than a cushioned one?", a: "Mesh breathes better and keeps its shape; foam cushioning feels softer at first. Many people choose a mesh back with a cushioned seat, which we offer on the mid back range." },
      { q: "Can I try a mid back chair before ordering for my team?", a: "Yes. For office orders we can arrange samples so your team can sit on the chairs before you commit." },
    ],
  },
  {
    slug: "high-back-chairs",
    index: "03",
    name: "High back chairs",
    singular: "High back chair",
    short: "High back",
    note: "Executive comfort",
    tagline: "Full support for long days and leadership cabins.",
    intro:
      "A full-height backrest, usually with a headrest, for people who sit long hours or like to recline while they think. Upholstered in leather, leatherette or mesh for cabins, boardrooms and home studies.",
    seo: {
      title: "High Back Executive Chairs",
      description:
        "High back ergonomic and executive chairs with headrests, synchro recline and leather or mesh upholstery. Built to order for cabins, boardrooms and home offices by Divano Elegante.",
      keywords: ["high back chair", "executive office chair", "boss chair India", "ergonomic chair with headrest"],
    },
    image: { src: "/images/chair-high.jpg", alt: "Black leather and mesh high back chair with a headrest and a polished aluminium base", w: 1024, h: 1024 },
    backHeight: "780 mm",
    bestFor: ["Leadership cabins", "Boardrooms", "Long-hour roles", "Home studies"],
    highlights: [
      { title: "Head-to-hip support", body: "The backrest supports the full spine, and the headrest takes the weight of your head when you lean back." },
      { title: "Recline that stays balanced", body: "A synchro mechanism moves seat and back together, so your feet stay planted as you recline." },
      { title: "Materials with presence", body: "Leather, leatherette or premium mesh, with polished aluminium or chrome bases for cabins and boardrooms." },
    ],
    specs: [
      { label: "Back height", value: "780 mm with headrest" },
      { label: "Seat height", value: "450 – 550 mm, gas lift" },
      { label: "Mechanism", value: "Synchro recline, multi-lock" },
      { label: "Headrest", value: "Height and angle adjustable" },
      { label: "Armrests", value: "3D adjustable" },
      { label: "Base", value: "Polished aluminium or chrome" },
      { label: "Upholstery", value: "Leather, leatherette or mesh" },
    ],
    models: [
      {
        name: "Atlas Ergonomic Chair",
        image: { src: "/images/chair-high.jpg", alt: "Atlas ergonomic chair in black leather and mesh", w: 1024, h: 1024 },
        note: "Leather and mesh, 3D arms, headrest",
        price: 21500,
        badge: "New arrival",
        fit: "cover",
      },
      {
        name: "Aurelia High Back Chair",
        image: { src: "/products/aurelia-executive.png", alt: "Aurelia high back chair in teal leather with chrome arms", w: 662, h: 1100 },
        note: "Padded leather panels, chrome frame",
        price: 24999,
        badge: "Bestseller",
        fit: "contain",
      },
      {
        name: "Orion Executive Chair",
        image: { src: "/chairs/high-back-chair.jpg", alt: "Orion executive chair in ivory leather", w: 1000, h: 1000 },
        note: "Sculpted leather shell, synchro tilt",
        price: 18900,
        fit: "contain",
      },
    ],
    compare: {
      use: "Cabins, boardrooms, long-hour roles",
      support: "Full back and head",
      adjust: "Height, recline, headrest, 3D arms",
      upholstery: "Leather, leatherette, mesh",
      hours: "Long days, eight hours plus",
    },
    faqs: [
      { q: "Who should choose a high back chair?", a: "Anyone who sits for long stretches, likes to recline, or is taller than average. The extra height and headrest support the upper back and neck when you lean back." },
      { q: "Leather or mesh for a high back chair?", a: "Leather looks formal and wears in beautifully; mesh stays cooler in warm rooms. Several of our high back chairs combine a leather seat with a mesh back." },
      { q: "Can you match executive chairs to our boardroom interiors?", a: "Yes. Upholstery colour, stitching and base finish are chosen per order, so chairs can be matched to a room's palette." },
    ],
  },
  {
    slug: "cafeteria-chairs",
    index: "04",
    name: "Cafeteria chairs",
    singular: "Cafeteria chair",
    short: "Cafeteria",
    note: "Flexible social spaces",
    tagline: "Easy-going seating for the busiest rooms in the building.",
    intro:
      "Light, durable chairs for pantries, cafeterias, cafés and breakout zones. Shells that wipe clean, frames that stack, and finishes warm enough that the room still feels like somewhere to linger.",
    seo: {
      title: "Cafeteria & Café Chairs",
      description:
        "Stackable cafeteria, pantry and café chairs with wipe-clean shells, bentwood and upholstered options. Made to order in bulk for offices, cafés and hospitality by Divano Elegante.",
      keywords: ["cafeteria chairs", "stackable chairs", "cafe chairs India", "pantry chairs for office"],
    },
    image: { src: "/images/chair-cafe.jpg", alt: "Upholstered oatmeal shell chair on solid oak legs", w: 1024, h: 1024 },
    backHeight: "420 mm",
    bestFor: ["Office cafeterias", "Cafés and restaurants", "Breakout zones", "Training halls"],
    highlights: [
      { title: "Built for traffic", body: "Steel and solid-wood frames that take being pulled out, pushed in and moved around all day." },
      { title: "Clean in seconds", body: "Moulded and coated shells wipe down between sittings; upholstered versions use contract-grade fabric." },
      { title: "Stack and store", body: "Stacking models clear the floor for events, cleaning and the evening shift." },
    ],
    specs: [
      { label: "Back height", value: "420 mm" },
      { label: "Seat height", value: "450 mm, fixed" },
      { label: "Frame", value: "Powder-coated steel or solid wood" },
      { label: "Shell", value: "Moulded polypropylene or upholstered" },
      { label: "Stacking", value: "Selected models" },
      { label: "Feet", value: "Floor-protecting glides" },
      { label: "Finishes", value: "Colour-matched per order" },
    ],
    models: [
      {
        name: "Pace Stacking Chair",
        image: { src: "/chairs/cafeteria-chair.jpg", alt: "Pace stacking chair with a white shell and black steel legs", w: 1000, h: 1000 },
        note: "Stacking, wipe-clean shell",
        price: 6400,
        badge: "Bestseller",
        fit: "contain",
      },
      {
        name: "Nook Upholstered Shell",
        image: { src: "/images/chair-cafe.jpg", alt: "Nook shell chair in oatmeal fabric on oak legs", w: 1024, h: 1024 },
        note: "Contract fabric, solid oak legs",
        price: 8200,
        fit: "cover",
      },
      {
        name: "Elara Bentwood Chair",
        image: { src: "/products/elara-wood-chair.png", alt: "Elara bentwood chair in dark walnut with a cross back", w: 527, h: 1100 },
        note: "Steam-bent wood, cross back",
        price: 6900,
        fit: "contain",
      },
    ],
    compare: {
      use: "Cafeterias, cafés, breakouts",
      support: "Mid back, fixed",
      adjust: "None needed",
      upholstery: "Polypropylene, fabric, wood",
      hours: "Meals, breaks, workshops",
    },
    faqs: [
      { q: "Are your cafeteria chairs stackable?", a: "Several models stack, including the Pace chair. Stackable and non-stacking options can be mixed in one order." },
      { q: "Can cafeteria chairs be made in our brand colours?", a: "Yes. Shell, fabric and frame colours can be specified per order, which works well for larger quantities." },
      { q: "Do you supply chairs for restaurants and cafés?", a: "Yes. We supply cafés, restaurants and hotel dining rooms as well as office cafeterias, with finishes suited to commercial use." },
    ],
  },
  {
    slug: "visitor-chairs",
    index: "05",
    name: "Visitor chairs",
    singular: "Visitor chair",
    short: "Visitor",
    note: "Welcoming every guest",
    tagline: "First impressions, comfortably seated.",
    intro:
      "Chairs for the other side of the desk. Cantilever and four-leg frames with no mechanism to fiddle with, upholstered to feel generous in reception areas, meeting rooms and cabins.",
    seo: {
      title: "Visitor & Reception Chairs",
      description:
        "Visitor, reception and meeting room chairs with cantilever frames and leather or fabric upholstery. Built to order for offices, clinics and cabins across India by Divano Elegante.",
      keywords: ["visitor chair", "reception chairs", "meeting room chairs", "cantilever chair India"],
    },
    image: { src: "/images/chair-visitor.jpg", alt: "Charcoal fabric visitor chair on a chrome cantilever frame", w: 1024, h: 1024 },
    backHeight: "560 mm",
    bestFor: ["Reception areas", "Meeting rooms", "Cabins", "Clinics"],
    highlights: [
      { title: "No moving parts", body: "Cantilever and four-leg frames have no mechanism to adjust or wear, so they stay neat for years." },
      { title: "A gentle flex", body: "Cantilever frames give slightly as you sit, which feels more comfortable than a rigid chair." },
      { title: "Matched to the room", body: "Upholster visitor chairs to match the executive chair across the desk, or the reception sofa." },
    ],
    specs: [
      { label: "Back height", value: "560 mm" },
      { label: "Seat height", value: "460 mm, fixed" },
      { label: "Frame", value: "Chrome cantilever or four-leg" },
      { label: "Armrests", value: "Upholstered or chrome" },
      { label: "Mechanism", value: "None" },
      { label: "Feet", value: "Floor-protecting glides" },
      { label: "Upholstery", value: "Leather, leatherette or fabric" },
    ],
    models: [
      {
        name: "Cove Visitor Chair",
        image: { src: "/chairs/visitor-chair.jpg", alt: "Cove visitor chair in tufted black leatherette on a chrome frame", w: 1000, h: 999 },
        note: "Tufted leatherette, chrome cantilever",
        price: 9750,
        badge: "Bestseller",
        fit: "contain",
      },
      {
        name: "Cove Fabric Visitor Chair",
        image: { src: "/images/chair-visitor.jpg", alt: "Cove visitor chair in charcoal fabric", w: 1024, h: 1024 },
        note: "Contract fabric, chrome cantilever",
        price: 8900,
        fit: "cover",
      },
      {
        name: "Arden Visitor Chair",
        image: { src: "/products/arden-lounge.png", alt: "Arden visitor chair in black leatherette with chrome arms", w: 539, h: 697 },
        note: "Slim chrome frame, padded arms",
        price: 9750,
        badge: "New arrival",
        fit: "contain",
      },
    ],
    compare: {
      use: "Receptions, meeting rooms, cabins",
      support: "Mid back, fixed",
      adjust: "None needed",
      upholstery: "Leather, leatherette, fabric",
      hours: "Meetings and waiting",
    },
    faqs: [
      { q: "What is a cantilever visitor chair?", a: "A chair whose seat is supported by a single continuous tube frame at the front, with no back legs. It flexes slightly as you sit and is easy to clean around." },
      { q: "Can visitor chairs match our executive chairs?", a: "Yes. We can upholster visitor chairs in the same leather or fabric as the executive chair, so a cabin reads as one set." },
      { q: "Are visitor chairs suitable for clinics and waiting areas?", a: "Yes. Leatherette and coated fabrics wipe clean, and the frames have no mechanism to service." },
    ],
  },
];

export const getChairType = (slug: string) => chairTypes.find((type) => type.slug === slug);

export const chairHref = (slug: string) => `/ergonomic-chairs/${slug}`;

/* ------------------------------------------------------------------ */
/* Sofas                                                               */
/* ------------------------------------------------------------------ */

export type SofaSize = {
  id: string;
  name: string;
  line: string;
  body: string;
  width: string;
  seats: string;
  image: Img;
  focus?: string;
};

export const sofaSizes: SofaSize[] = [
  {
    id: "one-seater",
    name: "1 Seater",
    line: "Armchairs and accent seats",
    body: "A single chair with the same frame and upholstery as our sofas. For reading corners, cabins, hotel rooms and lounges, or as the accent that finishes a set.",
    width: "850 – 1,000 mm",
    seats: "1",
    image: { src: "/hero/ergonomic-chair.jpg", alt: "Olive velvet armchair with a sculpted wing back on the factory floor", w: 1800, h: 1436 },
    focus: "38% 55%",
  },
  {
    id: "two-seater",
    name: "2 Seater",
    line: "For compact rooms and receptions",
    body: "Enough room for two without taking over the floor. Our most requested size for apartments, reception areas and cabins.",
    width: "1,650 mm",
    seats: "2",
    image: { src: "/sofas/showroom.jpg", alt: "Cream two- and three-seater sofas with tan cushions in the showroom", w: 1600, h: 1266 },
    focus: "70% 55%",
  },
  {
    id: "three-seater",
    name: "3 Seater",
    line: "The living-room centrepiece",
    body: "The anchor of a living room or a hotel lobby, in leather or fabric, with the seat depth and firmness chosen by you.",
    width: "2,100 mm",
    seats: "3",
    image: { src: "/hero/sofa.jpg", alt: "Cognac leather three-seater sofas finished on the factory floor", w: 1800, h: 1198 },
    focus: "30% 55%",
  },
  {
    id: "lounge",
    name: "Lounge",
    line: "Low, deep and unhurried",
    body: "Lower, deeper seating for lounges, lobbies and breakout spaces, where people settle in rather than perch.",
    width: "Made to drawing",
    seats: "1 – 3",
    image: { src: "/hero/hero-1.png", alt: "Close view of a bouclé lounge chair on a slim steel leg", w: 1080, h: 1080 },
  },
  {
    id: "modular",
    name: "Modular",
    line: "Grows with the room",
    body: "Corner units, chaises and curved sections that join into the layout your room needs, and can be rearranged later.",
    width: "Per module, from 900 mm",
    seats: "3 and up",
    image: { src: "/hero/hero-2.png", alt: "Curved modular sofa arranged in a conversation circle", w: 1080, h: 1080 },
  },
];

/* ------------------------------------------------------------------ */
/* Phone booths                                                        */
/* ------------------------------------------------------------------ */

export type BoothSize = {
  id: string;
  name: string;
  occupancy: string;
  use: string;
  /** Plan footprint in millimetres, drawn to scale on the page. */
  footprint: { w: number; d: number } | null;
  height: string;
  image: Img;
  features: string[];
};

export const boothSizes: BoothSize[] = [
  {
    id: "solo",
    name: "Solo",
    occupancy: "1 person",
    use: "Calls and focused work beside the desks people already sit at.",
    footprint: { w: 1000, d: 1000 },
    height: "2,230 mm",
    image: { src: "/booths/booth-1.jpg", alt: "Black solo booth with a stool and worktop beside open-plan desks", w: 1200, h: 1600 },
    features: ["Stool or chair", "Worktop with power", "Ceiling light and fan"],
  },
  {
    id: "duo",
    name: "Duo",
    occupancy: "2 people",
    use: "One-to-ones, interviews and paired work, with a shared worktop.",
    footprint: { w: 1500, d: 1000 },
    height: "2,230 mm",
    image: { src: "/booths/booth-4.jpg", alt: "Two yellow booths standing side by side on a carpeted floor", w: 930, h: 1600 },
    features: ["Two seats", "Shared worktop", "Twin power points"],
  },
  {
    id: "meeting",
    name: "Meeting",
    occupancy: "4 people",
    use: "Stand-ups and video calls without booking a meeting room.",
    footprint: { w: 2200, d: 1500 },
    height: "2,230 mm",
    image: { src: "/hero/phone-booth.jpg", alt: "Glass-fronted meeting pods with facing yellow and orange sofas", w: 1800, h: 1245 },
    features: ["Facing sofas", "Central table", "Screen-ready wall"],
  },
  {
    id: "custom",
    name: "Custom",
    occupancy: "Your call",
    use: "Multi-bay runs and one-off sizes, built to the wall, the colour and the floor you have.",
    footprint: null,
    height: "To drawing",
    image: { src: "/booths/booth-3.jpg", alt: "A multi-bay run of dark booths built along an office wall", w: 1600, h: 1200 },
    features: ["Any bay count", "Colour-matched shell", "Built to your drawing"],
  },
];
