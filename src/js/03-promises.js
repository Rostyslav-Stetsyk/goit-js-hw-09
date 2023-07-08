import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
}

refs.form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();

  const {delay, step, amount} = {
  delay: Number(e.currentTarget.delay.value),
  step: Number(e.currentTarget.step.value),
  amount: Number(e.currentTarget.amount.value)
  }

  for (let i = 0; i < amount; i += 1) {
    let promiseDelay = delay + step * i;
    createPromise(i+1, promiseDelay)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`)
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`)
      });;
  }
};

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay })
      } else {
        reject({ position, delay })
      }
    }, delay)
  })
  return promise;
};