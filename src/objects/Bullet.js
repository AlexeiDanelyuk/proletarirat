import t from "./GameObject.js"; import i from "../../lib/Animation.js"; import s from "../../lib/Hitbox.js"; import e from "../../lib/Vector.js"; import o from "../entities/Enemy.js"; import n from "../entities/Player.js"; import { CANVAS_HEIGHT as a, CANVAS_WIDTH as r } from "../globals.js"; import h from "../entities/SuitPerson.js"; export default class p extends t { static WIDTH = 16; static HEIGHT = 16; static SPIT_WIDTH = 8; static SPIT_HEIGHT = 8; static MAX_BULLET_TRAVEL = 5500; static DAMAGE = 2; constructor(t, o) { let a = t instanceof n, r; super(new e(p.WIDTH, p.HEIGHT), new e(t.position.x + t.hitboxOffsets.position.x + p.WIDTH / 2, t.position.y + t.hitboxOffsets.position.y), r = a ? new s(p.WIDTH / 6, p.HEIGHT / 4, -(p.WIDTH / 3), -p.HEIGHT / 2) : new s(0, 0, -p.SPIT_WIDTH, -p.SPIT_HEIGHT)), this.owner = t, this.sprites = t.bulletSprites, this.speed = t.bulletSpeed, this.belongsToPlayer = a, this.belongsToPlayer || (this.position.x += 8, this.position.y += 10), this.slope = p.getDxAndDy(this.position, o), this.trajectory = o, this.animation = new i(this.getSpriteAnimationFrames(), .1), this.isCollidable = !0, this.maxDistance = 0, this.maxDistanceSet = !1, this.distanceTraveled = 0, this.length_x = t.position.x - o.x, this.length_y = t.position.y - o.y, this.maxPosition = new e(this.length_x, this.length_y) } toJSON() { let t = super.toJSON(); return t.owner = this.owner.toJSON(), t.slope = this.slope.toJSON(), t.trajectory = { x: this.trajectory.x, y: this.trajectory.y }, t.distanceTraveled = this.distanceTraveled, t.maxDistance = this.maxDistance, t.maxDistanceSet = this.maxDistanceSet, t.animation = this.animation.toJSON(), t.belongsToPlayer = this.belongsToPlayer, t.className = this.constructor.name, t.maxPosition = this.maxPosition.toJSON(), t } static rebuildObject(s) { let o = t.rebuildObject(s); return o.owner = "Player" === o.owner.className ? n.rebuildObject(o.owner) : h.rebuildObject(o.owner), o.slope = Object.setPrototypeOf(o.slope, e.prototype), o.maxPosition = Object.setPrototypeOf(o.maxPosition, e.prototype), o.animation = i.rebuildObject(o.animation), o.sprites = o.owner.bulletSprites, o.speed = o.owner.bulletSpeed, Object.setPrototypeOf(o, p.prototype) } getSpriteAnimationFrames() { let t = []; for (let i = 0; i < this.sprites.length - 1; i++)t.push(i); return 1 === this.sprites.length && t.push(0), t } static getDxAndDy(t, i) { let s = i.y - t.y, o = i.x - t.x, n = Math.sqrt(o * o + s * s); return new e(o / n, s / n) } update(t) { this.maxDistanceSet || (this.maxDistanceSet = !0, this.maxDistance = Math.round(p.MAX_BULLET_TRAVEL * t)), this.distanceTraveled += 100 * t, (this.position === this.trajectory || Math.round(this.distanceTraveled) >= this.maxDistance - 2 && Math.round(this.distanceTraveled) <= this.maxDistance + 2 && this.belongsToPlayer || this.position.x <= 32 || this.position.x >= r - 45 || this.position.y <= 64 || this.position.y >= a - 45) && (this.cleanUp = !0), this.animation.update(t), this.currentFrame = this.animation.getCurrentFrame(), this.position.x += this.speed * t * this.slope.x, this.position.y += this.speed * t * this.slope.y, this.hitbox.set(this.position.x + this.hitboxOffsets.position.x, this.position.y + this.hitboxOffsets.position.y, this.dimensions.x + this.hitboxOffsets.dimensions.x, this.dimensions.y + this.hitboxOffsets.dimensions.y) } onCollision(t) { t !== this.owner && (this.owner instanceof n && t instanceof o && (t.receiveDamage(p.DAMAGE), this.cleanUp = !0), this.owner instanceof o && t instanceof n && (t.receiveDamage(p.DAMAGE), this.cleanUp = !0)) } };