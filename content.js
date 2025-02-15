document.body.addEventListener('mouseover', (e) => {
  const target = e.target;
  let numbers = [];

  function extractNumbers(node) {
    if (node.nodeType === 3 || node.nodeType === 8) { // TEXT_NODE or COMMENT_NODE
      const matches = node.textContent.match(/\d+[.,]?\d*/g);
      if (matches) numbers.push(...matches);
    }
  }

  target.childNodes.forEach(extractNumbers);
  if (numbers.length > 0) {
    showPopover(e.pageX, e.pageY, `Числа: ${numbers.join(' | ')}`);
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
