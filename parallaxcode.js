class ParallaxObject {
    constructor(image, speed, tileMirrorOnX = true, tileNormallyOnX = false, offset={x:0,y:0}, scaleToWindow=false, ZIndex=1/speed) {
        this.image = image;
        this.speed = speed;
        this.tileMirrorOnX = tileMirrorOnX;
        this.tileNormallyOnX = tileNormallyOnX;
        this.ZIndex = ZIndex;
        this.offset = offset;
    }
}