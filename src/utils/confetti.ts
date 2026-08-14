export const CONFETTI_COLORS = ["#177dff", "#4dd67b", "#d64d5b", "#f4dc73"];

export function drawConfettiRect(ctx: CanvasRenderingContext2D) {
  const width = 6;
  const height = 12;
  ctx.fillRect(-width / 2, -height / 2, width, height);
}
