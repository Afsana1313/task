let color = [
  "#0d98ed",
  "#7ac568",
  "#8f0808",
  "#f5c640",
  "#ffc7c7",
  "#ff6900",
  "#ffea00",
];
export const getRandomColor = () => {
  return color[Math.floor(Math.random() * color.length)];
};
