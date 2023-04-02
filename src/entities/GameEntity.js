import t from "../../lib/Hitbox.js"; import i from "../../lib/Vector.js"; import s from "../enums/Direction.js"; import { context as e, DEBUG as o } from "../globals.js"; import { getCollisionDirection as n } from "../../lib/CollisionHelpers.js"; import h from "../../lib/StateMachine.js"; import r from "../../lib/Animation.js"; export default class p { constructor(e = {}) { this.position = e.position ?? new i, this.dimensions = e.dimensions ?? new i, this.speed = e.speed ?? 1, this.totalHealth = e.health ?? 1, this.currentHealth = e.currentHealth ?? 1, this.damage = e.damage ?? 1, this.hitboxOffsets = e.hitboxOffsets ?? new t, this.hitbox = new t(this.position.x + this.hitboxOffsets.position.x, this.position.y + this.hitboxOffsets.position.y, this.dimensions.x + this.hitboxOffsets.dimensions.x, this.dimensions.y + this.hitboxOffsets.dimensions.y), this.stateMachine = null, this.currentAnimation = null, this.sprites = [], this.direction = s.Down, this.cleanUp = !1, this.renderPriority = 0, this.bulletSprites = [], this.bulletSpeed = new i } toJSON() { return { position: this.position.toJSON(), dimensions: this.dimensions.toJSON(), speed: this.speed, totalHealth: this.totalHealth, currentHealth: this.currentHealth, damage: this.damage, hitboxOffsets: this.hitboxOffsets.toJSON(), hitbox: this.hitbox.toJSON(), stateMachine: this.stateMachine.toJSON(), currentAnimation: this.currentAnimation.toJSON(), direction: this.direction, cleanUp: this.cleanUp, renderPriority: this.renderPriority, bulletSpeed: this.bulletSpeed } } static rebuildObject(s) { return s.position = Object.setPrototypeOf(s.position, i.prototype), s.dimensions = Object.setPrototypeOf(s.dimensions, i.prototype), s.hitboxOffsets = Object.setPrototypeOf(s.hitboxOffsets, t.prototype), s.hitbox = Object.setPrototypeOf(s.hitbox, t.prototype), s.stateMachine = Object.setPrototypeOf(s.stateMachine, h.prototype), s.currentAnimation = r.rebuildObject(s.currentAnimation), s.bulletSpeed = Object.setPrototypeOf(s.bulletSpeed, i.prototype), Object.setPrototypeOf(s, p.prototype) } getObjectProperties(t) { let i = []; for (let s = 0; s < t.length; s++)i.push(); return i } setLevelOnStates(t) { } update(t) { this.stateMachine?.update(t), this.currentAnimation.update(t), this.hitbox.set(this.position.x + this.hitboxOffsets.position.x, this.position.y + this.hitboxOffsets.position.y, this.dimensions.x + this.hitboxOffsets.dimensions.x, this.dimensions.y + this.hitboxOffsets.dimensions.y) } render(t = {}) { let i = t.offset ?? { x: 0, y: 0 }, s = this.position.x + i.x, n = this.position.y + i.y; (t.spritesToRender ?? this.sprites)[null !== this.currentAnimation ? this.currentAnimation.getCurrentFrame() : 0].render(Math.floor(s), Math.floor(n)), o && this.hitbox.render(e) } didCollideWithEntity(t) { return this.hitbox.didCollide(t) } changeState(t, i) { this.stateMachine.change(t, i) } receiveDamage(t) { this.currentHealth -= t } getEntityCollisionDirection(t) { return n(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.dimensions.x, this.hitbox.dimensions.y, t.position.x, t.position.y, t.dimensions.x, t.dimensions.y) } onCollision(t, i) { let e = this.getEntityCollisionDirection(i); switch (e) { case s.Up: this.position.y++; break; case s.Down: this.position.y--; break; case s.Left: this.position.x++; break; case s.Right: this.position.x-- } } };