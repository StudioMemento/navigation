/* Equal 1×1 tiles, in editorial order, with fifteen services per checkpoint. */
function mementoCatalogueLayout(items, columns, rows) {
  const pages = [], capacity = columns * rows;
  for (let start = 0; start < items.length; start += capacity) {
    pages.push(items.slice(start, start + capacity).map((item, index) => ({
      item, col: index % columns + 1, row: Math.floor(index / columns) + 1,
      width: 1, height: 1
    })));
  }
  return pages;
}
