/**
 * ============================================================================
 *  APEX ROSARIO — CENTRAL PROJECT DATA  (single source of truth)
 * ============================================================================
 *  Same structure as the Apex Elyria / Alphabet / Kremlin project sites. Every
 *  fact rendered on the site is drawn from this file, which in turn is drawn
 *  from:
 *   - the official floor-plan sheets "(05)/(06)-APEX ROSARIO TOWER-A/B/C/D"
 *     (unit areas, units per floor, lifts, floor ranges) — the most reliable
 *     Rosario source;
 *   - the brochure "Rosario brochure design_updated_17th july.pdf" (28 image-
 *     only spreads) for copy, colours and the interior / amenity imagery;
 *   - the project brief from the Apex digital team (price, rate, land area,
 *     possession, RERA status) — marked // BRIEF below.
 *
 *  Flags for the sales / marketing / legal team before launch:
 *   - COMPLIANCE: UP RERA REGISTERED (confirmed by the Apex digital team,
 *     2026-10-19). Put the registration number in `legal.rera` — the footer
 *     then shows it with the UP RERA link. `compliance.approvedForPublic`
 *     stays false (noindex + robots Disallow) until the number is added and
 *     the copy is signed off.
 *   - The brochure is a DRAFT that still carries Elyria material: its master
 *     plan (Tower A/B, Elyria legend), one floor plan ("Tower A&B Unit 2,
 *     1995 sq ft"), the amenity list ("Two-Iconic Tower", "real tree on
 *     building façade", "30,000+ ft club house") and the spec sheet are
 *     Elyria's. None of those are used here as Rosario facts.
 *   - The brochure's exterior / amenity / interior pictures are mood imagery,
 *     not renders of the Rosario towers. They are shown as "conceptual".
 *     The only image of the actual four towers with five domes is
 *     "Domed Towers Above the Forest.png" (941 × 1672 px) — confirm it is the
 *     approved elevation and supply a high-resolution version.
 *   - Floor height: 11 ft floor-to-ceiling height and 3-level basement parking
 *     (confirmed by the Apex digital team, 2026-10-19).
 *   - No location map or phone number exist yet — those slots show
 *     placeholders.
 *   - `project.url` is a placeholder domain — replace with the live one.
 * ============================================================================
 */

export const assetVersion = 1;

/** Public-launch gate — flip to true only after RERA + copy sign-off. */
export const compliance = {
  approvedForPublic: false,
};

/* -------------------------------------------------------------------------- */
/*  1. PROJECT IDENTITY                                                        */
/* -------------------------------------------------------------------------- */

export const project = {
  name: 'Apex Rosario',
  shortName: 'Rosario',
  wordmark: 'ROSARIO',
  by: 'By Apex Group',
  location: 'Siddharth Vihar, Ghaziabad',
  region: 'National Capital Region',
  url: 'https://www.apexrosario.in', // TODO: confirm live domain before launch
  summary:
    'A royal residential development by the Apex Group at Siddharth Vihar, Ghaziabad — 3 & 4 BHK residences in four classically inspired towers crowned by five domes.',
};

/** Indicative pricing — BRIEF. Always shown with an asterisk and the pricing note. */
export const pricing = {
  show: true,
  startingFrom: '₹2.20 Cr*',
  rate: '₹10,500 per sq. ft.*',
  note: '*Prices are indicative, exclusive of taxes and other charges, and subject to change without notice. Please confirm the current price list with the Apex Group sales team.',
};

/* -------------------------------------------------------------------------- */
/*  2. NAVIGATION — order matches the section order on the page                */
/* -------------------------------------------------------------------------- */

export const nav: { id: string; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'master-plan', label: 'Master Plan' },
  { id: 'amenities', label: 'Amenities' },
  { id: 'residences', label: 'Residences' },
  { id: 'specifications', label: 'Specifications' },
  { id: 'location', label: 'Location' },
  { id: 'construction', label: 'Construction' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'contact', label: 'Enquire' },
];

/* -------------------------------------------------------------------------- */
/*  3. HERO                                                                    */
/* -------------------------------------------------------------------------- */

export const hero = {
  /**
   * Scroll-scrubbed day-to-night film of the four domed towers (replaced
   * 2026-10-24 with "…_20261024115937_processed_gwr_video_mvp.mp4" (watermark removed),
   * 8 s, 1920×1080). Encoded all-keyframe H.264 at 24 fps, faststart, no
   * audio, light unsharp (desktop 1920 crf 18 tune film, mobile 1280 crf 21) — raised from crf 24/27 on 2026-10-24 because the film looked soft. It never autoplays — it
   * only moves while the page scrolls. The /assets/rosario/video path is cached
   * immutable, so a new film needs a NEW file name.
   */
  videoDesktop: '/assets/rosario/video/rosario-hero-v7-desktop.mp4',
  /**
   * Phones get their own PORTRAIT film (supplied 2026-10-24,
   * "Architectural_day-to-night_hyper…_20261024121746_processed_gwr_video_mvp.mp4",
   * 1080×1920, 8 s), encoded 720×1280 all-keyframe CRF 25 — shown full-screen.
   */
  videoMobile: '/assets/rosario/video/rosario-hero-v7-mobile.mp4',
  posterMobile: '/assets/rosario/hero/rosario-hero-v6-mobile-poster.jpg',
  /** First frame of the film — loading poster + reduced-motion fallback. */
  poster: '/assets/rosario/hero/rosario-hero-v5-poster.webp',
  posterFallback: '/assets/rosario/hero/rosario-hero-v5-poster.jpg',
  /** Tower render used by the still hero (only if the film is removed). */
  stillImage: `/assets/rosario/exterior/rosario-towers.jpg?v=${assetVersion}`,
  posterW: 941,
  posterH: 1672,
  /** Burgundy foil texture from the official brochure cover. */
  texture: `/assets/rosario/hero/rosario-texture.jpg?v=${assetVersion}`,
  /** Sticky scroll length as multiples of viewport height (10 s film). */
  scrollVh: 480,
  scrollVhMobile: 340,
  eyebrow: 'Siddharth Vihar, Ghaziabad',
  title: 'APEX ROSARIO',
  tagline: 'A Royal Living',
  line: 'Traditional Way of Living in Modern Time',
  support: '3 & 4 BHK Residences in Siddharth Vihar, Ghaziabad',
  cta: 'Enquire Now',
  alt: 'Apex Rosario — a day-to-night film of the four classically styled towers crowned by domes, rising above a forest canopy (artist’s impression).',
};

/* -------------------------------------------------------------------------- */
/*  4. SECTION 01 — PROJECT INTRODUCTION                                       */
/* -------------------------------------------------------------------------- */

