# LeadFlow CRM (frontend-only)

A premium, dark-first lead-management CRM that runs **entirely in the browser**: React + Vite + Tailwind + React Router + Recharts + Lucide.
No backend, database or external API. Everything persists in `localStorage` and survives a refresh.

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # 28 tests (utils + full UI flows in jsdom)
npm run build
```

**Demo login:** `admin@leadflow.com` / `admin123`. This is a UI demo only and is *not* security: it just sets a flag in localStorage (the password is never stored).
Public simulation of a website contact form: `/demo-contact-form` (no login needed).

## What's inside
Dashboard (8 live KPIs with 30-day trend, Lead Radar, Attention Required, funnel, monthly line, source donut, status bars) ·
Leads (search, 6 filters, 5 sorts, pagination, table → cards on mobile, inline status change, Table | Pipeline toggle with native drag-and-drop, add/edit/delete, duplicate detection, JSON import, CSV/JSON export) ·
Lead details (contact, intelligence, **Intent Score** ring + factor breakdown + manual override, message, notes add/edit/delete, follow-ups, grouped activity timeline) ·
Follow-ups (overdue / today / upcoming / completed, complete / edit / delete) · Analytics (conversion rate, funnel, pipeline, priority split, source-performance table) ·
Settings (theme dark/light/system, defaults, items per page, export/import, clear demo data, reset CRM — destructive actions confirm) ·
Ctrl/⌘+K global search · notification bell (derived from live data) · toasts · skeletons · empty states.

## How it works
- `utils/storage.js` is the only file that touches `localStorage` (keys `leadflow_leads|followups|notes|activities|notifications|settings|auth`). The `CRMProvider` in `hooks/useLeads.jsx` is the single store; components never read storage directly.
- `utils/leadScoring.js`: Intent Score 0–100 = Budget Fit 20 + Service Match 20 + Message Quality 20 + Company Size 15 + Engagement 15 + Follow-up Activity 10. 80+ HOT, 50–79 WARM, <50 COLD. Priority follows the score until you set it manually (then it's marked ✎).
- `hooks/useInsights.js` derives every dashboard/analytics number from the stored leads/follow-ups/activities — nothing is hard-coded. The funnel and "Qualified" in source performance count leads that *ever reached* a stage (from the status history).
- First launch seeds 32 demo leads (+ notes, follow-ups, activities) with a deterministic generator. Dates are relative to the first launch, so there are always some overdue/today/upcoming follow-ups.
- Imports are validated (structure, size, emails, enums), duplicates by email are skipped, ids are regenerated. CSV export neutralises spreadsheet-formula injection. All user text is rendered through React (escaped); website links are forced to https.

## Notes / limitations
- Data lives only in this browser/profile; clearing site data erases it. Two tabs stay in sync via the `storage` event.
- The KPI values come from your data (e.g. 32 demo leads), not the example numbers in the brief (1,248 …).
- "Previous period" trends compare the last 30 days with the 30 before by lead *creation* date; with demo data seeded at one moment, those percentages are indicative.
- Pipeline drag-and-drop uses the browser's native HTML5 API (no touch-drag); on touch devices use the status control on each card.
- Verified with automated jsdom tests and a production build. **Not yet verified:** visual/responsive appearance in real browsers.
