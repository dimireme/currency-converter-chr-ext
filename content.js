document.body.addEventListener('mouseover', (e) => {
  const target = e.target;
  if (target.nodeType === 1 && target.childNodes.length === 1 && /\d/.test(target.textContent)) {
    const number = target.textContent.match(/\d+[kK]?/);
    if (number) {
      showPopover(e.pageX, e.pageY, `Число: ${number[0]}`);
    }
  }
});

document.body.addEventListener('mouseout', removePopover);

function showPopover(x, y, text) {
  let popover = document.getElementById('number-popover');
  if (!popover) {
    popover = document.createElement('div');
    popover.id = 'number-popover';
    document.body.appendChild(popover);
  }
  popover.textContent = text;
  popover.style.top = `${y + 10}px`;
  popover.style.left = `${x + 10}px`;
  popover.style.display = 'block';
}

function removePopover() {
  const popover = document.getElementById('number-popover');
  if (popover) popover.style.display = 'none';
}