export const intro = {
  label: 'About Apex Rosario',
  headline: ['Experience Royal Living', 'with Modern Comfort'],
  lead:
    'Apex Rosario is a luxury residential project by Apex Group in Siddharth Vihar, Ghaziabad, offering spacious 3 & 4 BHK apartments inspired by classic Roman architecture.',
  body: [
    'Designed for comfort and privacy, the project offers spacious homes, modern amenities, and green surroundings. With easy access to NH-24, Noida, Indirapuram, and Delhi, Apex Rosario brings together luxury living and everyday convenience.',
  ],
  stats: [
    { value: '4.9', unit: 'acres', label: 'Approx. Land Area' },
    { value: '4', unit: 'towers', label: 'Up to 38 Residential Floors' },
    { value: '570', unit: 'homes', label: 'Approx. Residences' },
    { value: '3 & 4', unit: 'BHK', label: 'Residences' },
  ],
  keyPoints: [
    'Classical European / Roman-inspired architecture',
    '3-side open residences',
    'Low-density floor planning',
    '4 lifts per tower',
  ],
  /** Daytime elevation of the towers (supplied by the Apex digital team, 2026-10-21). */
  image: `/assets/rosario/exterior/rosario-towers-day.jpg?v=${assetVersion}`,
  imageW: 1254,
  imageH: 1254,
  imageAlt: 'The Apex Rosario towers in white with domed crowns, rising above trees beside a wide road under a blue sky (artist’s impression).',
  caption: 'Apex Rosario · artist’s impression',
};

/* -------------------------------------------------------------------------- */
/*  5. SECTION 02 — LIFE AT ROSARIO                                            */
/* -------------------------------------------------------------------------- */

export const lifeAt = {
  label: 'Life at Rosario',
  headline: ['The Legacy of Rome.', 'The Luxury of Today.'],
  intro:
    'Inspired by the enduring beauty of Roman architecture, every detail reflects timeless elegance, masterful craftsmanship and architectural excellence — majestic arches, refined proportions and thoughtfully designed spaces that celebrate the past while redefining modern luxury.',
  /** BRIEF highlights, each qualified to the layouts it applies to (checked against the plan sheets). */
  points: [
    '3 residences per floor in Tower A',
    '4 residences per floor in Towers B, C & D',
    '5 lifts per floor',
    '11 ft floor-to-ceiling height',
    '3 side open residences',
    'Two master bedrooms in selected 4 BHK layouts',
    'Dedicated dressing spaces',
    'Study, store & servant room in applicable layouts',
    'Separate servant entry in applicable layouts',
    '3 level basement parking',
  ],
};

/** A scroll-stepped image sequence — one slide on screen at a time. */
export const lifeGallery = {
  scrollVh: 480,
  slides: [
    {
      image: `/assets/rosario/interiors/living.jpg?v=${assetVersion}`,
      label: 'The Grand Living Room',
      copy: 'Inspired by the grandeur of Roman villas — expansive layouts, abundant natural light and a welcoming space where elegance meets everyday comfort.',
    },
    {
      image: `/assets/rosario/interiors/living-grand.jpg?v=${assetVersion}`,
      label: 'Living & Entertaining',
      copy: 'Whether hosting distinguished guests or enjoying quiet family moments, every detail reflects refined luxury.',
    },
    {
      image: `/assets/rosario/interiors/bedroom.jpg?v=${assetVersion}`,
      label: 'The Grand Bedroom',
      copy: 'A private retreat of calm, with dedicated dressing spaces in every master bedroom.',
    },
    {
      image: `/assets/rosario/interiors/bedroom-2.jpg?v=${assetVersion}`,
      label: 'Bedrooms',
      copy: 'Softly lit, generously proportioned and quietly elegant.',
    },
    {
      image: `/assets/rosario/interiors/kitchen.jpg?v=${assetVersion}`,
      label: 'The Artisan’s Kitchen',
      copy: 'Where timeless craftsmanship meets modern innovation — designed with precision and functionality.',
    },
    {
      image: `/assets/rosario/interiors/bathroom.jpg?v=${assetVersion}`,
      label: 'The Roman Bath',
      copy: 'Inspired by the legendary Roman baths — a private sanctuary of relaxation.',
    },
  ],
};

/* -------------------------------------------------------------------------- */
/*  6. SECTION 03 — MASTER PLAN                                                */
/* -------------------------------------------------------------------------- */

export const masterPlan = {
  label: 'The Master Plan',
  headline: ['Four Towers,', 'One Royal Address.'],
  intro:
    'Four residential towers on approximately 4.9 acres, wrapped by a fitness trail and meandering walkways, with pools, play areas and themed gardens set within the landscape.',
  /** Official site plan by S.Bose Landscape Consultants — updated version from "APEX ROSARIO BROCHURE.pdf" (2026-10-24); legend panel and credit cropped off. */
  image: `/assets/rosario/site/site-plan-v2.jpg?v=${assetVersion}`,
  imageW: 2400,
  imageH: 1497,
  imageAlt: 'The official Apex Rosario site plan, showing the towers, drop-offs, fitness trail, pools, sports courts, play areas and gardens.',
  /** Exactly as printed in the site-plan legend (spelling of "Garden" corrected). */
  legend: [
    'Entry of the Site',
    'Exit of the Site',
    'Entrance Water Court',
    'Drop Off',
    'Feature Wall with Waterbody',
    'Fitness Trail',
    'Outdoor Fitness Zone',
    'Kids Play Area',
    'Hammock Garden',
    'Meandering Walkway',
    'Children’s Play Area',
    'Pool Deck with Loungers',
    'Kids Pool',
    'Leisure Pool',
    'Sensory Garden',
    'Wet Play Area',
    'Senior Citizen Area',
    'Cricket Pitch',
    'Padel Court',
    'Pickleball Court',
    'Rose Garden',
  ] as string[],
  /**
   * Labelled markers for the plan explorer (same pattern as the Apex Quebec
   * site): % of image width / height. Tower markers are deliberately not added
   * — the site plan does not label which block is Tower A, B, C or D.
   */
  markers: [
    { id: 'entry', kind: 'other', label: 'Entry', x: 92.5, y: 91.9, blurb: 'Entry of the site, with the entrance water court alongside.' },
    { id: 'exit', kind: 'other', label: 'Exit', x: 91.7, y: 75.0, blurb: 'Exit of the site.' },
    { id: 'towers', kind: 'tower', label: 'Residential Towers', x: 58.0, y: 80.0, blurb: 'Four residential towers with 3 & 4 BHK residences — 3 per floor in Tower A, 4 per floor in Towers B, C & D — each with its own drop-off.' },
    { id: 'pools', kind: 'amenity', label: 'Leisure & Kids Pools', x: 34.2, y: 53.4, blurb: 'A leisure pool and a kids pool, with a pool deck and loungers.' },
    { id: 'sensory', kind: 'landscape', label: 'Sensory Garden', x: 26.0, y: 33.0, blurb: 'A sensory garden beside the wet play area.' },
    { id: 'senior', kind: 'landscape', label: 'Senior Citizen Area', x: 45.0, y: 42.0, blurb: 'A dedicated senior citizen area along the meandering walkway.' },
    { id: 'cricket', kind: 'amenity', label: 'Cricket Pitch', x: 62.5, y: 50.5, blurb: 'A cricket pitch beside the sports courts.' },
    { id: 'courts', kind: 'amenity', label: 'Padel & Pickleball Courts', x: 61.4, y: 61.0, blurb: 'A padel court and a pickleball court.' },
    { id: 'trail', kind: 'landscape', label: 'Fitness Trail', x: 15.5, y: 78.5, blurb: 'A fitness trail that loops around the towers.' },
    { id: 'kids', kind: 'amenity', label: 'Kids Play Area', x: 42.0, y: 92.4, blurb: 'A kids play area, with a separate children’s play area by the pools.' },
  ] as { id: string; kind: 'tower' | 'amenity' | 'landscape' | 'other'; label: string; x: number; y: number; blurb: string }[],
};

