const gameArea = document.getElementById('game-area');
const size = parseInt(window.localStorage.getItem('size'));
const highestScore = parseInt(window.localStorage.getItem('highestScore'));
const score = document.getElementById('high-score');
const timer = document.getElementById('timer');
const level = document.getElementById('level');
const html = document.body;

class Game {
  constructor(size) {
    this.level = 1;
    this.size = size;
    this.cells = [];
    this.highestScore = highestScore;
    this.timer;
    this.build();
    this.winnerColor;
  }

  build() {
    this.startTimer();
    if (!window.localStorage.getItem('highestScore')) {
      window.localStorage.setItem('highestScore', this.level);
    }

    level.innerText = `Level: ${this.level}`;
    score.innerText = `Highest Score: ${this.highestScore}`;

    this.color = this.generateRandomColor();
    this.winnerColor = this.generateWinnerColor(this.level);
    html.style.backgroundColor = `rgba(${this.color.RED},${this.color.GREEN},${this.color.BLUE}, .2)`;

    for (let row = 0; row < this.size; row++) {
      const rowEl = document.createElement('div');
      rowEl.className = 'row';
      for (let column = 0; column < this.size; column++) {
        const cellEl = document.createElement('div');
        cellEl.className = 'cell';
        this.cells.push(cellEl);
        rowEl.append(cellEl);
      }
      gameArea.append(rowEl);
    }
    this.fillCells();
  }

  fillCells() {
    const { RED, GREEN, BLUE } = this.color;
    for (let i = 0; i < this.cells.length; i++) {
      const cell = this.cells[i];
      cell.style.backgroundColor = `rgb(${RED},${GREEN},${BLUE})`;
      cell.addEventListener('click', () => {
        clearTimeout(this.timer);
        if (cell.winner) {
          this.level++;
          html.style.backgroundColor = `#46bb3e`;
        } else {
          this.level = 1;
          html.style.backgroundColor = `#ee4b5f`;
        }
        if (this.level > this.highestScore) {
          this.highestScore = this.level;
        }
        this.clear();
        this.build();
      });
      this.cells[i] = cell;
    }

    const randomNum = Math.floor(Math.random() * this.cells.length);
    this.cells[randomNum].style.backgroundColor = this.winnerColor;
    this.cells[randomNum].winner = true;
  }

  generateRandomColor() {
    const RED = Math.floor(Math.random() * 255);
    const GREEN = Math.floor(Math.random() * 255);
    const BLUE = Math.floor(Math.random() * 255);

    return { RED, GREEN, BLUE };
  }

  generateWinnerColor(level) {
    const range = ((Math.random() > 0.5 ? -1 : 1) * 20) % 255;
    const { RED, GREEN, BLUE } = this.color;
    const dRED = RED + range;
    const dGREEN = GREEN + range;
    const dBLUE = BLUE + range;

    return `rgb(${dRED},${dGREEN},${dBLUE})`;
  }

  startTimer() {
    this.timer = setTimeout(() => {
      this.level = 1;
      this.clear();
      this.build();
    }, 5000);
  }

  clear() {
    this.cells = [];
    gameArea.innerHTML = '';
  }
}

const game = new Game(size);
