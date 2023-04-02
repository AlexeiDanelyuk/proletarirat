import i from "./Panel.js"; import t from "../services/Tile.js"; import n from "../enums/Colour.js"; export default class o extends i { static MIN_WIDTH = 0; static MAX_WIDTH = 10; static PADDING = 0; static BORDER_WIDTH = 3; constructor(t, e, s, r, l, a) { super(t, e, l, a, { panelColour: r, borderColour: n.Black, padding: o.PADDING, borderWidth: o.BORDER_WIDTH }), this.fullPanelWidth = l, this.fullXDimension = l, this.backgroundPanel = new i(t, e, this.fullPanelWidth, a, { borderColour: n.Black, padding: o.PADDING, borderWidth: o.BORDER_WIDTH }), this.entity = s } toJSON() { let i = super.toJSON(); return i.fullPanelWidth = this.fullPanelWidth, i.fullXDimension = this.fullXDimension, i.backgroundPanel = this.backgroundPanel.toJSON(), i } setWidthAndColour() { } changeDimension() { } render() { this.backgroundPanel.render(), this.isVisible = this.dimensions.x > 0, super.render() } changePosition(i) { this.position.x = i.x, this.position.y = i.y, this.backgroundPanel.position.x = i.x, this.backgroundPanel.position.y = i.y } };