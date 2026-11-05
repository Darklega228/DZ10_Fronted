const FRUITS_DATA = [
  { name: 'Яблуко', symbol: '🍎' },
  { name: 'Груша', symbol: '🍐' },
  { name: 'Лимон', symbol: '🍋' },
  { name: 'Персик', symbol: '🍑' },
  { name: 'Вишня', symbol: '🍒' }
];

let userName = "User";
let currentAttempt = 1;
const maxAttempts = 3;
let hasWon = false;

const userNameEl = document.getElementById('user-name');
const attemptEl = document.getElementById('current-attempt');
const generateBtn = document.getElementById('generate-btn');
const resultMessageEl = document.getElementById('result-message');
const columns = [
  document.getElementById('col-0'),
  document.getElementById('col-1'),
  document.getElementById('col-2')
];

function getRandomColumnItems() {
  const available = [...FRUITS_DATA];
  const result = [];
  
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * available.length);
    result.push(available[randomIndex]);
    available.splice(randomIndex, 1);
  }
  
  return result;
}

function renderColumn(colElement, items) {
  const cells = colElement.querySelectorAll('.cell');
  cells.forEach((cell, index) => {
    cell.textContent = items[index].symbol;
  });
}

function checkWin(grid) {
  for (let row = 0; row < 3; row++) {
    if (grid[0][row].name === grid[1][row].name && grid[1][row].name === grid[2][row].name) {
      return true;
    }
  }
  return false;
}

function executeSpin() {
  const currentGrid = [];

  columns.forEach((colEl) => {
    const colItems = getRandomColumnItems();
    currentGrid.push(colItems);
    renderColumn(colEl, colItems);
  });

  if (checkWin(currentGrid)) {
    hasWon = true;
  }
}

function initGame() {
  let inputName = prompt("Будь ласка, введіть ваше ім'я:");

  while (!inputName || inputName.trim() === "") {
    if (inputName === null) {
      inputName = "Гравець";
      break;
    }
    inputName = prompt("Ім'я не може бути порожнім. Введіть ваше ім'я:");
  }

  userName = inputName.trim();
  userNameEl.textContent = userName;
  
  if (attemptEl) {
    attemptEl.textContent = currentAttempt;
  }

  executeSpin();
}

generateBtn.addEventListener('click', () => {
  if (currentAttempt >= maxAttempts) return;

  currentAttempt++;
  
  if (attemptEl) {
    attemptEl.textContent = currentAttempt;
  }

  executeSpin();

  if (currentAttempt >= maxAttempts) {
    generateBtn.disabled = true;
    determineWinner();
  }
});

function determineWinner() {
  if (hasWon) {
    resultMessageEl.textContent = `🎉 Вітаємо, ${userName}! Ви зібрали рядок однакових смайлів і перемогли!`;
    resultMessageEl.style.color = "#2e7d32";
  } else {
    resultMessageEl.textContent = `😔 На жаль, ${userName}, за 3 спроби рядок однакових смайлів не випав.`;
    resultMessageEl.style.color = "#c62828";
  }
}

window.onload = initGame;