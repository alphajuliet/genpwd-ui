# GenPwd UI

A simple web-based password generator. Select a generator type, strength level, and options (punctuation, numbers, capitals), then click Generate to produce a list of passwords. Click any password to copy it to the clipboard.

## Architecture

GenPwd UI is a static single-page app with no build step. It calls the [GenPwd engine](https://github.com/alphajuliet/genpwd-engine/) backend API (a Cloudflare Worker) to generate passwords.

- **Frontend**: Plain HTML, CSS, and JavaScript with jQuery and Ramda loaded via CDN
- **Backend**: Cloudflare Worker at `genpwd-engine.web-c10.workers.dev`

## Development

Open `index.html` in a browser. No build tools or dependencies to install.

## Deployment

Hosted on Cloudflare Pages via Wrangler:

```bash
npx wrangler pages deploy .
```
