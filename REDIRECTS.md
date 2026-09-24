# Redirect Map: www.bath4.us → kisselremodeling.com

The old Wix site (`www.bath4.us`) is retired. Every old URL permanently
redirects (301) to the closest matching page on the new site via
[`public/_redirects`](public/_redirects), which Netlify reads at deploy time.

> **Important:** these full-URL rules only fire when **`bath4.us` (and
> `www.bath4.us`) is attached to this Netlify site as a domain alias**
> (Netlify → Site settings → Domain management → Add a domain). DNS for the
> old domain must point to Netlify. `kisselremodeling.com` remains the primary
> domain; Netlify will also 301 the apex/`www` variants accordingly.

All rules use `301!` — permanent, and forced (the `!` makes the redirect win
even if a local page matches the path).

## Core pages

| Old URL (www.bath4.us) | New URL (kisselremodeling.com) | Rationale |
|---|---|---|
| `/` | `/` | Home → home |
| `/about` | `/services/tub-to-shower-conversion-denver/` | Old `/about` URL actually held the "Tub to Shower Conversion in Denver, CO" page (Wix mislabel) — confirmed by owner |
| `/contact` | `/contact` | Same page exists on the new site |
| `/faq` | `/faq` | Same page exists on the new site |
| `/blog` | `/blog` | Same page exists on the new site |

## Old service pages

| Old URL | New URL | Rationale |
|---|---|---|
| `/sentrel-bath-systems` | `/services/bathroom-surrounds-replacement-denver/` | Sentrel product page → dedicated surrounds service page |
| `/bathroom-remodeling-services` | `/services` | Old services hub → new services hub (unchanged) |
| `/complete-bathroom-remodeling` | `/services/bathroom-remodeling-denver/` | Old single-service page → dedicated service page |
| `/tub-to-shower-conversion` | `/services/tub-to-shower-conversion-denver/` | Old single-service page → dedicated service page |

## Old location pages (17)

The old site had one thin page per city. The five cities that now have
dedicated location pages redirect there directly; the rest go to `/services`.

| Old URL | New URL | Rationale |
|---|---|---|
| `/bathroom-remodeling-highlands-ranch-co` | `/locations/bathroom-remodeling-highlands-ranch-co/` | Dedicated location page now exists |
| `/bathroom-remodeling-boulder-co` | `/services` | Same |
| `/bathroom-remodeling-parker-co` | `/services` | Same |
| `/bathroom-remodeling-aurora-co` | `/services` | Same |
| `/bathroom-remodeling-lone-tree-co` | `/services` | Same |
| `/bathroom-remodeling-castle-pines-co` | `/services` | Same |
| `/bathroom-remodeling-greenwood-village-co` | `/services` | Same |
| `/bathroom-remodeling-centennial-co` | `/services` | Same |
| `/bathroom-remodeling-federal-heights-co` | `/services` | Same |
| `/bathroom-remodeling-littleton-co` | `/services` | Same |
| `/bathroom-remodeling-lakewood-co` | `/services` | Same |
| `/bathroom-remodeling-castle-rock-co` | `/services` | Same |
| `/bathroom-remodeling-arvada-co` | `/services` | Same |
| `/bathroom-remodeling-golden-co` | `/services` | Same |
| `/bathroom-remodeling-broomfield-co` | `/services` | Same |
| `/copy-of-bathroom-remodeling-englewood-co` | `/services` | Wix "copy of" duplicate → services |
| `/copy-of-bathroom-remodeling-commerce-city-co` | `/services` | Wix "copy of" duplicate → services |

## Old blog posts

Each old post redirects to the topically closest new article (or page).

| Old URL | New URL | Rationale |
|---|---|---|
| `/post/increase-the-value-of-your-home-with-our-bathroom-renovation-services-in-denver-co` | `/blog/bathroom-remodel-roi-denver` | Same topic: remodel ROI / home value |
| `/post/why-composite-shower-walls-are-the-future-of-bathroom-design` | `/blog/sentrel-vs-tile-shower-walls-colorado` | Composite walls vs tile comparison |
| `/post/composite-wall-surrounds-a-modern-solution-for-bathroom-remodeling` | `/blog/sentrel-vs-tile-shower-walls-colorado` | Same topic (composite surrounds) — one canonical target |
| `/post/creating-safe-and-accessible-bathrooms-for-the-elderly-and-people-with-disabilities` | `/blog/accessible-bathroom-design-ada-denver` | Accessible/ADA bathroom design |
| `/post/enhance-comfort-and-safety-why-you-should-consider-a-shower-seat-for-your-bathroom-remodel` | `/blog/walk-in-showers-aging-in-place-denver` | Shower seats → aging-in-place showers |
| `/post/bathtub-vs-shower-which-is-better-for-your-bathroom` | `/blog/tub-to-shower-conversion-denver` | Tub vs shower → tub-to-shower conversion |
| `/post/transform-your-bathroom-on-a-budget-the-power-of-wall-surrounds` | `/blog/budget-shower-renovation-denver` | Budget remodel with surrounds |
| `/post/making-your-dream-bathroom-affordable-what-you-need-to-know-about-financing` | `/pricing` | Financing topic → pricing page with financing info |
| `/post/revitalize-your-bathroom-the-benefits-of-a-facelift-with-composite-shower-wall-surrounds` | `/services/bathroom-surrounds-replacement-denver/` | Facelift/surrounds topic → dedicated surrounds service page |

## Catch-alls (last rules in the file)

| Old URL pattern | New URL | Rationale |
|---|---|---|
| `/post/*` | `/blog` | Any unlisted old post → blog index |
| `/*` | `/` | Any other old URL → home page |

## After launch

1. Verify a few rules: `curl -I https://www.bath4.us/faq` should return
   `301` with `Location: https://kisselremodeling.com/faq`.
2. In **Google Search Console**, use the **Change of address** tool on the
   old `bath4.us` property → point it to `kisselremodeling.com`.
3. Keep the old domain registered and pointing at Netlify for at least
   12 months so redirects keep passing link equity.
