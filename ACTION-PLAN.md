# Launch Action Plan

## Completed before launch

- [x] Add a canonical URL to every public page.
- [x] Add Person, ProfilePage, and WebSite JSON-LD identity data.
- [x] Align locale, author, social, robot, sitemap, and manifest signals.
- [x] Repair manifest icon paths and maskable icon purposes.
- [x] Make sitemap modification dates stable.
- [x] Remove the first-load preloader and redundant font connections.
- [x] Fix the `/lab` static-build blocker with a Suspense boundary.
- [x] Fix confirmed contrast, accessible-name, heading-order, and touch-target defects.
- [x] Make the homepage LCP headline immediately renderable.
- [x] Make route navigation, project filters, lab filters, focus movement, and browser history scroll behavior deterministic.
- [x] Pass lint, types, spelling, production build, route crawl, mobile overflow, and Lighthouse checks.

## Required after deployment

1. Add and verify `https://osnaren.com` in Google Search Console and Bing Webmaster Tools.
2. Submit `https://osnaren.com/sitemap.xml` and request indexing for the homepage, `/projects`, `/resume`, and the strongest case studies.
3. Confirm the production canonical redirects exactly once to HTTPS and one preferred host variant.
4. Validate the deployed homepage with Google Rich Results Test and Schema Markup Validator.
5. Review PageSpeed Insights field data after enough real traffic is available; prioritize homepage LCP if the 75th percentile exceeds 2.5 seconds.
6. Track branded queries (`Obuli Sai Naren`, `osnaren`) and project/research queries monthly; improve content based on impressions and click-through data rather than adding repetitive keywords.
7. Earn relevant links from GitHub repositories, publication profiles, Kaggle datasets, ORCID, LinkedIn, and project websites back to the matching canonical case-study pages.

## Ongoing

- Update sitemap modification dates only when page content materially changes.
- Keep employment, project status, publication, dataset, and version copy current.
- Re-run the production build, route crawl, and Lighthouse checks before each major release.
