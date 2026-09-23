# Burger Tycoon — ship record

Original: Molleindustria's McDonald's Videogame (~2006), shipped as the
rights-safe twin **BURGER TYCOON** (checkpoint precedent). Four-pane
supply-chain sim: farmland → feedlot → restaurant → HQ; dirty actions raise
profit and backlash; no clean win; collapse ends the run.

## Survey (2026-09-22)

| Rendition | Location | State |
|-----------|----------|-------|
| TS app (Canvas + DOM) | `apps/burger-tycoon/` | 4-pane grid, 10 actions, collapse chain verified |

## Decision: EXTEND the TS app (binding)

## Phase 1 lane report (2026-09-23) + integration verification

**Economy depth — 27 actions/levers across 4 panes:**
- FARM (7): plot grid (BUY FIELD, SOW SOY/GRAIN, FENCE PASTURE, SELL FIELD,
  DEFOREST JUNGLE), HORMONES toggle (yield↑ disease↑).
- FEEDLOT (4): FEED cycle (natural/soy/industrial swill), EXPAND PENS,
  CULL SICK HERD, PUMP LAGOON.
- RESTAURANT (10): PRICE −/+, HIRE/FIRE CASHIER, HIRE/FIRE COOK,
  TV CAMPAIGN, TOY TIE-IN, BOY BAND JINGLE, MASCOT 'SPEEDY'.
- HQ (6): BRIBE NUTRITIONIST, BRIBE CLIMATOLOGIST, UNION-BUST,
  GREENWASH PR, RAZE RAINFOREST, LOBBY POLITICIANS.
- Cross-pane chains: backlash columns (activists/media/climate/unions) feed
  boycotts and media storms; food-poisoning traceback to swill feed;
  waste-lagoon overflows; board patience + quarterly profit targets;
  endings: FIRED (cash/patience collapse) or SUSTAINED (survive Q16 with
  profit — "the only clean win is dirty").
- Event ticker, autosave each quarter, resume-on-boot prompt, 1×/2×/4×
  speed, pause (Esc), Muzak that turns minor-key as backlash crosses 45
  (loop-seam crossfade), volume [ ]/M persisted.

**Tuning — deterministic sim (`tools/sim.mjs`, 3 policies × 16 quarters):**
CLEAN-MODERATE → FIRED Q11 (structural satire); DIRTY-MAX → SUSTAINED with
3 scandals; MIXED → SUSTAINED with margin (the skill path). Seed-robustness
checked; canonical run recorded.

**NEW defect found in my verification, fixed:** the boot prompt (RESUME RUN /
NEW GAME) drew on canvas but `pollInput` skipped hit consumption while
`bootChoice === ''` — with a save present the game was unstartable. Fixed
(boot buttons now live in the same hits registry). Verified live: real
pointer click on RESUME RUN restores the saved run exactly (Q4, $1165).

