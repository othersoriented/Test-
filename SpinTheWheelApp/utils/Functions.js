export function spinWheel(wheelRef) {
  if (wheelRef) {
    const randomAngle = Math.floor(Math.random() * 360);
    wheelRef.setNativeProps({
      style: {
        transform: [{ rotate: `${randomAngle}deg` }],
      },
    });
  }
}

export function stopWheel(wheelRef) {
  if (wheelRef) {
    wheelRef.setNativeProps({
      style: {
        transform: [{ rotate: '0deg' }],
      },
    });
  }
}

export function calculateWinner(wheelItems, wheelAngle) {
  const itemAngle = 360 / wheelItems.length;
  const winningIndex = Math.floor(wheelAngle / itemAngle);
  return wheelItems[winningIndex];
}