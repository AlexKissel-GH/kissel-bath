// Mapping from service content-collection slugs to their dedicated detail
// page URLs (phase 2). Used by ServiceCard (homepage) and services.astro
// overview cards. Pages under src/pages/services/ are created in phase 2;
// until then these URLs intentionally 404.
export const SERVICE_PAGE_URLS: Record<string, string> = {
  'complete-bathroom-remodel': '/services/bathroom-remodeling-denver/',
  'tub-to-shower-conversion': '/services/tub-to-shower-conversion-denver/',
  'budget-shower-renovation': '/services/shower-remodel-denver/',
  'wet-area-only-renovation': '/services/walk-in-shower-installation-denver/',
  'accessibility-ada-remodeling': '/services/ada-bathroom-remodeling-denver/',
  'surrounds-only-facelift': '/services/bathroom-surrounds-replacement-denver/',
  'full-kitchen-remodel': '/services/kitchen-remodeling-denver/',
  'cabinet-refacing': '/services/cabinet-refacing-denver/',
  'countertop-replacement': '/services/countertop-replacement-denver/',
  'kitchen-facelift': '/services/kitchen-facelift-denver/',
};

export function servicePageUrl(slug: string): string {
  return SERVICE_PAGE_URLS[slug] ?? `/services#${slug}`;
}
