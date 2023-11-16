export default function createContentRows(fn, ...args) {
  const container = fn('ul');
  args.forEach((text) => {
    const item = fn('li');
    item.textContent = text;
    container.appendChild(item);
  });
  return container;
}
