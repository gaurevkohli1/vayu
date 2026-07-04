/**
 * VAYU campaign asset manifest.
 *
 * Generated 2026-07-04 with Higgsfield (Nano Banana Pro 4K stills,
 * Seedance 2.0 1080p clips) from the prompts in
 * asset-prompts/PRODUCTION-higgsfield-seedance.md.
 *
 * URLs point at the Higgsfield delivery CDN. Before public launch,
 * download each file into public/assets/ and change the CDN_BASE-relative
 * entries here — nothing else in the codebase references the URLs.
 */
const CDN_BASE = 'https://d8j0ntlcm91z4.cloudfront.net/user_2zXVb2hrbH6GhrrudeMPDjS3J1b';

export const ASSETS = {
  heroImage: {
    full: `${CDN_BASE}/hf_20260704_161820_7577ced9-32c7-4966-9652-19ae43cf30e4.png`,
    preview: `${CDN_BASE}/hf_20260704_161820_7577ced9-32c7-4966-9652-19ae43cf30e4_min.webp`,
  },
  heroImageAlt: {
    full: `${CDN_BASE}/hf_20260704_161820_b05947d6-f950-479f-9c84-1fb0188e763e.png`,
    preview: `${CDN_BASE}/hf_20260704_161820_b05947d6-f950-479f-9c84-1fb0188e763e_min.webp`,
  },
  heroOrbit: `${CDN_BASE}/hf_20260704_162950_c89c1f08-5af8-4d69-accf-abf6114a1c6f.mp4`,
  fabricMacro: `${CDN_BASE}/hf_20260704_163132_1ba9bbc6-4d97-45b7-ae74-d8be2d996c06.mp4`,
  processStory: `${CDN_BASE}/hf_20260704_163425_042e36d1-828c-4228-bfe6-eeac60fe8e49.mp4`,
  lifestyle: `${CDN_BASE}/hf_20260704_163449_f1bb09bd-0caa-421f-946b-05fee8ca06e7.mp4`,
  collectionReveal: `${CDN_BASE}/hf_20260704_163747_02d37ab2-c998-4aa6-9692-40011fab924a.mp4`,
};
