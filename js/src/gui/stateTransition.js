class StateTransition{
  constructor (game, key) {
    this.game = game;
    this.mask = null;
  }

  initFirstStage () {
    const maskTexture = this.game.add.graphics.drawEllipse(0xffffff, 1, 0, 0, this.game.HALF_GAME_WIDTH, 10);
    const mask = this.game.add.sprite(maskTexture.generateCanvasTexture());
    this.game.worldStage.addChild(mask);
    mask.position.set(this.game.HALF_GAME_WIDTH, this.game.HALF_GAME_HEIGHT);
    mask.anchor.set(0.5);
    mask.height = 0;
    this.game.mainStage.mask = mask;
    this.mask = mask;
    this.playing = !1;
  }

  firstStagePlay () {
    if (!this.game.mainStage.mask || this.playing) {
      return;
    }
    this.mask.height = 10;
    this.playing = !0;
    return new Promise((resolve) => {
      this.game.add.tween.to(this.mask, 0.8, {
        ease: this.game.ease.Expo,
        height: 150,
        repeat: 3,
        yoyo: !0,
        onComplete: () => {
          this.mask.height = 0;
          this.game.mainStage.mask = null;
          resolve();
        }
      });
    });
  }
}
export default StateTransition;