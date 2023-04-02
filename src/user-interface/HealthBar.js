import t from "./ProgressBar.js"; import e from "../enums/Colour.js"; import { timer as r } from "../globals.js"; import s from "../../lib/Vector.js"; import o from "./Panel.js"; export default class i extends t { static RED_THRESHOLD = .34; static YELLOW_THRESHOLD = .67; constructor(t, r, s, o, i) { super(t, r, s, e.ProgressBarGreen, o, i), this.previousHealth = this.entity.currentHealth, this.setWidthAndColour(), this.changeDimension(this.entity.currentHealth / this.entity.totalHealth) } toJSON() { let t = super.toJSON(); return t.previousHealth = this.previousHealth, t.className = this.constructor.name, t } static buildHealthBar(t, e) { return t.position = Object.setPrototypeOf(t.position, s.prototype), t.dimensions = Object.setPrototypeOf(t.dimensions, s.prototype), t.backgroundPanel = Object.setPrototypeOf(t.backgroundPanel, o.prototype), t.entity = e, Object.setPrototypeOf(t, i.prototype) } setWidthAndColour() { let t = this.entity.currentHealth / this.entity.totalHealth; this.entity.currentHealth != this.previousHealth && this.changeDimension(t) } changeDimension(t) { let s = this.fullXDimension * t; r.tween(this.dimensions, ["x"], [s], .2, () => { this.panelColour = t <= i.RED_THRESHOLD ? e.ProgressBarRed : t <= i.YELLOW_THRESHOLD ? e.ProgressBarYellow : e.ProgressBarGreen }), this.previousHealth = this.entity.currentHealth } render() { this.setWidthAndColour(), super.render() } };