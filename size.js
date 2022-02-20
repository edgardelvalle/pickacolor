const SIZES = document.getElementsByClassName('size');

Array.from(SIZES).forEach((size) => {
  size.addEventListener('click', () => {
    window.localStorage.setItem('size', size.innerText);
  });
});
