import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, RotateCcw, Play } from 'lucide-react';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];
const INITIAL_DIRECTION = { x: 0, y: -1 };
const SPEED = 150;

export default function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  const generateFood = useCallback(() => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      if (!snake.some(segment => segment.x === newFood?.x && segment.y === newFood?.y)) {
        break;
      }
    }
    return newFood;
  }, [snake]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(generateFood());
    setIsGameOver(false);
    setScore(0);
    setIsStarted(true);
  };

  const moveSnake = useCallback(() => {
    if (isGameOver || !isStarted) return;

    setSnake(prevSnake => {
      const head = prevSnake[0];
      const newHead = {
        x: (head.x + direction.x + GRID_SIZE) % GRID_SIZE,
        y: (head.y + direction.y + GRID_SIZE) % GRID_SIZE,
      };

      // Check collision with self
      if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        setIsGameOver(true);
        if (score > highScore) setHighScore(score);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Check food collision
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(s => s + 10);
        setFood(generateFood());
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, isGameOver, isStarted, generateFood, score, highScore]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction.y !== 1) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y !== -1) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x !== 1) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x !== -1) setDirection({ x: 1, y: 0 });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
    if (isStarted && !isGameOver) {
      gameLoopRef.current = setInterval(moveSnake, SPEED);
    } else {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    }
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [isStarted, isGameOver, moveSnake]);

  return (
    <div className="flex flex-col items-center font-pixel">
      <div className="mb-6 flex gap-8 items-center justify-between w-full max-w-[400px] border-b-2 border-glitch-cyan border-dotted pb-4">
        <div className="flex flex-col">
          <span className="text-glitch-magenta text-xs uppercase tracking-widest">DATA_POINTS</span>
          <span className="text-4xl font-bold text-glitch-cyan leading-none">
            {score.toString().padStart(4, '0')}
          </span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-glitch-magenta text-xs uppercase tracking-widest">PEAK_BUFFER</span>
          <span className="text-4xl font-bold text-glitch-white leading-none">
            {highScore.toString().padStart(4, '0')}
          </span>
        </div>
      </div>

      <div 
        className="relative bg-glitch-black p-1 pixel-border"
        style={{ width: 410, height: 410 }}
      >
        <div 
          className="grid gap-px"
          style={{ 
            width: '100%', 
            height: '100%',
            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
            gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`
          }}
        >
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
            const x = i % GRID_SIZE;
            const y = Math.floor(i / GRID_SIZE);
            const isSnake = snake.some(s => s.x === x && s.y === y);
            const isHead = snake[0].x === x && snake[0].y === y;
            const isFood = food.x === x && food.y === y;

            return (
              <div 
                key={i}
                className={`w-full h-full  ${
                  isHead 
                    ? 'bg-glitch-cyan' 
                    : isSnake 
                    ? 'bg-glitch-cyan bg-opacity-30' 
                    : isFood 
                    ? 'bg-glitch-magenta animate-pulse' 
                    : 'bg-glitch-white bg-opacity-5'
                }`}
              />
            );
          })}
        </div>

        <AnimatePresence>
          {(!isStarted || isGameOver) && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-glitch-black bg-opacity-90"
            >
              {isGameOver && (
                <motion.h2 
                  initial={{ scale: 2 }}
                  animate={{ scale: 1 }}
                  className="text-5xl font-black text-glitch-magenta mb-8 tracking-tighter text-center uppercase"
                >
                  ENGINE_FAILURE
                </motion.h2>
              )}
              <motion.button
                whileHover={{ x: -2, y: -2 }}
                onClick={resetGame}
                className="pixel-button scale-125"
              >
                {isGameOver ? '> REBOOT_SYSTEM' : '> INITIALIZE_NET'}
              </motion.button>
              {!isGameOver && (
                <div className="mt-8 text-glitch-cyan text-xs uppercase tracking-widest opacity-50 flex flex-col items-center gap-2">
                  <p>INPUT: ARROW_KEYS</p>
                  <p className="animate-pulse">WAITING_FOR_USER_AUTHORIZATION...</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
