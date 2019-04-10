import Sprite from './src/common/sprite.js';
class InitialGame {
  constructor () {
    this.init();
    this.loadAssets();
  }

  init () {
    const dpr = window.devicePixelRatio;
    const {pixelRatio, windowWidth, windowHeight} = wx.getSystemInfoSync();
    this.app = new PIXI.Application({
      transparent: !0,
      width: windowWidth,
      height: windowHeight,
      view: canvas,
      resolution: dpr
    });

    // 适配屏幕尺寸
    this.GAME_WIDTH = windowWidth;
    this.GAME_HEIGHT = windowHeight;
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

    // 构建游戏相关实例工厂
    this.add = {
      sprite (key) {
        return new Sprite(key);
      }
    };
  }

  loadAssets () {
    PIXI.loader.add('background', './graphics/shzBG.jpg');
    PIXI.loader.load(this.createStage.bind(this));
  }

  createStage () {
    this.worldStage = this.app.stage;
    this.addBackground();
    this.render();
  }

  addBackground() {
    this.bg = this.add.sprite('background');
    this.bg.width = this.GAME_WIDTH;
    this.bg.height = this.GAME_HEIGHT;
    this.worldStage.addChild(this.bg);
  }

  render () {
    this.app.renderer.render(this.worldStage);
  }
}

export default InitialGame;