/* -------------------------------------------------------------------------- */
/*  7. SECTION 04 — AMENITIES                                                  */
/* -------------------------------------------------------------------------- */

export const amenities = {
  label: 'Features & Amenities',
  headline: ['The Empire', 'of Indulgence.'],
  intro:
    'Landscaped gardens, elegant promenades, wellness spaces, recreation zones and vibrant social destinations, curated so that luxury extends far beyond your front door.',
  featured: {
    title: 'Clubhouse',
    subtitle: 'A Clubhouse Designed for Royal Living',
    copy:
      'Step into a world of comfort, wellness, and entertainment at Apex Rosario’s thoughtfully designed clubhouse. From an indoor swimming pool, modern gymnasium, spa, and salon to fine dining, a banquet hall, and exciting indoor games, every space is created to enhance your lifestyle. Rooftop dining, elegant lounges, and beautifully landscaped surroundings offer the perfect setting to relax, celebrate, and connect.',
    /**
     * Supplied by the Apex digital team (2026-10-21), replacing the entry gate
     * render — shown uncropped. The gate render is kept at
     * amenities/entry-gate-actual.jpg in case it is wanted again.
     */
    image: `/assets/rosario/amenities/clubhouse-pool-sunset.jpg?v=${assetVersion}`,
    w: 1672,
    h: 941,
    alt: 'A colonnaded clubhouse beside a free-form pool with loungers and palms at sunset (artist’s impression).',
  },
  /** Final amenity list supplied by the Apex digital team (2026-10-22), grouped into four columns. */
  categories: [
    {
      id: 'club',
      name: 'Clubhouse',
      items: [
        'Clubhouse lobby connecting all towers',
        'Banquet',
        'Café & Restaurant',
        'Café & Bar — Clubhouse Terrace',
        'Work Pod / Coffee Shop',
        'Executive Lounge',
        'Library',
        'Pantry',
      ],
    },
    {
      id: 'wellness',
      name: 'Wellness & Pools',
      items: ['Indoor Swimming Pool', 'Indoor Pool Deck', 'Kids Pool', 'Gym', 'Yoga & Zumba Room', 'Salon'],
    },
    {
      id: 'sports',
      name: 'Sports & Games',
      items: [
        'Tennis Court',
        'Basketball Court',
        'Sports Academy',
        'Table Tennis',
        'Pool Table',
        'Bowling Alley with Café',
        'Karaoke',
        'Mahjong',
        'Arcade Games',
      ],
    },
    {
      id: 'outdoors',
      name: 'Outdoors',
      items: [
        'Fitness Trail',
        'Outdoor Fitness Zone',
        'Meandering Walkway',
        'Kids Play Area',
        'Children’s Wet Play Area',
        'Senior Citizen Area',
      ],
    },
  ],
  gallery: [
    {
      id: 'theme-park',
      title: 'The Grand Theme Park',
      category: 'Landscape',
      copy: 'Sculpture, water and light, woven through landscaped gardens.',
      image: `/assets/rosario/amenities/theme-park-walk.jpg?v=${assetVersion}`,
      w: 1672,
      h: 941,
      alt: 'A curving garden walkway lit by low lights and firefly lights through the landscaped grounds at dusk (artist’s impression).',
    },
    {
      id: 'event',
      title: 'Celebrate Like Roman Nobility',
      category: 'Celebrations',
      copy: 'A distinguished setting for weddings, celebrations and memorable milestones.',
      image: `/assets/rosario/amenities/indoor-pool-lounge.jpg?v=${assetVersion}`,
      w: 1672,
      h: 941,
      alt: 'An indoor pool with loungers, olive trees and a fireplace, opening onto formal gardens (artist’s impression).',
    },
    {
      id: 'leisure',
      title: 'The House of Timeless Leisure',
      category: 'The Clubhouse',
      copy: 'A refined retreat where wellness, recreation and social living come together.',
      image: `/assets/rosario/amenities/club-leisure.jpg?v=${assetVersion}`,
      w: 2400,
      h: 2400,
      alt: 'Curved banquette seating and dining tables among palms (conceptual brochure imagery).',
    },
    {
      id: 'courtyard',
      title: 'An Empire of Extraordinary Living',
      category: 'Wellness',
      copy: 'Arcades, water and greenery in the classical tradition.',
      image: `/assets/rosario/amenities/living-sunset.jpg?v=${assetVersion}`,
      w: 1672,
      h: 941,
      alt: 'A living room with a chandelier and sofas opening onto a balustraded balcony at sunset (artist’s impression).',
    },
  ],
};

/* -------------------------------------------------------------------------- */
/*  8. SECTION 05 — RESIDENCES                                                 */
/* -------------------------------------------------------------------------- */

export type Residence = {
  id: string;
  group: '3 BHK' | '4 BHK';
  /** Configuration as printed on the plan sheet. */
  config: string;
  /** Tower / unit reference, as printed on the floor-plan sheet. */
  tower: string;
  /** Short label for the selector chip. */
  unit: string;
  /** Super area in sq. ft. */
  totalSqft: number;
  coveredSqft?: number;
  carpetSqft?: number;
  balconySqft?: number;
  externalWallSqft?: number;
  commonSqft?: number;
  terraceSqft?: number;
  plan: string;
  planAlt: string;
};

const plan = (file: string) => `/assets/rosario/floor-plans/${file}?v=${assetVersion}`;