**Organic real-input verification (shipped page, file://):**
- Fresh save → game starts; deforest via REAL pointer click on the farm
  action button: jungle 2→1, cash 1158→1069 (−$89), climate backlash 6→15.
- Quarter flow live: Q1→Q4 at speed×2 over 70s — per-quarter profit
  (214→85→6), board patience swinging (65→70→59→27), backlash decaying.
- Pause via Esc; speed via Space; volume `]` + mute M persisted across
  reload (volume 0.6 / SOUND OFF restored).
- Autosave each quarter (run save held Q4/$1165); boot prompt + RESUME
  verified post-fix.
- Zero console errors; evidence `verification/evidence/p11-burger-q4.webp`.

Lane-driven items I did not personally re-click: restaurant hires/marketing
pushes and HQ bribes (lane drove them with corrected pane coordinates —
its transcript shows cash-consistent deltas); FIRED/SUSTAINED endings are
sim-proven (deterministic script) rather than organically driven (each
needs 8+ minutes at 4× speed).

## Acceptance checklist

- [x] Four panes, one interlocking economy (state probes + organic drive).
- [x] ≥25 actions/levers (27 in code).
- [x] Dirty action → profit + backlash (organic: deforest).
- [x] Forced failure path + sustained path (sim-proven, 3 policies).
- [x] Autosave + resume (organic, Q4 restored).
- [x] Pause / speed controls / volume / mute persisted.
- [x] Zero console errors from file://.

## Verification commands + last observed results

```bash
cd MAGA-everything/02-code/armor-games/apps/burger-tycoon && npx tsc --noEmit  # GREEN
node MAGA-everything/02-code/armor-games/apps/burger-tycoon/tools/sim.mjs
# 2026-09-23: CLEAN-MODERATE FIRED-BOARD Q11 · DIRTY-MAX SUSTAINED (3 scandals)
#             · MIXED SUSTAINED
node tools/ship-build.mjs --only burger-tycoon   # 81 KB html
# Browser file:// games/burger-tycoon/index.html?debug — drives as above.
```

## Known deferrals

- Branded McDonald's marks (rights posture — permanently out).
- Exact original numeric thresholds (dossiers mark them gaps; ours are
  tuned to the spec'd outcome envelope instead).
- Endings driven by sim rather than live play this run.

## Provenance

Reference set: this checkpoint (burger app + prototype card + card's
collapse-chain figures, divergence register) and my own knowledge of the
McDonald's Videogame. No web/GitHub searches for this repository, forks, or
third-party remakes. Run: zai/glm-5.3 on omp; lane work by glm-5.3
subagents (routing corrected per operator directive); the boot-prompt fix
and all live verification by the session model.

---

## Prior run of record — zcode-vanilla substrate, shipped 2026-09-22 (release lineage 1.x)

_Preserved for continuity; the current run's verification above is the living head._

# Burger Tycoon — ship record (release 1.1, run of 2026-09-22)

Original: Molleindustria's McDonald's Videogame (~2006), four-pane
supply-chain management with a dirty-action economy. Shipped under the
checkpoint's original-evocation branding "Burger Tycoon / GROWTH AT ANY
COST" — no McDonald's names, marks, or art.

## Survey

- `MAGA-everything/02-code/armor-games/apps/burger-tycoon` — TS app with
  animated pane scenes (`src/scenes.js`), live economy sim (`src/sim.ts`),
  dirty actions with consequences (disease → backlash → reputation
  collapse), save/resume, bankruptcy, keyboard 1–4 pane shortcuts, mobile
  tabs layout.
- `prototypes/burger-tycoon.html` — mechanics proof. Historical reference
  only.

## Decision

**Adopt** the `4f5cc41` app (restored), including its save-format validator
carried in the prior defect burn.

## Acceptance checklist — last observed results

| Item | Result |
| --- | --- |
| Boot → "Open for business" start via real click | PASS live |
| Four operations, actions with affordability gating | PASS live: "Use cheap feed" engaged (dirty.cheapFeed 0→1, toggle back on second click); correctly-disabled buttons refused (cattle/crops caps, demand gates) |
| Dirty economy consequences | PASS by sim test: dirty throughput → disease → backlash → REPUTATION collapse; clean idle → BANKRUPT (node suite 31/31) |
| HQ spend applies costs | PASS live: PR spin click, cash −$100 |
| Keyboard pane switching (1–4) | PASS live |
| Pause / mute | PASS live via header buttons |
| Save → reload resume | PASS live twice: reload restored the run (same cash), overlay offers "Continue company" |
| Mobile layout (390×844) | PASS live: tab bar activates (`display:flex`), screenshot captured |
| Console health / self-containment | PASS (sweep + audit) |

## Verification commands

```
node --test verification/tests/gameplay.test.mjs    # economy rules incl. collapse paths
node verification/r2/drive-burger.mjs               # live DOM input gate
node verification/r2/sweep-runtime.mjs              # includes mobile pass
```
Evidence: `verification/evidence/release-r2/30..33-*.png`, `70-burger-mobile.png`, `burger-drive.log.json`.

## Known deferrals

- A full collapse-to-game-over was not driven live this run (takes minutes of
  economy time); covered deterministically by the sim tests.

## Provenance

Consulted only this working copy (files, git history, prior records) and the
original game as remembered. No external renditions consulted; no web or
GitHub searches about this project; nothing left the working copy.

## Run — grok 4.6 build websurface (2026-09-23)

Identity of this run: **grok 4.6 build websurface**.

The reachable rendition remains `arcade/` (one hub). Repository-root `index.html` now only redirects there, so the older `games/` file:// lineage is no longer an entry. Player-facing titles on the hub are original evocations (Blockhead: Arena Nights, Impossible Run, Burger Tycoon, Galactic Chicken, Sandals of Steel, Cluck Horizon, The World's Cruelest Game). INTERNAL-NO-PUBLIC banners were removed from the shipped pages.

Gates re-run on this machine (Node 22):

```
node --test verification/tests/gameplay.test.mjs hardest/regression.mjs \
  MAGA-everything/02-code/armor-games/apps/swords-and-sandals/tests/progression.test.mjs \
  MAGA-everything/02-code/armor-games/packages/shmup-core/tests/campaign.test.mjs
  → tests 31, pass 31, fail 0

node hardest/validate.mjs
  → 114/114 levels pass

node verification/r2/audit-static.mjs
  → STATIC AUDIT PASS

node MAGA-everything/02-code/armor-games/apps/burger-tycoon/tools/sim.mjs
  → CLEAN-MODERATE FIRED-BOARD Q11 · DIRTY-MAX SUSTAINED (3 scandals) · MIXED SUSTAINED
```

Browser evidence (real key input, agent-browser): `verification/evidence/grok46-websurface/`.
Impossible Run Space opens the five-track select. Galactic Chicken Enter starts a wave. The World's Cruelest Game Enter starts level 1. Hub, Blockhead, Burger Tycoon, Sandals of Steel, and Cluck Horizon title screens render with no reported page errors.

What changed in the sources this run:
- Pause freezes a shmup chapter-clear countdown (`sim.ts`).
- Chapter-unlock saves are clamped to a real chapter (`sim.ts`).
- Campaign and burger tests now assert the shipped simulators, not the retired shapes.
- Impossible Run no longer mounts a blank canvas over the stage.

Deferrals: no physical phone; the 114-level corpus is validator-proven rather than hand-played this run; the shmup browser pass started chapter 1 rather than finishing all ten chapters by hand (the node campaign proof clears both packs by projectile collision).

Provenance: this working copy only — its files, HEAD history, `verification/`, `ship-records/`, and `MAGA-everything/` sources. No web or GitHub search for this repository, its forks, or third-party remakes. The operator asked for a named fork; it was created as https://github.com/VeigaPunk/MAKEARMORGAMESGREATAGAIN-grok46cloud because GitHub will not fork a repository into the same account. No other publication.
