import Sprite from './src/common/sprite.js';
import Text from './src/common/text.js';
import Graphics from './src/common/graphics.js';
import StateTransition from './src/gui/stateTransition.js';
import { TweenMax, Power2, Expo, Bounce} from './libs/gsap/index.js';

class InitialGame {
  constructor () {
    this.init();
    this.loadAssets();
  }

  init () {
    const { pixelRatio, windowWidth, windowHeight} = wx.getSystemInfoSync();
    this.app = new PIXI.Application({
      transparent: !0,
      width: windowWidth,
      height: windowHeight,
      view: canvas,
      resolution: pixelRatio
    });

    // 适配屏幕尺寸
    this.GAME_WIDTH = windowWidth;
    this.GAME_HEIGHT = windowHeight;
    this.HALF_GAME_WIDTH = 0.5 * windowWidth;
    this.HALF_GAME_HEIGHT = 0.5 * windowHeight;
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

    // 构建游戏相关实例工厂
    this.add = {
      sprite (key) {
        return new Sprite(key);
      },
      text: new Text(this),
      graphics: new Graphics(),
      tween: TweenMax,
    };

    // 全局化滑动Ease
    this.ease = {
      Power2,
      Expo,
      Bounce
    }
  }

  loadAssets () {
    PIXI.loader.add('background', './graphics/shzBG.jpg')
      .add('cursor', './graphics/handcursor.png')
      .add('girl', './graphics/gril.png');
    PIXI.loader.load(this.createStage.bind(this));
  }

  // 场景构建
  createStage () {
    this.worldStage = this.app.stage;
    this.mainStage = new PIXI.Container();
    this.worldStage.addChild(this.mainStage);
    this.addBackground();
    this.addRoles();
    this.addStateTransition();
    this.addTexts();
    this.render();
  }

  // 添加转场效果
  addStateTransition() {
    this.stateTransition = new StateTransition(this);
    this.stateTransition.initFirstStage();
  }

  addBackground() {
    this.bg = this.add.sprite('background');
    this.bg.width = this.GAME_WIDTH;
    this.bg.height = this.GAME_HEIGHT;
    this.mainStage.addChild(this.bg);
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
    this.mainStage.addChild(this.roles);
  }

  addTexts () {
    this.talkGroup = new PIXI.Container();
    this.talkGroup.y = this.GAME_HEIGHT * 0.8;
    // 文本框背景
    const dialogTexture = this.add.graphics.drawRect(0x000000, 1, 0, 0, this.GAME_WIDTH, this.GAME_HEIGHT * 0.2).generateCanvasTexture();
    this.talkDialog = this.add.sprite(dialogTexture);
    this.cursor = this.add.sprite('cursor');
    this.cursor.scale.set(0.3);
    this.talkText = this.add.text.texts;
    this.talkText.x = this.GAME_WIDTH * 0.5;
    this.talkText.y = this.GAME_HEIGHT * 0.1;
    this.talkText.anchor.set(0.5);
    this.cursor.position.set(this.GAME_WIDTH * 0.8, this.talkText.y);
    this.cursor.anchor.set(0, 0.5);
    this.cursorWaiting();
    this.talkGroup.addChild(this.talkDialog, this.talkText, this.cursor);
    this.worldStage.addChild(this.talkGroup);

    this.add.text.setText('快醒醒断郎，你昨天晚上...', 'npc');
    this.talkDialog.on('pointerdown', () => {
      this.closeCursor();
      this.stateTransition.playing || this.stateTransition.firstStagePlay().then(() => {
        this.add.text.setText('额，我怎么了，下面好疼...');
      });
    });
  }

  cursorWaiting () {
    this.cursor_hidding = this.add.tween.to(this.cursor, 1, {
      ease: Power0.None,
      alpha: 0.5,
      repeat: 3,
      yoyo: !0
    });
    this.cursor_waiting = this.add.tween.to(this.cursor.scale, 0.1, {
      ease: Power2.Out,
      x: 0.425,
      y: 0.375,
      repeat: 3,
      yoyo: !0,
      onComplete: () => {
        this.cursor_waiting.delay(1.5);
        this.cursor_waiting.restart(true);
        this.cursor_hidding.restart();
      }
    });
  }

  closeCursor() {
    this.cursor_waiting.pause();
    this.cursor_hidding.pause();
    this.cursor.visible = !1;
    this.talkDialog.interactive = !1;
  }

  openCursor () {
    this.cursor_waiting.restart();
    this.cursor_hidding.restart();
    this.cursor.visible = !0;
    this.talkDialog.interactive = !0;
  }

  render () {
    this.app.renderer.render(this.worldStage);
  }
}

export default InitialGame;