/** All areas read off the official Apex Rosario floor-plan sheets (Towers A–D). */
export const residences = {
  label: 'The Residences',
  headline: ['Residences', 'Fit for Royalty.'],
  groups: ['3 BHK', '4 BHK'] as const,
  homes: [
    {
      id: 'a-1', group: '4 BHK', config: '4 BHK + 4 Toilets + Servant Room', tower: 'Tower A · Unit 1', unit: 'A · Unit 1',
      totalSqft: 2740, coveredSqft: 2159, carpetSqft: 1559, balconySqft: 419,
      plan: plan('tower-a-unit-1.jpg'), planAlt: 'Apex Rosario Tower A, Unit 1 — 4 BHK + study + servant room floor plan, super area 2,740 sq. ft.',
    },
    {
      id: 'a-2', group: '4 BHK', config: '4 BHK + 4 Toilets + Dress + Servant Room', tower: 'Tower A · Unit 2', unit: 'A · Unit 2',
      totalSqft: 2670, coveredSqft: 2076, carpetSqft: 1518, balconySqft: 391,
      plan: plan('tower-a-unit-2.jpg'), planAlt: 'Apex Rosario Tower A, Unit 2 — 4 BHK + dress + servant room floor plan, super area 2,670 sq. ft.',
    },
    {
      id: 'a-3', group: '4 BHK', config: '4 BHK + 4 Toilets + Dress + Servant Room + Powder Room', tower: 'Tower A · Unit 3', unit: 'A · Unit 3',
      totalSqft: 3400, coveredSqft: 2854, carpetSqft: 1923, balconySqft: 724,
      plan: plan('tower-a-unit-3.jpg'), planAlt: 'Apex Rosario Tower A, Unit 3 — 4 BHK + dress + servant room + powder room floor plan, super area 3,400 sq. ft.',
    },
    {
      id: 'b-1', group: '4 BHK', config: '4 BHK + 4 Toilets + Servant Room', tower: 'Tower B · Unit 1', unit: 'B · Unit 1',
      totalSqft: 2720, coveredSqft: 2050, carpetSqft: 1548, balconySqft: 347,
      plan: plan('tower-b-unit-1.jpg'), planAlt: 'Apex Rosario Tower B, Unit 1 — 4 BHK + servant room floor plan, super area 2,720 sq. ft.',
    },
    {
      id: 'b-2', group: '4 BHK', config: '4 BHK + 4 Toilets + Servant Room', tower: 'Tower B · Unit 2', unit: 'B · Unit 2',
      totalSqft: 2750, coveredSqft: 2051, carpetSqft: 1569, balconySqft: 334,
      plan: plan('tower-b-unit-2.jpg'), planAlt: 'Apex Rosario Tower B, Unit 2 — 4 BHK + servant room floor plan, super area 2,750 sq. ft.',
    },
    {
      id: 'b-3', group: '4 BHK', config: '4 BHK + 4 Toilets + Servant Room', tower: 'Tower B · Unit 3', unit: 'B · Unit 3',
      totalSqft: 2750, coveredSqft: 2046, carpetSqft: 1569, balconySqft: 345,
      plan: plan('tower-b-unit-3.jpg'), planAlt: 'Apex Rosario Tower B, Unit 3 — 4 BHK + servant room floor plan, super area 2,750 sq. ft.',
    },
    {
      id: 'b-4', group: '4 BHK', config: '4 BHK + 4 Toilets + Servant Room', tower: 'Tower B · Unit 4', unit: 'B · Unit 4',
      totalSqft: 2720, coveredSqft: 2053, carpetSqft: 1548, balconySqft: 347,
      plan: plan('tower-b-unit-4.jpg'), planAlt: 'Apex Rosario Tower B, Unit 4 — 4 BHK + servant room floor plan, super area 2,720 sq. ft.',
    },
    {
      id: 'c-1', group: '3 BHK', config: '3 BHK + 3 Toilets + Study', tower: 'Tower C · Unit 1', unit: 'C · Unit 1',
      totalSqft: 2100, coveredSqft: 1548, carpetSqft: 1148, balconySqft: 297,
      plan: plan('tower-c-unit-1.jpg'), planAlt: 'Apex Rosario Tower C, Unit 1 — 3 BHK floor plan, super area 2,100 sq. ft.',
    },
    {
      id: 'c-2', group: '3 BHK', config: '3 BHK + 3 Toilets + Servant Room', tower: 'Tower C · Unit 2', unit: 'C · Unit 2',
      totalSqft: 2200, coveredSqft: 1730, carpetSqft: 1243, balconySqft: 339,
      plan: plan('tower-c-unit-2.jpg'), planAlt: 'Apex Rosario Tower C, Unit 2 — 3 BHK + servant room floor plan, super area 2,200 sq. ft.',
    },
    {
      id: 'c-3', group: '3 BHK', config: '3 BHK + 3 Toilets + Servant Room', tower: 'Tower C · Unit 3', unit: 'C · Unit 3',
      totalSqft: 2200, coveredSqft: 1718, carpetSqft: 1243, balconySqft: 329,
      plan: plan('tower-c-unit-3.jpg'), planAlt: 'Apex Rosario Tower C, Unit 3 — 3 BHK + servant room floor plan, super area 2,200 sq. ft.',
    },
    {
      id: 'c-4', group: '3 BHK', config: '3 BHK + 3 Toilets + Store', tower: 'Tower C · Unit 4', unit: 'C · Unit 4',
      totalSqft: 2025, coveredSqft: 1587, carpetSqft: 1190, balconySqft: 297,
      plan: plan('tower-c-unit-4.jpg'), planAlt: 'Apex Rosario Tower C, Unit 4 — 3 BHK + store floor plan, super area 2,025 sq. ft.',
    },
    {
      id: 'd-1', group: '3 BHK', config: '3 BHK + 3 Toilets + Store', tower: 'Tower D · Unit 1', unit: 'D · Unit 1',
      totalSqft: 2100, coveredSqft: 1586, carpetSqft: 1190, balconySqft: 297,
      plan: plan('tower-d-unit-1.jpg'), planAlt: 'Apex Rosario Tower D, Unit 1 — 3 BHK + store floor plan, super area 2,100 sq. ft.',
    },
    {
      id: 'd-2', group: '3 BHK', config: '3 BHK + 3 Toilets + Servant Room', tower: 'Tower D · Unit 2 (4th floor)', unit: 'D · Unit 2',
      totalSqft: 2200, carpetSqft: 1242, balconySqft: 329, terraceSqft: 124,
      plan: plan('tower-d-unit-2.jpg'), planAlt: 'Apex Rosario Tower D, 4th floor, Unit 2 — 3 BHK floor plan with open terrace, super area 2,200 sq. ft.',
    },
    {
      id: 'd-3', group: '3 BHK', config: '3 BHK + 3 Toilets + Servant Room', tower: 'Tower D · Unit 3 (4th floor)', unit: 'D · Unit 3',
      totalSqft: 2200, carpetSqft: 1242, balconySqft: 339, terraceSqft: 124,
      plan: plan('tower-d-unit-3.jpg'), planAlt: 'Apex Rosario Tower D, 4th floor, Unit 3 — 3 BHK floor plan with open terrace, super area 2,200 sq. ft.',
    },
    {
      id: 'd-4', group: '3 BHK', config: '3 BHK + 3 Toilets + Study', tower: 'Tower D · Unit 4', unit: 'D · Unit 4',
      totalSqft: 2025, coveredSqft: 1552, carpetSqft: 1144, balconySqft: 297,
      plan: plan('tower-d-unit-4.jpg'), planAlt: 'Apex Rosario Tower D, Unit 4 — 3 BHK floor plan, super area 2,025 sq. ft.',
    },
  ] as Residence[],
  note: 'Areas as printed on the official floor-plan sheets. Plans are indicative and subject to change; furniture is shown for reference only.',
};

/* -------------------------------------------------------------------------- */
/*  9. SECTION 06 — SPECIFICATIONS                                             */
/* -------------------------------------------------------------------------- */

