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