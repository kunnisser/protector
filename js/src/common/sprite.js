class Sprite {
  constructor (key) {
    const _texture = PIXI.loader.resources[key].texture;
    return new PIXI.Sprite(_texture);
  }
}
export default Sprite;