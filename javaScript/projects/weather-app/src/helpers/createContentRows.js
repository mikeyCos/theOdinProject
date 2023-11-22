export default function createContentRows(fn, attributes, ...args) {
  const containerAttributes = attributes ? attributes[0] : null;
  const itemAttributes = attributes ? attributes[1] : null;

  const container = fn('ul');
  if (containerAttributes) {
    container.setAttributes(containerAttributes);
  }
  args.forEach((text) => {
    const item = fn('li');
    if (itemAttributes) {
      item.setAttributes(itemAttributes);
    }
    item.textContent = text;
    container.appendChild(item);
  });
  return container;
}
