class Graphics {
  drawRect () {
    const graphics = new PIXI.Graphics();
    const [color, alpha, ...pos] = [...arguments];
    graphics.beginFill(color || 0x000000, alpha || 1);
    graphics.drawRect(...pos);
    graphics.endFill();
    return graphics;
  }

  drawEllipse () {
    const graphics = new PIXI.Graphics();
    const [color, alpha, ...pos] = [...arguments];
    graphics.beginFill(color || 0x000000, alpha || 1);
    graphics.drawEllipse(...pos);
    graphics.endFill();
    return graphics;
  }
}

export default Graphics;