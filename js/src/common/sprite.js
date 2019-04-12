class Sprite {
  constructor (key) {
    const _texture = typeof key === 'string' ? PIXI.loader.resources[key].texture : key;
    return new PIXI.Sprite(_texture);
  }
}
export default Sprite;