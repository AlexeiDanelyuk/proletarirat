import t from "./GameObject.js"; import i from "../../lib/Sprite.js"; import e from "../enums/ImageName.js"; import { images as s, sounds as o } from "../globals.js"; import r from "../../lib/Vector.js"; import n from "../entities/Player.js"; import m from "../../lib/Hitbox.js"; import a from "../../lib/Timer.js"; import p from "../enums/Direction.js"; import h from "../../lib/Animation.js"; import l from "./Level.js"; import f from "../entities/Enemy.js"; export default class b extends t { static WIDTH = 64; static HEIGHT = 64; constructor(t, o, r) { super(t, o), this.isCollidable = !0, this.isSolid = !0, this.sprites = i.generateSpritesFromSpriteSheet(s.get(e.Table), b.WIDTH, b.HEIGHT), this.level = r, this.animation = new h([0], 1), this.currentFrame = 0, this.hitboxOffsets = new m(0, 0, 0, 0), this.hitbox = new m(this.position.x + this.hitboxOffsets.position.x, this.position.y + this.hitboxOffsets.position.y, this.dimensions.x + this.hitboxOffsets.dimensions.x, this.dimensions.y + this.hitboxOffsets.dimensions.y) } toJSON() { let t = super.toJSON(); return t.animation = this.animation.toJSON(), t.className = this.constructor.name, t } static rebuildObject(o) { let r = t.rebuildObject(o); return r.animation = h.rebuildObject(r.animation), r.sprites = i.generateSpritesFromSpriteSheet(s.get(e.Table), b.WIDTH, b.HEIGHT), Object.setPrototypeOf(r, b.prototype) } onCollision(t) { t instanceof f && super.onCollision(t) } update(t) { this.animation.update(t), this.currentFrame = this.animation.getCurrentFrame() } render() { super.render() } };