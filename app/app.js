const box = document.getElementById('game-box');
const lane = document.getElementById('lanes');
const gauge = document.getElementById('gauge');
const car = document.querySelector('#car');

window.addEventListener('keyup', e => {
  if (e.keyCode === 37) {
    if (car.className === 'center') {
      car.className = 'left';
    }

    if (car.className === 'right') {
      car.className = 'center';
    }
  }

  if (e.keyCode === 39) {
    if (car.className === 'center') {
      car.className = 'right';
    }

    if (car.className === 'left') {
      car.className = 'center';
    }
  }
});

window.addEventListener('click', e => {
  if (e.target.id === 'left-btn') {
    if (car.className === 'center') {
      car.className = 'left';
    }

    if (car.className === 'right') {
      car.className = 'center';
    }
  }

  if (e.target.id === 'right-btn') {
    if (car.className === 'center') {
      car.className = 'right';
    }

    if (car.className === 'left') {
      car.className = 'center';
    }
  }
});

const btn = document.querySelector('#start-btn');
const root = document.documentElement;

function startGame (speed) {
  const en = document.querySelectorAll('.enemy');

  for (let i = 0; i < en.length; i++) {
    en[i].remove();
  }

  let hits = 0;
  let holes = 52;

  document
    .querySelector('#score')
    .innerHTML = document
      .querySelectorAll('.enemy')
      .length;

  root.style.setProperty('--borderAnimation', 'border 1s linear infinite');

  const hitCheck = 5;

  if (speed === 'SLOW') {
    root.style.setProperty('--animationTime', '1.5s');
  }

  if (speed === 'FAST') {
    root.style.setProperty('--animationTime', '1s');
  }

  if (speed === 'INSANE') {
    root.style.setProperty('--animationTime', '.75s');
  }

  const run = setInterval(buildEnemy, 1500);
  const hit = setInterval(ouchy, 1000 / hitCheck);

  btn.classList.add('start-off');

  document
    .getElementById('end-finish')
    .classList
    .remove('end-on');

  function enemy () {
    const div = document.createElement('div');
    const num = Math.random() < 0.5 ? 'enemy1' : 11;

    if (num === 11) {
      div.className = 'enemy enemy' + Math.floor(Math.random() * 3);
    } else {
      div.className = 'enemy enemy1';
    }

    lane.appendChild(div);

    holes--;
  }

  function buildEnemy () {
    for (let i = 0; i < 2; i++) {
      enemy();
    }
  }

  function ouchy () {
    if (holes < 1) {
      document
        .getElementById('finish-line')
        .classList
        .add('finish-line');

      document
        .querySelectorAll('.enemy')
        [document.querySelectorAll('.enemy').length - 2]
        .remove();

      document
        .querySelectorAll('.enemy')
        [document.querySelectorAll('.enemy').length - 1]
        .remove();

      clearInterval(hit);
      clearInterval(run);

      setTimeout(() => {
        document
          .getElementById('end-finish')
          .classList
          .add('end-on');

        btn.classList.remove('start-off');

        root.style.setProperty('--borderAnimation', 'none');
      }, 2000);
    }

    const enemy = document.querySelectorAll('.enemy');

    for (let i = 0; i < enemy.length; i++) {
      const a = enemy[i].getBoundingClientRect();
      const b = car.getBoundingClientRect();
      const ouch = !(
        a.right < b.left ||
        a.left > b.right ||
        a.bottom < b.top ||
        a.top > b.bottom
      );

      if (ouch) {
        hits++;

        console.log('ouch');

        enemy[i].remove();

        box.classList.add('ouch');

        setTimeout(() => {
          box.classList.remove('ouch')
        }, 750);

        if (hits === 2) {
          box.classList.add('cracked-one');

          gauge.classList.add('gauge-two');
        }

        if (hits === 4) {
          box.classList.add('cracked-two');

          gauge.classList.add('gauge-three');
        }

        if (hits === 6) {
          box.classList.add('cracked-three');

          gauge.classList.add('gauge-four');
        }

        if (hits === 8) {
          box.classList.add('cracked-four');

          gauge.classList.add('gauge-five');
        }

        if (hits >= 9) {
          box.classList.add('cracked-five');

          gauge.classList.add('gauge-five');
        }
      }

      document
        .querySelector('#score')
        .innerHTML = document
          .querySelectorAll('.enemy')
          .length;
    }
  }
}
