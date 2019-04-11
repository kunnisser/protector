import Sprite from './src/common/sprite.js';
class InitialGame {
  constructor () {
    this.init();
    this.loadAssets();
  }

  init () {
    const dpr = window.devicePixelRatio;
    const { pixelRatio, windowWidth, windowHeight} = wx.getSystemInfoSync();
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
    this.HALF_GAME_WIDTH = 0.5 * windowWidth;
    this.HALF_GAME_HEIGHT = 0.5 * windowHeight;
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

    // 适配点击坐标
    this.app.renderer.plugins.interaction.mapPositionToPoint = (point, x, y) => {
      point.x = x * pixelRatio
      point.y = y * pixelRatio
    }

    // 构建游戏相关实例工厂
    this.add = {
      sprite (key) {
        return new Sprite(key);
      }
    };
  }

  loadAssets () {
    PIXI.loader.add('background', './graphics/shzBG.jpg')
      .add('girl', './graphics/gril.png');
    PIXI.loader.load(this.createStage.bind(this));
  }

  createStage () {
    this.worldStage = this.app.stage;
    this.addBackground();
    this.addRoles();
    this.render();
  }

  addBackground() {
    this.bg = this.add.sprite('background');
    this.bg.width = this.GAME_WIDTH;
    this.bg.height = this.GAME_HEIGHT;
    this.worldStage.addChild(this.bg);
  }

  addRoles () {
    this.roles = new PIXI.Container();
    const girl = this.add.sprite('girl');
    this.roles.addChild(girl);
    this.roles.x = this.HALF_GAME_WIDTH;
    this.roles.y = 0.2 * this.GAME_HEIGHT;
    girl.height = 0.6 * this.GAME_HEIGHT;
    girl.width = girl.height * 0.34;
    girl.anchor.set(0.5, 0);
    this.worldStage.addChild(this.roles);
  }

  render () {
    this.app.renderer.render(this.worldStage);
  }
}

export default InitialGame;