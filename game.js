import './js/libs/adapter/index.js';
import './js/libs/symbol'
import * as PIXI from './js/libs/pixi.min.js';
import InitialGame from './js/main.js';
window.PIXI = PIXI;
window.game = new InitialGame();
