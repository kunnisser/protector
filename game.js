import './js/libs/weapp-adapter'
import './js/libs/symbol'
import * as PIXI from './js/libs/pixi.min.js';
import InitialGame from './js/main.js';
window.PIXI = PIXI;
window.game = new InitialGame();
