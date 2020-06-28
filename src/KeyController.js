window.addEventListener('keyup', event => {
  if (event.keyCode === 37) {
    if (car.className === 'center') {
      car.className = 'left';
    }

    if (car.className === 'right') {
      car.className = 'center';
    }
  }

  if (event.keyCode === 39) {
    if (car.className === 'center') {
      car.className = 'right';
    }

    if (car.className === 'left') {
      car.className = 'center';
    }
  }
});
