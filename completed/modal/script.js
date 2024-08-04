'use strict';

const buttons = document.querySelectorAll('.show-modal');
const modal = document.querySelector('.modal');
const modal_btn = document.querySelector('.close-modal');
const overlay = document.querySelector('.overlay');

const closeModal = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

const openModal = () => {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

buttons.forEach(button => {
  button.addEventListener('click', () => openModal());
});

overlay.addEventListener('click', () => closeModal());

modal_btn.addEventListener('click', () => closeModal());

document.addEventListener('keydown', e => {
  if (
    e.key == 'Escape' &&
    !modal.classList.contains('hidden') &&
    !overlay.classList.contains('hidden')
  ) {
    closeModal();
    console.log('Esc pressed');
  }
});
