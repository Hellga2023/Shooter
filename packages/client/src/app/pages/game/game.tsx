import React, { FC, useEffect, useRef, useState, SyntheticEvent } from 'react';
import style from './game.module.scss';
import Button from '@/app/components/common/button/button';
import params from './gameEngine/parameters/gameParameters';
import GameEngine, { TDirection } from './gameEngine/gameEngine';

const Game: FC = () => {
    const ref = useRef<HTMLCanvasElement | null>(null);

    const [paused, setIsPaused] = useState(false);

    const startGame = () => {
        /* todo remove evetything on game end
        if (gameEnded) {
            window.removeEventListener('keydown', onKeyDown);
        } */

        GameEngine.getInstance().start();
    };

    const pauseGame = () => {
        if (paused) {
            GameEngine.getInstance().resume();
            setIsPaused(false);
        } else {
            GameEngine.getInstance().pause();
            setIsPaused(true);
        }
    };

    useEffect(() => {
        console.log('ddd');
        const context = (ref.current as HTMLCanvasElement).getContext('2d');
        if (context) {
            GameEngine.getInstance(context).load();
        } else {
            console.log('no context found');
        }
    }, []);

    const getDirection = (mouseX: number, mouseY: number, playerX: number, playerY: number) => {
        let direction = '';
        const shipSize = 25;
        if (mouseY - playerY < -shipSize) {
            direction += 'Up';
        }
        if (mouseY - playerY > shipSize) {
            direction += 'Down';
        }
        if (mouseX - playerX > shipSize) {
            direction += 'Right';
        }
        if (mouseX - playerX < -shipSize) {
            direction += 'Left';
        }

        return direction as TDirection;
    };

    const handleMouseMove = (ev: SyntheticEvent) => {
        const mouseX =
            (ev.nativeEvent as MouseEvent).clientX - (ev.target as HTMLElement).offsetLeft - 25;
        const mouseY =
            (ev.nativeEvent as MouseEvent).clientY - (ev.target as HTMLElement).offsetTop - 25;
        const gameEngine = GameEngine.getInstance();
        const { x: playerX, y: playerY } = gameEngine.getPlayerCoordinates();

        const direction = getDirection(mouseX, mouseY, playerX, playerY);
        gameEngine.setDirectionForPlayer(direction as TDirection);
    };

    setInterval(() => {
        GameEngine.getInstance().playerShot();
    }, 500);

    return (
        <div className={style.game}>
            <div className={style.game__header}>Play game online</div>
            <div className={style.game__controls}>
                Game controls: Arrow buttons to move. A button to fire
            </div>
            <div>
                <canvas
                    ref={ref}
                    width={params.WIDTH}
                    height={params.HEIGHT}
                    onMouseMove={handleMouseMove}
                    className={style.game__canvas}>
                    the game should be here
                </canvas>
            </div>
            <div className={style.game__buttons}>
                <Button text="Start game" size="medium" click={startGame} />

                <Button text="Pause game" size="medium" click={pauseGame} />
            </div>
        </div>
    );
};
export default Game;
