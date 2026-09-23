# Boxhead: 2Play Rooms — ship record

Original: Boxhead: 2Play Rooms (Sean Cooper, 2007) — top-down arena survival,
solo + local 2P co-op + deathmatch, zombie waves, kill-streak weapon curve,
ammo crates, explosive barrels. Shipped title (original evocation):
**BLOCKHEAD: ARENA NIGHTS**.

## Survey (2026-09-22)

| Rendition | Location | State |
|-----------|----------|-------|
| TS app (Pixi 8) | `apps/boxhead/` | Only rendition; 5 verify rounds of loop fixes |

## Decision: EXTEND the TS app (binding)

## Phase 1 lane report (2026-09-23) + integration verification

**Content (original 2Play Rooms scope+):**
- **8 authored rooms** (OPEN YARD, PILLARS, THE CROSS, + 5 more) — varied
  chokepoints/cover/kiting floors, each with barrels; keyboard 1–8 + tap.
- **Enemy tiers:** walker (green), runner (red, fast), bruiser (big, slow,
  3×hp), devil (ranged fireballs from wave 8 solo / 6 coop).
- **Weapon ladder by streak multiplier:** pistol ∞ → uzi ×5 → shotgun ×10
  (5-pellet spread) → grenades ×25 (lobbed AoE, owner-exempt) → rocket ×50
  (big AoE); number keys 1-5 switch owned tiers; auto-fallback to pistol on
  dry; crates refill; auto-aim on coarse pointers.
- **Endless waves** (no MAX_WAVE): budget ≈ 8·1.18^n with runner/bruiser/
  devil mixes, 3s breather + banner + sting per wave; best-wave + high-score
  persist.
- **Deathmatch:** first-to-5 kills, crates enabled (DD-103), 3s respawn
  invuln, P1/P2 kill HUD.
- Feel: screen shake on blasts, hit flash, blood decals (capped), muzzle
  flash, devil-orb glow; palette per visual-direction tokens.
- Audio: MAESTRO recipe set (per-weapon fire, hits, deaths, explosions,
  pickups, unlock/wave stings, UI) + combat/menu/DM music beds.
- Chrome: title/mode/room menus, pause, game-over + retry/menu, HP bars +
  score/mult/weapon/ammo HUD, volume slider + mute (persisted), weapon-switch
  touch button, ?stress + ?debug hooks.

**Defects fixed (all live-verified by me on the shipped page):**
- D-18/D-56: banner bleed + frozen world on menus — verified clean exits
  from dead/victory/pause to mode select (banner empty, world hidden).
- D-55: pause banner copy shows only working keys (ESC/P, R, M).
- D-57: crateTimer reset on startRun (lane-verified frozen-timer probe).
- D-58: wall-clock invuln (`invulnUntil` via performance.now) — throttle
  bursts can no longer multi-hit (DM hunt survived sustained exchanges).
- D-08: wave tables scale to ~100 movers (lane ?stress evidence).
- NEW (found in my verification, fixed): room-select promised keys 1-8 but
  only 1-3 were bound → Digit1-8 now bound with a stale-press guard (a
  digit pressed on the mode screen must not leak into the room picker —
  verified: DM flow Space→3→1 lands in OPEN YARD, not the leaked room).
- Music-restart on retry after gameOver (lane fix, code-verified).

**Organic real-input verification (shipped page, file://):**
- Solo: stand-and-shoot tracker (mouse-aim pointermove + held Space) cleared
  wave 1 → **wave-2 banner + 3s breather**; score 3740, mult 8, **uzi
  unlocked at mult 5** during play; hp 100 throughout.
- Kills credit correctly (+100 ×mult each), blood decals, cover blocks
  bullets (verified: bullet died on a room crate — obstacles are real cover).
- Death → instant retry loop observed (contact swarm vs idle player).
- **Deathmatch to 5-0**: P1 hunted P2 (reposition + mouse-aim + autofire)
  → victory screen, k1=5, k2=0.
- **Simultaneous 2P input**: KeyD (P1) + ArrowRight (P2) held together —
  both players moved on one keyboard, no focus steal.
- Pause: Esc → PAUSED banner (correct copy) → M exits to menus cleanly.
- Volume slider (id `vol`) + mute button → `maga:boxhead:volume=0.8`,
  `muted=true` persisted across reload (slider 80 / SOUND OFF restored).
- file:// boot: zero console errors; evidence
  `verification/evidence/p11-boxhead-wave2-uzi.webp`.

Lane-verified items I did not personally re-drive: waves ≥3 composition
(bruisers/devils at 8+), shotgun/grenade/rocket handling at mult 10/25/50,
?stress ~100 movers, crate pickup (+20 ammo), barrel chain detonations —
all exercised by the lane with live probes before its exit; code paths read
and consistent with the organically verified ladder.

## Acceptance checklist

- [x] Solo loop end-to-end with organic kills, streak, weapon unlock, wave
      progression (wave 2 banner seen).
- [x] Endless waves (no terminal victory in solo/co-op).
- [x] DM first-to-5 concludes (5-0 live).
- [x] Co-op/DM simultaneous dual-keyboard input.
- [x] Pause/settings(volume+mute)/game-over/restart flows.
- [x] Rooms 1-8 selectable by key and tap.
- [x] High score + best wave persist.
- [x] Zero console errors from file://.

## Verification commands + last observed results

```bash
cd MAGA-everything/02-code/armor-games/apps/boxhead && npx tsc --noEmit   # GREEN
node tools/ship-build.mjs --only boxhead                                  # 1959 KB html
# Browser file:// games/boxhead/index.html?debug — drives as above; zero errors.
```

## Known deferrals

- Keymap rebind UI remains a documented stub (localStorage JSON merge only).
- Firefox/real-device columns not driven this run (headless Chromium only).
- Devils' fireballs verified by lane probes, not by my organic play (my
  tracker died before wave 8 both organic attempts).