export const specifications = {
  label: 'Specifications',
  headline: ['The Art of', 'Specification.'],
  intro:
    'From the Apex Rosario brochure specification sheet. Specifications are indicative and subject to final confirmation by the developer.',
  categories: [
    {
      id: 'structure',
      name: 'Structure',
      rows: [
        { k: 'Structure', v: 'Earthquake-resistant RCC framed structure certified by IIT' },
        { k: 'Civil Work', v: 'Aluminium shuttering for monolithic structure work' },
        { k: 'Floor Height', v: '11 ft floor-to-ceiling' },
      ],
    },
    {
      id: 'doors',
      name: 'Doors & Windows',
      rows: [
        { k: 'Main Door', v: '2450 mm (8′) high flush door with laminate' },
        { k: 'Internal Door', v: 'Flush door with solid wooden frame' },
        { k: 'External Door & Window', v: 'UPVC / aluminium powder-coated sliding doors' },
      ],
    },
    {
      id: 'interiors',
      name: 'Flooring, Kitchen & Toilets',
      rows: [
        { k: 'Flooring', v: 'Vitrified tiles on floor' },
        { k: 'Kitchen', v: 'Granite platform with steel sink, glazed tile in dado up to 2 feet from platform' },
        { k: 'Toilet', v: 'Glazed tiles 8′ height on the wall, wall-mounted W.C., anti-skid floor tiles' },
        { k: 'Balcony', v: 'Glass railing' },
      ],
    },
    {
      id: 'services',
      name: 'Services',
      rows: [
        { k: 'Lifts', v: '4 lifts per tower — Mitsubishi / Schindler / Otis or equivalent' },
        { k: 'Water Supply', v: 'Concealed water lines with standard quality fittings, CP fittings & chinaware' },
        { k: 'Water Storage', v: 'Underground and overhead water tank with pumps for 24 hours uninterrupted water supply' },
        { k: 'Electrical', v: 'Concealed copper wiring with standard quality fittings, boards & switches' },
      ],
    },
    {
      id: 'finishes',
      name: 'Finishes & Lighting',
      rows: [
        { k: 'Painting', v: 'External wall finished with weatherproof paint, internal wall with acrylic emulsion (plastic paint), steel work finished with enamel paint' },
        { k: 'Designer Light Fixtures', v: 'In porch, entrance gate and common areas' },
      ],
    },
    {
      id: 'security',
      name: 'Security & Parking',
      rows: [
        { k: 'Security & Intercom', v: '24/7 CCTV surveillance, video door phone & wiring for intercom in each flat' },
        { k: 'Boundary', v: 'Gated complex with boundary wall' },
        { k: 'Parking', v: '3 level basement parking' },
      ],
    },
  ],
};

/* -------------------------------------------------------------------------- */
/*  10. SECTION 07 — LOCATION                                                  */
/* -------------------------------------------------------------------------- */

export const location = {
  label: 'The Location',
  headline: ['At Home in', 'Siddharth Vihar'],
  intro:
    'Apex Rosario is located at Siddharth Vihar, Ghaziabad, with road and metro connectivity towards Delhi, Noida and Indirapuram.',
  address: 'Plot No. 3/SP-10, Siddharth Vihar Yojna, Ghaziabad (U.P.) - 201009',
  /** No Rosario location map yet — placeholder. */
  mapImage: '',
  mapImageW: 1600,
  mapImageH: 1200,
  mapImageAlt: 'The Apex Rosario location map.',
  /** Official Google Maps listing: "Apex Rosario" (supplied by the Apex digital team, 2026-10-17). */
  mapEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.3051792641963!2d77.40238037592596!3d28.650579583260036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cef647abe7d03%3A0x7741c473761d2bcd!2sApex%20Rosario!5e0!3m2!1sen!2sin!4v1792219877899!5m2!1sen!2sin',
  mapsUrl: 'https://www.google.com/maps?cid=8593365564181523405',
  /** Connectivity — supplied by the Apex digital team (2026-10-19). */
  connectivity: {
    heading: 'Everything You Need, Close to Home',
    intro:
      'Located in Siddharth Vihar, Ghaziabad, Apex Rosario offers easy access to major roads, metro stations, schools, hospitals, and business hubs.',
    items: [
      { name: 'NH-9 & 14-Lane Expressway', detail: 'Direct connectivity' },
      { name: 'Noida Sectors 62 & 63', detail: 'Approx. 8 km' },
      { name: 'Shaheed Sthal (New Bus Adda)', detail: 'Red Line Metro' },
      { name: 'Vaishali Metro Station', detail: 'Blue Line Metro' },
      { name: 'Noida Electronic City Metro Station', detail: 'Blue Line Metro' },
      { name: 'Ghaziabad Railway Station', detail: 'Approx. 10 minutes' },
      { name: 'Schools', detail: 'St. Andrews World School & Delhi Public School' },
      { name: 'Hospitals', detail: 'Fortis, Kailash & Manipal' },
      { name: 'Namo Bharat RRTS', detail: 'Connectivity' },
      { name: 'Mahamaya Sports Stadium', detail: 'Approx. 4–6 km away' },
      { name: 'Hindon Airport', detail: 'Approx. 15–20 minutes away by road' },
    ],
  },
};

/* -------------------------------------------------------------------------- */
/*  10B. CONSTRUCTION UPDATES                                                  */
/* -------------------------------------------------------------------------- */

export type ConstructionUpdate = {
  /** e.g. 'October 2026' — the month the photos were taken. */
  date: string;
  title: string;
  note: string;
  /**
   * Real site photographs only — never renders. Put the files in
   * public/assets/rosario/construction/ (e.g. 2026-10/01.jpg). The first photo
   * is shown large; the rest as thumbnails. All open in the lightbox.
   */
  images: { src: string; alt: string; w: number; h: number; caption?: string }[];
};

/**
 * Newest first. EMPTY until the site team supplies dated progress photos —
 * the section then shows a "coming soon" state instead of invented progress.
 */
export const construction: {
  label: string;
  headline: string[];
  intro: string;
  emptyNote: string;
  /** Frames shown while `updates` is empty. */
  photoSlots: string[];
  updates: ConstructionUpdate[];
} = {
  label: 'Construction Updates',
  headline: ['Progress,', 'On Site.'],
  intro: 'Construction work at Apex Rosario has begun. Stay updated with the latest progress and site developments.',
  emptyNote: 'Construction Has Started',
  photoSlots: ['Site progress photo', 'Towers A & B progress', 'Towers C & D progress'],
  updates: [
    {
      date: 'November 2026',
      title: 'Construction Has Started',
      note: 'Site clearing and levelling are under way across the Apex Rosario plot, with excavators on site and the boundary hoarding in place.',
      // Site photos taken 17 Nov 2026 (supplied by the Apex digital team); location data stripped.
      images: [
        { src: `/assets/rosario/construction/2026-11/01.jpg?v=${assetVersion}`, alt: 'The Apex Rosario site being cleared and levelled, with a water tanker and an excavator, November 2026.', w: 2000, h: 1125, caption: 'Site clearing and levelling' },
        { src: `/assets/rosario/construction/2026-11/02.jpg?v=${assetVersion}`, alt: 'The boundary hoarding with Apex signage around the Apex Rosario site, November 2026.', w: 2000, h: 1125, caption: 'Boundary hoarding in place' },
        { src: `/assets/rosario/construction/2026-11/03.jpg?v=${assetVersion}`, alt: 'An excavator on the Apex Rosario site beside the Apex hoarding, November 2026.', w: 2000, h: 1125, caption: 'Excavator on site' },
      ],
    },
  ],
};

