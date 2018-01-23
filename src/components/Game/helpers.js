import { NUM_COLS, NUM_ROWS } from '../Slate/Slate'

export const isGrassUnderLlama = (slates, llama) => {
  for (let i = 0; i < slates.length; i++) {
    if (slates[i].isGrassAtPos(llama.x, llama.y)) {
      return true;
    }
  }
  return false;
}

export const eatGrassUnderLlama = (slates, llama) => {
  for (let i = 0; i < slates.length; i++) {
    slates[i].eatGrassAtPos(llama.x, llama.y);
  }
}

export const hasEatenTheGrass = (eatTime) => {
  return (new Date() - eatTime) / 1000 >= 10;
}

export const canAddGrass = (nextGrowDate, slates) => {
  if (!nextGrowDate || new Date() < nextGrowDate) {
    return false;
  }

  const grassCount = slates.reduce((total, s) => total += s.countGrass(), 0);
  const totalTiles = slates.length * (NUM_COLS * NUM_ROWS);

  return Math.ceil(totalTiles / 4) > grassCount;
}