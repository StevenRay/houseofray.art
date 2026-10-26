# Image originals

Full-size PNG masters for the House of Ray artwork. They live here rather than in
`public/` so they are kept in version control but are **not** uploaded to the
Worker — the pages load the much smaller WebP derivatives in
`public/assets/` instead.

Regenerate the derivatives after editing a master:

```bash
npm run images
```

That writes, for each master, a full-width `*.webp` and a half-width
`*-556w.webp` into `public/assets/`.