/* -------------------------------------------------------------------------- */
/*  11. SECTION 08 — GALLERY                                                   */
/* -------------------------------------------------------------------------- */

export type GalleryImage = { src: string; alt: string; caption: string; category: string; w: number; h: number };

const g = (path: string, v = assetVersion) => `/assets/rosario/${path}?v=${v}`;

export const gallery: {
  label: string;
  headline: string[];
  categories: string[];
  images: GalleryImage[];
  /** Slots shown as "asset pending" frames while `images` is empty. */
  pending: { caption: string; category: string }[];
} = {
  label: 'The Gallery',
  headline: ['The Project,', 'Frame by Frame.'],
  categories: ['All', 'Amenities', 'Interiors', 'Landscape'],
  /** Gallery set supplied by the Apex digital team (2026-10-19) — artist’s impressions. */
  images: [
    { src: g('gallery/banquet-hall.jpg', 2), alt: 'A banquet hall with round dining tables, chandeliers and guests being served (artist’s impression).', caption: 'The banquet hall', category: 'Amenities', w: 1080, h: 1080 },
    { src: g('gallery/master-bedroom.jpg'), alt: 'A master bedroom with a sculpted feature wall, chandelier and walk-in wardrobe (artist’s impression).', caption: 'Master bedroom', category: 'Interiors', w: 941, h: 941 },
    { src: g('gallery/clubhouse-pool.jpg'), alt: 'A colonnaded clubhouse beside a free-form pool with loungers at sunset (artist’s impression).', caption: 'Clubhouse & pool', category: 'Amenities', w: 941, h: 941 },
    { src: g('gallery/gym.jpg'), alt: 'A gymnasium with free weights, benches and strength machines (artist’s impression).', caption: 'The gymnasium', category: 'Amenities', w: 941, h: 941 },
    { src: g('gallery/indoor-pool.jpg'), alt: 'An indoor lap pool with loungers, olive trees and a fireplace, overlooking gardens (artist’s impression).', caption: 'Indoor pool & spa lounge', category: 'Amenities', w: 941, h: 941 },
    { src: g('gallery/mini-theatre.jpg'), alt: 'A mini theatre with a starlit ceiling, projector and lounge seating (artist’s impression).', caption: 'Mini theatre', category: 'Amenities', w: 941, h: 941 },
    { src: g('gallery/kids-play.jpg'), alt: 'An indoor kids’ play area with a tree-house slide and ball pool (artist’s impression).', caption: 'Kids’ play area', category: 'Amenities', w: 941, h: 941 },
    { src: g('gallery/pool-aerial.jpg'), alt: 'An aerial view of the pools, splash pad, play area and jogging track (artist’s impression).', caption: 'Pools & landscape', category: 'Landscape', w: 941, h: 941 },
    { src: g('gallery/salon-spa.jpg'), alt: 'A salon and spa with styling chairs, wash stations and a treatment room (artist’s impression).', caption: 'Salon & spa', category: 'Amenities', w: 941, h: 941 },
    { src: g('gallery/lounge.jpg'), alt: 'A lounge with a curved sofa, armchairs and a lit bookshelf (artist’s impression).', caption: 'Residents’ lounge', category: 'Interiors', w: 941, h: 941 },
    { src: g('gallery/games-room.jpg'), alt: 'A games room with a table-tennis table (artist’s impression).', caption: 'Games room', category: 'Amenities', w: 941, h: 941 },
    { src: g('gallery/landscaped-walk.jpg'), alt: 'A curving garden pathway lit by firefly lights at dusk (artist’s impression).', caption: 'Landscaped walkways', category: 'Landscape', w: 941, h: 941 },
    { src: g('gallery/co-working.jpg'), alt: 'A co-working lounge with work booths and armchairs (artist’s impression).', caption: 'Co-working lounge', category: 'Amenities', w: 941, h: 941 },
    { src: g('gallery/basketball-court.jpg'), alt: 'An outdoor basketball court beside the domed towers at sunset (artist’s impression).', caption: 'Basketball court', category: 'Amenities', w: 1080, h: 1080 },
    { src: g('gallery/bowling-alley.jpg'), alt: 'A bowling alley with a lounge bar behind glass (artist’s impression).', caption: 'Bowling alley', category: 'Amenities', w: 1080, h: 1080 },
    { src: g('gallery/card-room.jpg'), alt: 'A card and games room with round tables and lounge seating (artist’s impression).', caption: 'Card room', category: 'Amenities', w: 1080, h: 1080 },
    { src: g('gallery/billiards-lounge.jpg'), alt: 'A billiards and foosball lounge with sofas and a trophy wall (artist’s impression).', caption: 'Billiards lounge', category: 'Amenities', w: 1080, h: 1080 },
    { src: g('gallery/tennis-court.jpg'), alt: 'A tennis court beside the clubhouse with the towers behind (artist’s impression).', caption: 'Tennis court', category: 'Amenities', w: 1080, h: 1080 },
    { src: g('gallery/grand-lobby.jpg'), alt: 'A triple-height entrance lobby with a sculpted feature wall, chandelier and reception desk (artist’s impression).', caption: 'Grand lobby', category: 'Interiors', w: 1254, h: 1254 },
    { src: g('gallery/badminton-court.jpg'), alt: 'An indoor badminton court with timber-slat walls and a lounge (artist’s impression).', caption: 'Indoor badminton court', category: 'Amenities', w: 1080, h: 1080 },
    { src: g('gallery/yoga-meditation.jpg'), alt: 'A yoga and meditation room with mats, bolsters and a backlit tree mural (artist’s impression).', caption: 'Yoga & meditation room', category: 'Amenities', w: 1105, h: 1424 },
    { src: g('gallery/rooftop-lounge.jpg'), alt: 'An outdoor lounge with a pergola, fire pit and dining tables at dusk (artist’s impression).', caption: 'Outdoor lounge & dining', category: 'Amenities', w: 1080, h: 1080 },
    { src: g('gallery/hammock-garden.jpg'), alt: 'A hammock strung between trees in a sunlit garden with lanterns (artist’s impression).', caption: 'Hammock garden', category: 'Landscape', w: 1080, h: 1080 },
  ] as GalleryImage[],
  pending: [],
};

/* -------------------------------------------------------------------------- */
/*  12A. ABOUT THE DEVELOPER                                                   */
/* -------------------------------------------------------------------------- */

