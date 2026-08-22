/**
 * Site-wide feature flags.
 *
 * Sections turned off here keep their code and content in the repository but
 * disappear from the site: their nav/footer links are not rendered, and their
 * routes return the 404 page instead of the disabled content.
 *
 * Flip a flag back to `true` to bring a section back.
 */
export const features = {
  // Teaching page — disabled: the principles/mentorship content overstates
  // actual teaching experience.
  teaching: false,
  // Writing (blog) — disabled: no substantive posts to show yet.
  writing: false,
};

export const isTeachingEnabled = features.teaching;
export const isWritingEnabled = features.writing;
