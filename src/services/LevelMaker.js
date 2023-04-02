import e from "../objects/Level.js"; import { CANVAS_HEIGHT as t, CANVAS_WIDTH as n, images as r } from "../globals.js"; import s from "../../lib/State.js"; import i from "../entities/Player.js"; import o from "../services/Map.js"; import $ from "../enums/ImageName.js"; import l from "../enums/SoundName.js"; import a from "../enums/EnemyType.js"; import m from "../entities/EnemyFactory.js"; import p from "../../lib/Sprite.js"; import w from "../../lib/Animation.js"; import u from "../services/SaveManager.js"; import c from "../enums/GameStateName.js"; import S from "../../lib/Vector.js"; export default class f { static START_X = 1500; static FINAL_LEVEL = 5; static LEVEL_MUSIC = [l.SoupedUp, l.GrannyGetYourGun, l.IsItSoupYet, l.RatDash, l.ThePaperChase]; static createLevel(e, t = 1) { switch (t) { case 1: return f.levelOne(e); case 2: return f.levelTwo(e); case 3: return f.levelThree(e); case 4: return f.levelFour(e); case 5: return f.levelFive(e) } } static levelOne(t) { let n = [], r = [new S(223, 250)]; for (let s = 0; s < r.length; s++)n.push(m.createInstance(a.SuitPerson, f.getEnemySprites(), t, r[s])); let i = [new S(80, 120), new S(80, 220), new S(340, 120), new S(340, 220)]; return t.position.x = 223, t.position.y = 70, new e(t, n, i) } static levelTwo(t) { let n = [], r = [new S(356, 240), new S(100, 240)]; for (let s = 0; s < r.length; s++)n.push(m.createInstance(a.SuitPerson, f.getEnemySprites(), t, r[s])); let i = [new S(80, 120), new S(340, 120), new S(210, 245)]; return t.position.x = 223, t.position.y = 70, new e(t, n, i) } static levelThree(t) { let n = [], r = [new S(223, 240), new S(356, 240), new S(100, 240)]; for (let s = 0; s < r.length; s++)n.push(m.createInstance(a.SuitPerson, f.getEnemySprites(), t, r[s])); let i = [new S(80, 180), new S(340, 180),]; return t.position.x = 223, t.position.y = 70, new e(t, n, i) } static levelFour(t) { let n = [], r = [new S(356, 240), new S(100, 240), new S(356, 140), new S(100, 140), new S(223, 240)]; for (let s = 0; s < r.length; s++)n.push(m.createInstance(a.SuitPerson, f.getEnemySprites(), t, r[s])); let i = [new S(80, 120), new S(80, 220), new S(340, 120), new S(340, 220)]; return t.position.x = 223, t.position.y = 70, new e(t, n, i) } static levelFive(t) { let n = [], r = [new S(223, 250)]; for (let s = 0; s < r.length; s++)n.push(m.createInstance(a.SuitPerson, f.getEnemySprites(), t, r[s])); n[0].rateOfFire = .5, n[0].totalHealth = 200, n[0].currentHealth = 200; let i = [new S(80, 120), new S(80, 220), new S(340, 120), new S(340, 220)]; return t.position.x = 223, t.position.y = 70, new e(t, n, i) } static getEnemySprites() { return this.enemySprites = p.generateSpritesFromSpriteSheet(r.get($.SuitPerson), 32, 64) } };