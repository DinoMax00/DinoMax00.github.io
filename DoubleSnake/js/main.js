/**
 * 游戏入口程序
 * @author dino
 */
import { Engine } from "./engine.js";
let snakeGame = new Engine();
$("#mode1").click(() => {
    swal("Mode Changed", "MinMax Search", "success");
    snakeGame.resetGameMode("min-max");
    snakeGame.reStart();
});
$("#mode2").click(() => {
    swal("Mode Changed", "Alpha-Beta Pruning", "success");
    snakeGame.resetGameMode("alpha-beta");
    snakeGame.reStart();
});
$("#mode3").click(() => {
    swal("Mode Changed", "monte_carlo_tree_search", "success");
    snakeGame.resetGameMode("mcts");
    snakeGame.reStart();
});
snakeGame.run();
