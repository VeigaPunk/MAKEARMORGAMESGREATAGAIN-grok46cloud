# Ship Records — Make Armor Games Great Again

One living record per game. Each record starts as a survey (every rendition
found in the checkpoint, adopt/extend/replace decision) and ends as the ship
record (acceptance checklist, exact verification commands with last observed
results, known deferrals).

## Records

| Game | Record | Rendition shipped |
|------|--------|-------------------|
| Boxhead: 2Play Rooms | [boxhead.md](boxhead.md) | `games/boxhead/index.html` |
| The Impossible Game | [impossible-game.md](impossible-game.md) | `games/impossible/index.html` |
| Burger Tycoon | [burger-tycoon.md](burger-tycoon.md) | `games/burger-tycoon/index.html` |
| Chicken Invaders 2 (+ Cluck Horizon) | [chicken-invaders.md](chicken-invaders.md) | `games/chicken-invaders/index.html`, `games/cluck-horizon/index.html` |
| Swords & Sandals 2 | [swords-and-sandals.md](swords-and-sandals.md) | `games/swords-and-sandals/index.html` |
| The World's Hardest Game | [hardest.md](hardest.md) | `games/hardest/index.html` |

## Fleet architecture (decided by first shipping run, 2026-09-22 — binds later runs)

- **Entry point:** repository root `index.html` — one arcade portal, one entry
  file. Every game reachable only from it.
- **Shipped renditions:** plain self-contained HTML pages under `games/`
  (single file per game: inline JS bundle, inline CSS, inline art). They run
  from `file://` with no server, no CDN, no install, no build step.
- **Source of truth for five titles:** the TS/Vite monorepo at
  `MAGA-everything/02-code/armor-games/` (apps + `arcade-core`/`shmup-core`).
  `tools/ship-build.mjs` (dev tooling, needs `npm install` once) bundles each
  app with esbuild into the shipped pages. If a future run has no network, it
  edits the shipped pages directly — they are unminified and readable.
- **Hardest:** stays a zero-dependency classic-script tree; the ship build
  copies `hardest/index.html` + engine/levels into `games/hardest/` verbatim.
- **Prototypes:** retired from the entry point; remain under `prototypes/` as
  mechanics reference (authoritative for mechanics, not polish).
- **Rights posture:** player-facing names/art are original evocations of the
  originals; originals are referenced by name in docs/comments/records only.

## Verification (re-runnable, zero new dependencies, zero network)

```bash
node hardest/validate.mjs                       # hardest corpus proof (uses games/hardest copy)
node tools/ship-build.mjs                       # only after editing TS sources; needs node_modules
# Browser: open index.html from file:// (or: npx serve . ) and play.
# Evidence artifacts: verification/evidence/<run>-*
```

## Final fleet verification (2026-09-23, end of run)

| Check | Result |
|-------|--------|
| `node tools/ship-build.mjs` (all 7) | boxhead 1985KB · impossible 69KB · burger 81KB · chicken 1935KB · cluck 1938KB · sas 135KB · hardest copied |
| `node hardest/validate.mjs` | **114/114 levels pass, exit 0** |
| Portal + 7 games from file:// | **zero console errors** on every page; live pixels on every canvas |
| Impossible solver | ALL 5 LEVELS PASS + 30/30 checkpoints |
| Burger economy sim | clean Q11 FIRED · dirty SUSTAINED+3 scandals · mixed SUSTAINED |
| S&S economy sim | 83% completion · final ~33% first-try |
| Boxhead stress | 60.3 fps @ 100 movers |
| Touch (device emulation) | shmup drag pad moves ship; mouse gated from touch zones |
| Real-input drives | per record — kills/medals/DM-5-0/wave-2/XSS-regression/deforest/checkpoint-respawn all live |

## Run identity

- Run dates: 2026-09-22 → 2026-09-23 (single run)
- Model: `zai/glm-5.3` (session); subagent lanes also glm-5.3 (routing
  corrected mid-run per operator directive — initial devin-routed batch
  cancelled before any edits landed)
- Substrate: Oh My Pi (`omp`) CLI on local Arch Linux; node v24.19.0,
  npm 11.17.0, esbuild 0.25.12, /usr/bin/chromium for browser verification.
- Git identity (repo-local): `maga-ship <ship@local.invalid>`
- Nothing leaves the working copy. No push, no publish.

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
