import t from "../enums/EnemyStateName.js"; import e from "./Enemy.js"; import n from "../enums/Direction.js"; import i from "../../lib/Animation.js"; import s from "../../lib/Sprite.js"; import a from "../enums/ImageName.js"; import { images as r } from "../globals.js"; import o from "../states/entity/enemy/EnemyChasingState.js"; import l from "../states/entity/enemy/EnemyIdlingState.js"; import m from "../states/entity/enemy/EnemyWalkingState.js"; export default class h extends e { static SPEED = 20; static MAX_HEALTH = 20; constructor(e, s, a) { super(e, s, a), this.speed = h.SPEED, this.animations = { [t.Idle]: { [n.Up]: new i([0], 1), [n.Down]: new i([1], 1), [n.Left]: new i([3], 1), [n.Right]: new i([2], 1) }, [t.Walking]: { [n.Up]: new i([0, 4, 8, 12], .2), [n.Down]: new i([1, 5, 9, 13], .2), [n.Left]: new i([3, 7, 11, 15], .2), [n.Right]: new i([2, 6, 10, 14], .2) }, [t.Chasing]: { [n.Up]: new i([0, 4, 8, 12], .2), [n.Down]: new i([1, 5, 9, 13], .2), [n.Left]: new i([3, 7, 11, 15], .2), [n.Right]: new i([2, 6, 10, 14], .2) } }, this.totalHealth = h.MAX_HEALTH, this.currentHealth = h.MAX_HEALTH } static rebuildObject(o) { let l = e.rebuildObject(o); (l = Object.setPrototypeOf(l, h.prototype)).sprites = s.generateSpritesFromSpriteSheet(r.get(a.SuitPerson), 32, 64), l.stateMachine.currentState = h.rebuildStates(l.stateMachine.currentState, l); let m = Object.keys(l.stateMachine.states); for (let _ = 0; _ < m.length; _++)l.stateMachine.states[m[_]] = h.rebuildStates(l.stateMachine.states[m[_]], l); return l.animations = { [t.Idle]: { [n.Up]: new i([0], 1), [n.Down]: new i([1], 1), [n.Left]: new i([3], 1), [n.Right]: new i([2], 1) }, [t.Walking]: { [n.Up]: new i([0, 4, 8, 12], .2), [n.Down]: new i([1, 5, 9, 13], .2), [n.Left]: new i([3, 7, 11, 15], .2), [n.Right]: new i([2, 6, 10, 14], .2) }, [t.Chasing]: { [n.Up]: new i([0, 4, 8, 12], .2), [n.Down]: new i([1, 5, 9, 13], .2), [n.Left]: new i([3, 7, 11, 15], .2), [n.Right]: new i([2, 6, 10, 14], .2) } }, l } static rebuildStates(t, e) { return "EnemyChasingState" === t.className ? o.buildObject(t, e) : "EnemyIdlingState" === t.className ? l.buildObject(t, e) : m.buildObject(t, e) } startTimerOnAllAnimation() { Object.entries(this.animations).forEach(([t, e]) => { Object.entries(e).forEach(([t, e]) => { e.startTimer() }) }) } setLevelOnStates(e) { this.player = e.player, this.stateMachine.states[t.Idle].level = e, this.stateMachine.states[t.Chasing].level = e, this.stateMachine.states[t.Walking].level = e, this.stateMachine.currentState.level = e, console.log(this.stateMachine.currentState.enter()), this.startTimerOnAllAnimation() } initializeStateMachine(t) { this.stateMachine = super.initializeStateMachine(this.animations, t) } toJSON() { let t = super.toJSON(); return t.className = this.constructor.name, t } };