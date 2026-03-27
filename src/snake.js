const GRID_SIZE = 16;
const INITIAL_DIRECTION = "right";

const DIRECTION_VECTORS = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

const OPPOSITES = {
  up: "down",
  down: "up",
  left: "right",
  right: "left",
};

function createInitialSnake(size = GRID_SIZE) {
  const center = Math.floor(size / 2);

  return [
    { x: center, y: center },
    { x: center - 1, y: center },
    { x: center - 2, y: center },
  ];
}

function createInitialState(options = {}) {
  const size = options.size ?? GRID_SIZE;
  const snake = options.snake ?? createInitialSnake(size);
  const direction = options.direction ?? INITIAL_DIRECTION;
  const rng = options.rng ?? Math.random;
  const food = options.food ?? placeFood(size, snake, rng);

  return {
    size,
    snake,
    direction,
    score: options.score ?? 0,
    food,
    gameOver: false,
    won: false,
  };
}

function isOppositeDirection(direction, nextDirection) {
  return OPPOSITES[direction] === nextDirection;
}

function resolveDirection(currentDirection, requestedDirection) {
  if (!requestedDirection || !DIRECTION_VECTORS[requestedDirection]) {
    return currentDirection;
  }

  if (isOppositeDirection(currentDirection, requestedDirection)) {
    return currentDirection;
  }

  return requestedDirection;
}

function getNextHead(head, direction) {
  const movement = DIRECTION_VECTORS[direction];

  return {
    x: head.x + movement.x,
    y: head.y + movement.y,
  };
}

function isOutOfBounds(position, size) {
  return position.x < 0 || position.y < 0 || position.x >= size || position.y >= size;
}

function isSamePosition(a, b) {
  return a.x === b.x && a.y === b.y;
}

function placeFood(size, snake, rng = Math.random) {
  const openCells = [];

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const occupied = snake.some((segment) => segment.x === x && segment.y === y);

      if (!occupied) {
        openCells.push({ x, y });
      }
    }
  }

  if (openCells.length === 0) {
    return null;
  }

  const index = Math.floor(rng() * openCells.length);
  return openCells[index];
}

function stepGame(state, requestedDirection, rng = Math.random) {
  if (state.gameOver || state.won) {
    return state;
  }

  const direction = resolveDirection(state.direction, requestedDirection);
  const nextHead = getNextHead(state.snake[0], direction);
  const eating = state.food && isSamePosition(nextHead, state.food);
  const bodyToCheck = eating ? state.snake : state.snake.slice(0, -1);

  if (isOutOfBounds(nextHead, state.size) || bodyToCheck.some((segment) => isSamePosition(segment, nextHead))) {
    return {
      ...state,
      direction,
      gameOver: true,
    };
  }

  const nextSnake = [nextHead, ...state.snake];

  if (!eating) {
    nextSnake.pop();
  }

  const nextFood = eating ? placeFood(state.size, nextSnake, rng) : state.food;
  const won = eating && nextFood === null;

  return {
    ...state,
    direction,
    snake: nextSnake,
    score: eating ? state.score + 1 : state.score,
    food: nextFood,
    gameOver: false,
    won,
  };
}

window.SnakeGameLogic = {
  GRID_SIZE,
  INITIAL_DIRECTION,
  createInitialSnake,
  createInitialState,
  isOppositeDirection,
  resolveDirection,
  getNextHead,
  isOutOfBounds,
  isSamePosition,
  placeFood,
  stepGame,
};