export const about = {
  label: 'By Apex Group',
  headline: ['Legacy in', 'Every Brick.'],
  tagline: 'We Commit. We Deliver.',
  /** Same Apex Group profile as the other Apex project sites. */
  profile: [
    'The Apex Group, led by Sh. Satnam Singh Sachdeva and sons, has set new trends of architectural finesse across three decades in the real estate industry.',
    'That dedication to excellence has meant modern concepts developed with leading architects, state-of-the-art innovation in on-going projects, and a perpetual belief in commitment and timely delivery.',
    'The continuing faith of its customers has made Apex a credible, delivery-focused developer across the NCR.',
  ],
  chairman: {
    name: 'Sh. Satnam Singh Sachdeva',
    title: 'CMD, The Apex Group',
    /** Supplied by the Apex digital team (same portrait as the Elyria site). */
    image: '/assets/rosario/about/cmd-satnam-singh-sachdeva.jpg',
    w: 1476,
    h: 1065,
  },
  /** "25+ residential projects" page of the Rosario brochure, set on its own texture at 16:10. */
  infographic: {
    image: `/assets/rosario/about/apex-projects-delivered.jpg?v=${assetVersion}`,
    w: 2000,
    h: 1250,
    alt: 'Apex Group — 25+ residential projects delivered, the premium project D’RIO and ongoing projects Québec, Aqualis and Elyria.',
    caption: 'Apex Group — Projects delivered with excellence',
  },
  corporateUrl: 'https://www.theapexgroup.in',
  /**
   * "Apex Group Projects" slider — same list and layout as the Apex Quebec site.
   * Quebec only has placeholder tiles for these, so `image` is empty and the
   * card shows a burgundy name panel; add a real photo path to replace it.
   */
  groupProjects: [
    { name: 'Apex D’Rio', place: 'Indirapuram, Ghaziabad', image: '' },
    { name: 'Apex Alphabet', place: 'ETA II, Greater Noida', image: '' },
    { name: 'Apex The Kremlin', place: 'Siddharth Vihar, Ghaziabad', image: '' },
    { name: 'Apex Athena', place: 'Vaishali, Ghaziabad', image: '' },
    { name: 'Green Valley', place: 'Sector 9, Vaishali, Ghaziabad', image: '' },
    { name: 'Apex Acacia Valley', place: 'Vaishali, Ghaziabad', image: '' },
  ] as { name: string; place: string; image: string }[],
};

/* -------------------------------------------------------------------------- */
/*  12B. FAQ                                                                   */
/* -------------------------------------------------------------------------- */

export const faqs = {
  label: 'FAQ',
  headline: ['Frequently Asked', 'Questions.'],
  intro:
    'Answers to the questions buyers ask most about Apex Rosario. For anything more specific, the sales team is a message away.',
  /** Supplied by the Apex digital team (2026-10-19). Use \n for a line break inside an answer. */
  items: [
    {
      q: 'Where is Apex Rosario located?',
      a: 'Apex Rosario is located in Siddharth Vihar, Ghaziabad, just 600 meters away from NH-9/NH-24, offering easy connectivity towards Noida, Delhi NCR and Meerut.',
    },
    {
      q: 'What is the starting price of Apex Rosario?',
      a: 'Apex Rosario starts at ₹2.12 Cr*, with a launch rate of ₹10,500 per sq. ft.* for spacious 3 & 4 BHK residences.',
    },
    {
      q: 'What apartment configurations are available?',
      a: 'Apex Rosario offers spacious 3 & 4 BHK apartments in Siddharth Vihar, Ghaziabad with the following configurations:\n• 3 BHK: 2,025, 2,100 & 2,200 sq. ft.\n• 4 BHK: 2,670, 2,720, 2,740, 2,750 & 3,400 sq. ft.',
    },
    {
      q: 'How many towers are there in Apex Rosario?',
      a: 'Apex Rosario features 4 royal residential towers in Siddharth Vihar, Ghaziabad.',
    },
    {
      q: 'How many flats are there per floor?',
      a: 'Apex Rosario offers 3 flats per floor in Tower A and 4 flats per floor in Towers B, C & D, with a total of 570 units across 4 towers.',
    },
    {
      q: 'How many lifts are available per tower?',
      a: 'Each residential tower is planned with four lifts.',
    },
    {
      q: 'Does Apex Rosario offer three-side-open apartments?',
      a: 'Yes, Apex Rosario offers three-side-open apartments in select units, allowing more natural light, better ventilation, and greater privacy. For more details and floor plans, please contact our sales team at +91 8800509731 or download the project brochure.',
    },
    {
      q: 'What is special about the 3,400 sq. ft. apartment?',
      a: 'The 3,400 sq. ft. apartment at Apex Rosario offers spacious living with 10-ft-wide deck balconies, 3-side-open layouts, 2 master bedrooms, and an extra-large 12 × 19 ft. master bedroom. It also features separate dressing areas in every bedroom, a spacious 14.5 × 8.5 ft. kitchen, a dedicated servant room, and just 3 apartments per floor for greater comfort and privacy. For more details and floor plans, please contact our sales team at +91 8800509731 or download the project brochure.',
    },
    {
      q: 'What amenities are available at Apex Rosario?',
      a: 'Apex Rosario offers a wide range of lifestyle, fitness, wellness, and entertainment amenities, including a grand entrance lobby, main clubhouse, small club, indoor swimming pool, poolside relaxation area, gym, spa, salon, dance room, banquet hall, restaurant, coffee shop pods, canopy seating, rooftop restaurant, bar area, and party terrace. Sports and indoor recreation facilities include basketball court, lawn tennis court, table tennis, billiards, card room, Mahjong room, karaoke room, bowling alley, arcade games, study and reading areas, children\'s indoor play area, and lounges. Outdoor amenities include landscaped gardens, interconnected green spaces, themed garden rooms, flowering trees, sculptural planting, shaded walkways, water features, celebration spaces, outdoor play areas, wellness zones, and peaceful relaxation areas.',
    },
    {
      q: 'Is Apex Rosario near NH24?',
      a: 'Yes. Apex Rosario is located in Siddharth Vihar, just 600 meters away from NH-24, also known as NH-9.',
    },
    {
      q: 'What is the expected possession date of Apex Rosario?',
      a: 'Apex Rosario is expected to be ready for possession in 2030, as per the planned project timeline.',
    },
    {
      q: 'Is Apex Rosario RERA registered?',
      a: 'Yes, Apex Rosario is RERA registered. You can also verify the registration details on the official UP RERA website.',
    },
    {
      q: 'How can I download the Apex Rosario brochure?',
      a: 'You can easily download the Apex Rosario brochure by clicking the “Download Brochure” button on our website. For more information or to connect with the sales team at Apex Rosario, contact +91 8800509731.',
    },
    {
      q: 'How can I schedule a site visit?',
      a: 'You can schedule a site visit to Apex Rosario by filling out the enquiry form on our website or contacting our sales team. Our team will help you book a visit at your preferred date and time.',
    },
    {
      q: 'Who is the developer of Apex Rosario?',
      a: 'Apex Rosario is developed by The Apex Group, a trusted real estate developer with a 30-year legacy and 25+ delivered projects. In Siddharth Vihar, the Group has already established Apex The Kremlin, home to over 1,200 families, followed by Apex Quebec, recognised as the Crown Jewel of Siddharth Vihar, with possession expected by the end of 2026.\nContinuing this legacy, Apex Rosario introduces another distinctive chapter of royal living, combining timeless Roman-inspired architecture with modern comfort and elegance.',
    },
    {
      q: 'What are the location advantages of Apex Rosario?',
      a: 'Apex Rosario is strategically located in Siddharth Vihar, Ghaziabad, offering excellent connectivity to NH-9 (NH-24), Noida Sectors 62. Nearby metro stations include Shaheed Sthal (New Bus Adda) Metro Station and Noida Electronic City Metro Station (Sector 62). The project also provides convenient access to reputed schools, hospitals, shopping malls, and major business hubs across Delhi-NCR.',
    },
    {
      q: 'What is the payment plan for Apex Rosario?',
      a: 'Apex Rosario offers a 40:20:20:10:10 payment plan, allowing buyers to make payments in stages. Pay 40% at booking, 20% when construction reaches the 10th floor, 20% at the 25th floor, 10% at the 35th floor, and the remaining 10% upon the offer of possession.\nFor more details about the payment plan, contact our sales team at +91 8800509731 or fill out the enquiry form to get in touch.',
    },
  ],
};

