# AGENTS.md — sitebill-theme-starter

Starter for a custom Sitebill theme (Vue 3 + Tailwind v4). Sites: https://sitebillcms.com/ (international),
https://www.sitebill.ru/ (Russia/CIS). SDK: https://github.com/Sitebill/sitebill-theme-sdk.

- Rename the theme: `manifest.json` → `id` (latin, digits, dash), `name`, `version`. Every slot listed in
  `manifest.json → slots` must be exported in `defineTheme` in `src/index.ts`.
- Site data only via `useHost()` and slot props. Site components only from `@sitebill/theme-sdk/components`.
- Texts: `locales/{ru,en,sr,tg}.json`, in components `host.t('key')` / `host.tc('key', n)`. Add keys to all four locales.
- No top-level `await` in modules. Wrap user-dependent blocks in `SbClientOnly` (`host.user` is `null` on the server).
- Commands: `npm run dev` (sandbox), `npm run build` (build + check + zip), `npm run check`. Fix everything `check` prints before uploading.
