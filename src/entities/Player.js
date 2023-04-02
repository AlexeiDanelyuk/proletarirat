import t from "./GameEntity.js"; import e from "../../lib/Sprite.js"; import i from "../enums/ImageName.js"; import s from "../enums/SoundName.js"; import { images as r, sounds as a } from "../globals.js"; import o from "../../lib/Hitbox.js"; import l from "../../lib/StateMachine.js"; import h from "../enums/PlayerStateName.js"; import n from "../states/entity/player/PlayerIdleState.js"; import p from "../states/entity/player/PlayerWalkingAndShootingState.js"; import H from "../enums/Direction.js"; import c from "../objects/Bullet.js"; import f from "../user-interface/HealthBar.js"; import m from "../services/Tile.js"; export default class S extends t { static WIDTH = 32; static HEIGHT = 32; static MAX_HEALTH = 10; static MAX_SPEED = 100; static MAX_BULLET_SPEED = 200; constructor(t = { x: 100, y: 100 }) { super(), this.sprites = e.generateSpritesFromSpriteSheet(r.get(i.Player), S.WIDTH, S.HEIGHT), this.spritesRight = e.generateSpritesFromSpriteSheet(r.get(i.PlayerRight), S.WIDTH, S.HEIGHT), this.hitboxOffsetsHorizontal = new o(S.WIDTH / 3 - 1, S.HEIGHT / 2 + 6, -S.WIDTH / 1.5, -S.HEIGHT / 2 - 4), this.hitboxOffsetsVertical = new o(S.WIDTH / 3 + 1, S.HEIGHT / 2 + 3.5, -S.WIDTH / 1.5, -S.HEIGHT / 2 - 2), this.hitboxOffsets = this.hitboxOffsetsVertical, this.position.x = t.x, this.position.y = t.y, this.dimensions.x = S.WIDTH, this.dimensions.y = S.HEIGHT, this.speed = S.MAX_SPEED, this.totalHealth = S.MAX_HEALTH, this.currentHealth = S.MAX_HEALTH, this.stateMachine, this.isUnderTable = !1, this.table = null, this.bulletSpeed = S.MAX_BULLET_SPEED, this.bulletSprites = e.generateSpritesFromSpriteSheet(r.get(i.PlayerBullet), c.WIDTH, c.HEIGHT) } toJSON() { let t = super.toJSON(); return t.isUnderTable = this.isUnderTable, t.table = null === this.table ? null : this.table.toJSON(), t.hitboxOffsetsHorizontal = this.hitboxOffsetsHorizontal.toJSON(), t.hitboxOffsetsVertical = this.hitboxOffsetsVertical.toJSON(), t.className = this.constructor.name, t } static rebuildStates(t, e) { return "PlayerIdleState" === t.className ? n.buildObject(t, e) : p.buildObject(t, e) } static rebuildObject(s) { let a = t.rebuildObject(s); (a = Object.setPrototypeOf(a, S.prototype)).sprites = e.generateSpritesFromSpriteSheet(r.get(i.Player), S.WIDTH, S.HEIGHT), a.spritesRight = e.generateSpritesFromSpriteSheet(r.get(i.PlayerRight), S.WIDTH, S.HEIGHT), a.bulletSprites = e.generateSpritesFromSpriteSheet(r.get(i.PlayerBullet), c.WIDTH, c.HEIGHT), a.hitboxOffsetsHorizontal = Object.setPrototypeOf(a.hitboxOffsetsHorizontal, o.prototype), a.hitboxOffsetsVertical = Object.setPrototypeOf(a.hitboxOffsetsVertical, o.prototype), a.stateMachine.currentState = S.rebuildStates(a.stateMachine.currentState, a); let l = Object.keys(a.stateMachine.states); for (let h = 0; h < l.length; h++)a.stateMachine.states[l[h]] = S.rebuildStates(a.stateMachine.states[l[h]], a); return a } render() { super.render({ spritesToRender: this.direction === H.Up || this.direction === H.Right ? this.spritesRight : this.sprites }) } update(t) { this.direction === H.Left || this.direction === H.Right ? this.hitboxOffsets = this.hitboxOffsetsHorizontal : this.hitboxOffsets = this.hitboxOffsetsVertical, super.update(t) } initializeStateMachine(t) { let e = new l; return e.add(h.Idle, new n(this, t)), e.add(h.WalkingAndShooting, new p(this, t)), e.change(h.Idle), e } setLevelOnStates(t) { this.stateMachine.states[h.Idle].level = t, this.stateMachine.states[h.WalkingAndShooting].level = t, this.stateMachine.currentState.level = t } receiveDamage(t) { a.play(s.Bonk), this.isUnderTable ? this.currentHealth -= t / 2 : this.currentHealth -= t, console.log("health: " + this.currentHealth) } };