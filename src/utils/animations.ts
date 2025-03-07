
export const staggeredAnimation = (index: number) => {
  const baseDelay = 0.1;
  const calculatedDelay = baseDelay * (index % 10);
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { 
      duration: 0.3, 
      ease: [0.25, 0.1, 0.25, 1],
      delay: calculatedDelay
    }
  };
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.3 }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }
};