/* -------------------------------------------------------------------------- */
/*  13. SECTION 09 — ENQUIRY + CONTACT                                         */
/* -------------------------------------------------------------------------- */

export const enquiry = {
  label: 'Enquire',
  headline: ['Your Royal', 'Address Awaits.'],
  intro: 'Share a few details and the Apex Group team will get back to you about Apex Rosario.',
  requirementOptions: ['3 BHK', '4 BHK', 'Not sure yet'],
  enquiryTypeOptions: ['Project details', 'Site visit', 'Pricing', 'Floor plans', 'General enquiry'],
  consentText: 'I agree to be contacted by Apex Group about Apex Rosario by phone, email or WhatsApp, and I have read the disclaimer below.',
  thankYouUrl: '/thank-you',
  endpoint: '',
  /** Lead project identifier sent to the CRM / webhooks and in the hidden tracking fields. */
  projectId: 'Apex Rosario',
};

export const contact = {
  email: 'info@apexindia.in',
  emailAlt: '',
  website: 'https://www.theapexgroup.in',
  /** As printed on the brochure's back page. */
  siteAddress: 'Plot No. 3/SP-10, Siddharth Vihar Yojna, Ghaziabad (U.P.) - 201009',
  corporateAddress: 'Plot No. 4, BS 2/3, Siddharth Vihar, Ghaziabad (U.P.) - 201014',
  mapsUrl: 'https://www.google.com/maps?cid=8593365564181523405',
  sms: '',
  phone: '',
};

/* -------------------------------------------------------------------------- */
/*  13B. STATUE INTERLUDES                                                     */
/* -------------------------------------------------------------------------- */

export type Interlude = {
  /** Background-removed statue PNG (cut out on-device from images the Apex digital team supplied, 2026-10-22). */
  src: string;
  w: number;
  h: number;
  alt: string;
  /** Which side the statue stands on; the text sits on the other side. */
  side: 'left' | 'right';
  /** `light` = champagne parchment band, `texture` = the brochure's burgundy foil. */
  tone: 'light' | 'texture';
  eyebrow: string;
  line: string;
};

const st = (f: string) => `/assets/rosario/statues/${f}.png?v=${assetVersion}`;

/** Slim bands between sections that carry the Roman theme. Purely decorative. */
export const interludes: Record<string, Interlude> = {
  sculptor: { src: st('sculptor'), w: 545, h: 720, alt: '', side: 'right', tone: 'light', eyebrow: 'A Royal Living', line: 'Traditional Way of Living in Modern Time' },
  orator: { src: st('orator'), w: 944, h: 824, alt: '', side: 'left', tone: 'texture', eyebrow: 'The Legacy of Rome', line: 'The Luxury of Today' },
  reader: { src: st('reader'), w: 608, h: 900, alt: '', side: 'right', tone: 'light', eyebrow: 'Life at Rosario', line: 'Spaces Worth Every Story' },
  thinker: { src: st('thinker'), w: 816, h: 684, alt: '', side: 'right', tone: 'light', eyebrow: 'Timeless by Design', line: 'Every Detail, Thoughtfully Considered' },
  reclining: { src: st('reclining'), w: 1201, h: 610, alt: '', side: 'right', tone: 'texture', eyebrow: 'Celebrate Like Roman Nobility', line: 'A Setting for Every Occasion' },
  senator: { src: st('senator'), w: 1098, h: 897, alt: '', side: 'left', tone: 'texture', eyebrow: 'By Apex Group', line: 'Rooted in History, Built for Tomorrow' },
};

/** The flying cherub floats in the FAQ section beside the heading (large screens). */
export const cherub = { src: st('cherub'), w: 581, h: 548 };

/* -------------------------------------------------------------------------- */
/*  14. LEGAL                                                                  */
/* -------------------------------------------------------------------------- */

export const legal = {
  developer: 'Apex Group', // TODO: confirm the developing company (SPV) for Apex Rosario
  brand: 'Apex Group',
  registeredAddress: 'Plot No. 4, BS 2/3, Siddharth Vihar, Ghaziabad (U.P.) - 201014',
  siteAddress: 'Plot No. 3/SP-10, Siddharth Vihar Yojna, Ghaziabad (U.P.) - 201009',
  /** UP RERA registration number — TODO: add the number supplied by the Apex team. Never invent one. */
  rera: '',
  reraStatus: 'Registered',
  reraAuthority: 'UP RERA',
  reraUrl: 'https://www.up-rera.in/',
  possession: 'Expected 2030*',
  disclaimer:
    'Apex Rosario is registered with UP RERA; registration details are available on the official UP RERA website (www.up-rera.in). Prices, areas, floor plans, specifications, amenities and connectivity are indicative, proposed and subject to change by the company or the competent authorities. Visual representations, including renders and interior images, are artist’s impressions and conceptual only. This website does not constitute an offer or a contract.',
  copyright: `© ${new Date().getFullYear()} Apex Group. All rights reserved.`,
};

/** Announcement shown once per browser session on page load (2026-10-19, user request). */
export const announcement = {
  show: true,
  /** Bump to re-show the popup to visitors who already closed it. */
  id: 'rera-approved-2026-10',
  delayMs: 5000,
  title: 'is now RERA Approved!',
  body: 'Apex Rosario is registered with UP RERA. Book your site visit and explore 3 & 4 BHK residences in Siddharth Vihar, Ghaziabad.',
  cta: 'Enquire Now',
};

/* -------------------------------------------------------------------------- */
/*  15. SITE META / SEO                                                        */
/* -------------------------------------------------------------------------- */

export const siteMeta = {
  title: 'Apex Rosario | 3 & 4 BHK Royal Residences in Siddharth Vihar, Ghaziabad',
  description:
    'Apex Rosario by the Apex Group — classically inspired 3 & 4 BHK residences in four domed towers on approx. 4.9 acres at Siddharth Vihar, Ghaziabad. Starting from ₹2.20 Cr*. Floor plans, amenities, specifications and location. UP RERA registered.',
  ogImage: '/assets/rosario/exterior/rosario-towers.jpg',
};
