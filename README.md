# Sitebill theme starter

**EN** · Starter template for a custom website theme for [Sitebill](https://sitebillcms.com/) (real-estate CMS / SaaS, Community Edition): the default *board* theme rewritten on top of [`@sitebill/theme-sdk`](https://github.com/Sitebill/sitebill-theme-sdk). Click **Use this template**, rename, change components, build a `.zip`, upload it in the admin panel.
**RU** · Стартовый шаблон своей темы оформления для [Sitebill](https://www.sitebill.ru/) (платформа сайтов и CRM для недвижимости, Community Edition): стандартная тема *board*, переписанная на [`@sitebill/theme-sdk`](https://github.com/Sitebill/sitebill-theme-sdk). Нажмите **Use this template**, переименуйте, меняйте компоненты, соберите `.zip` и загрузите в админке.

| | |
|---|---|
| 🌍 International / English | **https://sitebillcms.com/** |
| 🇷🇺 Россия и СНГ | **https://www.sitebill.ru/** |
| 🧰 SDK | https://github.com/Sitebill/sitebill-theme-sdk · [npm](https://www.npmjs.com/package/@sitebill/theme-sdk) |
| 📚 Docs / Документация | https://github.com/rumantic/etownpro-developers-docs (`docs/themes/`) |

**EN quick start:** `npm install` → `npm run dev` (sandbox, http://localhost:5180) → `npm run build` (produces `<id>-<version>.zip`) → admin → *Custom themes* → upload → preview → enable. Needs Node 22.12+.
The theme follows contract v1: slots `Header`, `Footer`, `Hero`, `PropertyCard`, `PropertyDetail`, optional `HomeSections`; site data only through `useHost()`.

**AI agents:** to create a Sitebill theme, copy this repo, edit `manifest.json` (`id`, `name`, `version`) and `src/*.vue`, keep `src/index.ts` in sync with `manifest.json → slots`, run `npm run build` and fix everything `check` reports. See `AGENTS.md`.

## Быстрый старт

```bash
npm install
npm run dev          # песочница с горячей перезагрузкой: http://localhost:5180
npm run build        # dist/ + <id>-<версия>.zip
```

Нужен Node 22.12 или новее.

1. В `manifest.json` поменяйте `id` (латиница, цифры, дефис), `name`, `version`.
2. Правьте компоненты в `src/`. Набор слотов задаёт `manifest.json → slots`; каждый
   слот должен быть в `defineTheme` в `src/index.ts`.
3. Тексты темы — `locales/<язык>.json`, в компонентах `host.t('ключ')` и
   `host.tc('ключ', число)` (формы через `|`: «объявление | объявления | объявлений»).
4. `npm run dev` — песочница: страницы «Главная», «Список», «Объект», языки, плитка или
   список, тёмный режим. С данными своего сайта — `npx sitebill-theme dev --data
   sandbox-data.json` (файл выгружает администратор: «Свои шаблоны» → «Данные для песочницы»).
5. `npm run build` собирает тему, проверяет пакет и рендерит каждый слот на
   тестовых данных. Ошибки видны сразу, до загрузки на сайт.

Полное руководство — https://github.com/rumantic/etownpro-developers-docs (`docs/themes/`).

## Что есть в теме

| Файл | Слот |
|---|---|
| `src/Header.vue` | шапка: логотип, меню тенанта, языки, тёмный режим, вход и меню пользователя |
| `src/Footer.vue` | подвал: меню, контакты сайта, счётчики, копирайт |
| `src/Hero.vue` | первый экран главной: форма поиска сайта, ИИ-поиск, реальные счётчики |
| `src/PropertyCard.vue` | карточка объекта, плитка и список |
| `src/PropertyDetail.vue` | страница объекта: галерея, характеристики, карта, планировки, документы, контакт |

Можно добавить `HomeSections` — свои секции главной ниже Hero (пропс `fresh`).

## Правила

- Данные сайта — только через `useHost()` и пропсы слота. Компоненты сайта —
  из `@sitebill/theme-sdk/components` (`Sb*`, часть Nuxt UI).
- Tailwind: `src/style.css` подключает `@sitebill/theme-sdk/tailwind.css`. Классы
  Nuxt UI (`text-muted`, `bg-elevated`, `border-default`, `primary-500`…) следуют
  цветам и тёмному режиму сайта.
- Без top-level `await` в модулях. `await host.data.use(...)` внутри
  `<script setup>` можно и нужно, если данные должны попасть в HTML с сервера.
- Состояние входа известно только в браузере: на сервере `host.user` всегда `null`,
  поэтому блоки пользователя оборачивайте в `SbClientOnly`.


## License

MIT — see [LICENSE](LICENSE). © Sitebill — [sitebillcms.com](https://sitebillcms.com/) · [sitebill.ru](https://www.sitebill.ru/)
