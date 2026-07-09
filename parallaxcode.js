class ParallaxObject {
    constructor(image, speed, mirrorOnX = true, tileOnX = true) {
        this.image = image;
        this.speed = speed;
        this.mirrorOnX = mirrorOnX;
        this.tileOnX = tileOnX;
    }
}