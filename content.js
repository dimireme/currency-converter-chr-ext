let exchangeRates = {};

async function fetchExchangeRates() {
  try {
    const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
    const data = await response.json();
    exchangeRates.USD = data.Valute.USD.Value;
    exchangeRates.CNY = data.Valute.CNY.Value;
  } catch (error) {
    console.error('Ошибка при получении курсов валют:', error);
  }
}

fetchExchangeRates();

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

  if (numbers.length > 0 && exchangeRates.USD && exchangeRates.CNY) {
    const conversions = numbers.map(num => {
      const value = parseFloat(num.replace(',', '.'));

      const rubToUsd = (value / exchangeRates.USD).toFixed(2);
      const rubToCny = (value / exchangeRates.CNY).toFixed(2);

      const usdToRub = (value * exchangeRates.USD).toFixed(2);
      const usdToCny = (value * exchangeRates.USD / exchangeRates.CNY).toFixed(2);

      const cnyToUsd = (value * exchangeRates.CNY / exchangeRates.USD).toFixed(2);
      const cnyToRub = (value * exchangeRates.CNY).toFixed(2);

      return `${value}$ = ${usdToRub}₽ = ${usdToCny}¥
${value}₽ = ${rubToUsd}$ = ${rubToCny}¥
${value}¥ = ${cnyToUsd}$ = ${cnyToRub}₽
====================
`;
    }).join('');

    showPopover(e.pageX, e.pageY, conversions);
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
