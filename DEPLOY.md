# Инструкция по публикации сайта (пошагово, для владельца)

Сайт полностью готов к публикации. Хостинг — **Netlify** (бесплатный тариф: быстрый CDN по всему миру, HTTPS, обработка формы заявок, админка). Всё нижеописанное делается один раз, дальше сайт обновляется сам.

---

## Шаг 1. Заведите аккаунты (5 минут)

1. **GitHub** — зарегистрируйтесь на https://github.com (бесплатно). Это хранилище кода сайта.
2. **Netlify** — зарегистрируйтесь на https://www.netlify.com (бесплатно), проще всего через кнопку **Sign up with GitHub**.

## Шаг 2. Загрузите код сайта на GitHub

Установите Git с https://git-scm.com/download/win (если ещё не установлен), затем в папке сайта выполните:

```bash
cd "C:\Users\Kisel\Desktop\kissel-website\Kimi WebDev\site"
git init
git add .
git commit -m "Kissel's Bath and Kitchen website"
git branch -M main
```

На GitHub нажмите **New repository** → имя например `kissel-bath` → Create (без галочек README). Затем:

```bash
git remote add origin https://github.com/ВАШ-ЛОГИН/kissel-bath.git
git push -u origin main
```

## Шаг 3. Подключите сайт к Netlify

1. В Netlify: **Add new site → Import an existing project → GitHub**.
2. Выберите репозиторий `kissel-bath`.
3. Настройки сборки подтянутся автоматически из `netlify.toml` (Build command: `npm run build`, Publish: `dist`). Ничего не меняйте — нажмите **Deploy**.
4. Через 1–2 минуты сайт будет доступен по адресу вида `https://random-name-12345.netlify.app`. В **Site settings → Change site name** задайте красивое имя, например `kisselbath.netlify.app`.

## Шаг 4. Включите админку (важно!)

Админка находится по адресу `ваш-сайт.netlify.app/admin`. Чтобы в неё можно было войти:

1. В Netlify: **Site settings → Identity → Enable Identity**.
2. Там же: **Registration preferences** → оставьте **Invite only** (чтобы никто посторонний не мог зарегистрироваться).
3. **Identity → Services → Git Gateway → Enable Git Gateway**.
4. Вкладка **Identity → Invite users** → введите свой email → вам придёт письмо → перейдите по ссылке и задайте пароль.
5. Готово: открывайте `ваш-сайт.netlify.app/admin`, входите и редактируйте сайт как в WordPress: услуги, цены, FAQ, отзывы, портфолио, тексты страниц, телефон/адрес. После нажатия **Publish** сайт сам пересоберётся за ~1 минуту.

## Шаг 5. Форма заявок — уже работает

Форма «Request Estimate» автоматически принимает заявки после деплоя (Netlify Forms, бесплатно до 100 заявок/мес):
- Смотреть заявки: **Netlify → ваш сайт → Forms → estimate**.
- Настройте уведомление на email: **Forms → Settings → Form notifications → Add notification → Email notification** → укажите `kisselremodeling@gmail.com`.

## Шаг 6. Подключите домены kisselremodeling.com и bath4.us

Новый основной домен сайта — **kisselremodeling.com**. Старый домен `bath4.us`
нужно подключить к тому же сайту как **alias** (зеркало), чтобы сработали
301-редиректы из файла `public/_redirects`: все старые адреса будут
автоматически перенаправлять посетителей и поисковики на новый сайт.

1. В Netlify: **Domain settings → Add a domain** → введите `kisselremodeling.com`
   (и `www.kisselremodeling.com`) — это **основной (primary) домен**.
2. Там же: **Add a domain → Add domain alias** → введите `bath4.us`
   (и `www.bath4.us`) — это **alias**, только для редиректов.
3. Netlify покажет DNS-записи. В панелях регистраторов **обоих доменов**
   укажите DNS на Netlify:
   - `A`-запись для apex-домена → `75.2.60.5`
   - `CNAME` для `www` → `ваш-сайт.netlify.app`
4. Через 10–60 минут Netlify сам выпустит бесплатные HTTPS-сертификаты для
   обоих доменов.
5. Адреса в коде уже выставлены на новый домен (проверьте):
   - `astro.config.mjs` → `site: 'https://kisselremodeling.com'`
   - `public/admin/config.yml` → `site_url: https://kisselremodeling.com`
6. После запуска проверьте пару редиректов: откройте
   `https://www.bath4.us/faq` — должно перекинуть на
   `https://kisselremodeling.com/faq` со статусом 301.
   Полная карта редиректов — в файле `REDIRECTS.md`.
7. Старый сайт на Wix можно будет отключить, когда убедитесь, что новый
   работает. **Сам домен bath4.us не удаляйте и не отключайте минимум год** —
   пусть редиректы продолжают работать и передавать ссылочный вес.

## Шаг 7. SEO-последствия (что сделать после запуска)

Уже сделано в коде: мета-теги и Open Graph на каждой странице, canonical, Schema.org (LocalBusiness, FAQ, Services, Reviews, Breadcrumbs), sitemap.xml, robots.txt, быстрая загрузка, mobile-first.

Вам осталось:
1. **Google Search Console** (https://search.google.com/search-console):
   - добавьте новый домен `kisselremodeling.com` → подтвердите владение →
     отправьте sitemap: `https://kisselremodeling.com/sitemap-index.xml`;
   - добавьте старый домен `bath4.us` (если ещё не добавлен) и воспользуйтесь
     инструментом **«Изменение адреса» (Change of address)**: старое
     свойство `bath4.us` → новое `kisselremodeling.com`. Это ускорит перенос
     позиций в поиске.
2. В файле `src/lib/seo.ts` замените заглушки `sameAs` на реальные ссылки ваших профилей (Google Business, Houzz, HomeAdvisor) — помечены комментарием TODO.
3. Google Business Profile: убедитесь, что там указан новый сайт.

---

## Локальная работа (если захотите править код сами)

```bash
cd "C:\Users\Kisel\Desktop\kissel-website\Kimi WebDev\site"
npm install
npm run dev        # сайт на http://localhost:4321
npm run build      # сборка в dist/
```

Админка локально: `npx decap-server` в отдельном терминале, затем открыть `http://localhost:4321/admin` (вход не потребуется).

## Что где лежит

| Что | Где |
|---|---|
| Услуги и цены | `src/content/services/*.md` (или админка → Services) |
| FAQ | `src/content/faq/*.md` (админка → FAQ) |
| Отзывы | `src/content/testimonials/*.md` (админка → Testimonials) |
| Портфолио | `src/content/portfolio/*.md` (админка → Portfolio) |
| Блог | `src/content/blog/*.md` (админка → Blog) |
| Телефон, адрес, часы | `src/data/settings.json` (админка → Site Settings) |
| Тексты главной и «О нас» | `src/content/pages/*.md` (админка → Pages) |
| Картинки | `public/images/` (загрузки из админки → `public/images/uploads/`) |
