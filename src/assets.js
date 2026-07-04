/**
 * VAYU campaign asset manifest.
 *
 * Generated with Higgsfield (Nano Banana Pro stills, Seedance 2.0 clips)
 * from the prompts in asset-prompts/PRODUCTION-higgsfield-seedance.md.
 *
 * All paths are local: the deploy workflow runs scripts/fetch-assets.mjs,
 * which vendors every file in scripts/asset-manifest.json into
 * public/assets/ and commits it — the site never depends on the
 * generation CDN at runtime. Run the script once locally after cloning
 * if public/assets/ is empty.
 */
const base = `${import.meta.env.BASE_URL}assets/`;

export const ASSETS = {
  heroImage: {
    full: `${base}hero-master.png`,
    preview: `${base}hero-master.webp`,
  },
  heroOrbit: `${base}clip-hero-orbit.mp4`,
  fabricMacro: `${base}clip-fabric-macro.mp4`,
  processStory: `${base}clip-process-story.mp4`,
  lifestyle: `${base}clip-lifestyle.mp4`,
  collectionReveal: `${base}clip-collection-reveal.mp4`,

  products: {
    tee: `${base}product-training-tee.webp`,
    pump: `${base}product-pump-cover.webp`,
    jogger: `${base}product-joggers.webp`,
    compression: `${base}product-compression.webp`,
    women: `${base}product-womens.webp`,
    accessories: `${base}product-accessories.webp`,
  },

  looks: {
    gym: `${base}look-gym.webp`,
    street: `${base}look-street.webp`,
    studio: `${base}look-studio.webp`,
    creator: `${base}look-creator.webp`,
    track: `${base}look-track.webp`,
    rest: `${base}look-rest.webp`,
  },
};

/** Resolve a dotted key like "products.tee" against ASSETS. */
export function resolveAsset(key) {
  return key.split('.').reduce((node, part) => (node ? node[part] : undefined), ASSETS);
}
