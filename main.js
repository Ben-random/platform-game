import Phaser from "phaser";

let platforms;
let floor;
let cursors;
let player;
let space;
let gameOver = false
let gameWon = false
let red_platforms;
let deathSound;
let black_platforms;
let flag;
let winSound;

const game = new Phaser.Game({
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 1000 }
        },
    },
    scene: {
        preload() {
            //Game config code
            this.load.image('background', "./assets/background.jpg")
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
            cursors = this.input.keyboard.createCursorKeys();
            space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        },
        create() {
            this.add.image(100, 75, "background")
            deathSound = this.sound.add("die")
            winSound = this.sound.add('win')
            platforms = this.physics.add.staticGroup()
            floor = this.physics.add.staticGroup()
            flag = this.physics.add.staticGroup()
            red_platforms = this.physics.add.staticGroup()
            black_platforms = this.physics.add.staticGroup()
            player = this.physics.add.sprite(20, 20, "person");
            player.setBounce(0.2);
            player.setCollideWorldBounds(true);
            this.physics.add.collider(player, platforms);
            this.physics.add.collider(player, black_platforms);
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
            function createBordersAndFloor() {
                //left border
                platforms.create(0, 50, "block4").refreshBody()
                platforms.create(0, 100, "block4").refreshBody()
                platforms.create(0, 150, "block4").refreshBody()
                platforms.create(0, 200, "block4").refreshBody()
                platforms.create(0, 250, "block4").refreshBody()
                platforms.create(0, 300, "block4").refreshBody()
                platforms.create(0, 350, "block4").refreshBody()
                platforms.create(0, 400, "block4").refreshBody()
                platforms.create(0, 450, "block4").refreshBody()
                platforms.create(0, 500, "block4").refreshBody()
                platforms.create(0, 550, "block4").refreshBody()
                platforms.create(0, 600, "block4").refreshBody()
                //right border
                platforms.create(800, 50, "block4").refreshBody()
                platforms.create(800, 100, "block4").refreshBody()
                platforms.create(800, 150, "block4").refreshBody()
                platforms.create(800, 200, "block4").refreshBody()
                platforms.create(800, 250, "block4").refreshBody()
                platforms.create(800, 300, "block4").refreshBody()
                platforms.create(800, 350, "block4").refreshBody()
                platforms.create(800, 400, "block4").refreshBody()
                platforms.create(800, 450, "block4").refreshBody()
                platforms.create(800, 500, "block4").refreshBody()
                platforms.create(800, 550, "block4").refreshBody()
                platforms.create(800, 600, "block4").refreshBody()
                //floor
                floor.create(0, 600, "floor").refreshBody()
                floor.create(100, 600, "floor").refreshBody()
                floor.create(200, 600, "floor").refreshBody()
                floor.create(300, 600, "floor").refreshBody()
                floor.create(400, 600, "floor").refreshBody()
                floor.create(500, 600, "floor").refreshBody()
                floor.create(600, 600, "floor").refreshBody()
                floor.create(700, 600, "floor").refreshBody()
                floor.create(800, 600, "floor").refreshBody()
            }
            function generatePlatforms() {
                platforms.create(30, 100, "block1").setScale(0.5).refreshBody()
                platforms.create(765, 550, "block1").setScale(0.5).refreshBody()
                flag.create(765, 534, "flag").setScale(0.2).refreshBody()

                black_platforms.create(180, 400, "red_platform").setScale(0.5).refreshBody()
                black_platforms.create(140, 400, "block1").setScale(0.5).refreshBody()
                black_platforms.create(400, 275, "block1").setScale(0.5).refreshBody()
                black_platforms.create(150, 200, "red_platform").setScale(0.5).refreshBody()
                black_platforms.create(260, 200, "red_platform").setScale(0.5).refreshBodblack
                black_platforms.create(700, 490, "block1").setScale(0.5).refreshBody()
                black_platforms.create(600, 350, "red_platform").setScale(0.5).refreshBody()
                black_platforms.create(340, 400, "block1").setScale(0.5).refreshBody()
                black_platforms.create(490, 390, "red_platform").setScale(0.5).refreshBody()
                black_platforms.create(420, 390, "red_platform").setScale(0.5).refreshBody()
                black_platforms.create(140, 400, "block1").setScale(0.5).refreshBred
            }
            this.physics.add.collider(player, floor, (player, floor) => {
                gameOver = true
            })
            this.physics.add.collider(player, red_platforms, (player, red_platforms) => {
                gameOver = true
            })
            this.physics.add.collider(player, flag, (player, flag) => {
                gameWon = true
            })
            createBordersAndFloor()
            generatePlatforms()


        },
        update() {
            //code that runs for every frame
            if (gameOver && !deathSound.isPlaying) {
                gameOver = false
                deathSound.play()
                this.scene.restart()
            }
            if (gameWon && !winSound.isPlaying) {
                gameWon = false
                winSound.play()
                this.scene.restart()
            }
            if (cursors.right.isDown) {
                player.setVelocityX(160);
                player.anims.play("right", true);
            } else if (cursors.left.isDown) {
                player.setVelocityX(-160);
                player.anims.play("left", true);
            } else if (space.isDown && player.body.touching.down) {
                player.setVelocityY(-320)
            } else {
                player.setVelocityX(0);
                player.anims.stop()
            }
        }
    }
})




