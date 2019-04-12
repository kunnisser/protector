class Text {
  constructor (game) {
    this.game = game;
    this.style = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 20,
      breakWords: !0,
      fill: '#ffffff',
      wordWrap: !0,
      wordWrapWidth: game.GAME_WIDTH * 0.8
    });
    this.texts = new PIXI.Text('', this.style);
  }

  setText (text, type) {
    this.game.openCursor();
    this.texts.text = text;
    this.style.fill = type === 'npc' ? '#5585fe' : '#ffffff';
    this.texts.style = this.style;
  }
}
export default Text;