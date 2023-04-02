import e from "../entities/Player.js"; import { openDB as t, deleteDB as a } from "https://unpkg.com/idb?module"; import r from "../entities/SuitPerson.js"; import s from "../objects/Bread.js"; import o from "../objects/Bullet.js"; import i from "../objects/Cheese.js"; import c from "../objects/Table.js"; import d from "../objects/Level.js"; (() => { "use strict"; if (!("indexedDB" in window)) { console.warn("IndexedDB not supported"); return } })(); export default class l { static dbName = "proletariratDb"; static storeName = "proletariratStore"; static stores = { entities: "entities", objects: "objects", renderQueue: "renderQueue", otherLevelProps: "otherLevelProps", tables: "tables", healthdrops: "healthdrops" }; static database; static loadData; static async loadGame() { await l.openDatabase(); let e = {}; return Object.entries(l.stores).forEach(async ([t, a]) => { e[a] = await l.getDataFromIndexedDatabase(a); for (let r = 0; r < e[a].length; r++)"otherLevelProps" != a ? (e[a][r] = l.buildObject(e[a][r].className, e[a][r]), "Player" === e[a][r].className && (e.player = e[a][r])) : Object.entries(e[a][r]).forEach(([t, a]) => { e[t] = a }) }), e = Object.setPrototypeOf(e, d.prototype), l.loadData = e, e } static buildObject(t, a) { switch (t) { case "Player": return e.rebuildObject(a); case "SuitPerson": return r.rebuildObject(a); case "Bread": return s.rebuildObject(a); case "Bullet": return o.rebuildObject(a); case "Cheese": return i.rebuildObject(a); case "Table": return c.rebuildObject(a) } } static async saveGame(e) { await l.openDatabase(), await Object.entries(l.stores).forEach(async ([e, t]) => { await this.wipeLastSave(t) }), await Object.entries(l.stores).forEach(async ([t, a]) => { "otherLevelProps" != a ? await l.addArrayToStore(a, e.level[t]) : (await l.addDataToIndexedDatabase(a, { isGameOver: e.level.isGameOver }, 0), await l.addDataToIndexedDatabase(a, { isVictory: e.level.isVictory }, 1)) }) } static async openDatabase() { let e = l.dbName, a = l.storeName; l.database = await t(e, 1, { upgrade(e, t, r, s) { Object.entries(l.stores).forEach(async ([t, r]) => { l.database = e, e.objectStoreNames.contains(a) && l.wipeLastSave(r), await e.createObjectStore(r) }) } }) } static async wipeLastSave(e) { let t = await l.getDataFromIndexedDatabase(e); for (let a = 0; a < t.length; a++) { let r = await l.database.transaction(e, "readwrite"), s = await r.objectStore(e); await s.delete(a), await r.complete } } static async addArrayToStore(e, t) { for (let a = 0; a < t.length; a++)await l.addDataToIndexedDatabase(e, t[a].toJSON(), a) } static async addDataToIndexedDatabase(e, t, a) { l.dbName; let r = e, s = l.database.transaction(r, "readwrite"), o = await s.objectStore(r); await o.put(t, a), await s.done } static async getDataFromIndexedDatabase(e) { let t = await l.database.transaction(e).objectStore(e).getAll(); return t } static saveLevel(e) { localStorage.setItem("levelNumber", JSON.stringify(e)) } static loadLevel() { return JSON.parse(localStorage.getItem("levelNumber")) ?? 1 } };