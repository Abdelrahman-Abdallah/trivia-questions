export function getSelectedId(keyClicked: string, currentItem: string, rowSize: number, items: string[]) {
  if (!currentItem) return items[0];

  const itemIndex = items.indexOf(currentItem);

  if (keyClicked === "ArrowLeft") {
    if (itemIndex - 1 < 0) return;
    return items[itemIndex - 1];
  }

  if (keyClicked === "ArrowRight") {
    if (itemIndex + 1 > items.length) return;
    return items[itemIndex + 1];
  }

  if (keyClicked === "ArrowDown") {
    if (itemIndex + rowSize > items.length - 1) return;
    return items[itemIndex + rowSize];
  }
  if (keyClicked === "ArrowUp") {
    if (itemIndex - rowSize < 0) return;
    return items[itemIndex - rowSize];
  }
}
