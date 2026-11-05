// The home-screen icons a phone can switch to (Settings → Look & Home → App icon). Plain data, no
// imports: scripts/app-icons.mjs draws every icon file from this list and the settings row lists
// the same ids, so the picker can never offer an icon the native projects do not have.
//
// `name` is the English key the row passes to t(). `ios` is the AppIcon set in the asset catalog
// (null: the primary icon) and `android` the activity-alias in AndroidManifest.xml. `art` is a
// hand-made SVG the script renders instead of the glyph; `bg`/`fg` are then just its main colours.
export const APP_ICON_VARIANTS = [
  { id: 'default', name: 'Original', bg: '#0c0e12', fg: '#a3e635', ios: null, android: 'IconDefault' },
]

export const APP_ICON_IDS = APP_ICON_VARIANTS.map(v => v.id)
