# ROOMWISE HYBRID — runnable business starter (UK)

**What works today:** the responsive site, budget calculator, CSV and checklist downloads, config-driven affiliate panels and checkout button, local owner dashboard, editorial review queue, article generator with optional OpenAI API, and GitHub Actions automatic weekly drafting + automated deployment of **approved** guides. **No payment processor, analytics account or social publishing account is connected.** There are no automatic earnings and no guaranteed audience.

## 1. Preview site and owner tools (free)

In this folder run:

```bash
python -m http.server 8000 --directory site
```

Visit `http://localhost:8000` in your browser. In another terminal:

```bash
python automation/manage.py dashboard
python automation/manage.py list
```

For a free first content item, review `content/drafts/sample-guide.md` and run:

```bash
python automation/manage.py approve sample-guide.md
python automation/manage.py publish
```

Refresh your site, then scroll to Guides.

## 2. Revenue streams — configure after creating the necessary accounts

**Digital products:** the private editable planner template is at `products/private/room-reset-planner-template.csv`. Improve it into a genuinely worthwhile product, then upload it to a platform that **handles checkout, VAT/tax responsibilities as applicable, and automatic file delivery** (e.g. Payhip, Gumroad, Etsy digital downloads). Copy the approved **HTTPS hosted checkout link** to `site/business-config.json` as `product_checkout_url`. Do **not** upload `products/private` to the public site. Configure and perform a real test purchase before promoting.

**Affiliate links:** apply to an appropriate programme, evaluate products, then add reviewed offers to `site/business-config.json` in this format:

```json
{"name":"Sample product", "description":"Why it's useful", "url":"https://YOUR-APPROVED-AFFILIATE-LINK", "reviewed":true}
```

Add items inside the existing `affiliate_offers` array. Live links automatically carry `rel=sponsored nofollow` and visible advertisement disclosure. **Never invent an affiliate partnership.**

**Advertising:** apply to an ad network only once eligible; install its official tags only with required privacy/consent controls. A configuration flag does *not* turn advertising on. No ad scripts included.

**YouTube/Pinterest:** use each service's official publishing tools or an authorised scheduler; this starter produces drafts only, not automated account posting. Social platform monetisation needs eligibility and approval.

## 3. Draft content automatically, publish only what you approve

To generate one AI editorial draft locally, set `OPENAI_API_KEY` in your environment (API billing is **separate** from ChatGPT Plus) and run:

```bash
python automation/generate_drafts.py
```

A new Markdown file appears in `content/drafts`. Inspect claims, originality, links and quality; revise it. Approve the filename using `python automation/manage.py approve FILENAME.md` and run `python automation/manage.py publish`. The publication is automatic **after approval**, not before.

For weekly unattended *draft creation*, use a **private GitHub repo** for the entire project, add a repository Actions secret `OPENAI_API_KEY`, enable Actions, and run `.github/workflows/draft-content.yml`. It schedules Monday at 09:17 UTC and commits only to the *private drafts folder*. This is **not a promise of perfectly timed execution**. GitHub Actions may pause scheduled workflows or reject pushes depending on repository permissions. The workflow requires write permission for Actions.

For automatic site deployment after you approve work and push to `main`, choose GitHub Pages **Settings → Pages → Build and deployment → Source: GitHub Actions**. `.github/workflows/deploy-site.yml` generates approved pages and deploys ONLY the `site/` folder. Note: private repository GitHub Pages availability depends on your plan. A public repository exposes any drafts committed there. For low cost, consider using a separate public site repository and retaining private automation elsewhere.

## 4. Basic dashboard and earnings

```bash
python automation/manage.py sale --source digital-product --gross 9.00 --fees 1.20 --cost 0.00
python automation/manage.py dashboard
```

This records **manual bookkeeping entries** on your computer, not automatically synced bank or merchant transactions. `data/sales.csv` is ignored by git. Track actual payout fees, refunds, tax, and affiliate earnings separately. Dashboard amounts are not profit after tax.

## 5. Before launching publicly

- Validate real search demand, competition and your digital product's utility; this niche is a working hypothesis, not a proven profitable market.
- Choose a verified brand/domain; replace `hello@example.com`, add company/contact details, privacy policy, terms, refund policies and any necessary cookie consent in line with UK requirements.
- Validate contractor/safety-related content with qualified sources; estimates are explicitly illustrative.
- Ensure email subscription, analytics, checkout, ads and affiliate platforms each have their own appropriate consent and data processing arrangements.
- No secrets in `site/` or `business-config.json`; use environment variables / private Actions secrets only.
- Review generated text before approval. Do not mass-publish low-value AI articles, fabricate testimonials, or copy others' images.
- Payment delivery, affiliate commissions, tracking, ad approval and social publishing will **not** work until their external services are properly connected.

## Architecture

`site/` → public website, calculator, configuration and approved articles only.

`automation/generate_drafts.py` → optional AI-assisted draft generation.

`content/drafts/` → private editorial queue; `content/approved/` → owner-approved source.

`automation/manage.py` → approve, publish, list, simple manual earnings dashboard.

`.github/workflows/` → weekly draft generation and approved-site publication.

`products/private/` → starting paid-product asset, never published by this setup.

Target steady-state owner involvement is a *goal*, not a guaranteed 1–2 hours/week; early-stage market testing, editing and customer support take time.
