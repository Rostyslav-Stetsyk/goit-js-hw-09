import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    inputDatetime: document.querySelector('#datetime-picker'),
    buttonStart: document.querySelector('[data-start]'),
    dataDays: document.querySelector('[data-days]'),
    dataHours: document.querySelector('[data-hours]'),
    dataMinutes: document.querySelector('[data-minutes]'),
    dataSeconds: document.querySelector('[data-seconds]')
}

refs.buttonStart.disabled = true;
let timerId;
let selectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    currentDate = new Date();
    if (selectedDates[0] <= currentDate) {
      Notify.info('Please choose a date in the future');
      return;
    };
    
    clearInterval(timerId);

    selectedDate = selectedDates[0];

    refs.buttonStart.disabled = false;
    refs.buttonStart.addEventListener('click', onStart);
  }
};

flatpickr(refs.inputDatetime, options);

function timer(selectedDate, currentDate) {
  timerInMs = selectedDate - currentDate;
  return convertMs(timerInMs);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day).toString().padStart(2, '0');
  // Remaining hours
  const hours = Math.floor((ms % day) / hour).toString().padStart(2, '0');
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute).toString().padStart(2, '0');
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second).toString().padStart(2, '0');

  return { days, hours, minutes, seconds };
}

function onStart() {
  timerId = setInterval(assignValueTimer, 1000);
  refs.buttonStart.disabled = true;
};

function assignValueTimer() {
  currentDate = new Date();
  if (selectedDate <= currentDate) {
    clearInterval(timerId);
    Notify.success('Timer out');
    return;
  }

  const {days, hours, minutes, seconds} = timer(selectedDate, currentDate);

  refs.dataDays.textContent = days;
  refs.dataHours.textContent = hours;
  refs.dataMinutes.textContent = minutes;
  refs.dataSeconds.textContent = seconds;
}