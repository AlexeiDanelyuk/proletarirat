import i from "../../lib/Vector.js"; import o from "../services/Tile.js"; export default class s { constructor(o, s, t, n) { this.position = new i(o, s), this.dimensions = new i(t, n) } toJSON() { return { position: this.position.toJSON(), dimensions: this.dimensions.toJSON() } } };