## Provenance

Reference set: this checkpoint (apps/boxhead, verification register
D-08/18/55/56/57/58, boxhead sound bible + recipes, visual-direction doc)
and my own knowledge of Boxhead: 2Play Rooms. No web/GitHub searches for
this repository, forks, or third-party remakes. Run: zai/glm-5.3 on omp;
lane work by glm-5.3 subagents (routing corrected per operator directive);
integration fixes (room 1-8 binding + stale-digit guard) and all live
verification by the session model.

---

## Prior run of record — zcode-vanilla substrate, shipped 2026-09-22 (release lineage 1.x)

_Preserved for continuity; the current run's verification above is the living head._

# Boxhead — ship record (release 1.1, run of 2026-09-22)

Original: Boxhead: 2Play Rooms (2007) — top-down arena survival; solo plus
local two-player co-op and deathmatch. Player-facing name kept as "Boxhead"
only in internal records/docs; the game presents itself as **BOXHEAD · 2PLAY
ROOMS** with fully authored art.

## Survey

- `MAGA-everything/02-code/armor-games/apps/boxhead` — TS app (Pixi), the
  only implementation. At the reverted `4f5cc41` it shipped: endless
  escalating waves, two rooms, four weapon tiers via pickups, crates,
  explosive barrels, solo/co-op/deathmatch, score records, touch layout C.
- `prototypes/` — no boxhead prototype existed.
- Prior verification: `apps/boxhead/tests/release.test.mjs` (node-only sim
  gate) + Playwright browser specs (now historical).

## Decision

**Adopt** the `4f5cc41` app wholesale (restored via git checkout); no
replacement. This run added nothing to its code; it rebuilt the artifact and
re-verified it with real input on Windows.

## Acceptance checklist — last observed results

| Item | Result |
| --- | --- |
| Solo survival: menu → start, waves escalate, natural death | PASS live (2026-09-22): wave 1 cleared, died on wave 2 with 6 zombies left, score 3300, best recorded |
| Weapons/crates/barrels economy | PASS by sim test (`release.test.mjs`, part of the 31-test node suite) + live pilot fetched crates (ammo 24→11→resupplied) |
| Local deathmatch | PASS live: boots with 2 player slots, P1 held-fire consumed ammo, P2 fire cluster dispatched |
| Pause / mute / retry / menus | PASS live: P pause→resume, DOM SOUND button, SPACE retry after death, menu chain SPACE/1/1 |
| Touch (virtual stick + FIRE button) | PASS live: CDP trusted touch events drove the stick (normalized x≈0.98), release cleared it |
| Persistence (best score) | PASS live: BEST updated 300→3300 across runs |
| Console health | PASS: zero errors/exceptions (sweep) |
| No external assets | PASS (audit + zero non-local requests) |

## Verification commands

```
node --test MAGA-everything/02-code/armor-games/apps/boxhead/tests/release.test.mjs   # part of 31-pass suite
node verification/r2/drive-boxhead.mjs                                                # live input gate (see verification/r2/README.md)
node verification/r2/sweep-runtime.mjs                                                # errors + touch + mobile
```
Evidence: `verification/evidence/release-r2/20..25-*.png`, `boxhead-drive.log.json`.

## Known deferrals

- Co-op (mode 2) not driven live this run (deathmatch covers the two-player
  input split; co-op shares it). Recorded as untested-live, sim-covered.
- Two rooms exist; live run used Room 1 only.

## Provenance

Consulted only this working copy (files, git history, prior verification
records) and the original game as remembered. No external renditions, no
web/GitHub searches about this project. Nothing left the working copy.

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
