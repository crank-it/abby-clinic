# Marketing Admin Panel - Developer Handover

## Overview

A secure admin panel has been added to manage marketing/analytics tracking codes (GA4, Google Search Console, Google Ads, Meta Pixel). The tracking codes are stored in a JSON file and dynamically injected into the site.

**Admin URL:** `/admin-mktg-8472` (intentionally obscured)

---

## Files Created

```
src/
├── app/
│   ├── admin-mktg-8472/
│   │   ├── layout.tsx          # Admin layout with noindex meta
│   │   ├── page.tsx            # Auth check + redirect
│   │   ├── AdminDashboard.tsx  # Main admin UI component
│   │   └── sign-in/
│   │       └── page.tsx        # Password login page
│   └── api/
│       ├── auth/
│       │   └── route.ts        # Login/logout endpoints
│       └── marketing-config/
│           ├── route.ts        # GET/POST config
│           └── export/
│               └── route.ts    # Export config as JSON
├── components/
│   ├── admin/
│   │   ├── IntegrationCard.tsx # Reusable form card
│   │   ├── StatusBadge.tsx     # Active/Inactive indicator
│   │   └── ChangeLog.tsx       # History display
│   └── TrackingScripts.tsx     # Injects tracking codes into <head>
└── lib/
    └── auth.ts                 # Auth helper functions

data/
└── marketing-config.json       # Stores all tracking configurations

public/
└── robots.txt                  # Excludes admin & API from crawlers

.env.local                      # Environment variables (not committed)
.env.example                    # Template for env vars
```

---

## Environment Variables

Create `.env.local` in production with:

```bash
# Admin Authentication
ADMIN_PASSWORD=<choose-a-strong-password>

# Auth cookie secret (generate a random 32+ char string)
AUTH_SECRET=<random-secret-key>
```

**Important:** Change both values before going live. Use a password manager to generate secure values.

---

## Authentication

- **Method:** Simple password-based auth with HTTP-only cookie
- **Session Duration:** 7 days
- **Cookie Name:** `admin_session`

### How it works:
1. User visits `/admin-mktg-8472`
2. If not authenticated, redirects to `/admin-mktg-8472/sign-in`
3. Password is validated against `ADMIN_PASSWORD` env var
4. On success, a signed cookie is set
5. API routes check this cookie before allowing access

---

## Tracking Code Injection

The `TrackingScripts` component in `/src/components/TrackingScripts.tsx`:
- Reads config from `data/marketing-config.json` at request time
- Only injects scripts for enabled integrations
- Uses Next.js `<Script>` component with `afterInteractive` strategy

**Supported integrations:**
| Integration | What's injected |
|-------------|-----------------|
| GA4 | gtag.js + config script |
| Google Search Console | Meta verification tag (via config) |
| Google Ads | gtag.js + conversion config |
| Meta Pixel | fbevents.js + init script |

---

## Security Measures

1. **URL Obscurity:** Admin path uses random suffix (`-mktg-8472`)
2. **robots.txt:** Disallows `/admin-mktg-8472` and `/api/`
3. **Meta robots:** Admin pages have `noindex, nofollow`
4. **Input Sanitization:** All inputs stripped of `<script>` tags and JS events
5. **Validation:** GA4 IDs must match `G-XXXXXXXXXX`, Pixel IDs must be numeric
6. **HTTP-only Cookie:** Session cookie not accessible via JavaScript
7. **Changelog:** All changes logged with timestamps

---

## Deployment Checklist

### Before deploying:

- [ ] Set strong `ADMIN_PASSWORD` in production env vars
- [ ] Set unique `AUTH_SECRET` in production env vars
- [ ] Verify `data/` directory exists and is writable
- [ ] Test admin login works locally

### After deploying:

- [ ] Verify `/admin-mktg-8472` redirects to sign-in
- [ ] Verify login works with production password
- [ ] Test saving a GA4 measurement ID
- [ ] Verify tracking script appears in page source when enabled
- [ ] Check robots.txt is accessible at `/robots.txt`
- [ ] Verify admin pages return `noindex` in meta tags

### Vercel-specific:

The `data/marketing-config.json` file uses the filesystem. On Vercel:
- **Serverless functions** have read-only filesystem except `/tmp`
- **Option 1:** Move to a database (Supabase, Planetscale, etc.)
- **Option 2:** Use Vercel KV or Edge Config
- **Option 3:** Use environment variables for simple configs

**Recommendation:** For production, migrate storage to a database or Vercel KV.

---

## Testing the Admin Panel

1. **Access:** Go to `https://your-domain.com/admin-mktg-8472`
2. **Login:** Use the password from `ADMIN_PASSWORD`
3. **Test GA4:**
   - Enable GA4, enter measurement ID (e.g., `G-ABC123XYZ`)
   - Save, then check page source for gtag script
4. **Test Meta Pixel:**
   - Enable, enter Pixel ID (numeric, e.g., `123456789012345`)
   - Save, check page source for fbevents.js
5. **Export:** Click "Export Config" to download current settings
6. **Changelog:** Check "Change Log" tab shows your changes

---

## Common Issues

| Issue | Solution |
|-------|----------|
| "Invalid password" | Check `ADMIN_PASSWORD` env var is set correctly |
| Changes not saving | Ensure `data/` directory is writable |
| Tracking scripts not appearing | Verify integration is enabled AND has valid ID |
| 500 error on admin page | Check server logs, likely missing env vars |

---

## Future Improvements (Optional)

- [ ] Migrate JSON storage to database for Vercel compatibility
- [ ] Add rate limiting on login attempts
- [ ] Add email notifications on config changes
- [ ] Add "Test" buttons to verify tracking codes are firing
- [ ] Add preview of injected scripts before saving

---

## Contact

For questions about this implementation, refer to the code comments or the original requirements document.
