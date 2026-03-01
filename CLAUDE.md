# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

GenPwd UI is a static single-page password generator app. It's a frontend-only client that calls the [GenPwd FaaS](https://github.com/alphajuliet/genpwd-faas/) backend API to generate passwords.

## Architecture

- **No build system or bundler** — plain HTML/CSS/JS served as static files
- **Dependencies loaded via CDN**: jQuery 3.7.1 (slim) and Ramda 0.31.3
- **Single JS module**: `GenPwd.js` uses the revealing module pattern (IIFE returning public API)
- **Backend API**: Cloudflare Worker at `https://genpwd-engine.web-c10.workers.dev/`
  - `GET /generators` — lists available password generators
  - `GET /generate?genId=...&strength=...&nwords=...&punctuation=...&capitals=...&numbers=...` — generates passwords

## Deployment

Hosted on Cloudflare Pages via Wrangler. The `wrangler.toml` serves the current directory as static assets.

```bash
# Deploy to Cloudflare Pages
npx wrangler pages deploy .
```

## Key Files

- `index.html` — entry point, UI layout, inline script wiring controls to GenPwd module
- `GenPwd.js` — all application logic (API calls, DOM manipulation, clipboard copy)
- `main.css` — styling with CSS custom properties for theming
- `wrangler.toml` — Cloudflare Pages deployment config

## Development Notes

- No tests, linter, or package.json exist — open `index.html` directly in a browser to develop
- The `GenPwd` namespace exposes two public methods: `initialise()` and `generate(target, genId, strength, opts)`
- Clicking a generated word copies it to clipboard via `navigator.clipboard.writeText`
- Ramda (`R`) is used for iteration in `generate()` (`R.forEach`, `R.range`)