/*

let platforms;
let cursors;
let player;

const game = new Phaser.Game({
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 }
        },
    },
    scene: {
        preload() {
            //Game config code
            this.load.image('background', "./assets/background.jpg")
            this.load.image("block1", "./assets/pixil-frame-0 (1).png")
            this.load.image("block2", "./assets/pixil-frame-0 (2).png")
            this.load.image("block3", "./assets/pixil-frame-0 (3).png")
            this.load.image("block4", "./assets/pixil-frame-0 (4).png")
            this.load.spritesheet("person", "./assets/sprite.png", {
            frameWidth: 32,
            frameHeight: 32,
            });
            cursors = this.input.keyboard.createCursorKeys();
        },
        create() {
            //code that runs on screen
            this.add.image(100, 75, "background")
            platforms = this.physics.add.staticGroup()
            platforms.create(0, 395, "block1").setScale(0.5).refreshBody()
            platforms.create(35, 395, "block1").setScale(0.5).refreshBody()
            platforms.create(70, 395, "block1").setScale(0.5).refreshBody()
            platforms.create(105, 395, "block1").setScale(0.5).refreshBody()
            platforms.create(140, 395, "block1").setScale(0.5).refreshBody()
            platforms.create(150, 380, "block2").setScale(0.5).refreshBody()
            platforms.create(215, 380, "block2").setScale(0.5).refreshBody()
            platforms.create(225, 395, "block1").setScale(0.5).refreshBody()
            platforms.create(245, 395, "block1").setScale(0.5).refreshBody()
            platforms.create(270, 395, "block1").setScale(0.5).refreshBody()
            platforms.create(305, 395, "block1").setScale(0.5).refreshBody()
            platforms.create(340, 395, "block1").setScale(0.5).refreshBody()
            platforms.create(227, 360, "block3").setScale(0.5).refreshBody()
            platforms.create(140, 360, "block3").setScale(0.5).refreshBody()
            platforms.create(100, 360, "block3").setScale(0.5).refreshBody()
            platforms.create(268, 360, "block3").setScale(0.5).refreshBody()
            platforms.create(88, 340, "block2").setScale(0.5).refreshBody()
            platforms.create(279, 340, "block2").setScale(0.5).refreshBody()
            platforms.create(88, 309, "block2").setScale(0.5).refreshBody()
            platforms.create(279, 309, "block2").setScale(0.5).refreshBody()
            platforms.create(88, 290, "block2").setScale(0.5).refreshBody()
            platforms.create(279, 290, "block2").setScale(0.5).refreshBody()
            platforms.create(88, 270, "block2").setScale(0.5).refreshBody()
            platforms.create(88, 250, "block2").setScale(0.5).refreshBody()
            platforms.create(88, 230, "block2").setScale(0.5).refreshBody()
            platforms.create(100, 210, "block3").setScale(0.5).refreshBody()
            platforms.create(130, 210, "block3").setScale(0.5).refreshBody()
            platforms.create(160, 210, "block3").setScale(0.5).refreshBody()
            platforms.create(190, 210, "block3").setScale(0.5).refreshBody()
            platforms.create(220, 210, "block3").setScale(0.5).refreshBody()
            platforms.create(250, 210, "block3").setScale(0.5).refreshBody()
            platforms.create(280, 210, "block3").setScale(0.5).refreshBody()
            platforms.create(310, 210, "block3").setScale(0.5).refreshBody()
            platforms.create(340, 210, "block3").setScale(0.5).refreshBody()
            platforms.create(291, 270, "block3").setScale(0.5).refreshBody()
            platforms.create(370, 210, "block3").setScale(0.5).refreshBody()
            platforms.create(321, 270, "block3").setScale(0.5).refreshBody()
            platforms.create(420, 210, "block3").setScale(0.5).refreshBody()
            platforms.create(351, 270, "block3").setScale(0.5).refreshBody()
            platforms.create(400, 210, "block3").setScale(0.5).refreshBody()
            platforms.create(361, 290, "block2").setScale(0.5).refreshBody()
            platforms.create(430, 230, "block2").setScale(0.5).refreshBody()
            platforms.create(361, 310, "block2").setScale(0.5).refreshBody()
            platforms.create(430, 250, "block2").setScale(0.5).refreshBody()
            platforms.create(430, 280, "block2").setScale(0.5).refreshBody()
            platforms.create(361, 340, "block2").setScale(0.5).refreshBody()
            platforms.create(361, 370, "block2").setScale(0.5).refreshBody()
            platforms.create(430, 310, "block2").setScale(0.5).refreshBody()

            platforms.create(360, 406, "block4").setScale(0.5).refreshBody()
            platforms.create(360, 432, "block4").setScale(0.5).refreshBody()
            platforms.create(360, 456, "block4").setScale(0.5).refreshBody()
            platforms.create(360, 480, "block4").setScale(0.5).refreshBody()
            platforms.create(360, 504, "block4").setScale(0.5).refreshBody()
            platforms.create(360, 528, "block4").setScale(0.5).refreshBody()
            platforms.create(360, 552, "block4").setScale(0.5).refreshBody()
            platforms.create(360, 576, "block4").setScale(0.5).refreshBody()
            platforms.create(360, 600, "block4").setScale(0.5).refreshBody()

            platforms.create(360, 376, "block3").setScale(0.5).refreshBody()
            platforms.create(442, 330, "block3").setScale(0.5).refreshBody()

            platforms.create(380, 380, "block2").setScale(0.5).refreshBody()
            platforms.create(380, 400, "block2").setScale(0.5).refreshBody()
            platforms.create(380, 420, "block2").setScale(0.5).refreshBody()
            platforms.create(380, 440, "block2").setScale(0.5).refreshBody()

            platforms.create(400, 448, "block3").setScale(0.5).refreshBody()
            platforms.create(430, 448, "block3").setScale(0.5).refreshBody()
            platforms.create(450, 448, "block3").setScale(0.5).refreshBody()
            platforms.create(480, 448, "block3").setScale(0.5).refreshBody()
            platforms.create(510, 448, "block3").setScale(0.5).refreshBody()
            platforms.create(540, 448, "block3").setScale(0.5).refreshBody()

            platforms.create(560, 440, "block2").setScale(0.5).refreshBody()
            platforms.create(560, 410, "block2").setScale(0.5).refreshBody()
            platforms.create(560, 380, "block2").setScale(0.5).refreshBody()
            platforms.create(560, 350, "block2").setScale(0.5).refreshBody()
            platforms.create(560, 320, "block2").setScale(0.5).refreshBody()
            platforms.create(560, 290, "block2").setScale(0.5).refreshBody()
            platforms.create(470, 325, "block2").setScale(0.5).refreshBody()
            platforms.create(470, 295, "block2").setScale(0.5).refreshBody()
            platforms.create(470, 265, "block2").setScale(0.5).refreshBody()
            platforms.create(560, 260, "block2").setScale(0.5).refreshBody()

            player = this.physics.add.sprite(0, 20, "person");
            player.setBounce(0.1);
            player.setCollideWorldBounds(true);
            this.physics.add.collider(player, platforms);

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
            });
            this.anims.create({
                key: "up",
                frames: this.anims.generateFrameNumbers("person", {
                    start: 8,
                    end: 15,
                }),
                frameRate: 10,
                repeat: -1,
            })
            this.anims.create({
                key: "down",
                frames: this.anims.generateFrameNumbers("person", {
                start: 0,
                end: 7
                }),
                frameRate: 10,
                repeat: -1,
            });
        },
        update() {
            //code that runs for every frame
            if (cursors.right.isDown) {
                player.setVelocityX(160);
                player.anims.play("right", true);
            } else if (cursors.left.isDown) {
                player.setVelocityX(-160);
                player.anims.play("left", true);
            } else if (cursors.up.isDown) {
                player.setVelocityY(-160);
                player.anims.play("up", true)
            } else if (cursors.down.isDown) {
                player.setVelocityY(160);
                player.anims.play("down", true)
            } else {
                player.setVelocityX(0);
                player.setVelocityY(0)
                player.anims.stop()
            }
        }
    },
})
*/
