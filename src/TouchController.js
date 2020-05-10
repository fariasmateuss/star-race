window.addEventListener('click', event => {
  if (event.target.id === 'left-btn') {
    if (car.className === 'center') {
      car.className = 'left';
    }

    if (car.className === 'right') {
      car.className = 'center';
    }
  }

  if (event.target.id === 'right-btn') {
    if (car.className === 'center') {
      car.className = 'right';
    }

    if (car.className === 'left') {
      car.className = 'center';
    }
  }
});
