import Phaser from "phaser";
import Game1 from "./game1";
import Game2 from "./game2";
import Game3 from "./game3";
import GameOver from "./gameOver";

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 1000 }
        },
    },
    scene: [Game1, Game2, Game3, GameOver]
}

const game = new Phaser.Game(config)
