import Phaser from "phaser";

//this.scene.start("Game1")

export default class Game1 extends Phaser.Scene{
    constructor() {
        super("Game1")
        this.gameOver = false;
        this.platforms;
        this.floor;
        this.cursors;
        this.player;
        this.space;
        this.gameWon = false
        this.red_platforms;
        this.deathSound;
        this.black_platforms;
        this.flag;
        this.winSound;
    }
    preload() {
        //Game config code
        this.load.image('background', "./assets/backdrop.png")
        this.load.image("block1", "./assets/pixil-frame-0 (1).png")
        this.load.image("block2", "./assets/pixil-frame-0 (2).png")
        this.load.image("block3", "./assets/pixil-frame-0 (3).png")
        this.load.image("block4", "./assets/pixil-frame-0 (4).png")
        this.load.image("floor", './assets/floor.png')
        this.load.image('flag', "./assets/flag.jpg")
        this.load.audio("die", './assets/mixkit-cartoon-whistle-game-over-606.wav')
        this.load.audio("win", "./assets/mixkit-arcade-score-interface-217.wav")
        this.load.image('red_platform', "./assets/red_platform.png")
        this.load.spritesheet("person", "./assets/sprite.png", {
        frameWidth: 32,
        frameHeight: 32,
        });
        this.cursors = this.input.keyboard.createCursorKeys();
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    }
    create() {
        this.add.image(100, 75, "background").setScale(2)
        this.deathSound = this.sound.add("die")
        this.winSound = this.sound.add('win')
        this.platforms = this.physics.add.staticGroup()
        this.floor = this.physics.add.staticGroup()
        this.flag = this.physics.add.staticGroup()
        this.red_platforms = this.physics.add.staticGroup()
        this.black_platforms = this.physics.add.staticGroup()
        this.player = this.physics.add.sprite(20, 20, "person");
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.black_platforms);
        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("person", { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1,
        });
        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("person", {
                start: 8,
                end: 15,
            }),
            frameRate: 10,
            repeat: -1,
        })
    function createBordersAndFloor(scene) {
        //left and righ border border
        let k = 0
        let y = 0
        for (let j = 0; j < 13; j++) {
            k += 50
            y += 50
            scene.platforms.create(0, k, "block4").refreshBody()
            scene.platforms.create(800, y, "block4").refreshBody()
        }
        //floor
        for (let i = 0; i < 9; i ++) {
            scene.floor.create((i * 100), 600, "floor").refreshBody()
        }
    }
    function generatePlatforms(scene) {
        console.log("generate")
        scene.platforms.create(30, 100, "block1").setScale(0.5).refreshBody()
        scene.platforms.create(765, 550, "block1").setScale(0.5).refreshBody()
        scene.flag.create(765, 534, "flag").setScale(0.2).refreshBody()

        scene.red_platforms.create(180, 400, "red_platform").setScale(0.5).refreshBody()
        scene.black_platforms.create(140, 400, "block1").setScale(0.5).refreshBody()
        scene.black_platforms.create(400, 275, "block1").setScale(0.5).refreshBody()
        scene.black_platforms.create(150, 200, "red_platform").setScale(0.5).refreshBody()
        scene.black_platforms.create(260, 200, "red_platform").setScale(0.5).refreshBody()
        scene.black_platforms.create(700, 490, "block1").setScale(0.5).refreshBody()
        scene.black_platforms.create(600, 350, "red_platform").setScale(0.5).refreshBody()
        scene.red_platforms.create(340, 400, "block1").setScale(0.5).refreshBody()
        scene.black_platforms.create(490, 390, "red_platform").setScale(0.5).refreshBody()
        scene.red_platforms.create(420, 390, "red_platform").setScale(0.5).refreshBody()
        scene.black_platforms.create(140, 400, "block1").setScale(0.5).refreshBody()
    }
    this.physics.add.collider(this.player, this.floor, (player, floor) => {
        this.gameOver = true
    })
    this.physics.add.collider(this.player, this.red_platforms, (player, red_platforms) => {
        this.gameOver = true
    })
    this.physics.add.collider(this.player, this.flag, (player, flag) => {
        this.gameWon = true
    })
    createBordersAndFloor(this)
    generatePlatforms(this)
}
    update() {
        //code that runs for every frame
        if (this.gameOver && !this.deathSound.isPlaying) {
            this.gameOver = false
            this.deathSound.play()
            this.scene.start('GameOver')
        }
        if (this.gameWon && !this.winSound.isPlaying) {
            this.gameWon = false
            this.winSound.play()
            this.scene.start("Game2")
        }
        if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play("right", true);
        } else if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play("left", true);
        } else if (this.space.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-320)
        } else {
            this.player.setVelocityX(0);
            this.player.anims.stop()
        }
    }
}
