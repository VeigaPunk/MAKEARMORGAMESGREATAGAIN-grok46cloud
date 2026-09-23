import test from 'node:test';
import assert from 'node:assert/strict';
import { Runner, DT, LEVEL_END, GROUND_Y, CUBE, COURSES } from '../../MAGA-everything/02-code/armor-games/apps/impossible/src/runner.ts';
import { Sim, TUNE, totalBacklash } from '../../MAGA-everything/02-code/armor-games/apps/burger-tycoon/src/sim.ts';
import { load } from '../../MAGA-everything/02-code/armor-games/packages/arcade-core/src/storage.ts';
export const jumps=[1330,1790,2300,2880,3290,3840,4280,4920,5490,6240,6750,7000,7250,7750,8400,8990,9300];
test('Impossible entire normal course clears with discrete player jump presses',()=>{
 const r=new Runner();let next=0;for(let i=0;i<4000&&r.state==='running';i++){if(r.x>=jumps[next]){r.jump();next++;}r.step();}
 assert.equal(r.state,'clear');assert.equal(r.deaths,0);assert.equal(r.x,LEVEL_END);assert.equal(next,jumps.length);
});
test('Impossible misses kill, instant retries, and practice keeps its checkpoint',()=>{
 const r=new Runner();while(r.state==='running')r.step();assert.equal(r.state,'dead');assert.equal(r.deaths,1);
 for(let i=0;i<20;i++)r.step();assert.equal(r.state,'running');assert.equal(r.attempt,2);assert.ok(r.x<10);
 r.practice=true;r.checkpoint=3300;r.die();for(let i=0;i<20;i++)r.step();assert.ok(r.x>=3300&&r.x<3310);assert.equal(r.y,GROUND_Y-CUBE);
});
test('Impossible landing never snaps a cube upward through a platform',()=>{
 const r=new Runner();r.x=2964;r.y=GROUND_Y-CUBE;r.grounded=false;r.vy=50;r.step(DT);assert.equal(r.state,'dead');
});
test('Burger clean idle economy reaches a forced ending and can start over',()=>{
 const s=new Sim();s.reset(1);
 for(let i=0;i<4000&&!s.s.over;i++)s.tick(0.05);
 assert.ok(s.s.over==='board'||s.s.over==='cash');
 assert.match(s.s.overReason,/BANKRUPT|BOARD/);
 assert.ok(s.s.t>1);
 s.reset(1);assert.equal(s.s.cash,TUNE.startCash);assert.equal(s.s.over,'');
});
test('Burger dirty levers raise backlash above a clean operation',()=>{
 const clean=new Sim(),dirty=new Sim();clean.reset(7);dirty.reset(7);
 dirty.act('farm',1);dirty.act('farm',6);dirty.act('feed',0);
 assert.ok(totalBacklash(dirty.s)>totalBacklash(clean.s));
 for(let i=0;i<800&&!dirty.s.over&&!clean.s.over;i++){clean.tick(0.05);dirty.tick(0.05);}
 assert.ok(totalBacklash(dirty.s)>totalBacklash(clean.s));
 for(let i=0;i<4000&&!dirty.s.over;i++)dirty.tick(0.05);
 const log=dirty.events.join('\n')+' '+dirty.s.overReason;
 assert.match(log,/SWILL|LAGOON|OUTBREAK|SCANDAL|POISON|FIRED|BOARD|BANKRUPT/);
});
test('Burger actions cannot spend unavailable resources or mutate a closed company',()=>{
 const s=new Sim();s.s.cash=0;const before=structuredClone(s.s);assert.equal(s.act('farm',1),null);assert.deepEqual(s.s,before);
 s.s.over=true;assert.equal(s.act('farm',0),null);assert.equal(s.s.crops,before.crops);
});
test('Shared score storage survives invalid primitives and unavailable storage',()=>{
 for(const raw of ['null','{}','"oops"','-2','1e999','broken']){globalThis.localStorage={getItem:()=>raw};assert.equal(load('game','best',0),0);}
 globalThis.localStorage={getItem:()=>{throw Error('blocked');}};assert.equal(load('game','best',7),7);delete globalThis.localStorage;
});

const advancedTapes=[
[940,1340,1880,2950,3190,3380,4050,5090,5820,6440,7350,7590,7780,8450,9480,9890,11250,11490,11680],
[1050,1290,1480,2250,3180,3590,4250,5350,5590,5780,6350,6590,6780,7950,8590,9320,10650,10890,11080,11850,12780,13250,13490,13680]
];
for(let course=1;course<COURSES.length;course++)test(`Impossible ${COURSES[course].name} clears with discrete jumps at 60Hz input`,()=>{
 const r=new Runner();r.courseIndex=course;let next=0;for(let i=0;i<6000&&r.state==='running';i++){if(i%2===0&&r.x>=advancedTapes[course-1][next]){r.jump();next++;}r.step();}assert.equal(r.state,'clear');assert.equal(r.deaths,0);assert.equal(next,advancedTapes[course-1].length);
});
