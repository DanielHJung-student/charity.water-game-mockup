class ParallaxObject {
    constructor(image, speed, tileMirrorOnX = true, tileNormallyOnX = true, ZIndex=1/speed) {
        this.image = image;
        this.speed = speed;
        this.tileMirrorOnX = tileMirrorOnX;
        this.tileNormallyOnX = tileNormallyOnX;
        this.ZIndex = ZIndex;
    }
}